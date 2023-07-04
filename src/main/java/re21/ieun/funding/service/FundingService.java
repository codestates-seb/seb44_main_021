package re21.ieun.funding.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.funding.entity.Funding;
import re21.ieun.funding.mapper.FundingMapper;
import re21.ieun.funding.repository.FundingRepository;
import re21.ieun.member.service.MemberService;
import re21.ieun.upcycling.service.UpcyclingService;

import java.util.Optional;

@Service
public class FundingService {

    private final FundingRepository fundingRepository;
    private final FundingMapper fundingMapper;
    private final UpcyclingService upcyclingService;
    private final MemberService memberService;

    public FundingService(FundingRepository fundingRepository, FundingMapper fundingMapper,
                          UpcyclingService upcyclingService, MemberService memberService) {
        this.fundingRepository = fundingRepository;
        this.fundingMapper = fundingMapper;
        this.upcyclingService = upcyclingService;
        this.memberService = memberService;
    }

    public Funding createFunding(Funding funding) {

        verifyFunding(funding);

        //updateLike(savedFunding);
        //updateFollower(savedFunding);

        return fundingRepository.save(funding);
    }

    public Funding updateFunding(Funding funding) {
        Funding findFunding = findVerifiedFunding(funding.getFundingId());

        Optional.ofNullable(funding.getFundingStatus())
                .ifPresent(fundingStatus -> findFunding.setFundingStatus(fundingStatus));

        return fundingRepository.save(findFunding);
    }

    // Delete
    public void cancelFunding(long fundingId) {
        Funding findFunding = findVerifiedFunding(fundingId);
        int step = findFunding.getFundingStatus().getStepNumber();

        // FundingStatus의 step이 3 이상일 경우(FUNDING_SENDING)에는 주문 취소가 되지 않도록한다.
        if (step >= 3) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_FUNDING);
        }

        findFunding.setFundingStatus(Funding.FundingStatus.FUNDING_CANCEL);
        fundingRepository.save(findFunding);
    }

    // 하나의 Funding 확인
    public Funding findFunding(long fundingId) {

        return findVerifiedFunding(fundingId);
    }

    /*
    // 모든 Funding 을 확인
    public List<FundingResponseDto> findFundings() {

        List<Funding> fundings = fundingRepository.findAll();

        return fundingMapper.fundingToFundingResponseDtos(fundings);
    }
     */

    public Page<Funding> findFundings(int page, int size) {
        return fundingRepository.findAll(PageRequest.of(page, size,
                Sort.by("fundingId").descending()));
    }
    
    private Funding findVerifiedFunding(long fundingId) {
        Optional<Funding> optionalFunding = fundingRepository.findById(fundingId);
        Funding findFunding =
                optionalFunding.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.FUNDING_NOT_FOUND));
        return findFunding;
    }

    private Funding saveFunding(Funding funding) {
        return fundingRepository.save(funding);
    }

    private void verifyFunding(Funding funding) {

        // 회원이 존재하는지 확인
        memberService.findMember(funding.getMember().getMemberId());

        // 업사이클링이 존재하는지 확인
        funding.getFundingUpcyclings().stream()
                .forEach(fundingUpcycling -> upcyclingService.
                        findVerifyUpcycling(fundingUpcycling.getUpcycling().getUpcyclingId()));
    }

}

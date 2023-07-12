package re21.ieun.funding.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.funding.dto.FundingResponseDto;
import re21.ieun.funding.entity.Funding;
import re21.ieun.funding.mapper.FundingMapper;
import re21.ieun.funding.repository.FundingRepository;
import re21.ieun.member.entity.Member;
import re21.ieun.member.service.MemberService;
import re21.ieun.upcycling.service.UpcyclingService;

import java.time.LocalDateTime;
import java.util.List;
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


    // 펀딩하기
    public Funding createFunding(Funding funding) {
        verifyFunding(funding);
        funding.setFundingStatus(Funding.FundingStatus.FUNDING_APPLICATION_COMPLETE);

        List<Funding> existingFundingList = fundingRepository.findByUpcycling(funding.getUpcycling());

        int totalReceivedQuantity = existingFundingList.stream()
                .mapToInt(Funding::getQuantity)
                .sum();

        // 새로운 funding 객체의 quantity도 totalReceivedQuantity에 포함하여 계산
        totalReceivedQuantity += funding.getQuantity();

        // 모든 펀딩 객체들의 totalReceivedQuantity 값을 수정함
        for (Funding existingFunding : existingFundingList) {
            existingFunding.setTotalReceivedQuantity(totalReceivedQuantity);
        }

        // 새로운 funding 객체의 totalReceivedQuantity 값을 설정함
        funding.setTotalReceivedQuantity(totalReceivedQuantity);

        // 결제한 날짜 설정
        funding.setFundingDate(LocalDateTime.now());

        // 기존 펀딩과 새로운 펀딩 모두 저장
        fundingRepository.saveAll(existingFundingList);
        return fundingRepository.save(funding);
    }


    // 펀딩 수정하기
    public Funding updateFunding(Funding funding) {
        Funding findFunding = findVerifiedFunding(funding.getFundingId());

        Optional.ofNullable(funding.getFundingStatus())
                .ifPresent(fundingStatus -> findFunding.setFundingStatus(fundingStatus));

        return fundingRepository.save(findFunding);
    }

    // 펀딩 취소하기
    public void cancelFunding(long fundingId) {
        Funding findFunding = findVerifiedFunding(fundingId);
        int step = findFunding.getFundingStatus().getStepNumber();

        // FundingStatus의 step이 3 이상일 경우(FUNDING_SENDING)에는 주문 취소가 되지 않도록한다.
        if (step >= 3) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_FUNDING);
        }

        Funding.FundingStatus fundingStatus = Funding.FundingStatus.FUNDING_APPLICATION_COMPLETE;

        findFunding.setFundingStatus(Funding.FundingStatus.FUNDING_CANCEL);

        List<Funding> existingFundingList = fundingRepository.findByUpcycling(findFunding.getUpcycling());

        int updatedTotalReceivedQuantity = 0;

        for (Funding funding : existingFundingList) {
            if (funding.getFundingStatus() == fundingStatus) {
                if (funding.getFundingId() != fundingId) {
                    updatedTotalReceivedQuantity += funding.getQuantity();
                }
            }
        }

        for (Funding funding : existingFundingList) {
            if (funding.getFundingStatus() == fundingStatus) {
                if (funding.getFundingId() != fundingId) {
                    funding.setTotalReceivedQuantity(updatedTotalReceivedQuantity);
                    fundingRepository.save(funding);
                }
            }
        }

        //fundingRepository.save(findFunding);        // 상태 확인용, 취소한 내역도 보고싶으면 사용
        fundingRepository.delete(findFunding);
    }

    // 하나의 Funding 확인
    public Funding findFunding(long fundingId) {

        return findVerifiedFunding(fundingId);
    }

    // 모든 Funding 을 확인
    public List<FundingResponseDto> findFundings() {

        List<Funding> fundings = fundingRepository.findAll();

        return fundingMapper.fundingToFundingResponseDtos(fundings);
    }

    /*
    // 모든 Funding 을 확인, 페이지네이션
    public Page<Funding> findFundings(int page, int size) {
        return fundingRepository.findAll(PageRequest.of(page, size,
                Sort.by("fundingId").descending()));
    }
     */

    // Funding를 수정하기 위해선 Funding이 있는지 검증
    private Funding findVerifiedFunding(long fundingId) {
        Optional<Funding> optionalFunding = fundingRepository.findById(fundingId);
        Funding findFunding =
                optionalFunding.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.FUNDING_NOT_FOUND));
        return findFunding;
    }

    private void verifyFunding(Funding funding) {

        // 회원이 존재하는지 확인
        memberService.findMember(funding.getMember().getMemberId());

        // 업사이클링이 존재하는지 확인
        upcyclingService.findVerifyUpcycling(funding.getUpcycling().getUpcyclingId());
    }

    // 특정 member 펀딩 내역, 페이지네이션
    public Page<Funding> getMyFundingHistoryByMemberId(Long memberId, int page, int size) {
        Member member = memberService.findMember(memberId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("fundingId").descending());
        return fundingRepository.findByMember(member, pageable);
    }
}

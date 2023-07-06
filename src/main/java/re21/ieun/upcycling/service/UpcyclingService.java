package re21.ieun.upcycling.service;

import org.springframework.stereotype.Service;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.member.entity.Member;
import re21.ieun.member.service.MemberService;
import re21.ieun.upcycling.dto.UpcyclingResponseDto;
import re21.ieun.upcycling.entity.Upcycling;
import re21.ieun.upcycling.mapper.UpcyclingMapper;
import re21.ieun.upcycling.repository.UpcyclingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UpcyclingService {

    private final UpcyclingRepository upcyclingRepository;
    private final UpcyclingMapper upcyclingMapper;
    private final MemberService memberService;

    public UpcyclingService(UpcyclingRepository upcyclingRepository, UpcyclingMapper upcyclingMapper, MemberService memberService) {
        this.upcyclingRepository = upcyclingRepository;
        this.upcyclingMapper = upcyclingMapper;
        this.memberService = memberService;
    }

    // 업사이클링 펀딩 게시글 생성
    public Upcycling createUpcycling(Upcycling upcycling) {

        verifyUpcycling(upcycling);

        return upcyclingRepository.save(upcycling);
    }

    // 업사이클링 펀딩 게시글 수정
    public Upcycling updateUpcycling(Upcycling upcycling) {

        Upcycling findUpcycling = findVerifyUpcycling(upcycling.getUpcyclingId());

        Optional.ofNullable(upcycling.getTitle())                        // ofNullable : 일반 객체뿐만 아니라 null 값까지 받을 수 있다.
                .ifPresent(title -> findUpcycling.setTitle(title));

        Optional.ofNullable(upcycling.getContent())
                .ifPresent(content -> findUpcycling.setContent(content));

        Optional.ofNullable(upcycling.getTotalQuantity())
                .ifPresent(quantity -> findUpcycling.setTotalQuantity(quantity));

        return upcyclingRepository.save(findUpcycling);
    }

    // 업사이클링 펀딩 게시글 삭제
    public void deleteUpcycling(long upcyclingId) {

        Upcycling findUpcycling = findVerifyUpcycling(upcyclingId);

        findUpcycling.setUpcyclingStatus(Upcycling.UpcyclingStatus.UPCYCLING_DELETE);

        upcyclingRepository.delete(findUpcycling);
    }

    // member 가 존재하는지 확인
    public void verifyUpcycling(Upcycling upcycling) {

        Member member = memberService.findMember(upcycling.getMember().getMemberId());
        upcycling.setMember(member);

    }

    // Upcycling를 수정하기 위해선 Upcycling가 있는지 검증
    public Upcycling findVerifyUpcycling(long upcyclingId) {

        Optional<Upcycling> optionalUpcycling = upcyclingRepository.findById(upcyclingId);     // Optional : Null값 허용
        Upcycling findUpcycling = optionalUpcycling.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.UPCYCLING_NOT_FOUND));

        return findUpcycling;
    }

    // 모든 Upcycling 을 확인
    public List<UpcyclingResponseDto> findUpcyclings() {

        List<Upcycling> upcyclings = upcyclingRepository.findAll();

        return upcyclingMapper.upcyclingToUpcyclingResponseDtos(upcyclings);
    }


    // Upcycling View(조회수) Counting
    public Upcycling increaseViewCount(long upcyclingId) {

        Upcycling findUpcycling = findVerifyUpcycling(upcyclingId);
        findUpcycling.setViewCount(findUpcycling.getViewCount() + 1);

        return upcyclingRepository.save(findUpcycling);
    }

    // Upcycling 검색 기능
    public List<UpcyclingResponseDto> upcyclingSearchList(String searchKeyword) {

        List<Upcycling> upcyclings = upcyclingRepository.findByTitleContaining(searchKeyword);

        return upcyclingMapper.upcyclingToUpcyclingResponseDtos(upcyclings);
    }
}

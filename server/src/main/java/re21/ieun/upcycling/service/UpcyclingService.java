package re21.ieun.upcycling.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import re21.ieun.category.entity.Category;
import re21.ieun.category.service.CategoryService;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.funding.dto.FundingResponseDto;
import re21.ieun.funding.entity.Funding;
import re21.ieun.funding.repository.FundingRepository;
import re21.ieun.member.entity.Member;
import re21.ieun.member.service.MemberService;
import re21.ieun.upcycling.dto.UpcyclingResponseDto;
import re21.ieun.upcycling.entity.Upcycling;
import re21.ieun.upcycling.mapper.UpcyclingMapper;
import re21.ieun.upcycling.repository.UpcyclingRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UpcyclingService {

    private final UpcyclingRepository upcyclingRepository;
    private final UpcyclingMapper upcyclingMapper;
    private final MemberService memberService;
    private final CategoryService categoryService;
    private final FundingRepository fundingRepository;

    public UpcyclingService(UpcyclingRepository upcyclingRepository, UpcyclingMapper upcyclingMapper, MemberService memberService, CategoryService categoryService, FundingRepository fundingRepository) {
        this.upcyclingRepository = upcyclingRepository;
        this.upcyclingMapper = upcyclingMapper;
        this.memberService = memberService;
        this.categoryService = categoryService;
        this.fundingRepository = fundingRepository;
    }

    // 업사이클링 펀딩 게시글 생성
    public Upcycling createUpcycling(Upcycling upcycling) {

        verifyUpcycling(upcycling);

        return upcyclingRepository.save(upcycling);
    }

    // 업사이클링 펀딩 게시글 수정
    public Upcycling updateUpcycling(Upcycling upcycling) {

        Upcycling findUpcycling = findVerifyUpcycling(upcycling.getUpcyclingId());

        // ofNullable : 일반 객체뿐만 아니라 null 값까지 받을 수 있다
        Optional.ofNullable(upcycling.getTitle())
                .ifPresent(title -> findUpcycling.setTitle(title));

        Optional.ofNullable(upcycling.getContent())
                .ifPresent(content -> findUpcycling.setContent(content));

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

        // Optional : Null값 허용
        Optional<Upcycling> optionalUpcycling = upcyclingRepository.findById(upcyclingId);
        Upcycling findUpcycling = optionalUpcycling.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.UPCYCLING_NOT_FOUND));

        return findUpcycling;
    }

    /*
    // 모든 Upcycling 을 확인
    public List<UpcyclingResponseDto> findUpcyclings() {

        List<Upcycling> upcyclings = upcyclingRepository.findAll();

        return upcyclingMapper.upcyclingToUpcyclingResponseDtos(upcyclings);
    }
     */

    // 모든 Upcycling 을 확인, 페이지네이션
    public Page<Upcycling> findUpcyclings(int page, int size) {
        return upcyclingRepository.findAll(PageRequest.of(page, size, Sort.by("upcyclingId").descending()));
    }

    public Page<Upcycling> findUpcyclings1(int page, int size) {
        return upcyclingRepository.findAll(PageRequest.of(page, size, Sort.by("upcyclingId").ascending()));
    }

    // UpcyclingId 검증 + Upcycling View(조회수) Counting
    public Upcycling increaseViewCount(long upcyclingId) {

        Upcycling findUpcycling = findVerifyUpcycling(upcyclingId);
        findUpcycling.setViewCount(findUpcycling.getViewCount() + 1);

        return upcyclingRepository.save(findUpcycling);
    }

    /*
    // Upcycling 검색 기능
    public List<UpcyclingResponseDto> upcyclingSearchList(String searchKeyword) {

        List<Upcycling> upcyclings = upcyclingRepository.findByTitleContaining(searchKeyword);

        return upcyclingMapper.upcyclingToUpcyclingResponseDtos(upcyclings);
    }
     */

//    //category로 검색
//    public List<UpcyclingResponseDto> findUpcyclingsByCategoryId(long categoryId) {
//        List<UpcyclingResponseDto> Dto = findUpcyclings();
//        return Dto.stream().filter(d -> d.getCategoryId() == categoryId).collect(Collectors.toList());
//    }

    public Page<Upcycling> findUpcyclingsByCategoryId(Long categoryId, int page, int size) {
        Category category = categoryService.findcategory(categoryId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("upcyclingId").descending());
        return upcyclingRepository.findByCategory(category, pageable);
    }
    public Page<Upcycling> findUpcyclingsByCategoryId1(Long categoryId, int page, int size) {
        Category category = categoryService.findcategory(categoryId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("upcyclingId").ascending());
        return upcyclingRepository.findByCategory(category, pageable);
    }

    // 특정 member 업사이클링 펀딩 등록 내역, 페이지네이션
    public Page<Upcycling> getMyUpcyclingHistoryByMemberId(Long memberId, int page, int size) {
        Member member = memberService.findMember(memberId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("upcyclingId").descending());
        return upcyclingRepository.findByMember(member, pageable);
    }


    /* 검색 기능 - pagination(페이지네이션) */
    public Page<Upcycling> searchUpcyclings(int page, int size, String searchKeyword, Long categoryId, boolean ascendingSort) {
        Pageable pageable;
        Category category = null;

        if (categoryId != null) {
            // Assuming you have a method to find a category by ID in the categoryService
            category = categoryService.findcategory(categoryId);
        }

        if (ascendingSort) {
            pageable = PageRequest.of(page, size, Sort.by("upcyclingId").ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by("upcyclingId").descending());
        }

        if (searchKeyword.equals("") && category == null) {
            return upcyclingRepository.findAll(pageable);
        } else if (searchKeyword.equals("") && category != null) {
            return upcyclingRepository.findByCategory(category, pageable);
        } else if (!searchKeyword.equals("") && category == null) {
            return upcyclingRepository.findByTitleContaining(searchKeyword, pageable);
        } else if (!searchKeyword.equals("") && category != null) {
            return upcyclingRepository.findByTitleContainingAndCategory(searchKeyword, category, pageable);
        } else {
            throw new BusinessLogicException(ExceptionCode.SEARCH_NOT_FOUND);
        }
    }
}


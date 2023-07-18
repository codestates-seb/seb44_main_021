package re21.ieun.sell.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import re21.ieun.category.entity.Category;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.member.service.MemberService;
import re21.ieun.sell.dto.SellResponseDto;
import re21.ieun.sell.entity.Sell;
import re21.ieun.sell.mapper.SellMapper;
import re21.ieun.sell.repository.SellRepository;

import re21.ieun.member.entity.Member;
import re21.ieun.sellcategory.entity.SellCategory;
import re21.ieun.sellcategory.service.SellCategoryService;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;
import java.util.Optional;

@Service
public class SellService {

    private final SellRepository sellRepository;

    private final SellMapper sellMapper;

    private final MemberService memberService;
    private final SellCategoryService sellCategoryService;


    public SellService(SellRepository sellRepository, SellMapper sellMapper, MemberService memberService, SellCategoryService sellCategoryService) {
        this.sellRepository = sellRepository;
        this.sellMapper = sellMapper;
        this.memberService = memberService;
        this.sellCategoryService = sellCategoryService;
    }

    public Sell createSell(Sell sell) {

        verifySell(sell);

        return sellRepository.save(sell);
    }

    // 판매 게시글 수정
    public Sell updateSell(Sell sell) {

        Sell findSell = findVerifySell(sell.getSellId());

        Optional.ofNullable(sell.getTitle())
                .ifPresent(title -> findSell.setTitle(title));

        Optional.ofNullable(sell.getContent())
                .ifPresent(content -> findSell.setContent(content));

        return sellRepository.save(findSell);
    }

    // 판매 게시글 삭제

    public Sell deleteSell(long sellId) {

        Sell findSell = findVerifySell(sellId);

        findSell.setSellStatus(Sell.SellStatus.SELL_DELETE);

        return sellRepository.save(findSell);
    }

    // member 가 존재하는지 확인 이 부분질문
    public void verifySell(Sell sell) {

        Member member = memberService.findMember(sell.getMember().getMemberId());
        sell.setMember(member);


    }

    // Sell을 수정하기 위해서 Sell이 있는지 검증
    public Sell findVerifySell(long sellId) {

        Optional<Sell> optionalSell = sellRepository.findById(sellId);
        Sell findSell = optionalSell.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.SELL_NOT_FOUND));

        return findSell;
    }

    // 모든 Sell 확인

//    public List<SellResponseDto> findSells() {
//        List<Sell> sells = sellRepository.findAll();
//
//        return sellMapper.sellToSellResponseDtos(sells);
//    }

    public Page<Sell> findSells(int page, int size) {
        return sellRepository.findAll(PageRequest.of(page, size, Sort.by("sellId").descending()));
    }


    // Sell View

    public Sell increaseViewCount(long sellId) {

        Sell findSell = findVerifySell(sellId);
        findSell.setViewCount(findSell.getViewCount() +1);

        return sellRepository.save(findSell);
    }

    // Sell 검색 기능

    public List<SellResponseDto> sellSearchList(String searchKeyword) {

        List<Sell> sells = sellRepository.findByTitleContaining(searchKeyword);

        return sellMapper.sellToSellResponseDtos(sells);
    }

    public Page<Sell> findSellsBySellCategoryId(Long sellcategoryId, int page, int size) {
        SellCategory sellcategory = sellCategoryService.findsellcategory(sellcategoryId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("sellId").descending());
        return sellRepository.findBySellCategory(sellcategory, pageable);
    }
    public Page<Sell> findSellsBySellCategoryId1(Long sellcategoryId, int page, int size) {
        SellCategory sellcategory = sellCategoryService.findsellcategory(sellcategoryId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("sellId").ascending());
        return sellRepository.findBySellCategory(sellcategory, pageable);
    }

    public Page<Sell> getMySellHistoryByMemberId(Long memberId, int page, int size) {
        Member member = memberService.findMember(memberId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("sellId").descending());
        return sellRepository.findByMember(member, pageable);
    }





}

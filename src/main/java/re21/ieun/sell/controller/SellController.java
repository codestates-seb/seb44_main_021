package re21.ieun.sell.controller;


import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.dto.MultiResponseDto;
import re21.ieun.member.dto.MemberDto;
import re21.ieun.member.service.MemberService;
import re21.ieun.sell.dto.SellPatchDto;
import re21.ieun.sell.dto.SellPostDto;
import re21.ieun.sell.dto.SellResponseDto;
import re21.ieun.sell.entity.Sell;
import re21.ieun.sell.mapper.SellMapper;
import re21.ieun.sell.service.SellService;
import re21.ieun.upcycling.entity.Upcycling;
import re21.ieun.utils.UriCreator;

import javax.swing.plaf.LabelUI;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/sells")
@Validated
public class SellController {

    private final static String ANSWER_DEFAULT_URL = "/sells";

    private final SellService sellService;

    private final SellMapper sellMapper;

    private final MemberService memberService;

    public SellController(SellService sellService, SellMapper sellMapper, MemberService memberService) {
        this.sellService = sellService;
        this.sellMapper = sellMapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<?> postSell(@Valid @RequestBody SellPostDto sellPostDto) {

        memberService.findMember(sellPostDto.getMemberId());

        Sell sell = sellService.createSell(sellMapper.sellPostDtoToSell(sellPostDto));
        URI location = UriCreator.createUri(ANSWER_DEFAULT_URL, sell.getSellId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{sell-id}")
    public ResponseEntity<?> patchSell(@PathVariable("sell-id") @Positive long sellId,
                                       @Valid @RequestBody SellPatchDto sellPatchDto) {

        sellPatchDto.setSellId(sellId);
        Sell sell = sellService.updateSell(sellMapper.sellPatchDtoToSell(sellPatchDto));

        return new ResponseEntity<>(sellMapper.sellToSellResponseDto(sell), HttpStatus.OK);

    }

    @GetMapping("/{sell-id}")
    public ResponseEntity<?> getSell(@PathVariable("sell-id") @Positive long sellId) {

        //조회수 증가 처리
        Sell sell = sellService.increaseViewCount(sellId);

        return new ResponseEntity<>(sellMapper.sellToSellResponseDto(sell), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity<?> getSells() {
//
//        List<SellResponseDto> sells = sellService.findSells();
//
//        return new ResponseEntity<>(sells, HttpStatus.OK);
//    }

    @GetMapping("/descending")
    public ResponseEntity<?> getSells(@Positive @RequestParam int page,
                                           @Positive @RequestParam int size) {
        Page<Sell> pageSells = sellService.findSells(page - 1, size);
        List<Sell> sells = pageSells.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(sellMapper.sellToSellResponseDtos(sells), pageSells),
                HttpStatus.OK);
    }

    @GetMapping("/ascending")       // 오래된 순
    public ResponseEntity<?> ascendingGetSells(@Positive @RequestParam int page,
                                                    @Positive @RequestParam int size) {
        Page<Sell> pageSells = sellService.findSells1(page - 1, size);
        List<Sell> sells = pageSells.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(sellMapper.sellToSellResponseDtos(sells), pageSells),
                HttpStatus.OK);

    }

    /*
    // Sell view
    @GetMapping("/{sell-id}")
    public ResponseEntity<?> viewSell(@PathVariable("sell-id") @Positive long sellId) {

        //조회수 증가 처리
        Sell sell =sellService.increaseViewCount(sellId);

        return new ResponseEntity<>(sellMapper.sellToSellResponseDto(sell), HttpStatus.OK);

    }
     */

    // Sell search
    @GetMapping("/search/{searchKeyword}")
    public ResponseEntity<?> getSellsByTitleContaining(@PathVariable("searchKeyword") String searchKeyword) {

        List<SellResponseDto> response = sellService.sellSearchList(searchKeyword);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //카테고리 id 기준으로 upcycling 글 최신순으로 정렬 + 페이지네이션
    @GetMapping("/descending/sellcategories/{sellcategory-id}")
    public ResponseEntity getDescendingSellsBySellCategoryId(@PathVariable("sellcategory-id") long sellcategoryId,
                                                              @Positive @RequestParam int page,
                                                              @Positive @RequestParam int size) {
        Page<Sell> pageSells = sellService.findSellsBySellCategoryId(sellcategoryId,page - 1, size);
        List<Sell> sells = pageSells.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(sellMapper.sellToSellResponseDtos(sells), pageSells),
                HttpStatus.OK);
    }

    // 특정 member 제품 판매 등록 내역, 페이지네이션
    @GetMapping("/member/{member-id}")
    public ResponseEntity<?> getMySellHistory(@PathVariable("member-id") @Positive long memberId,
                                                   @Positive @RequestParam int page,
                                                   @Positive @RequestParam int size) {
        Page<Sell> pageSells = sellService.getMySellHistoryByMemberId(memberId,page - 1, size);
        List<Sell> sells = pageSells.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(sellMapper.sellToSellResponseDtos(sells), pageSells),
                HttpStatus.OK);

    }

    @GetMapping("/ascending/sellcategories/{sellcategory-id}")
    public ResponseEntity getAscendingSellsBySellCategoryId(@PathVariable("sellcategory-id") long sellcategoryId,
                                                             @Positive @RequestParam int page,
                                                             @Positive @RequestParam int size) {
        Page<Sell> pageSells = sellService.findSellsBySellCategoryId1(sellcategoryId,page - 1, size);
        List<Sell> sells = pageSells.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(sellMapper.sellToSellResponseDtos(sells), pageSells),
                HttpStatus.OK);
    }
}

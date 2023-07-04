package re21.ieun.sell.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.member.dto.MemberDto;
import re21.ieun.member.service.MemberService;
import re21.ieun.sell.dto.SellPatchDto;
import re21.ieun.sell.dto.SellPostDto;
import re21.ieun.sell.dto.SellResponseDto;
import re21.ieun.sell.entity.Sell;
import re21.ieun.sell.mapper.SellMapper;
import re21.ieun.sell.service.SellService;
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

        Sell sell = sellService.findVerifySell(sellId);

        return new ResponseEntity<>(sellMapper.sellToSellResponseDto(sell), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getSells() {

        List<SellResponseDto> sells = sellService.findSells();

        return new ResponseEntity<>(sells, HttpStatus.OK);
    }


    // Sell view
    @GetMapping("/view/{sell-id}")
    public ResponseEntity<?> viewSell(@PathVariable("sell-id") @Positive long sellId) {

        //조회수 증가 처리
        Sell sell =sellService.increaseViewCount(sellId);

        return new ResponseEntity<>(sellMapper.sellToSellResponseDto(sell), HttpStatus.OK);

    }

    // Sell search
    @GetMapping("/search/{searchKeyword}")
    public ResponseEntity<?> getSellsByTitleContaining(@PathVariable("searchKeyword") String searchKeyword) {

        List<SellResponseDto> response = sellService.sellSearchList(searchKeyword);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

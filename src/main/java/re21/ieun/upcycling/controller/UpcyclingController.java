package re21.ieun.upcycling.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.member.entity.Member;
import re21.ieun.member.service.MemberService;
import re21.ieun.upcycling.dto.UpcyclingPatchDto;
import re21.ieun.upcycling.dto.UpcyclingPostDto;
import re21.ieun.upcycling.dto.UpcyclingResponseDto;
import re21.ieun.upcycling.entity.Upcycling;
import re21.ieun.upcycling.mapper.UpcyclingMapper;
import re21.ieun.upcycling.service.UpcyclingService;
import re21.ieun.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController         // @Controller 랑 @RestController 랑 무슨 차이인지 알아보기
@RequestMapping("/upcyclings")
@Validated
public class UpcyclingController {

    private final static String ANSWER_DEFAULT_URL = "/upcyclings";

    private final UpcyclingService upcyclingService;
    private final UpcyclingMapper upcyclingMapper;
    private final MemberService memberService;

    public UpcyclingController(UpcyclingService upcyclingService, UpcyclingMapper upcyclingMapper, MemberService memberService) {
        this.upcyclingService = upcyclingService;
        this.upcyclingMapper = upcyclingMapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<?> postUpcycling(@Valid @RequestBody UpcyclingPostDto upcyclingPostDto) {

        memberService.findMember(upcyclingPostDto.getMemberId());

        Upcycling upcycling = upcyclingService.createUpcycling(upcyclingMapper.upcyclingPostDtoToUpcycling(upcyclingPostDto));
        URI location = UriCreator.createUri(ANSWER_DEFAULT_URL, upcycling.getUpcyclingId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{upcycling-id}")
    public ResponseEntity<?> patchUpcycling(@PathVariable("upcycling-id") @Positive long upcyclingId,
                                         @Valid @RequestBody UpcyclingPatchDto upcyclingPatchDto) {

        upcyclingPatchDto.setUpcyclingId(upcyclingId);
        Upcycling upcycling = upcyclingService.updateUpcycling(upcyclingMapper.upcyclingPatchDtoToUpcycling(upcyclingPatchDto));

        return new ResponseEntity<>(upcyclingMapper.upcyclingToUpcyclingResponseDto(upcycling), HttpStatus.OK);
    }

    @GetMapping("/{upcycling-id}")
    public ResponseEntity<?> getUpcycling(@PathVariable("upcycling-id") @Positive long upcyclingId) {

        Upcycling upcycling = upcyclingService.findVerifyUpcycling(upcyclingId);

        return new ResponseEntity<>(upcyclingMapper.upcyclingToUpcyclingResponseDto(upcycling), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getUpcyclings() {

        List<UpcyclingResponseDto> upcyclings = upcyclingService.findUpcyclings();

        return new ResponseEntity<>(upcyclings, HttpStatus.OK);
    }

    // Upcycling View(조회수)
    @GetMapping("/view/{upcycling-id}")
    public ResponseEntity<?> viewUpcycling(@PathVariable("upcycling-id") @Positive long upcyclingId) {

        // 조회수 증가 처리
        Upcycling upcycling = upcyclingService.increaseViewCount(upcyclingId);

        return new ResponseEntity<>(upcyclingMapper.upcyclingToUpcyclingResponseDto(upcycling), HttpStatus.OK);
    }

    // Upcycling 검색 기능
    @GetMapping("/search/{searchKeyword}")
    public ResponseEntity<?> getUpcyclingsByTitleContaining(@PathVariable("searchKeyword") String searchKeyword) {

        List<UpcyclingResponseDto> response = upcyclingService.upcyclingSearchList(searchKeyword);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

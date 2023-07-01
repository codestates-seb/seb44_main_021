package re21.ieun.upcycling.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.upcycling.dto.UpcyclingPatchDto;
import re21.ieun.upcycling.dto.UpcyclingPostDto;
import re21.ieun.upcycling.entity.Upcycling;
import re21.ieun.upcycling.mapper.UpcyclingMapper;
import re21.ieun.upcycling.service.UpcyclingService;
import re21.ieun.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController         // @Controller 랑 @RestController 랑 무슨 차이인지 알아보기
@RequestMapping("/upcyclings")
@Validated
public class UpcyclingController {

    private final static String ANSWER_DEFAULT_URL = "/upcyclings";

    private final UpcyclingService upcyclingService;
    private final UpcyclingMapper upcyclingMapper;

    public UpcyclingController(UpcyclingService upcyclingService, UpcyclingMapper upcyclingMapper) {
        this.upcyclingService = upcyclingService;
        this.upcyclingMapper = upcyclingMapper;
    }


    @PostMapping
    public ResponseEntity<?> postUpcycling(@Valid @RequestBody UpcyclingPostDto upcyclingPostDto) {

       // memberService.findMember(upcyclingPostDto.getMemberId());

        Upcycling upcycling = upcyclingService.createUpcycling(upcyclingMapper.upcyclingPostDtoToUpcycling(upcyclingPostDto));
        URI location = UriCreator.createUri(ANSWER_DEFAULT_URL, upcycling.getId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{upcycling-id}")
    public ResponseEntity<?> patchAnswer(@PathVariable("upcycling-id") @Positive long upcyclingId,
                                         @Valid @RequestBody UpcyclingPatchDto upcyclingPatchDto) {

        upcyclingPatchDto.setId(upcyclingId);
        Upcycling upcycling = upcyclingService.updateUpcycling(upcyclingMapper.upcyclingPatchDtoToUpcycling(upcyclingPatchDto));

        return new ResponseEntity<>(upcyclingMapper.upcyclingToUpcyclingResponseDto(upcycling), HttpStatus.OK);
    }

    @GetMapping("/{upcycling-id}")
    public ResponseEntity<?> getAnswer(@PathVariable("upcycling-id") @Positive long upcyclingId) {

        Upcycling upcycling = upcyclingService.findVerifyUpcycling(upcyclingId);

        return new ResponseEntity<>(upcyclingMapper.upcyclingToUpcyclingResponseDto(upcycling), HttpStatus.OK);
    }

}

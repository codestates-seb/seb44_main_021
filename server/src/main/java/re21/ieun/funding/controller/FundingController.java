package re21.ieun.funding.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.dto.MultiResponseDto;
import re21.ieun.dto.SingleResponseDto;
import re21.ieun.funding.dto.FundingPatchDto;
import re21.ieun.funding.dto.FundingPostDto;
import re21.ieun.funding.dto.FundingResponseDto;
import re21.ieun.funding.entity.Funding;
import re21.ieun.funding.mapper.FundingMapper;
import re21.ieun.funding.service.FundingService;
import re21.ieun.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/funding")
@Validated
public class FundingController {

    private final static String FUNDING_DEFAULT_URL = "/funding";

    private final FundingService fundingService;
    private final FundingMapper fundingMapper;

    public FundingController(FundingService fundingService, FundingMapper fundingMapper) {
        this.fundingService = fundingService;
        this.fundingMapper = fundingMapper;
    }

    @PostMapping
    public ResponseEntity<?> postFunding(@Valid @RequestBody FundingPostDto fundingPostDto) {

        Funding funding = fundingService.createFunding(fundingMapper.fundingPostDtoToFunding(fundingPostDto));
        URI location = UriCreator.createUri(FUNDING_DEFAULT_URL, funding.getFundingId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{funding-id}")
    public ResponseEntity<?> patchFunding(@PathVariable("funding-id") @Positive long fundingId,
                                     @Valid @RequestBody FundingPatchDto fundingPatchDto) {

        fundingPatchDto.setFundingId(fundingId);
        Funding funding =
                fundingService.updateFunding(fundingMapper.fundingPatchDtoToFunding(fundingPatchDto));


        return new ResponseEntity<>(
                new SingleResponseDto<>(fundingMapper.fundingToFundingResponseDto(funding))
                , HttpStatus.OK);

    }

    @GetMapping("/{funding-id}")
    public ResponseEntity<?> getFunding(@PathVariable("funding-id") @Positive long fundingId) {

        Funding funding = fundingService.findFunding(fundingId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(fundingMapper.fundingToFundingResponseDto(funding)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getFundings() {

        List<FundingResponseDto> fundings = fundingService.findFundings();

        return new ResponseEntity<>(fundings, HttpStatus.OK);
    }


    /*      
    // 페이지네이션 -> 굳이 필요하진 않을 것 같음
    @GetMapping
    public ResponseEntity<?> getFundings(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size) {
        Page<Funding> pageFundings = fundingService.findFundings(page - 1, size);
        List<Funding> fundings = pageFundings.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(fundingMapper.fundingToFundingResponseDtos(fundings), pageFundings),
                HttpStatus.OK);

    }
     */

    @DeleteMapping("/{funding-id}")
    public ResponseEntity<?> cancelFunding(@PathVariable("funding-id") @Positive long fundingId) {

        fundingService.cancelFunding(fundingId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 특정 member 펀딩 내역, 페이지네이션
    @GetMapping("/member/{member-id}")
    public ResponseEntity<?> getMyFundingHistory(@PathVariable("member-id") @Positive long memberId,
                                                 @Positive @RequestParam int page,
                                                 @Positive @RequestParam int size) {
        Page<Funding> pageFundings = fundingService.getMyFundingHistoryByMemberId(memberId,page - 1, size);
        List<Funding> fundings = pageFundings.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(fundingMapper.fundingToFundingResponseDtos(fundings), pageFundings),
                HttpStatus.OK);

    }

}

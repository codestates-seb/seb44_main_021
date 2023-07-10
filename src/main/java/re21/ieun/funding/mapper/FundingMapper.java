package re21.ieun.funding.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import re21.ieun.funding.dto.*;
import re21.ieun.funding.entity.Funding;
import re21.ieun.funding.entity.FundingUpcycling;
import re21.ieun.funding.dto.FundingUpcyclingResponseDto;
import re21.ieun.member.entity.Member;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FundingMapper {

    @Mapping(target = "member", ignore = true)
    @Mapping(target = "upcycling", ignore = true)
    //@Mapping(target = "fundingHistory", ignore = true)
    Funding fundingPatchDtoToFunding(FundingPatchDto fundingPatchDto);

    List<FundingResponseDto> fundingToFundingResponseDtos(List<Funding> funding);

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "upcyclingId", target = "upcycling.upcyclingId")
    //@Mapping(target = "fundingHistory", ignore = true)
    Funding fundingPostDtoToFunding(FundingPostDto fundingPostDto);


    default FundingResponseDto fundingToFundingResponseDto(Funding funding) {
        FundingResponseDto fundingResponseDto = new FundingResponseDto();

        fundingResponseDto.setFundingId(funding.getFundingId());
        fundingResponseDto.setMember(funding.getMember());
        fundingResponseDto.setUpcycling(funding.getUpcycling());
        fundingResponseDto.setFundingStatus(funding.getFundingStatus());
        fundingResponseDto.setQuantity(funding.getQuantity());
        fundingResponseDto.setTotalReceivedQuantity(funding.getTotalReceivedQuantity());
        fundingResponseDto.setFundingDate(funding.getFundingDate());

        // Upcycling의 title 설정
        if (funding.getUpcycling() != null) {
            fundingResponseDto.setTitle(funding.getUpcycling().getTitle());
        }

        return fundingResponseDto;
    }

    /*
    default Funding fundingPostDtoToFunding(FundingPostDto fundingPostDto) {
        Funding funding = new Funding();
        Member member = new Member();
        member.setMemberId(fundingPostDto.getMemberId());

        List<FundingUpcycling> fundingUpcyclings = fundingPostDto.getFundingUpcyclings().stream()
                .map(fundingUpcyclingDto -> {
                    FundingUpcycling fundingUpcycling = new FundingUpcycling();
                    Upcycling upcycling = new Upcycling();
                    upcycling.setUpcyclingId(fundingUpcyclingDto.getUpcyclingId());
                    fundingUpcycling.addFunding(funding);
                    fundingUpcycling.addUpcycling(upcycling);
                    fundingUpcycling.setQuantity(fundingUpcyclingDto.getQuantity());
                    return fundingUpcycling;
                }).collect(Collectors.toList());
        funding.setMember(member);
        funding.setFundingUpcyclings(fundingUpcyclings);

        return funding;
    }

    default FundingResponseDto fundingToFundingResponseDto(Funding funding) {
        List<FundingUpcycling> fundingUpcyclings = funding.getFundingUpcyclings();

        FundingResponseDto fundingResponseDto = new FundingResponseDto();
        fundingResponseDto.setFundingId(funding.getFundingId());
        fundingResponseDto.setMember(funding.getMember());
        fundingResponseDto.setFundingStatus(funding.getFundingStatus());
        fundingResponseDto.setCreatedAt(funding.getCreatedAt());
        fundingResponseDto.setTotalReceivedQuantity(funding.getTotalReceivedQuantity()); // totalReceivedQuantity 매핑 추가
        fundingResponseDto.setFundingUpcyclings(
                fundingUpcyclingsToFundingUpcyclingResponseDtos(fundingUpcyclings)
        );

        return fundingResponseDto;
    }

    default List<FundingUpcyclingResponseDto> fundingUpcyclingsToFundingUpcyclingResponseDtos(
            List<FundingUpcycling> fundingUpcyclings) {

        return fundingUpcyclings
                .stream()
                .map(fundingUpcycling -> FundingUpcyclingResponseDto
                        .builder()
                        .upcyclingId(fundingUpcycling.getFunding().getFundingId())
                        .title(fundingUpcycling.getUpcycling().getTitle())
                        .quantity(fundingUpcycling.getQuantity())
                        .build())
                .collect(Collectors.toList());
    }

     */

}

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

    Funding fundingPatchDtoToFunding(FundingPatchDto fundingPatchDto);

    List<FundingResponseDto> fundingToFundingResponseDtos(List<Funding> funding);

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "upcyclingId", target = "upcycling.upcyclingId")
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

}

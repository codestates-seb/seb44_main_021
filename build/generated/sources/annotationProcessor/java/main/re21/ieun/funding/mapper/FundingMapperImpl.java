package re21.ieun.funding.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import re21.ieun.funding.dto.FundingPatchDto;
import re21.ieun.funding.dto.FundingResponseDto;
import re21.ieun.funding.entity.Funding;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-05T17:06:42+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class FundingMapperImpl implements FundingMapper {

    @Override
    public Funding fundingPatchDtoToFunding(FundingPatchDto fundingPatchDto) {
        if ( fundingPatchDto == null ) {
            return null;
        }

        Funding funding = new Funding();

        funding.setFundingId( fundingPatchDto.getFundingId() );
        funding.setFundingStatus( fundingPatchDto.getFundingStatus() );

        return funding;
    }

    @Override
    public List<FundingResponseDto> fundingToFundingResponseDtos(List<Funding> funding) {
        if ( funding == null ) {
            return null;
        }

        List<FundingResponseDto> list = new ArrayList<FundingResponseDto>( funding.size() );
        for ( Funding funding1 : funding ) {
            list.add( fundingToFundingResponseDto( funding1 ) );
        }

        return list;
    }
}

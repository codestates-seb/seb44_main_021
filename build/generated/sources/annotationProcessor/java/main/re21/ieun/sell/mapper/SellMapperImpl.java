package re21.ieun.sell.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import re21.ieun.member.entity.Member;
import re21.ieun.sell.dto.SellPatchDto;
import re21.ieun.sell.dto.SellPostDto;
import re21.ieun.sell.dto.SellResponseDto;
import re21.ieun.sell.entity.Sell;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-04T14:16:01+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class SellMapperImpl implements SellMapper {

    @Override
    public Sell sellPostDtoToSell(SellPostDto sellPostDto) {
        if ( sellPostDto == null ) {
            return null;
        }

        Sell sell = new Sell();

        sell.setMember( sellPostDtoToMember( sellPostDto ) );
        sell.setTitle( sellPostDto.getTitle() );
        sell.setContent( sellPostDto.getContent() );
        sell.setPrice( sellPostDto.getPrice() );
        sell.setViewCount( sellPostDto.getViewCount() );

        return sell;
    }

    @Override
    public Sell sellPatchDtoToSell(SellPatchDto sellPatchDto) {
        if ( sellPatchDto == null ) {
            return null;
        }

        Sell sell = new Sell();

        sell.setSellId( sellPatchDto.getSellId() );
        sell.setTitle( sellPatchDto.getTitle() );
        sell.setContent( sellPatchDto.getContent() );

        return sell;
    }

    @Override
    public SellResponseDto sellToSellResponseDto(Sell sell) {
        if ( sell == null ) {
            return null;
        }

        SellResponseDto sellResponseDto = new SellResponseDto();

        Long memberId = sellMemberMemberId( sell );
        if ( memberId != null ) {
            sellResponseDto.setMemberId( memberId );
        }
        sellResponseDto.setDisplayName( sellMemberDisplayName( sell ) );
        if ( sell.getSellId() != null ) {
            sellResponseDto.setSellId( sell.getSellId() );
        }
        sellResponseDto.setTitle( sell.getTitle() );
        sellResponseDto.setPrice( sell.getPrice() );
        sellResponseDto.setContent( sell.getContent() );
        if ( sell.getViewCount() != null ) {
            sellResponseDto.setViewCount( sell.getViewCount() );
        }

        return sellResponseDto;
    }

    @Override
    public List<SellResponseDto> sellToSellResponseDtos(List<Sell> sells) {
        if ( sells == null ) {
            return null;
        }

        List<SellResponseDto> list = new ArrayList<SellResponseDto>( sells.size() );
        for ( Sell sell : sells ) {
            list.add( sellToSellResponseDto( sell ) );
        }

        return list;
    }

    protected Member sellPostDtoToMember(SellPostDto sellPostDto) {
        if ( sellPostDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( sellPostDto.getMemberId() );

        return member;
    }

    private Long sellMemberMemberId(Sell sell) {
        if ( sell == null ) {
            return null;
        }
        Member member = sell.getMember();
        if ( member == null ) {
            return null;
        }
        Long memberId = member.getMemberId();
        if ( memberId == null ) {
            return null;
        }
        return memberId;
    }

    private String sellMemberDisplayName(Sell sell) {
        if ( sell == null ) {
            return null;
        }
        Member member = sell.getMember();
        if ( member == null ) {
            return null;
        }
        String displayName = member.getDisplayName();
        if ( displayName == null ) {
            return null;
        }
        return displayName;
    }
}

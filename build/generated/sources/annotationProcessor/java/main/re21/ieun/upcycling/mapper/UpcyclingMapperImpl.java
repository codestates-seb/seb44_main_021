package re21.ieun.upcycling.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import re21.ieun.category.entity.Category;
import re21.ieun.member.entity.Member;
import re21.ieun.upcycling.dto.UpcyclingPatchDto;
import re21.ieun.upcycling.dto.UpcyclingPostDto;
import re21.ieun.upcycling.dto.UpcyclingResponseDto;
import re21.ieun.upcycling.entity.Upcycling;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-04T22:39:07+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class UpcyclingMapperImpl implements UpcyclingMapper {

    @Override
    public Upcycling upcyclingPostDtoToUpcycling(UpcyclingPostDto upcyclingPostDto) {
        if ( upcyclingPostDto == null ) {
            return null;
        }

        Upcycling upcycling = new Upcycling();

        upcycling.setMember( upcyclingPostDtoToMember( upcyclingPostDto ) );
        upcycling.setTitle( upcyclingPostDto.getTitle() );
        upcycling.setContent( upcyclingPostDto.getContent() );
        upcycling.setCategory( map( upcyclingPostDto.getCategory() ) );
        upcycling.setViewCount( upcyclingPostDto.getViewCount() );

        return upcycling;
    }

    @Override
    public Upcycling upcyclingPatchDtoToUpcycling(UpcyclingPatchDto upcyclingPatchDto) {
        if ( upcyclingPatchDto == null ) {
            return null;
        }

        Upcycling upcycling = new Upcycling();

        upcycling.setUpcyclingId( upcyclingPatchDto.getUpcyclingId() );
        upcycling.setTitle( upcyclingPatchDto.getTitle() );
        upcycling.setContent( upcyclingPatchDto.getContent() );
        upcycling.setCategory( map( upcyclingPatchDto.getCategory() ) );

        return upcycling;
    }

    @Override
    public UpcyclingResponseDto upcyclingToUpcyclingResponseDto(Upcycling upcycling) {
        if ( upcycling == null ) {
            return null;
        }

        UpcyclingResponseDto upcyclingResponseDto = new UpcyclingResponseDto();

        Long memberId = upcyclingMemberMemberId( upcycling );
        if ( memberId != null ) {
            upcyclingResponseDto.setMemberId( memberId );
        }
        if ( upcycling.getUpcyclingId() != null ) {
            upcyclingResponseDto.setUpcyclingId( upcycling.getUpcyclingId() );
        }
        upcyclingResponseDto.setTitle( upcycling.getTitle() );
        upcyclingResponseDto.setContent( upcycling.getContent() );
        upcyclingResponseDto.setCategory( map( upcycling.getCategory() ) );
        if ( upcycling.getViewCount() != null ) {
            upcyclingResponseDto.setViewCount( upcycling.getViewCount() );
        }

        return upcyclingResponseDto;
    }

    @Override
    public List<UpcyclingResponseDto> upcyclingToUpcyclingResponseDtos(List<Upcycling> upcyclings) {
        if ( upcyclings == null ) {
            return null;
        }

        List<UpcyclingResponseDto> list = new ArrayList<UpcyclingResponseDto>( upcyclings.size() );
        for ( Upcycling upcycling : upcyclings ) {
            list.add( upcyclingToUpcyclingResponseDto( upcycling ) );
        }

        return list;
    }

    @Override
    public Category map(String value) {
        if ( value == null ) {
            return null;
        }

        Category category = new Category();

        return category;
    }

    @Override
    public String map(Category value) {
        if ( value == null ) {
            return null;
        }

        String string = new String();

        return string;
    }

    protected Member upcyclingPostDtoToMember(UpcyclingPostDto upcyclingPostDto) {
        if ( upcyclingPostDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( upcyclingPostDto.getMemberId() );

        return member;
    }

    private Long upcyclingMemberMemberId(Upcycling upcycling) {
        if ( upcycling == null ) {
            return null;
        }
        Member member = upcycling.getMember();
        if ( member == null ) {
            return null;
        }
        Long memberId = member.getMemberId();
        if ( memberId == null ) {
            return null;
        }
        return memberId;
    }
}

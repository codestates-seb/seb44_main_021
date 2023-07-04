package re21.ieun.member.mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import re21.ieun.member.dto.MemberDto.Patch;
import re21.ieun.member.dto.MemberDto.Response;
import re21.ieun.member.entity.Member;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-04T21:50:35+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPatchDtotoMember(Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( requestBody.getMemberId() );
        member.setDisplayName( requestBody.getDisplayName() );
        member.setPassword( requestBody.getPassword() );

        return member;
    }

    @Override
    public Response memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        long memberId = 0L;
        String email = null;
        String displayName = null;
        String memberRole = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        if ( member.getMemberId() != null ) {
            memberId = member.getMemberId();
        }
        email = member.getEmail();
        displayName = member.getDisplayName();
        if ( member.getMemberRole() != null ) {
            memberRole = member.getMemberRole().name();
        }
        createdAt = member.getCreatedAt();
        modifiedAt = member.getModifiedAt();

        Response response = new Response( memberId, email, displayName, memberRole, createdAt, modifiedAt );

        return response;
    }

    @Override
    public List<Response> membersToMemberResponseDtos(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberResponseDto( member ) );
        }

        return list;
    }
}

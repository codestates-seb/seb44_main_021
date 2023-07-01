package re21.ieun.member.mapper;

import org.mapstruct.Mapper;
import re21.ieun.member.dto.MemberDto;
import re21.ieun.member.entity.Member;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member memberPostDtotoMember(MemberDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setName( requestBody.getName() );
        member.setDisplayName( requestBody.getDisplayName() );
        member.setEmail( requestBody.getEmail() );
        member.setPassword( requestBody.getPassword() );
        member.setCategory( requestBody.getCategory() );
        if (member.getCategory() == null) {
            member.setMemberRole(Member.MemberRole.MEMBER_USER);
        } else member.setMemberRole(Member.MemberRole.MEMBER_ENGINEER);

        return member;
    }

    Member memberPatchDtotoMember(MemberDto.Patch requestBody);

    MemberDto.Response memberToMemberResponseDto(Member member);

    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);

}
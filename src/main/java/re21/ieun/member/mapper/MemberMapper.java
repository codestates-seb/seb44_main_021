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

        member.setDisplayName( requestBody.getDisplayName() );
        member.setEmail( requestBody.getEmail() );
        member.setPassword( requestBody.getPassword() );
        if(requestBody.getRole().equals("users")) {
            member.setMemberRole(Member.MemberRole.MEMBER_USER);
        }
        else member.setMemberRole(Member.MemberRole.MEMBER_UPCYCLER);
        return member;
    }
//
//    default Member memberPostDtotoMember1(MemberDto.Post requestBody) {
//        if ( requestBody == null ) {
//            return null;
//        }
//
//        Member member = new Member();
//
//        member.setDisplayName( requestBody.getDisplayName() );
//        member.setEmail( requestBody.getEmail() );
//        member.setPassword( requestBody.getPassword() );
//        member.setMemberRole(Member.MemberRole.MEMBER_UPCYCLER);
//
//        return member;
//    }

    Member memberPatchDtotoMember(MemberDto.Patch requestBody);

    MemberDto.Response memberToMemberResponseDto(Member member);

    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);

}
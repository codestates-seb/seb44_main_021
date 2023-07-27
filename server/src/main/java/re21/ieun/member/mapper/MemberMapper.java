package re21.ieun.member.mapper;

import org.mapstruct.Mapper;
import re21.ieun.member.dto.MemberDto;
import re21.ieun.member.entity.Member;

import java.time.LocalDateTime;
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
        member.setCode( requestBody.getCode());
        member.setNormalOrOauth("normal");
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

    default MemberDto.Response memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        long memberId = 0L;
        String email = null;
        String displayName = null;
        String memberRole = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;
        String thumbNailImage = null;
        String normalOrOauth = null;

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
        thumbNailImage = member.getThumbNailImage();
        normalOrOauth = member.getNormalOrOauth();

        MemberDto.Response response = new MemberDto.Response( memberId, email, displayName, memberRole, createdAt, modifiedAt, thumbNailImage, normalOrOauth );

        return response;
    }

    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);

}
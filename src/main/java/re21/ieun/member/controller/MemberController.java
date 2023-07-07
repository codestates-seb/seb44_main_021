package re21.ieun.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.dto.MultiResponseDto;
import re21.ieun.dto.SingleResponseDto;
import re21.ieun.member.dto.MemberDto;
import re21.ieun.member.mapper.MemberMapper;
import re21.ieun.member.entity.Member;
import re21.ieun.member.service.MemberService;
import re21.ieun.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }


    // todo: /members/upcycler 와 /members/users -> 하나의 url로 합치기 (POST axios localhost:8080/members/users data:{ role 이라는 필드를 받아서 -> 'user', 'upcycler' })

    // 사용자로 회원가입
    @PostMapping("/users")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberService.createMember(memberMapper.memberPostDtotoMember(requestBody));
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());
        return ResponseEntity.created(location).build();
    }

    // 업사이클러로 회원가입
    @PostMapping("/upcycler")
    public ResponseEntity postMember1(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberService.createMember(memberMapper.memberPostDtotoMember1(requestBody));
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping
    public ResponseEntity getMembers(@RequestParam int page, @RequestParam int size){

        Page<Member> pageMembers = memberService.findMembers(page-1,size);

        List<Member> members = pageMembers.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(memberMapper.membersToMemberResponseDtos(members),pageMembers),HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberResponseDto(member))
                , HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(memberMapper.memberPatchDtotoMember(requestBody));
        MemberDto.Response response = memberMapper.memberToMemberResponseDto(member);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}

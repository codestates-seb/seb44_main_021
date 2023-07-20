package re21.ieun.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import re21.ieun.dto.MultiResponseDto;
import re21.ieun.dto.SingleResponseDto;
import re21.ieun.email.EmailSenderResponse;
import re21.ieun.member.dto.EmailRequestDto;
import re21.ieun.member.dto.MemberDto;
import re21.ieun.member.mapper.MemberMapper;
import re21.ieun.member.entity.Member;
import re21.ieun.member.repository.MemberRepository;
import re21.ieun.member.service.MemberService;
import re21.ieun.utils.UriCreator;

import javax.mail.MessagingException;
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
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberController(MemberService memberService, MemberMapper memberMapper, MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/sendmail")
    public ResponseEntity sendVerificationEmail(@RequestBody EmailRequestDto emailRequestDto) throws MessagingException {
        String email = emailRequestDto.getEmail();

        if (memberService.verifiedMemberEmail(email)) {
            EmailSenderResponse response = new EmailSenderResponse();
            response.setIsactive(true);
            response.setMessage("이미 존재하는 이메일입니다.");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            // 이메일 인증 코드 생성 및 이메일 발송
            String verificationCode = memberService.sendVerificationEmail(email);

            EmailSenderResponse response = new EmailSenderResponse();
            response.setIsactive(false);
            response.setMessage(verificationCode);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }


    // 사용자로 회원가입
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberService.createMember(memberMapper.memberPostDtotoMember(requestBody));
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());
        return ResponseEntity.created(location).build();
    }

    @PostMapping("/verifiedpassword")
    public ResponseEntity<String> verifyPassword(@Valid @RequestBody MemberDto.Post1 requestBody) {
        // memberId와 password를 requestBody에서 가져온다
        long memberId = requestBody.getMemberId();
        String password = requestBody.getPassword();

        Member member = memberRepository.findById(memberId).orElse(null);

        if (member == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
        }

        // 입력된 비밀번호를 암호화하여 저장된 암호화된 비밀번호와 비교
        if (passwordEncoder.matches(password, member.getPassword())) {
            // password가 일치할 경우 "성공" 응답을 보낸다
            return ResponseEntity.ok("성공");
        } else {
            // password가 일치하지 않을 경우 "실패" 응답을 보낸다
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
        }
    }
//
//    // 업사이클러로 회원가입
//    @PostMapping("/upcycler")
//    public ResponseEntity postMember1(@Valid @RequestBody MemberDto.Post requestBody) {
//        Member member = memberService.createMember(memberMapper.memberPostDtotoMember1(requestBody));
//        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());
//
//        return ResponseEntity.created(location).build();
//    }

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

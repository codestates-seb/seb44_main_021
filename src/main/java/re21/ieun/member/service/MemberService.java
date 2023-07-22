package re21.ieun.member.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import re21.ieun.auth.utils.CustomAuthorityUtils;
import re21.ieun.email.EmailSender;
import re21.ieun.email.RandomGenerator;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.member.entity.VerificationCode;
import re21.ieun.member.mapper.MemberMapper;
import re21.ieun.member.repository.MemberRepository;
import re21.ieun.member.entity.Member;
import re21.ieun.member.repository.VerificationCodeRepository;

import javax.mail.AuthenticationFailedException;
import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final EmailSender emailSender;
    private final VerificationCodeRepository verificationCodeRepository;

    public MemberService(MemberRepository memberRepository, MemberMapper memberMapper, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, EmailSender emailSender, VerificationCodeRepository verificationCodeRepository) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.emailSender = emailSender;
        this.verificationCodeRepository = verificationCodeRepository;
    }

    public Member createMember(Member member) {
        //todo:보안 비밀번호 암호화는 추후 추가예정

        VerificationCode verificationCode = verificationCodeRepository.findByCode(member.getCode());

        if (verificationCode == null) {
            throw new BusinessLogicException(ExceptionCode.INVALID_VERIFICATION_CODE);
        }

        if (!verificationCode.getEmail().equals(member.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_VERIFICATION_CODE);
        }


        verifyExistsEmail(member.getEmail());
        verifyExistsDisplayName(member.getDisplayName());

        // 추가: Password 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // 추가: DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        // Delete the verification code after successful registration
        verificationCodeRepository.deleteByCode(member.getCode());

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findMember(member.getMemberId());
        findMember.setDisplayName(member.getDisplayName());
        if (!StringUtils.isEmpty(member.getPassword())) {
            String encryptedPassword = passwordEncoder.encode(member.getPassword());
            findMember.setPassword(encryptedPassword);
        }
        if(!StringUtils.isEmpty(member.getThumbNailImage())) {
            findMember.setThumbNailImage(member.getThumbNailImage());
        }
        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        Member findMember = memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public void deleteMember(long memberId) {
        Member findMember = findMember(memberId);
        memberRepository.deleteById(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public Member verifyExistsEmail(String email) {
//        Optional<Member> member = memberRepository.findByEmail(email);
//        if (member.isPresent()) throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
        return memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsDisplayName(String displayName) {
        Optional<Member> member = memberRepository.findByDisplayName(displayName);
        if (member.isPresent()) throw new BusinessLogicException(ExceptionCode.DISPLAYNAME_EXISTS);
    }
//    public void deleteVerificationCode(long verifiactionId) {
//
//        memberRepository.deleteById(verifiactionId);
//    }
//    public VerificationCode findVerificationCode(long verificationId) {
//        VerificationCode findVerificationCode = verificationCodeRepository.findById(verificationId).orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//        return findVerificationCode;
//    }


//
//    private void verifyCode(String code) {
//        Optional<VerificationCode> verificationCode = verificationCodeRepository.findByCode(code);
//        if ( code == verificationCode)
//
//    }

    public String sendVerificationEmail(String email) throws MessagingException {
        // Verification Code 생성
        String verificationCode = RandomGenerator.generateRandomCode(6);

        VerificationCode codeEntity = new VerificationCode();
        codeEntity.setEmail(email);
        codeEntity.setCode(verificationCode);
        verificationCodeRepository.save(codeEntity);

            // 이메일 인증 메일 발송
            try {
                emailSender.sendVerificationEmail(email, verificationCode);
        } catch (AuthenticationFailedException e) {
            // 메일 발신 계정의 정보가 잘못된 경우 처리

            throw new MessagingException("Authentication failed. Check your username and password.", e);
        } catch (SendFailedException e) {
            // 수신자의 이메일 주소가 유효하지 않거나 도달할 수 없는 경우 처리

            throw new MessagingException("Failed to send email to recipient.", e);
        } catch (MessagingException e) {
            // SMTP 서버와의 통신 문제나 메일 전송 중에 예기치 않은 오류가 발생할 경우 처리

            throw new MessagingException("Error sending email.", e);
        }

        return verificationCode;
    }

    // 이메일 중복 체크
    @Transactional(readOnly = true)
    public boolean verifiedMemberEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

}

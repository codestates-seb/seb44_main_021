package re21.ieun.member.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import re21.ieun.auth.utils.CustomAuthorityUtils;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.member.mapper.MemberMapper;
import re21.ieun.member.repository.MemberRepository;
import re21.ieun.member.entity.Member;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository, MemberMapper memberMapper,
                         PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member) {
        //todo:보안 비밀번호 암호화는 추후 추가예정

        verifyExistsEmail(member.getEmail());
        verifyExistsDisplayName(member.getDisplayName());

        // 추가: Password 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // 추가: DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findMember(member.getMemberId());
        findMember.setDisplayName(member.getDisplayName());
        if (!StringUtils.isEmpty(member.getPassword())) {
            String encryptedPassword = passwordEncoder.encode(member.getPassword());
            findMember.setPassword(encryptedPassword);
        }
        findMember.setThumbNailImage(member.getThumbNailImage());
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

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
    }

    private void verifyExistsDisplayName(String displayName) {
        Optional<Member> member = memberRepository.findByDisplayName(displayName);
        if (member.isPresent()) throw new BusinessLogicException(ExceptionCode.DISPLAYNAME_EXISTS);
    }
}

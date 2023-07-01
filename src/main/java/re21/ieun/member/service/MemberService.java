package re21.ieun.member.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.member.mapper.MemberMapper;
import re21.ieun.member.repository.MemberRepository;
import re21.ieun.member.entity.Member;

import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    public MemberService( MemberRepository memberRepository, MemberMapper memberMapper) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;
    }

    public Member createMember(Member member) {
        //todo:보안 비밀번호 암호화는 추후 추가예정

        return memberRepository.save(member);
    }


}

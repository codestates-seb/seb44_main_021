package re21.ieun.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import re21.ieun.member.entity.Member;


public interface MemberRepository extends JpaRepository<Member, Long> {

}

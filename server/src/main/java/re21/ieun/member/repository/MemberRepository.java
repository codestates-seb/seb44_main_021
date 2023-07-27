package re21.ieun.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import re21.ieun.member.entity.Member;

import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<Member> findByDisplayName(String displayName);


}

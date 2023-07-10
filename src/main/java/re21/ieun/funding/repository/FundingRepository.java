package re21.ieun.funding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.funding.entity.Funding;
import re21.ieun.member.entity.Member;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.Optional;

@Repository
public interface FundingRepository extends JpaRepository<Funding, Long> {
    Optional<Funding> findByMemberAndUpcycling(Member member, Upcycling upcycling);
}

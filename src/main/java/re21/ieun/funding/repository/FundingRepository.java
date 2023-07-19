package re21.ieun.funding.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.funding.entity.Funding;
import re21.ieun.member.entity.Member;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;

@Repository
public interface FundingRepository extends JpaRepository<Funding, Long> {

    // 한 업사이클러 펀딩 리스트
    List<Funding> findByUpcycling(Upcycling upcycling);

    // 특정 member 펀딩 리스트
    Page<Funding> findByMember(Member member, Pageable pageable);

    List<Funding> findByUpcyclingUpcyclingId(long upcyclingId);
}

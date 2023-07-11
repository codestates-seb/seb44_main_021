package re21.ieun.upcycling.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.category.entity.Category;
import re21.ieun.member.entity.Member;
import re21.ieun.funding.entity.Funding;
import re21.ieun.member.entity.Member;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;

@Repository
public interface UpcyclingRepository extends JpaRepository<Upcycling, Long> {

    // 업사이클러 게시글 검색 기능
    List<Upcycling> findByTitleContaining(String searchKeyword);

    Page<Upcycling> findByCategory(Category category, Pageable pageable);

    // 특정 member 업사이클링 펀딩 등록 리스트
    Page<Upcycling> findByMember(Member member, Pageable pageable);
}

package re21.ieun.upcycling.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.category.entity.Category;
import re21.ieun.member.entity.Member;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;

@Repository
public interface UpcyclingRepository extends JpaRepository<Upcycling, Long> {

    List<Upcycling> findByTitleContaining(String searchKeyword);

    Page<Upcycling> findByCategory(Category category, Pageable pageable);

}

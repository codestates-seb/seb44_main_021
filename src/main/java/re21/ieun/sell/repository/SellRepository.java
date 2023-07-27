package re21.ieun.sell.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.category.entity.Category;
import re21.ieun.member.entity.Member;
import re21.ieun.sell.entity.Sell;
import re21.ieun.sellcategory.entity.SellCategory;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;

@Repository
public interface SellRepository extends JpaRepository<Sell, Long> {

    // 상품 게시글 검색 기능
    Page<Sell> findByTitleContaining(String searchKeyword, Pageable pageable);

    Page<Sell> findBySellCategory(SellCategory sellcategory, Pageable pageable);

    Page<Sell> findByMember(Member member, Pageable pageable);

    // 상품 게시글 검색 기능 + 카테고리
    Page<Sell> findByTitleContainingAndSellCategory(String searchKeyword, SellCategory sellCategory, Pageable pageable);
}

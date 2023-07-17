package re21.ieun.sell.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.category.entity.Category;
import re21.ieun.sell.entity.Sell;
import re21.ieun.sellcategory.entity.SellCategory;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;

@Repository
public interface SellRepository extends JpaRepository<Sell, Long> {
    List<Sell> findByTitleContaining(String searchKeyword);
    Page<Sell> findBySellCategory(SellCategory sellcategory, Pageable pageable);
}

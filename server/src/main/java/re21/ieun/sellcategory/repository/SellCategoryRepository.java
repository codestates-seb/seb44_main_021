package re21.ieun.sellcategory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import re21.ieun.sellcategory.entity.SellCategory;

public interface SellCategoryRepository extends JpaRepository<SellCategory, Long> {
}

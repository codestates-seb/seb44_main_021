package re21.ieun.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import re21.ieun.category.entity.Category;
import re21.ieun.upcycling.entity.Upcycling;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}

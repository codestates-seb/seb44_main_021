package re21.ieun.sell.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.sell.entity.Sell;

import java.util.List;

@Repository
public interface SellRepository extends JpaRepository<Sell, Long> {

    List<Sell> findByTitleContaining(String searchKeyword);
}

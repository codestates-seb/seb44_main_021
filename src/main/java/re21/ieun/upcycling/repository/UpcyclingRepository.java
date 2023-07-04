package re21.ieun.upcycling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;

@Repository
public interface UpcyclingRepository extends JpaRepository<Upcycling, Long> {

    List<Upcycling> findByTitleContaining(String searchKeyword);

}

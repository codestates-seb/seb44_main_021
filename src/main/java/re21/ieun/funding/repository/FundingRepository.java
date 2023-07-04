package re21.ieun.funding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.funding.entity.Funding;

@Repository
public interface FundingRepository extends JpaRepository<Funding, Long> {

}
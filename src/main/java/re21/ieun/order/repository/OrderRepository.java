package re21.ieun.order.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.order.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    //@EntityGraph(attributePaths = {"orderSells", "orderSells.sell", "orderProducts.option", "orderProducts.product.seller.member"})
    Page<Order> findOrderByMemberId(Long memberId, Pageable pageable);
}

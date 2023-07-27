package re21.ieun.order.repository;

import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.funding.entity.Funding;
import re21.ieun.member.entity.Member;
import re21.ieun.order.entity.Order;
import re21.ieun.sell.entity.Sell;
import re21.ieun.upcycling.entity.Upcycling;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {


    /*
    List<Order> findBySell(Sell sell);


     */
    Page<Order> findByMember(Member member, Pageable pageable);

    //@EntityGraph(attributePaths = {"orderSells", "orderSells.sell", "orderProducts.option", "orderProducts.product.seller.member"})
    //Page<Order> findOrderByMemberId(Long memberId, Pageable pageable);
}

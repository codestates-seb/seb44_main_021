package re21.ieun.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import re21.ieun.order.entity.Order;
import re21.ieun.order.entity.OrderSell;

@Repository
public interface OrderSellRepository extends JpaRepository<OrderSell, Long> {

}

package re21.ieun.order.entity;

import lombok.*;
import re21.ieun.audit.Auditable;
import re21.ieun.member.entity.Member;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "ORDERS")
public class Order extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @ManyToOne  // (fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    private List<OrderSell> orderSells = new ArrayList<>();

    public void setMember(Member member) {
        this.member = member;
    }

    /*
    public void addOrderSell(OrderSell orderSells) {
        this.orderSells.addAll(List.of(orderSells));
    }

    public void addOrderSell(List<OrderSell> orderSells) {
        this.orderSells.addAll(orderSells);
    }

     */

    public void updateOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }
}

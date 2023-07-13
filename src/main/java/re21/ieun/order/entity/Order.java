package re21.ieun.order.entity;

import lombok.*;
import re21.ieun.audit.Auditable;
import re21.ieun.member.entity.Member;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Order extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    private final List<OrderSell> orderSells = new ArrayList<>();

    public void setMember(Member member) {
        this.member = member;
    }

    public void addOrderSell(OrderSell orderSells) {
        this.orderSells.addAll(List.of(orderSells));
    }

    public void addOrderSell(List<OrderSell> orderSells) {
        this.orderSells.addAll(orderSells);
    }

    public void updateOrderStatus(OrderStatus orderStatus) {
        this.status = orderStatus;
    }
}

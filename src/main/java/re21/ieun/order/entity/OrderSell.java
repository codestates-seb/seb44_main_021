package re21.ieun.order.entity;


import lombok.*;
import re21.ieun.audit.Auditable;
import re21.ieun.sell.entity.Sell;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class OrderSell extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderSellId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sell_id")
    private Sell sell;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;


    public void addOrder(Order order) {
        this.order = order;
    }

    public void addSell(Sell sell) {
        this.sell = sell;
    }



}

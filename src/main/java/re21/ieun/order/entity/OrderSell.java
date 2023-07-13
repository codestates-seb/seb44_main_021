package re21.ieun.order.entity;


import lombok.*;
import re21.ieun.audit.Auditable;
import re21.ieun.sell.entity.Sell;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class OrderSell extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderSellId;

    @Column(nullable = false)
    private Integer quantity;


    @ManyToOne  //(fetch = FetchType.LAZY)
    @JoinColumn(name = "SELL_ID")
    private Sell sell;


    @ManyToOne  //(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID")
    private Order order;


    public void addOrder(Order order) {
        this.order = order;
    }

    public void addSell(Sell sell) {
        this.sell = sell;
    }



}

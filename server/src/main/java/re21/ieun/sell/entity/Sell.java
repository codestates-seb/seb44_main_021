package re21.ieun.sell.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;
import re21.ieun.member.entity.Member;
import re21.ieun.order.entity.OrderSell;
import re21.ieun.sellcategory.entity.SellCategory;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "SELL")
public class Sell extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sellId;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private String material;

    // 상품 가격
    @Column(nullable = false)
    private int price;
    @Column
    private String thumbNailImage;
    @Column
    private String contentImage;

    @Column(columnDefinition = "bigint default 0", nullable = false)
    private Long viewCount;

    @ManyToOne
    @JoinColumn(name = "sellCategory_id")
    private SellCategory sellCategory;

    @OneToMany(mappedBy = "sell")
    private List<OrderSell> orderSells = new ArrayList<>();

    public void addOrderSell(OrderSell orderSell) {
        this.orderSells.add(orderSell);
        if (orderSell.getSell() != this) {
            orderSell.addSell(this);
        }
    }

    public enum SellStatus {

        SELL_REGISTRATION("판매 제품 등록"),
        SELL_DELETE("판매 제품 삭제");

        @Getter
        private final String status;

        SellStatus(String status) {this.status = status;}
    }

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SellStatus sellStatus = SellStatus.SELL_REGISTRATION;
}

package re21.ieun.sell.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;
import re21.ieun.member.entity.Member;

import javax.persistence.*;

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
    private int price;

    @Column(columnDefinition = "long default 0", nullable = false)
    private Long viewCount;


    // like(좋아요)

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

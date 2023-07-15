package re21.ieun.upcycling.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;
import re21.ieun.category.entity.Category;
import re21.ieun.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "UPCYCLING")
public class Upcycling extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long upcyclingId;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    // 총 펀딩 수량
    @Column(nullable = false)
    private int totalQuantity;


    // contentImg 만들어지면 생성
    //private String contentImg;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column
    private int totalReceivedQuantity;

    public int getTotalReceivedQuantity() {
        return totalReceivedQuantity;
    }

    public void setTotalReceivedQuantity(int totalReceivedQuantity) {
        this.totalReceivedQuantity = totalReceivedQuantity;
    }


    // Upcycling View(조회수)
    @Column(columnDefinition = "bigint default 0", nullable = false)
    private Long viewCount;

    @Column
    private String thumbNailImage;


    // 업사이클링 마감일
    @Column(nullable = false)
    private LocalDate deadline;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UpcyclingStatus upcyclingStatus = UpcyclingStatus.UPCYCLING_REGISTRATION;

    // 업사이클링 제품 상태
    public enum UpcyclingStatus {
        UPCYCLING_REGISTRATION("업사이클링 제품 등록"),
        UPCYCLING_DELETE("업사이클링 제품 삭제");

        @Getter
        private final String status;

        UpcyclingStatus(String status) {
            this.status = status;
        }

    }

}

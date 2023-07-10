package re21.ieun.upcycling.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import re21.ieun.audit.Auditable;
import re21.ieun.funding.entity.Funding;
import re21.ieun.funding.entity.FundingUpcycling;
import re21.ieun.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    // category 만들어지면 생성
    //private String category;


    // Upcycling View(조회수)
    @Column(columnDefinition = "long default 0", nullable = false)
    private Long viewCount;


    // like(좋아요)


    // 업사이클링 마감일
    @Column(nullable = false)
    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    /*
    // FundingUpcycling 과 일대다 관계
    @OneToMany(mappedBy = "upcycling")
    private List<FundingUpcycling> fundingUpcyclings = new ArrayList<>();

    public void addFundingUpcycling(FundingUpcycling fundingUpcycling) {
        this.fundingUpcyclings.add(fundingUpcycling);
        if (fundingUpcycling.getUpcycling() != this) {
            fundingUpcycling.addUpcycling(this);
        }
    }

     */

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

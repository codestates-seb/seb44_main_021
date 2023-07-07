package re21.ieun.funding.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;
import re21.ieun.member.entity.Member;
import re21.ieun.upcycling.entity.Upcycling;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "FUNDING")
public class Funding extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fundingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "funding", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FundingUpcycling> fundingUpcyclings = new ArrayList<>();


    // 총 펀딩 받은 수량
    @Column(nullable = false)
    private int totalReceivedQuantity;

    @Enumerated(EnumType.STRING)
    private FundingStatus fundingStatus = FundingStatus.FUNDING_REQUEST;

    public enum FundingStatus {
        FUNDING_REQUEST(1, "펀딩 요청"),
        FUNDING_APPLICATION_COMPLETE(2, "펀딩 신청 완료"),
        FUNDING_SENDING(3, "펀딩 물품 보내는 중"),
        FUNDING_CANCEL(4, "펀딩 취소"),
        FUNDING_END(5, "펀딩 종료");

        @Getter
        private int stepNumber;

        @Getter
        private String stepDescription;

        FundingStatus(int stepNumber, String stepDescription) {
            this.stepNumber = stepNumber;
            this.stepDescription = stepDescription;
        }
    }

}
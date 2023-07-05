package re21.ieun.funding.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;
import re21.ieun.member.entity.Member;

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

    //@Column(nullable = false)
    //private Long quantity;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    @OneToMany(mappedBy = "funding", cascade = CascadeType.ALL)
    private List<FundingUpcycling> fundingUpcyclings = new ArrayList<>();

    /*
    public void addOrderProduct(FundingUpcycling fundingUpcycling) {
        this.fundingUpcyclings.addAll(List.of(fundingUpcycling));
    }

    public void addOrderProduct(List<FundingUpcycling> fundingUpcyclings) {
        this.fundingUpcyclings.addAll(fundingUpcyclings);
    }

     */

    @Enumerated(EnumType.STRING)
    private FundingStatus fundingStatus = FundingStatus.FUNDING_REQUEST;

    public enum FundingStatus {
        FUNDING_REQUEST(1, "펀딩 요청"),
        FUNDING_APPLICATION_COMPLETE(2, "펀딩 신청 완료"),
        FUNDING_SENDING(3, "펀딩 물품 보내는 중"),
        FUNDING_CANCEL(4, "펀딩 취소");

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
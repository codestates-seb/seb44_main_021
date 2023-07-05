package re21.ieun.funding.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;
import re21.ieun.upcycling.entity.Upcycling;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class FundingUpcycling extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long FundingUpcyclingId;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "FUNDING_ID", referencedColumnName = "fundingId")
    private Funding funding;

    @ManyToOne
    @JoinColumn(name = "UPCYCLING_ID")
    private Upcycling upcycling;


    // 양방향 관계 설정
    public void addFunding(Funding funding) {
        this.funding = funding;
        if (!this.funding.getFundingUpcyclings().contains(this)) {
            this.funding.getFundingUpcyclings().add(this);
        }
    }

    public void addUpcycling(Upcycling upcycling) {
        this.upcycling = upcycling;
        if (!this.upcycling.getFundingUpcyclings().contains(this)) {
            this.upcycling.addFundingUpcycling(this);
        }
    }
}

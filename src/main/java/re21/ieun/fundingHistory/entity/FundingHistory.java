package re21.ieun.fundingHistory.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;
import re21.ieun.funding.entity.Funding;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "FUNDINGHISTORY")
public class FundingHistory extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fundingHistoryId;

    @OneToOne
    @JoinColumn(name = "funding_id")
    private Funding funding;

}

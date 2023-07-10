package re21.ieun.funding.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.funding.entity.Funding;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class FundingPatchDto {

    @Positive
    private long fundingId;

    @Positive
    private int quantity;

    private Funding.FundingStatus fundingStatus;

}

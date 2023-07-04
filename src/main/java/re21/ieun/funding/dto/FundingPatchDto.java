package re21.ieun.funding.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.funding.entity.Funding;

@Getter
@Setter
@NoArgsConstructor
public class FundingPatchDto {

    private long fundingId;
    private Funding.FundingStatus fundingStatus;

}

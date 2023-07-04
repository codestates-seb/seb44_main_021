package re21.ieun.funding.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class FundingUpcyclingDto {

    @Positive
    private long upcyclingId;

    @Positive
    private long quantity;

}

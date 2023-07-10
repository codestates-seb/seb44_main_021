package re21.ieun.fundingHistory.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FundingHistoryDto {

    private long upcyclingId;

    private String title;

    // category 만들어지면 생성
    //private String category;

    private int quantity;

}

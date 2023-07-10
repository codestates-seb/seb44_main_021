package re21.ieun.fundingHistory.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class FundingHistoryDto {

    private long upcyclingId;

    private LocalDateTime fundingDate;

    private String title;

    // category 만들어지면 생성
    //private String category;

    private int quantity;

}

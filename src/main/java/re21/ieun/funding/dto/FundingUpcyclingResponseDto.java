package re21.ieun.funding.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class FundingUpcyclingResponseDto {

    private long upcyclingId;

    private String title;

    // category 만들어지면 생성
    //private String category;

    private long quantity;      // 추가적인 부분

}

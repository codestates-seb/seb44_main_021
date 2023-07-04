package re21.ieun.funding.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor         // @NoArgsConstructor 랑 @Builder랑 같이 쓰면 왜 오류??
public class FundingUpcyclingResponseDto {

    private long upcyclingId;

    private String title;

    // category 만들어지면 생성
    //private String category;

    private int quantity;

}

package re21.ieun.sell.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class SellResponseDto {

    @Positive
    private long memberId;

    private long sellId;

    private String displayName;

    private String title;

    private String content;

    private int price;

    private long sellCategoryId;

    private String sellCategoryName;


    private long viewCount;
}

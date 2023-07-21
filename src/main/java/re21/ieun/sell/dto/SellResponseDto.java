package re21.ieun.sell.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

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

    private String contentImage;

    private String thumbNailImage;

    private String material;

    private long viewCount;

    // 등록 날짜
    private LocalDateTime createdAt;
}

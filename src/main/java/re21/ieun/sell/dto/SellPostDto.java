package re21.ieun.sell.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.sell.entity.Sell;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class SellPostDto {

    @Positive
    private long memberId;

    @Positive
    private long sellCategoryId;

    @NotBlank(message = "제목을 작성해주세요.")
    private String title;

    @NotBlank(message = "내용을 작성해주세요.")
    private String content;

    @NotBlank(message = "가격을 입력해주세요.")
    private int price;
    @NotBlank
    private String material;

    private String thumbNailImage;

    private String contentImage;
    @Positive
    private long viewCount;

}

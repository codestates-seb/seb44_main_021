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
public class SellPostDto extends Sell {

    @Positive
    private long memberId;

    @NotBlank(message = "닉네임을 작성해주세요.")
    private String displayName;

    @NotBlank(message = "제목을 작성해주세요.")
    private String title;

    @NotBlank(message = "내용을 작성해주세요.")
    private String content;

    @Positive
    private long viewCount;

}

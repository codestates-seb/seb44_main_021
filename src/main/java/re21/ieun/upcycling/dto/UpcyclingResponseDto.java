package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.category.entity.Category;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class UpcyclingResponseDto {

    @Positive
    private long memberId;

    private long upcyclingId;

    private String displayName;

    private String title;

    private String content;
    // 이미지가 구축이되면
    //private String contentImg;
    private long categoryId;
    private String categoryName;

    // view(조회수)
    private long viewCount;

}

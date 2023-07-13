package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.category.entity.Category;

import javax.persistence.Column;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

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

    // 총 펀딩 수량
    private int totalQuantity;


    // 이미지가 구축이되면
    //private String contentImg;
    private long categoryId;
    private String categoryName;

    // Upcycling 마감일
    private LocalDateTime deadline;

    // view(조회수)
    private long viewCount;

}
package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.category.entity.Category;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UpcyclingPostDto {

    @Positive
    private long memberId;
    @Positive
    private long categoryId;


    @NotBlank(message = "제목을 작성해주세요.")
    private String title;

    @NotBlank(message = "내용을 작성해주세요.")
    private String content;

    // 총 펀딩 수량
    @NotBlank(message = "수량을 작성해주세요.")
    private int totalQuantity;

    // 이미지가 구축이되면
    //private String contentImg;

    // category 만들어지면 생성
    //private String category;

    // Upcycling 마감일
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime deadline;

    // view(조회수)
    @Positive
    private long viewCount;

}

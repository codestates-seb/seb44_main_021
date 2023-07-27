package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDate;

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
    @Positive(message = "수량은 작성해주세요.")
    private int totalQuantity;

    private String thumbNailImage;


    // Upcycling 마감일
    @DateTimeFormat(pattern = "yyyy-MM-dd") //'T'HH:mm:ss
    private LocalDate deadline;

    // view(조회수)
    @Positive
    private long viewCount;

}

package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class UpcyclingPostDto {

    @Positive
    private long memberId;


    @NotBlank(message = "제목을 작성해주세요.")
    private String title;

    @NotBlank(message = "내용을 작성해주세요.")
    private String content;
    @NotBlank
    private String category;

    // 이미지가 구축이되면
    //private String contentImg;

    // view(조회수)
    @Positive
    private long viewCount;

}

package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
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

    // 총 펀딩 수량
    @NotBlank(message = "수량을 작성해주세요.")
    private long quantity;

    // 이미지가 구축이되면
    //private String contentImg;

    // category 만들어지면 생성
    //private String category;


    // view(조회수)
    @Positive
    private long viewCount;

}

package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class UpcyclingPatchDto {

    private Long id;

    @NotBlank(message = "제목을 작성해주세요.")
    private String title;

    @NotBlank(message = "내용을 작성해주세요.")
    private String content;


    // 이미지가 구축이되면
    //private String contentImg;

    // category 만들어지면 생성
    //private String category;

}

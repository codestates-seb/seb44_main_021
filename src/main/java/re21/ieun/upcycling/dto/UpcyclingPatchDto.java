package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.category.entity.Category;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class UpcyclingPatchDto {

    private long upcyclingId;

    @NotBlank(message = "제목을 작성해주세요.")
    private String title;

    @NotBlank(message = "내용을 작성해주세요.")
    private String content;

    // 이미지가 구축이되면
    //private String contentImg;

}

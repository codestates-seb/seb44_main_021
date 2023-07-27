package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.category.entity.Category;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UpcyclingPatchDto {

    private long upcyclingId;

    @NotBlank(message = "제목을 작성해주세요.")
    private String title;

    @NotBlank(message = "내용을 작성해주세요.")
    private String content;

    @NotBlank(message = "수량을 작성해주세요.")
    private int totalQuantity;


    // 이미지가 구축이되면
    //private String contentImg;

    // category 만들어지면 생성
    //private String category;


    // Upcycling 마감일
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;

}

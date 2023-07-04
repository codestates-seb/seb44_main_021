package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private int totalQuantity;


    // 이미지가 구축이되면
    //private String contentImg;

    // category 만들어지면 생성
    //private String category;

    // view(조회수)
    private long viewCount;

}

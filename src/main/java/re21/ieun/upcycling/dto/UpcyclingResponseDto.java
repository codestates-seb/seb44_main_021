package re21.ieun.upcycling.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    // 총 펀딩 받은 수량
    private int totalReceivedQuantity;


    // 이미지가 구축이되면
    //private String contentImg;

    // category 만들어지면 생성
    //private String category;

    // Upcycling 마감일
    private LocalDateTime deadline;

    // view(조회수)
    private long viewCount;

}

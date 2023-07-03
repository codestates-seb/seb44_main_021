package re21.ieun.upcycling.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;
import re21.ieun.member.entity.Member;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "UPCYCLING")
public class Upcycling extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false, unique = true)
    private String displayName;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    //@Column(nullable = false)
    //private Long quantity;              // 사용자가 펀딩할 수량


    // contentImg 만들어지면 생성
    //private String contentImg;

    // category 만들어지면 생성
    //private String category;


    // Upcycling View(조회수)
    @Column(columnDefinition = "long default 0", nullable = false)
    private Long viewCount;


    // like(좋아요)


    //@ManyToOne
    //@JoinColumn(name = "MEMBER_ID")
    //private Member member;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UpcyclingStatus upcyclingStatus = UpcyclingStatus.UPCYCLING_REGISTRATION;

    // 업사이클링 제품 상태
    public enum UpcyclingStatus {
        UPCYCLING_REGISTRATION("업사이클링 제품 등록"),
        UPCYCLING_DELETE("업사이클링 제품 삭제");

        @Getter
        private final String status;

        UpcyclingStatus(String status) {
            this.status = status;
        }

    }

}

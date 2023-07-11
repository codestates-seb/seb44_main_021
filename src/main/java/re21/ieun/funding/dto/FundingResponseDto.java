package re21.ieun.funding.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.funding.entity.Funding;
import re21.ieun.member.entity.Member;
import re21.ieun.upcycling.entity.Upcycling;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class FundingResponseDto {

    private long fundingId;

    @Setter(AccessLevel.NONE)       // AccessLevel : 접근권한
    private long memberId;

    @Setter(AccessLevel.NONE)
    private long upcyclingId;

    @Setter(AccessLevel.NONE)
    private String title;

    private int quantity;

    private Funding.FundingStatus fundingStatus;

    private int totalReceivedQuantity;

    private LocalDateTime fundingDate;      // createAt

    public void setMember(Member member) {
        this.memberId = member.getMemberId();
    }

    public void setUpcycling(Upcycling upcycling) {
        this.upcyclingId = upcycling.getUpcyclingId();
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

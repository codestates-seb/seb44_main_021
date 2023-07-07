package re21.ieun.funding.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.funding.entity.Funding;
import re21.ieun.member.entity.Member;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class FundingResponseDto {

    private long fundingId;

    @Setter(AccessLevel.NONE)       // AccessLevel : 접근권한
    private long memberId;

    private Funding.FundingStatus fundingStatus;

    private List<FundingUpcyclingResponseDto> fundingUpcyclings;

    private int totalReceivedQuantity;

    private LocalDateTime createdAt;

    public void setMember(Member member) {
        this.memberId = member.getMemberId();
    }

}

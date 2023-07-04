package re21.ieun.funding.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.member.entity.Member;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class FundingPostDto {

    @Positive
    private long memberId;

    //@Valid
    @NotNull(message = "펀딩할 업사이클링 정보는 필수입니다.")
    private List<FundingUpcyclingDto> fundingUpcyclings;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}

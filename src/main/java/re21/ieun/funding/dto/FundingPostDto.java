package re21.ieun.funding.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.member.entity.Member;
import re21.ieun.upcycling.entity.Upcycling;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class FundingPostDto {

    @Positive
    private long memberId;

    @Positive
    private long upcyclingId;

    @Positive
    private int quantity;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }

    public Upcycling getUpcycling() {
        Upcycling upcycling = new Upcycling();
        upcycling.setUpcyclingId(upcyclingId);
        return upcycling;
    }
}

package re21.ieun.order.dto;

import lombok.*;
import re21.ieun.member.entity.Member;
import re21.ieun.order.entity.OrderStatus;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    @Getter
    public static class Post {

        @Positive
        private long memberId;

        @Valid
        @NotNull(message = "주문할 상품 정보를 입력해주세요.")
        private List<OrderSellDto.Post> orderSells;

        public Member getMember() {
            Member member = new Member();
            member.setMemberId(memberId);
            return member;
        }

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private long orderId;

        @Setter(AccessLevel.NONE)
        private long memberId;
        private OrderStatus orderStatus;
        private List<OrderSellDto.Response> orderSells;
        private LocalDateTime createdAt;

        public void setMember(Member member) {
            this.memberId = member.getMemberId();
        }
    }
}

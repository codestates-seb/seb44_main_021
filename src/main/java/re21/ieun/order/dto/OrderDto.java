package re21.ieun.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    @Getter
    public static class Post {
        @NotEmpty
        private List<OrderSellDto.Post> orderProducts;

    }

    @Getter
    @AllArgsConstructor
    public static class Response implements Serializable {
        private Long orderId;
        private Long orderNumber;
        private String status;
        private List<OrderSellDto.Response> orderProducts;
        private LocalDateTime createdAt;
    }
}

package re21.ieun.order.dto;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class OrderSellDto {

    @Getter
    public static class Post {

        @Positive
        private long sellId;

        @Positive
        private int quantity;

    }

    @Getter
    public static class Patch {
        @Positive
        private int quantity;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response {

        private long sellId;

        private String title;

        private String content;

        private int quantity;

        private Integer price;

        //private Integer totalPrice;

    }
}

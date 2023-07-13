package re21.ieun.order.dto;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;

public class OrderSellDto {

    @Getter
    public static class Post {


        @NotNull
        @Positive
        private Long orderSellId;


    }

    @Getter
    public static class Patch {
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response implements Serializable {

        private Long orderSellId;

        private String title;

        private String content;
        private Integer price;

    }
}

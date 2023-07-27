package re21.ieun.order.entity;

import lombok.Getter;

@Getter
public enum OrderStatus {
    ORDER_RECEPTION(1, "주문 접수"),
    ORDER_SHIPPING(2, "배송 중"),
    ORDER_COMPLETED(3, "배송 완료"),
    ORDER_CANCELED(4, "주문 취소");

    @Getter
    private int stepNumber;

    @Getter
    private String stepDescription;

    OrderStatus(int stepNumber, String stepDescription) {
        this.stepNumber = stepNumber;
        this.stepDescription = stepDescription;
    }
}

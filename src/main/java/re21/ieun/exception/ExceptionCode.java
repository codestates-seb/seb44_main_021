package re21.ieun.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    DISPLAYNAME_EXISTS(409, "DisplayName exists"),
    EMAIL_EXISTS(409,"Email exists"),
    SELL_NOT_FOUND(404, "Sell not found"),
    UPCYCLING_NOT_FOUND(404, "Upcycling not found"),
    CANNOT_CANCELED_FUNDING(403, "Funding cannot be canceled"),
    FUNDING_NOT_FOUND(404, "Funding not found"),
    ORDER_DOES_NOT_MATCH(400, "Order does not match"),
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    CANNOT_CANCEL_ORDER(403, "Order can not cancel"),
    OUT_OF_STOCK(403, "Out of stock"),
    ORDER_NOT_FOUND(404, "Order not found"),
    INSUFFICIENT_QUANTITY(403, "Quantity not selectable"),      // 불충분한 수량, 선택할 수 없는 수량
    INVALID_QUANTITY(403, "Quantity is wrong"),         // 잘못된 수량
    INVALID_UPCYCLING(403, "Upcycling is wrong");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
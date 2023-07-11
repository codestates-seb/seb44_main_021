package re21.ieun.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    DISPLAYNAME_EXISTS(409, "DisplayName exists"),
    EMAIL_EXISTS(409,"Email exists"),
    SELL_NOT_FOUND(404, "Sell not found"),
    UPCYCLING_NOT_FOUND(404, "Upcycling not found"),
    CANNOT_CHANGE_FUNDING(403, "Funding can not change"),
    FUNDING_NOT_FOUND(404, "Funding not found"),
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
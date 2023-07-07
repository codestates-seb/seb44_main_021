package re21.ieun.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    DISPLAYNAME_EXISTS(409, "DisplayName exists"),
    EMAIL_EXISTS(409,"Email exists"),
    SELL_NOT_FOUND(404, "Sell not found"),
    UPCYCLING_NOT_FOUND(404, "Upcycling not found");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
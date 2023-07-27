package re21.ieun.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
        int statusCode = e.getExceptionCode().getStatus();
        String errorMessage = e.getMessage();

        return ResponseEntity.status(statusCode).body(errorMessage);
    }

}

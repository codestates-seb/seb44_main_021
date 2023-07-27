package re21.ieun.auth.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;

@Service
public class AuthManager {

    public String getEmailFromAuthentication(Authentication authentication, boolean permitUnsignedUser) {
        if (authentication == null && permitUnsignedUser) {
            return null;
        }
        if (authentication == null) {
            throw new BusinessLogicException(ExceptionCode.LOGIN_NOT_REQUIRED);
        }
        return authentication.getName();
    }
}

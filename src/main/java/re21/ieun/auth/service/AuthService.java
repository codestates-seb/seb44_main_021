package re21.ieun.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import re21.ieun.auth.jwt.JwtTokenizer;
import re21.ieun.auth.redis.RedisService;
import re21.ieun.exception.BusinessLogicException;
import re21.ieun.exception.ExceptionCode;
import re21.ieun.member.entity.Member;
import re21.ieun.member.service.MemberService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final RedisService redisService;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    public AuthService(@Lazy RedisService redisService, @Lazy MemberService memberService, @Lazy JwtTokenizer jwtTokenizer) {
        this.redisService = redisService;
        this.memberService = memberService;
        this.jwtTokenizer = jwtTokenizer;
    }

    public void signOut(String tokenHeader) {      // , String refreshToken
        String token = jwtTokenizer.getTokenFromHeader(tokenHeader);
        if (redisService.isSignedOut(token)) throw new BusinessLogicException(ExceptionCode.USER_INPUT_ERROR);
        redisService.signOut(token);      // , refreshToken
    }

    /*
    public String reissue(String refreshToken) {
        if (redisService.isSignedOut(refreshToken)) throw new BusinessLogicException(ExceptionCode.TOKEN_EXPIRED);
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Jws<Claims> claims = jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey);

        String subject = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(subject);

        Map<String, Object> userClaims = new HashMap<>();
        userClaims.put("email", member.getEmail());
        userClaims.put("roles", member.getRoles());

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        return "Bearer " + jwtTokenizer.generateAccessToken(userClaims, subject, expiration, base64EncodedSecretKey);
    }
     */
}

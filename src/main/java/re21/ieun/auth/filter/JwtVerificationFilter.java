package re21.ieun.auth.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import re21.ieun.auth.jwt.JwtTokenizer;
import re21.ieun.auth.utils.CustomAuthorityUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // System.out.println("# JwtVerificationFilter");
        /*
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
         */
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            // 액세스 토큰이 만료되었습니다. 토큰을 새로고침합니다.
            try {
                String refreshToken = extractRefreshToken(request);
                String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
                Map<String, Object> refreshTokenClaims = jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey).getBody();

                // 새로고침 토큰이 여전히 유효하고 원래 액세스 토큰의 사용자와 관련된 토큰인지 확인합니다.
                if (isRefreshTokenValid(refreshTokenClaims)) {
                    // 새로운 액세스 토큰을 생성합니다.
                    String newAccessToken = generateNewAccessToken(refreshTokenClaims.get("username").toString(), base64EncodedSecretKey);

                    // 새로운 액세스 토큰을 응답 헤더에 설정합니다.
                    response.setHeader("Authorization", "Bearer " + newAccessToken);
                } else {
                    // 새로고침 토큰이 무효하거나 만료되었을 경우, 상황에 적절히 대응할 수 있습니다.
                    // 예를 들어 사용자의 세션을 무효화하고 로그아웃시킬 수 있습니다.
                }
            } catch (Exception e) {
                request.setAttribute("exception", e);
            }
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    // refresh 토큰 추가
    // 요청에서 새로고침 토큰을 추출하는 도우미 메서드
    private String extractRefreshToken(HttpServletRequest request) {
        String refreshToken = null;
        // 새로고침 토큰을 요청에서 추출합니다. 예를 들어 쿠키 또는 요청 매개변수에서 가져올 수 있습니다.
        // 예를 들면, 쿠키로 전송된 경우:
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }
        return refreshToken;
    }

    // 새로고침 토큰의 유효성을 확인하는 도우미 메서드
    private boolean isRefreshTokenValid(Map<String, Object> refreshTokenClaims) {
        // refreshTokenClaims를 io.jsonwebtoken.Claims로 형변환합니다.
        Claims claims = (Claims) refreshTokenClaims;

        // 여기에서 토큰의 유효성을 확인하는 로직을 구현합니다. 예를 들어, 새로고침 토큰의 만료 날짜를 확인할 수 있습니다.
        Date refreshTokenExpiration = claims.getExpiration();
        Date now = new Date();
        return refreshTokenExpiration.after(now);
    }

    // 새로운 액세스 토큰을 생성하는 도우미 메서드
    private String generateNewAccessToken(String subject, String base64EncodedSecretKey) {
        // 기존의 `JwtTokenizer` 클래스에 있는 `generateAccessToken` 메서드를 활용하여 구현합니다.
        // 사용자 지정 클레임을 전달하는 대신, 새로고침 토큰에서 기존의 클레임을 재사용합니다.
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        return jwtTokenizer.generateAccessToken(null, subject, expiration, base64EncodedSecretKey);
    }
}

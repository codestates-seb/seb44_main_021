package re21.ieun;
/*
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.filter.OncePerRequestFilter;
import re21.ieun.auth.filter.JwtVerificationFilter;
import re21.ieun.auth.jwt.JwtTokenizer;
import re21.ieun.auth.utils.CustomAuthorityUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

public class JwtVerificationFilterTest {

    private JwtVerificationFilter jwtVerificationFilter;
    private JwtTokenizer jwtTokenizer;
    private CustomAuthorityUtils customAuthorityUtils;

    @BeforeEach
    public void setup() {
        // Mock JwtTokenizer and CustomAuthorityUtils
        jwtTokenizer = mock(JwtTokenizer.class);
        customAuthorityUtils = mock(CustomAuthorityUtils.class);

        jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils);
    }

    @Test
    public void testValidAccessToken() throws ServletException, IOException {
        // Arrange
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", "testuser");
        claims.put("roles", Collections.singletonList("ROLE_USER"));

        String accessToken = "valid-access-token";
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        when(request.getHeader("Authorization")).thenReturn("Bearer " + accessToken);
        when(jwtTokenizer.getClaims(eq(accessToken), any())).thenReturn(new ClaimsAdapter(claims));
        when(customAuthorityUtils.createAuthorities(any())).thenReturn(Collections.emptyList());

        // Act
        jwtVerificationFilter.doFilterInternal(request, response, filterChain);

        // Assert
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        assertEquals("testuser", authentication.getName());
        assertEquals(0, authentication.getAuthorities().size());
        verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    public void testExpiredAccessTokenWithValidRefreshToken() throws ServletException, IOException {
        // Arrange
        Map<String, Object> refreshTokenClaims = new HashMap<>();
        refreshTokenClaims.put("username", "testuser");
        refreshTokenClaims.put("roles", Collections.singletonList("ROLE_USER"));

        String expiredAccessToken = "expired-access-token";
        String validRefreshToken = "valid-refresh-token";
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        when(request.getHeader("Authorization")).thenReturn("Bearer " + expiredAccessToken);
        when(jwtTokenizer.getClaims(eq(expiredAccessToken), any())).thenThrow(ExpiredJwtException.class);
        when(jwtTokenizer.getClaims(eq(validRefreshToken), any())).thenReturn(new ClaimsAdapter(refreshTokenClaims));
        when(customAuthorityUtils.createAuthorities(any())).thenReturn(Collections.emptyList());

        // Act
        jwtVerificationFilter.doFilterInternal(request, response, filterChain);

        // Assert
        // Check that a new access token is added to the response headers
        verify(response, times(1)).setHeader(eq("Authorization"), anyString());
        verify(filterChain, times(1)).doFilter(request, response);
    }

    // Helper class to adapt Map to Claims interface
    private static class ClaimsAdapter implements Claims {

        private final Map<String, Object> claims;

        public ClaimsAdapter(Map<String, Object> claims) {
            this.claims = claims;
        }

        @Override
        public String getIssuer() {
            return null;
        }

        @Override
        public Claims setIssuer(String iss) {
            return null;
        }

        @Override
        public String getSubject() {
            return claims.get("username").toString();
        }

        @Override
        public Claims setSubject(String sub) {
            return null;
        }

        @Override
        public List<String> getAudience() {
            return null;
        }

        // Implement other methods as needed

        @Override
        public Date getExpiration() {
            return null;
        }

        @Override
        public Claims setExpiration(Date exp) {
            return null;
        }
    }
}


 */
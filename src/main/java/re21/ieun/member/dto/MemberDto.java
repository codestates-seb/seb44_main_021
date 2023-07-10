package re21.ieun.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String password;
        @NotBlank
        private String displayName;
        @NotBlank
        private String role;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        private long memberId;
        private String displayName;
        private String password;
        private String profileImg;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long memberId;
        private String email;
        private String displayName;
        private String memberRole;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String profileImg;
    }
}

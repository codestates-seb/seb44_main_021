package re21.ieun.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String category;

    @Column
    private String profileImg;

    @Enumerated(EnumType.STRING)
    @Column
    private MemberRole memberRole = MemberRole.MEMBER_USER;


    public enum MemberRole {
        MEMBER_USER("사용자"),
        MEMBER_ENGINEER("엔지니어");

        @Getter
        private final String role;

        MemberRole(String roles) {
            this.role = roles;
        }

    }

}

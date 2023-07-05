package re21.ieun.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import re21.ieun.audit.Auditable;
import re21.ieun.upcycling.entity.Upcycling;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String profileImg;

    @Enumerated(EnumType.STRING)
    @Column
    private MemberRole memberRole;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    /*
    @OneToMany
    @JoinColumn(name = "UPCYCLING_ID")
    private Upcycling upcycling;
     */

    public enum MemberRole {
        MEMBER_USER("사용자"),
        MEMBER_UPCYCLER("업사이클러");

        @Getter
        private final String role;

        MemberRole(String roles) {
            this.role = roles;
        }
    }
}

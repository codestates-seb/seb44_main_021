package re21.ieun.member.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import re21.ieun.member.entity.VerificationCode;


public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    VerificationCode findByCode(String code);
}

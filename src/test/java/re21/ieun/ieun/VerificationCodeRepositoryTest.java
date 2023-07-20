//package re21.ieun.ieun;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import re21.ieun.member.entity.VerificationCode;
//import re21.ieun.member.repository.VerificationCodeRepository;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@DataJpaTest
//public class VerificationCodeRepositoryTest {
//
//    @Autowired
//    private VerificationCodeRepository verificationCodeRepository;
//
//    @Test
//    public void testFindByCode() {
//        // 테스트용 VerificationCode 객체 생성 및 저장
//        VerificationCode code = new VerificationCode();
//        code.setCode("test_code");
//        code.setEmail("test@example.com");
//        verificationCodeRepository.save(code);
//
//        // findByCode 메서드 테스트
//        VerificationCode foundCode = verificationCodeRepository.findByCode("test_code");
//        assertThat(foundCode).isNotNull();
//        assertThat(foundCode.getEmail()).isEqualTo("test@example.com");
//    }
//}
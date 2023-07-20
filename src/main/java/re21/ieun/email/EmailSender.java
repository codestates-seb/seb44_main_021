package re21.ieun.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

@Component
public class EmailSender {
    private final JavaMailSender javaMailSender;
    private final String emailSenderPassword;
    private final String emailSenderman;

    @Autowired
    public EmailSender(JavaMailSender javaMailSender,
                       @Value("${email.sender.password}") String emailSenderPassword,
                       @Value("${email.sender.man}") String emailSenderman) {
        this.javaMailSender = javaMailSender;
        this.emailSenderPassword = emailSenderPassword;
        this.emailSenderman = emailSenderman;
    }

    public void sendVerificationEmail(String to, String verificationCode) throws MessagingException {
        String from = emailSenderman; // 보내는 사람의 이메일 주소
        String password = emailSenderPassword; // 보내는 사람의 이메일 계정 비밀번호
        String host = "smtp.gmail.com"; // 구글 메일 서버 호스트 이름

        // SMTP 프로토콜 설정
        Properties props = new Properties();
        props.setProperty("mail.smtp.host", host);
        props.setProperty("mail.smtp.port", "587");
        props.setProperty("mail.smtp.auth", "true");
        props.setProperty("mail.smtp.starttls.enable", "true");

        // 보내는 사람 계정 정보 설정
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });

        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(from));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
        msg.setSubject("[이은] - 회원가입 인증코드입니다.");

        /*
        String content =
                "안녕하세요! 당신의 건강에 도움을 드릴 Wrieating 입니다! \n"
                        + "가입해주셔서 감사합니다.\n"
                        + "Wrieating 회원가입 인증 코드입니다 : "
                        + verificationCode;
        msg.setText(content);

         */
        // HTML content of the email with UTF-8 character encoding
        String content = "<html>"
                + "<head><meta charset='UTF-8'></head>"
                + "<body style='font-family: Arial, sans-serif;'>"
                + "<hr style='border: 2px solid #6E934D;'>"
                + "<div style='margin-bottom: 70px; margin-left: 20px;'>"
                + "<div style='display:flex; flex-direction: row; align-items: center; margin: 70px 0;'>"
                + "<img width='43' height='43' src='https://cdn.discordapp.com/attachments/1123486629047304253/1131451836776316989/image.png' alt='external-Mail-pixel-perfect-RGB-color-icon-motion.-color.-filled-filled-color-icons-papa-vector'/>"
                + "<h1 style='font-weight: 400; margin-left: 10px;'><span style='font-weight: 700;'>메일 인증</span> 안내입니다.</h1>"
                + "</div>"
                + "<p>안녕하세요.</p>"
                + "<p style='font-weight: 400;'>"
                + "숨어있는 것들로 세상을 아름답게 빛내줄 <span style='color: #639443; font-size:20px; font-weight: 700;'>이은</span>입니다."
                + "</p>"
                + "<p>이은을 이용해 주셔서 진심으로 감사드립니다.</p>"
                + "<p>회원가입을 위해 이메일 인증을 진행합니다.</p>"
                + "<p>아래 발급된 <span style='color: #639443; text-decoration:underline; text-underline-position : under;'>인증 코드</span>를 입력하여 회원가입을 완료해주세요. </p>"
                + "<div style='margin: 0 40px;'>"
                + "<div style='border-top: 0.1px solid rgb(193, 193, 193); border-bottom: 0.1px solid rgb(193, 193, 193); height: 120px; display:flex; flex-direction: row; align-items: center;'>"
                + "<p style='margin-left: 50px;'>인증 코드 : <strong>" + verificationCode + "</strong></p>"
                + "</div>"
                + "<div style='font-size: 11px; text-align: right;'>"
                + "<p>Copyright @ 2023 Ieun</p>"
                + "<p>Front: 신성철, 곽시현, 나예진 | Back: 강병주, 박재성, 윤승현</p>"
                + "</div>"
                + "</div>"
                + "<hr style='border: 2px solid #6E934D; margin-top: 30px;'>"
                + "</div>"
                + "</body>"
                + "</html>";

        // Set the content as HTML
        msg.setContent(content, "text/html; charset=UTF-8");

        // 메일 보내기
        Transport.send(msg);

        System.out.println("Success.");
        System.out.println("Authentication code: " + verificationCode);
    }
}
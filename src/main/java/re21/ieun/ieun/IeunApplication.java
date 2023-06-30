package re21.ieun.ieun;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class IeunApplication {


	@RequestMapping("/")
	String home(){
		return "hello world";
	}

	public static void main(String[] args) {
		SpringApplication.run(IeunApplication.class, args);
	}

}

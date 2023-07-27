package re21.ieun;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ieunApplication {

	public static void main(String[] args) {
		SpringApplication.run(ieunApplication.class, args);
	}

}

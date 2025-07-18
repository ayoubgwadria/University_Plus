package tek_up.tekuppulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TekupPulseApplication {

	public static void main(String[] args) {
		SpringApplication.run(TekupPulseApplication.class, args);
	}

}

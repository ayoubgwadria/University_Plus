package tek_up.tekuppulse.ECSR.Event.CSR;

import org.springframework.data.jpa.repository.JpaRepository;
import tek_up.tekuppulse.ECSR.Event.Event;

public interface EventRepository extends JpaRepository<Event,Long> {
}

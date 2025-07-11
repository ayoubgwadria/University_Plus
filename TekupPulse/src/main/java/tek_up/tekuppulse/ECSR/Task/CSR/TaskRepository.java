package tek_up.tekuppulse.ECSR.Task.CSR;

import org.springframework.data.jpa.repository.JpaRepository;
import tek_up.tekuppulse.ECSR.Task.Task;

public interface TaskRepository extends JpaRepository<Task,Long> {
}

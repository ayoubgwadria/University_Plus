package tek_up.tekuppulse.ECSR.ExamPlanning;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.Course.Course;
import tek_up.tekuppulse.ECSR.Group.Group;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamPlanning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate examDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String room;

    @ManyToOne
    private Course course;

    @ManyToOne
    private Group group;
}

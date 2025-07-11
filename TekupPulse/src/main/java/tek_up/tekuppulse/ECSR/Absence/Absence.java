package tek_up.tekuppulse.ECSR.Absence;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.ClassSession.ClassSession;
import tek_up.tekuppulse.ECSR.Course.Course;
import tek_up.tekuppulse.ECSR.User.User;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Absence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String reason;

    @ManyToOne
    private User student;

    @ManyToOne
    private Course course;

    @ManyToOne
    private ClassSession session;
}


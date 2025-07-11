package tek_up.tekuppulse.ECSR.Grade;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.Course.Course;
import tek_up.tekuppulse.ECSR.Grade.Enum.GradeType;
import tek_up.tekuppulse.ECSR.User.User;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private GradeType type;
    private double value;
    private double outOf;
    private LocalDate date;

    @ManyToOne
    private User student;

    @ManyToOne
    private Course course;
}
package tek_up.tekuppulse.ECSR.Group;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.Course.Course;
import tek_up.tekuppulse.ECSR.ClassSession.ClassSession;
import tek_up.tekuppulse.ECSR.ExamPlanning.ExamPlanning;
import tek_up.tekuppulse.ECSR.User.Student;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "student_groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String level;
    private int year;

    @OneToMany(mappedBy = "group")
    private List<Student> students;

    @OneToMany(mappedBy = "group")
    private List<Course> courses;

    @OneToMany(mappedBy = "group")
    private List<ClassSession> sessions;

    @OneToMany(mappedBy = "group")
    private List<ExamPlanning> examPlannings;
}

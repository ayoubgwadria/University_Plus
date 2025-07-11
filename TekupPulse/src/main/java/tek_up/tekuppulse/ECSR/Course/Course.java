package tek_up.tekuppulse.ECSR.Course;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.CourseMaterial.CourseMaterial;
import tek_up.tekuppulse.ECSR.Group.Group;
import tek_up.tekuppulse.ECSR.Task.Task;
import tek_up.tekuppulse.ECSR.Grade.Grade;
import tek_up.tekuppulse.ECSR.User.Professor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String code;

    @ManyToOne
    private Professor teacher;

    @ManyToOne
    private Group group;

    @OneToMany(mappedBy = "course")
    private List<Task> tasks;

    @OneToMany(mappedBy = "course")
    private List<Grade> grades;

    @OneToMany(mappedBy = "course")
    private List<CourseMaterial> materials;
}
package tek_up.tekuppulse.ECSR.User;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import tek_up.tekuppulse.ECSR.ClassSession.ClassSession;
import tek_up.tekuppulse.ECSR.Course.Course;
import tek_up.tekuppulse.ECSR.Group.Group;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@DiscriminatorValue("PROFESSOR")
public class Professor extends User {

    @ManyToMany
    @JoinTable(
            name = "professor_groups",
            joinColumns = @JoinColumn(name = "professor_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private List<Group> groups;

    @OneToMany(mappedBy = "teacher")
    private List<Course> courses;

    @OneToMany(mappedBy = "teacher")
    private List<ClassSession> sessions;
}


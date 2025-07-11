package tek_up.tekuppulse.ECSR.User;


import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import tek_up.tekuppulse.ECSR.Absence.Absence;
import tek_up.tekuppulse.ECSR.Grade.Grade;
import tek_up.tekuppulse.ECSR.Group.Group;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@DiscriminatorValue("STUDENT")
public class Student extends User {

    @ManyToOne
    private Group group;

    @OneToMany(mappedBy = "student")
    private List<Grade> grades;

    @OneToMany(mappedBy = "student")
    private List<Absence> absences;
}
package tek_up.tekuppulse.ECSR.ClassSession;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.Group.Group;
import tek_up.tekuppulse.ECSR.User.User;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectName;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String room;
    private boolean integratedClassroom;

    @ManyToOne
    private User teacher;

    @ManyToOne
    private Group group;
}
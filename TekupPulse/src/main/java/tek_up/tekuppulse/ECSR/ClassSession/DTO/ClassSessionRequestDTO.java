package tek_up.tekuppulse.ECSR.ClassSession.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassSessionRequestDTO {
    private String subjectName;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String room;
    private boolean integratedClassroom;
    private Long teacherId;
    private Long groupId;
}

package tek_up.tekuppulse.ECSR.ExamPlanning.DTO;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamPlanningDTO {
    private Long id;
    private LocalDate examDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String room;
    private Long courseId;
    private Long groupId;
}
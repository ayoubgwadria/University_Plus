package tek_up.tekuppulse.ECSR.Absence.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AbsenceRequestDTO {
    private LocalDate date;
    private String reason;
    private Long studentId;
    private Long courseId;
    private Long sessionId;
}

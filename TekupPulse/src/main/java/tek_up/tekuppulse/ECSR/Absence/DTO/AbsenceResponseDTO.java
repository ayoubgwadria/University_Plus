package tek_up.tekuppulse.ECSR.Absence.DTO;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AbsenceResponseDTO {
    private Long id;
    private LocalDate date;
    private String reason;
    private Long studentId;
    private Long courseId;
    private Long sessionId;
}

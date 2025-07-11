package tek_up.tekuppulse.ECSR.Grade.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.Grade.Enum.GradeType;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GradeRequestDTO {
    private GradeType type;
    private double value;
    private double outOf;
    private LocalDate date;
    private Long studentId;
    private Long courseId;
}
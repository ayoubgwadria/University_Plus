package tek_up.tekuppulse.ECSR.AcademicCalendarEntry.DTO;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcademicCalendarRequestDTO {
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
}

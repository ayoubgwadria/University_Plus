package tek_up.tekuppulse.ECSR.CourseMaterial.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseMaterialDTO {
    private Long id;
    private String title;
    private String fileUrl;
    private LocalDateTime uploadedAt;
    private Long courseId;
    private Long uploadedById;
}

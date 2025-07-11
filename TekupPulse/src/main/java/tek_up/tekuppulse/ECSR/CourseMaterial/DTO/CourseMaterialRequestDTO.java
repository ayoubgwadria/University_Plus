package tek_up.tekuppulse.ECSR.CourseMaterial.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseMaterialRequestDTO {
    private String title;
    private String fileUrl;
    private LocalDateTime uploadedAt;
    private Long courseId;
    private Long uploadedById;
}

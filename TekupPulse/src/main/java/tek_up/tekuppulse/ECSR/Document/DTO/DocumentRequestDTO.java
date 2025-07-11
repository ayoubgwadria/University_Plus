package tek_up.tekuppulse.ECSR.Document.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentRequestDTO {
    private String title;
    private String fileUrl;
    private LocalDateTime uploadedAt;
}

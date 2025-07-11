package tek_up.tekuppulse.ECSR.Notification.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.Notification.Enum.NotificationType;
import tek_up.tekuppulse.ECSR.Notification.Enum.NotificationVisibleTo;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
    private Long id;
    private String title;
    private String content;
    private NotificationType type;
    private LocalDateTime publishedAt;
    private NotificationVisibleTo visibleTo;
}

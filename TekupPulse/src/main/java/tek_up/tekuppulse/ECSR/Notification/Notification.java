package tek_up.tekuppulse.ECSR.Notification;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.Notification.Enum.NotificationType;
import tek_up.tekuppulse.ECSR.Notification.Enum.NotificationVisibleTo;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 2000)
    private String content;
    private NotificationType type;
    private LocalDateTime publishedAt;
    private NotificationVisibleTo visibleTo;
}

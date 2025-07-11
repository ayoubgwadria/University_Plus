package tek_up.tekuppulse.ECSR.Notification.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Notification.DTO.NotificationDTO;
import tek_up.tekuppulse.ECSR.Notification.Notification;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    private NotificationDTO toDTO(Notification notification) {
        return NotificationDTO.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .content(notification.getContent())
                .type(notification.getType())
                .publishedAt(notification.getPublishedAt())
                .visibleTo(notification.getVisibleTo())
                .build();
    }

    private Notification toEntity(NotificationDTO dto) {
        Notification notification = new Notification();
        notification.setId(dto.getId());
        notification.setTitle(dto.getTitle());
        notification.setContent(dto.getContent());
        notification.setType(dto.getType());
        notification.setPublishedAt(dto.getPublishedAt());
        notification.setVisibleTo(dto.getVisibleTo());
        return notification;
    }

    public List<NotificationDTO> getAllNotifications() {
        return notificationRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public NotificationDTO getNotificationById(Long id) {
        return notificationRepository.findById(id).map(this::toDTO).orElse(null);
    }

    public NotificationDTO saveNotification(NotificationDTO dto) {
        Notification saved = notificationRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}



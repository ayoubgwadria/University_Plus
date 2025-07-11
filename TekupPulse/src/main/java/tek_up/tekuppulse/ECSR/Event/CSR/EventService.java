package tek_up.tekuppulse.ECSR.Event.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Event.DTO.EventRequestDTO;
import tek_up.tekuppulse.ECSR.Event.DTO.EventResponseDTO;
import tek_up.tekuppulse.ECSR.Event.Event;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    private EventResponseDTO toDTO(Event event) {
        return EventResponseDTO.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .imageUrl(event.getImageUrl())
                .build();
    }

    private Event toEntity(EventRequestDTO dto) {
        return Event.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .imageUrl(dto.getImageUrl())
                .build();
    }

    public List<EventResponseDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public EventResponseDTO getEventById(Long id) {
        return eventRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public EventResponseDTO createEvent(EventRequestDTO dto) {
        Event saved = eventRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    public EventResponseDTO updateEvent(Long id, EventRequestDTO dto) {
        return eventRepository.findById(id).map(existing -> {
            existing.setTitle(dto.getTitle());
            existing.setDescription(dto.getDescription());
            existing.setStartDate(dto.getStartDate());
            existing.setEndDate(dto.getEndDate());
            existing.setImageUrl(dto.getImageUrl());
            return toDTO(eventRepository.save(existing));
        }).orElse(null);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}

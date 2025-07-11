package tek_up.tekuppulse.ECSR.AcademicCalendarEntry.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.AcademicCalendarEntry.AcademicCalendarEntry;
import tek_up.tekuppulse.ECSR.AcademicCalendarEntry.DTO.AcademicCalendarRequestDTO;
import tek_up.tekuppulse.ECSR.AcademicCalendarEntry.DTO.AcademicCalendarResponseDTO;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AcademicCalendarEntryService {

    private final AcademicCalendarEntryRepository repository;

    private AcademicCalendarResponseDTO toDTO(AcademicCalendarEntry entry) {
        return AcademicCalendarResponseDTO.builder()
                .id(entry.getId())
                .title(entry.getTitle())
                .startDate(entry.getStartDate())
                .endDate(entry.getEndDate())
                .description(entry.getDescription())
                .build();
    }

    private AcademicCalendarEntry toEntity(AcademicCalendarRequestDTO dto) {
        return AcademicCalendarEntry.builder()
                .title(dto.getTitle())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .description(dto.getDescription())
                .build();
    }

    public List<AcademicCalendarResponseDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public AcademicCalendarResponseDTO getById(Long id) {
        return repository.findById(id).map(this::toDTO).orElse(null);
    }

    public AcademicCalendarResponseDTO create(AcademicCalendarRequestDTO dto) {
        AcademicCalendarEntry saved = repository.save(toEntity(dto));
        return toDTO(saved);
    }

    public AcademicCalendarResponseDTO update(Long id, AcademicCalendarRequestDTO dto) {
        AcademicCalendarEntry entry = repository.findById(id).orElseThrow(() -> new RuntimeException("Entry not found"));
        entry.setTitle(dto.getTitle());
        entry.setStartDate(dto.getStartDate());
        entry.setEndDate(dto.getEndDate());
        entry.setDescription(dto.getDescription());
        return toDTO(repository.save(entry));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

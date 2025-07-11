package tek_up.tekuppulse.ECSR.AcademicCalendarEntry.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tek_up.tekuppulse.ECSR.AcademicCalendarEntry.DTO.AcademicCalendarRequestDTO;
import tek_up.tekuppulse.ECSR.AcademicCalendarEntry.DTO.AcademicCalendarResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/academic-calendar")
@RequiredArgsConstructor
public class AcademicCalendarEntryController {

    private final AcademicCalendarEntryService service;

    @GetMapping
    public List<AcademicCalendarResponseDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcademicCalendarResponseDTO> getById(@PathVariable Long id) {
        AcademicCalendarResponseDTO dto = service.getById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<AcademicCalendarResponseDTO> create(@RequestBody AcademicCalendarRequestDTO request) {
        return ResponseEntity.ok(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AcademicCalendarResponseDTO> update(@PathVariable Long id, @RequestBody AcademicCalendarRequestDTO request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

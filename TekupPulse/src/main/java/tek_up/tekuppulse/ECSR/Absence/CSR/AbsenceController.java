package tek_up.tekuppulse.ECSR.Absence.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tek_up.tekuppulse.ECSR.Absence.DTO.AbsenceRequestDTO;
import tek_up.tekuppulse.ECSR.Absence.DTO.AbsenceResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/absences")
@RequiredArgsConstructor
public class AbsenceController {

    private final AbsenceService absenceService;

    @GetMapping
    public List<AbsenceResponseDTO> getAllAbsences() {
        return absenceService.getAllAbsences();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AbsenceResponseDTO> getAbsenceById(@PathVariable Long id) {
        AbsenceResponseDTO dto = absenceService.getAbsenceById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<AbsenceResponseDTO> createAbsence(@RequestBody AbsenceRequestDTO dto) {
        return ResponseEntity.ok(absenceService.createAbsence(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AbsenceResponseDTO> updateAbsence(@PathVariable Long id, @RequestBody AbsenceRequestDTO dto) {
        AbsenceResponseDTO updated = absenceService.updateAbsence(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAbsence(@PathVariable Long id) {
        absenceService.deleteAbsence(id);
        return ResponseEntity.noContent().build();
    }
}

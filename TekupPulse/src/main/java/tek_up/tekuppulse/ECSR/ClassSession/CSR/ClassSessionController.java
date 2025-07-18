package tek_up.tekuppulse.ECSR.ClassSession.CSR;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tek_up.tekuppulse.ECSR.ClassSession.DTO.ClassSessionRequestDTO;
import tek_up.tekuppulse.ECSR.ClassSession.DTO.ClassSessionResponseDTO;

import java.util.List;
@RestController
@RequestMapping("/api/class-sessions")
@RequiredArgsConstructor
public class ClassSessionController {

    private final ClassSessionService service;

    @GetMapping
    public List<ClassSessionResponseDTO> getAll() {
        return service.getAllSessions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassSessionResponseDTO> getById(@PathVariable Long id) {
        ClassSessionResponseDTO dto = service.getSessionById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ClassSessionResponseDTO> create(@RequestBody ClassSessionRequestDTO dto) {
        return ResponseEntity.ok(service.createSession(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassSessionResponseDTO> update(@PathVariable Long id, @RequestBody ClassSessionRequestDTO dto) {
        ClassSessionResponseDTO updated = service.updateSession(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteSession(id);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/{id}/increment-absence")
    public ResponseEntity<ClassSessionResponseDTO> incrementAbsence(@PathVariable Long id) {
        ClassSessionResponseDTO updated = service.incrementAbsentCount(id);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
}

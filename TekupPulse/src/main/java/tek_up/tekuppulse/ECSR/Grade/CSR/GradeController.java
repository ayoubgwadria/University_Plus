package tek_up.tekuppulse.ECSR.Grade.CSR;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tek_up.tekuppulse.ECSR.Grade.DTO.GradeRequestDTO;
import tek_up.tekuppulse.ECSR.Grade.DTO.GradeResponseDTO;

import java.util.List;
@RestController
@RequestMapping("/api/grades")
@RequiredArgsConstructor
public class GradeController {

    private final GradeService gradeService;

    @GetMapping
    public List<GradeResponseDTO> getAllGrades() {
        return gradeService.getAllGrades();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GradeResponseDTO> getGradeById(@PathVariable Long id) {
        GradeResponseDTO dto = gradeService.getGradeById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<GradeResponseDTO> createGrade(@RequestBody GradeRequestDTO dto) {
        GradeResponseDTO created = gradeService.createGrade(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GradeResponseDTO> updateGrade(@PathVariable Long id, @RequestBody GradeRequestDTO dto) {
        GradeResponseDTO updated = gradeService.updateGrade(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
        gradeService.deleteGrade(id);
        return ResponseEntity.noContent().build();
    }
}

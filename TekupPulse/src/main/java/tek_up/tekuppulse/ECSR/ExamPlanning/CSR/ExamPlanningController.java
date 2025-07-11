package tek_up.tekuppulse.ECSR.ExamPlanning.CSR;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tek_up.tekuppulse.ECSR.ExamPlanning.DTO.ExamPlanningRequestDTO;
import tek_up.tekuppulse.ECSR.ExamPlanning.DTO.ExamPlanningResponseDTO;

import java.util.List;
@RestController
@RequestMapping("/api/exam-plannings")
@RequiredArgsConstructor
public class ExamPlanningController {

    private final ExamPlanningService examPlanningService;

    @GetMapping
    public List<ExamPlanningResponseDTO> getAllExamPlannings() {
        return examPlanningService.getAllExamPlannings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamPlanningResponseDTO> getExamPlanningById(@PathVariable Long id) {
        ExamPlanningResponseDTO dto = examPlanningService.getExamPlanningById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ExamPlanningResponseDTO> createExamPlanning(@RequestBody ExamPlanningRequestDTO dto) {
        ExamPlanningResponseDTO created = examPlanningService.createExamPlanning(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExamPlanningResponseDTO> updateExamPlanning(@PathVariable Long id, @RequestBody ExamPlanningRequestDTO dto) {
        ExamPlanningResponseDTO updated = examPlanningService.updateExamPlanning(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamPlanning(@PathVariable Long id) {
        examPlanningService.deleteExamPlanning(id);
        return ResponseEntity.noContent().build();
    }
}

package tek_up.tekuppulse.ECSR.CourseMaterial.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tek_up.tekuppulse.ECSR.CourseMaterial.DTO.CourseMaterialRequestDTO;
import tek_up.tekuppulse.ECSR.CourseMaterial.DTO.CourseMaterialResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/course-materials")
@RequiredArgsConstructor
public class CourseMaterialController {

    private final CourseMaterialService courseMaterialService;

    @GetMapping
    public List<CourseMaterialResponseDTO> getAllMaterials() {
        return courseMaterialService.getAllMaterials();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseMaterialResponseDTO> getMaterialById(@PathVariable Long id) {
        CourseMaterialResponseDTO dto = courseMaterialService.getMaterialById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<CourseMaterialResponseDTO> createMaterial(@RequestBody CourseMaterialRequestDTO dto) {
        CourseMaterialResponseDTO created = courseMaterialService.createMaterial(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseMaterialResponseDTO> updateMaterial(@PathVariable Long id,
                                                                    @RequestBody CourseMaterialRequestDTO dto) {
        CourseMaterialResponseDTO updated = courseMaterialService.updateMaterial(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        courseMaterialService.deleteMaterial(id);
        return ResponseEntity.noContent().build();
    }
}

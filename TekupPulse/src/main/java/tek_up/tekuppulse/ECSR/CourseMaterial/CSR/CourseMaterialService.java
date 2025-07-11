package tek_up.tekuppulse.ECSR.CourseMaterial.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Course.CSR.CourseRepository;
import tek_up.tekuppulse.ECSR.CourseMaterial.CourseMaterial;
import tek_up.tekuppulse.ECSR.CourseMaterial.DTO.CourseMaterialRequestDTO;
import tek_up.tekuppulse.ECSR.CourseMaterial.DTO.CourseMaterialResponseDTO;
import tek_up.tekuppulse.ECSR.User.CSR.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseMaterialService {

    private final CourseMaterialRepository courseMaterialRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    private CourseMaterialResponseDTO toResponseDTO(CourseMaterial cm) {
        return CourseMaterialResponseDTO.builder()
                .id(cm.getId())
                .title(cm.getTitle())
                .fileUrl(cm.getFileUrl())
                .uploadedAt(cm.getUploadedAt())
                .courseId(cm.getCourse() != null ? cm.getCourse().getId() : null)
                .uploadedById(cm.getUploadedBy() != null ? cm.getUploadedBy().getId() : null)
                .build();
    }

    private CourseMaterial toEntity(CourseMaterialRequestDTO dto) {
        CourseMaterial cm = new CourseMaterial();
        cm.setTitle(dto.getTitle());
        cm.setFileUrl(dto.getFileUrl());
        cm.setUploadedAt(dto.getUploadedAt());

        if (dto.getCourseId() != null) {
            courseRepository.findById(dto.getCourseId()).ifPresent(cm::setCourse);
        }
        if (dto.getUploadedById() != null) {
            userRepository.findById(dto.getUploadedById()).ifPresent(cm::setUploadedBy);
        }
        return cm;
    }

    public List<CourseMaterialResponseDTO> getAllMaterials() {
        return courseMaterialRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public CourseMaterialResponseDTO getMaterialById(Long id) {
        return courseMaterialRepository.findById(id)
                .map(this::toResponseDTO)
                .orElse(null);
    }

    public CourseMaterialResponseDTO createMaterial(CourseMaterialRequestDTO dto) {
        CourseMaterial cm = toEntity(dto);
        CourseMaterial saved = courseMaterialRepository.save(cm);
        return toResponseDTO(saved);
    }

    public CourseMaterialResponseDTO updateMaterial(Long id, CourseMaterialRequestDTO dto) {
        return courseMaterialRepository.findById(id)
                .map(existing -> {
                    // Update fields
                    existing.setTitle(dto.getTitle());
                    existing.setFileUrl(dto.getFileUrl());
                    existing.setUploadedAt(dto.getUploadedAt());

                    if (dto.getCourseId() != null) {
                        courseRepository.findById(dto.getCourseId()).ifPresent(existing::setCourse);
                    } else {
                        existing.setCourse(null);
                    }

                    if (dto.getUploadedById() != null) {
                        userRepository.findById(dto.getUploadedById()).ifPresent(existing::setUploadedBy);
                    } else {
                        existing.setUploadedBy(null);
                    }

                    CourseMaterial updated = courseMaterialRepository.save(existing);
                    return toResponseDTO(updated);
                }).orElse(null);
    }

    public void deleteMaterial(Long id) {
        courseMaterialRepository.deleteById(id);
    }
}

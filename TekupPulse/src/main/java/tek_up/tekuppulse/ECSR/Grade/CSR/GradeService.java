package tek_up.tekuppulse.ECSR.Grade.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Course.CSR.CourseRepository;
import tek_up.tekuppulse.ECSR.Grade.DTO.GradeRequestDTO;
import tek_up.tekuppulse.ECSR.Grade.DTO.GradeResponseDTO;
import tek_up.tekuppulse.ECSR.Grade.Grade;
import tek_up.tekuppulse.ECSR.User.CSR.UserRepository;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class GradeService {
    private final GradeRepository gradeRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    private GradeResponseDTO toResponseDTO(Grade grade) {
        return GradeResponseDTO.builder()
                .id(grade.getId())
                .type(grade.getType())
                .value(grade.getValue())
                .outOf(grade.getOutOf())
                .date(grade.getDate())
                .studentId(grade.getStudent() != null ? grade.getStudent().getId() : null)
                .courseId(grade.getCourse() != null ? grade.getCourse().getId() : null)
                .build();
    }

    private Grade toEntity(GradeRequestDTO dto) {
        Grade grade = new Grade();
        grade.setType(dto.getType());
        grade.setValue(dto.getValue());
        grade.setOutOf(dto.getOutOf());
        grade.setDate(dto.getDate());

        if (dto.getStudentId() != null) {
            userRepository.findById(dto.getStudentId()).ifPresent(grade::setStudent);
        }
        if (dto.getCourseId() != null) {
            courseRepository.findById(dto.getCourseId()).ifPresent(grade::setCourse);
        }
        return grade;
    }

    public List<GradeResponseDTO> getAllGrades() {
        return gradeRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public GradeResponseDTO getGradeById(Long id) {
        return gradeRepository.findById(id)
                .map(this::toResponseDTO)
                .orElse(null);
    }

    public GradeResponseDTO createGrade(GradeRequestDTO dto) {
        Grade grade = toEntity(dto);
        Grade saved = gradeRepository.save(grade);
        return toResponseDTO(saved);
    }

    public GradeResponseDTO updateGrade(Long id, GradeRequestDTO dto) {
        return gradeRepository.findById(id)
                .map(existingGrade -> {
                    existingGrade.setType(dto.getType());
                    existingGrade.setValue(dto.getValue());
                    existingGrade.setOutOf(dto.getOutOf());
                    existingGrade.setDate(dto.getDate());

                    if (dto.getStudentId() != null) {
                        userRepository.findById(dto.getStudentId()).ifPresent(existingGrade::setStudent);
                    } else {
                        existingGrade.setStudent(null);
                    }

                    if (dto.getCourseId() != null) {
                        courseRepository.findById(dto.getCourseId()).ifPresent(existingGrade::setCourse);
                    } else {
                        existingGrade.setCourse(null);
                    }

                    Grade updated = gradeRepository.save(existingGrade);
                    return toResponseDTO(updated);
                })
                .orElse(null);
    }

    public void deleteGrade(Long id) {
        gradeRepository.deleteById(id);
    }
}
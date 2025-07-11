package tek_up.tekuppulse.ECSR.ExamPlanning.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Course.CSR.CourseRepository;
import tek_up.tekuppulse.ECSR.ExamPlanning.DTO.ExamPlanningRequestDTO;
import tek_up.tekuppulse.ECSR.ExamPlanning.DTO.ExamPlanningResponseDTO;
import tek_up.tekuppulse.ECSR.ExamPlanning.ExamPlanning;
import tek_up.tekuppulse.ECSR.Group.CSR.GroupRepository;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class ExamPlanningService {
    private final ExamPlanningRepository repository;
    private final CourseRepository courseRepository;
    private final GroupRepository groupRepository;

    private ExamPlanningResponseDTO toResponseDTO(ExamPlanning e) {
        return ExamPlanningResponseDTO.builder()
                .id(e.getId())
                .examDate(e.getExamDate())
                .startTime(e.getStartTime())
                .endTime(e.getEndTime())
                .room(e.getRoom())
                .courseId(e.getCourse().getId())
                .groupId(e.getGroup().getId())
                .build();
    }

    private ExamPlanning toEntity(ExamPlanningRequestDTO dto) {
        return ExamPlanning.builder()
                .examDate(dto.getExamDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .room(dto.getRoom())
                .course(courseRepository.findById(dto.getCourseId()).orElse(null))
                .group(groupRepository.findById(dto.getGroupId()).orElse(null))
                .build();
    }

    public List<ExamPlanningResponseDTO> getAllExamPlannings() {
        return repository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public ExamPlanningResponseDTO getExamPlanningById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public ExamPlanningResponseDTO createExamPlanning(ExamPlanningRequestDTO dto) {
        ExamPlanning entity = toEntity(dto);
        ExamPlanning saved = repository.save(entity);
        return toResponseDTO(saved);
    }

    public ExamPlanningResponseDTO updateExamPlanning(Long id, ExamPlanningRequestDTO dto) {
        return repository.findById(id).map(existing -> {
            existing.setExamDate(dto.getExamDate());
            existing.setStartTime(dto.getStartTime());
            existing.setEndTime(dto.getEndTime());
            existing.setRoom(dto.getRoom());
            existing.setCourse(courseRepository.findById(dto.getCourseId()).orElse(null));
            existing.setGroup(groupRepository.findById(dto.getGroupId()).orElse(null));
            ExamPlanning updated = repository.save(existing);
            return toResponseDTO(updated);
        }).orElse(null);
    }

    public void deleteExamPlanning(Long id) {
        repository.deleteById(id);
    }
}

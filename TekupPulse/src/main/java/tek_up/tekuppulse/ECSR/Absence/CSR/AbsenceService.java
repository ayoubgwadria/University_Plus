package tek_up.tekuppulse.ECSR.Absence.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Absence.Absence;
import tek_up.tekuppulse.ECSR.Absence.DTO.AbsenceRequestDTO;
import tek_up.tekuppulse.ECSR.Absence.DTO.AbsenceResponseDTO;
import tek_up.tekuppulse.ECSR.ClassSession.CSR.ClassSessionRepository;
import tek_up.tekuppulse.ECSR.Course.CSR.CourseRepository;
import tek_up.tekuppulse.ECSR.User.CSR.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AbsenceService {

    private final AbsenceRepository absenceRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ClassSessionRepository sessionRepository;

    private AbsenceResponseDTO toDTO(Absence absence) {
        return AbsenceResponseDTO.builder()
                .id(absence.getId())
                .date(absence.getDate())
                .reason(absence.getReason())
                .studentId(absence.getStudent().getId())
                .courseId(absence.getCourse().getId())
                .sessionId(absence.getSession().getId())
                .build();
    }

    private Absence toEntity(AbsenceRequestDTO dto) {
        return Absence.builder()
                .date(dto.getDate())
                .reason(dto.getReason())
                .student(userRepository.findById(dto.getStudentId()).orElse(null))
                .course(courseRepository.findById(dto.getCourseId()).orElse(null))
                .session(sessionRepository.findById(dto.getSessionId()).orElse(null))
                .build();
    }

    public List<AbsenceResponseDTO> getAllAbsences() {
        return absenceRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public AbsenceResponseDTO getAbsenceById(Long id) {
        return absenceRepository.findById(id).map(this::toDTO).orElse(null);
    }

    public AbsenceResponseDTO createAbsence(AbsenceRequestDTO dto) {
        Absence saved = absenceRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    public AbsenceResponseDTO updateAbsence(Long id, AbsenceRequestDTO dto) {
        return absenceRepository.findById(id).map(absence -> {
            absence.setDate(dto.getDate());
            absence.setReason(dto.getReason());
            absence.setStudent(userRepository.findById(dto.getStudentId()).orElse(null));
            absence.setCourse(courseRepository.findById(dto.getCourseId()).orElse(null));
            absence.setSession(sessionRepository.findById(dto.getSessionId()).orElse(null));
            return toDTO(absenceRepository.save(absence));
        }).orElse(null);
    }

    public void deleteAbsence(Long id) {
        absenceRepository.deleteById(id);
    }
}

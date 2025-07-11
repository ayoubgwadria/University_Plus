package tek_up.tekuppulse.ECSR.ClassSession.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.ClassSession.ClassSession;
import tek_up.tekuppulse.ECSR.ClassSession.DTO.ClassSessionRequestDTO;
import tek_up.tekuppulse.ECSR.ClassSession.DTO.ClassSessionResponseDTO;
import tek_up.tekuppulse.ECSR.Group.CSR.GroupRepository;
import tek_up.tekuppulse.ECSR.User.CSR.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassSessionService {
    private final ClassSessionRepository classSessionRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    private ClassSessionResponseDTO toResponseDTO(ClassSession cs) {
        return ClassSessionResponseDTO.builder()
                .id(cs.getId())
                .subjectName(cs.getSubjectName())
                .date(cs.getDate())
                .startTime(cs.getStartTime())
                .endTime(cs.getEndTime())
                .room(cs.getRoom())
                .integratedClassroom(cs.isIntegratedClassroom())
                .teacherId(cs.getTeacher() != null ? cs.getTeacher().getId() : null)
                .groupId(cs.getGroup() != null ? cs.getGroup().getId() : null)
                .build();
    }

    private ClassSession toEntity(ClassSessionRequestDTO dto) {
        ClassSession cs = new ClassSession();
        cs.setSubjectName(dto.getSubjectName());
        cs.setDate(dto.getDate());
        cs.setStartTime(dto.getStartTime());
        cs.setEndTime(dto.getEndTime());
        cs.setRoom(dto.getRoom());
        cs.setIntegratedClassroom(dto.isIntegratedClassroom());

        if (dto.getTeacherId() != null) {
            userRepository.findById(dto.getTeacherId()).ifPresent(cs::setTeacher);
        }
        if (dto.getGroupId() != null) {
            groupRepository.findById(dto.getGroupId()).ifPresent(cs::setGroup);
        }
        return cs;
    }

    public List<ClassSessionResponseDTO> getAllSessions() {
        return classSessionRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public ClassSessionResponseDTO getSessionById(Long id) {
        return classSessionRepository.findById(id)
                .map(this::toResponseDTO)
                .orElse(null);
    }

    public ClassSessionResponseDTO createSession(ClassSessionRequestDTO dto) {
        ClassSession entity = toEntity(dto);
        ClassSession saved = classSessionRepository.save(entity);
        return toResponseDTO(saved);
    }

    public ClassSessionResponseDTO updateSession(Long id, ClassSessionRequestDTO dto) {
        return classSessionRepository.findById(id).map(existing -> {
            // Update fields
            existing.setSubjectName(dto.getSubjectName());
            existing.setDate(dto.getDate());
            existing.setStartTime(dto.getStartTime());
            existing.setEndTime(dto.getEndTime());
            existing.setRoom(dto.getRoom());
            existing.setIntegratedClassroom(dto.isIntegratedClassroom());

            if (dto.getTeacherId() != null) {
                userRepository.findById(dto.getTeacherId()).ifPresent(existing::setTeacher);
            } else {
                existing.setTeacher(null);
            }
            if (dto.getGroupId() != null) {
                groupRepository.findById(dto.getGroupId()).ifPresent(existing::setGroup);
            } else {
                existing.setGroup(null);
            }
            ClassSession updated = classSessionRepository.save(existing);
            return toResponseDTO(updated);
        }).orElse(null);
    }

    public void deleteSession(Long id) {
        classSessionRepository.deleteById(id);
    }
}

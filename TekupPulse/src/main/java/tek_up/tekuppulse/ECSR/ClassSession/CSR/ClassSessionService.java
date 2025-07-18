package tek_up.tekuppulse.ECSR.ClassSession.CSR;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.ClassSession.ClassSession;
import tek_up.tekuppulse.ECSR.ClassSession.DTO.ClassSessionRequestDTO;
import tek_up.tekuppulse.ECSR.ClassSession.DTO.ClassSessionResponseDTO;
import tek_up.tekuppulse.ECSR.Group.CSR.GroupRepository;
import tek_up.tekuppulse.ECSR.Group.Group;
import tek_up.tekuppulse.ECSR.User.CSR.UserRepository;
import tek_up.tekuppulse.ECSR.User.Student;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassSessionService {
    private final ClassSessionRepository classSessionRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final JavaMailSender mailSender;

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
                .absentCount(cs.getAbsentCount())
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
    public ClassSessionResponseDTO incrementAbsentCount(Long sessionId) {
        return classSessionRepository.findById(sessionId).map(session -> {
            session.setAbsentCount(session.getAbsentCount() + 1);
            ClassSession updated = classSessionRepository.save(session);
            return toResponseDTO(updated);
        }).orElse(null);
    }

    @Scheduled(cron = "0 0 * * * *") // every hour on the hour
    @Transactional
    public void checkCollectiveAbsenceAndNotify() {
        List<ClassSession> sessions = classSessionRepository.findAll();

        for (ClassSession session : sessions) {
            Group group = session.getGroup();
            if (group == null || group.getStudents() == null) continue;

            int totalStudents = group.getStudents().size();
            if (session.getAbsentCount() > totalStudents - 1) {

                // Avoid sending duplicates
                Set<String> notifiedEmails = new HashSet<>();

                for (Student student : group.getStudents()) {
                    if (student.getEmail() != null && notifiedEmails.add(student.getEmail())) {
                        sendCollectiveAbsenceEmail(student.getEmail(), session);
                    }
                }
            }
        }
    }

    private void sendCollectiveAbsenceEmail(String to, ClassSession session) {
        String subject = "📢 Absence collective pour la séance: " + session.getSubjectName();
        String text = "Bonjour,\n\nLa séance du " + session.getDate() +
                " à " + session.getStartTime() + " semble avoir une absence collective.\n" +
                "Merci de vérifier avec l'administration.\n\nSalle: " + session.getRoom();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }
}



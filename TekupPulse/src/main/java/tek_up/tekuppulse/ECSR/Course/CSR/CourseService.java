package tek_up.tekuppulse.ECSR.Course.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Course.Course;
import tek_up.tekuppulse.ECSR.Course.DTO.CourseRequestDTO;
import tek_up.tekuppulse.ECSR.Course.DTO.CourseResponseDTO;
import tek_up.tekuppulse.ECSR.Group.CSR.GroupRepository;
import tek_up.tekuppulse.ECSR.User.CSR.UserRepository;
import tek_up.tekuppulse.ECSR.User.Professor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    private CourseResponseDTO toResponseDTO(Course course) {
        return CourseResponseDTO.builder()
                .id(course.getId())
                .name(course.getName())
                .code(course.getCode())
                .teacherId(course.getTeacher() != null ? course.getTeacher().getId() : null)
                .groupId(course.getGroup() != null ? course.getGroup().getId() : null)
                .build();
    }

    private Course toEntity(CourseRequestDTO dto) {
        Course course = new Course();
        course.setName(dto.getName());
        course.setCode(dto.getCode());

        if (dto.getTeacherId() != null) {
            userRepository.findById(dto.getTeacherId()).ifPresent(user -> {
                if (user instanceof Professor) {
                    course.setTeacher((Professor) user);
                } else {
                    throw new IllegalArgumentException("User with id " + dto.getTeacherId() + " is not a Professor");
                }
            });
        }

        if (dto.getGroupId() != null) {
            groupRepository.findById(dto.getGroupId()).ifPresent(course::setGroup);
        }

        return course;
    }

    public List<CourseResponseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public CourseResponseDTO getCourseById(Long id) {
        return courseRepository.findById(id)
                .map(this::toResponseDTO)
                .orElse(null);
    }

    // Create new Course
    public CourseResponseDTO createCourse(CourseRequestDTO dto) {
        Course course = toEntity(dto);
        Course saved = courseRepository.save(course);
        return toResponseDTO(saved);
    }

    // Update existing Course by id
    public CourseResponseDTO updateCourse(Long id, CourseRequestDTO dto) {
        return courseRepository.findById(id).map(existingCourse -> {
            existingCourse.setName(dto.getName());
            existingCourse.setCode(dto.getCode());

            if (dto.getTeacherId() != null) {
                userRepository.findById(dto.getTeacherId()).ifPresent(user -> {
                    if (user instanceof Professor) {
                        existingCourse.setTeacher((Professor) user);
                    } else {
                        throw new IllegalArgumentException("User with id " + dto.getTeacherId() + " is not a Professor");
                    }
                });
            } else {
                existingCourse.setTeacher(null);
            }

            if (dto.getGroupId() != null) {
                groupRepository.findById(dto.getGroupId()).ifPresent(existingCourse::setGroup);
            } else {
                existingCourse.setGroup(null);
            }

            Course updated = courseRepository.save(existingCourse);
            return toResponseDTO(updated);
        }).orElse(null);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}

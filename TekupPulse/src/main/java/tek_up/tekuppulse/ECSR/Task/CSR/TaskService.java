package tek_up.tekuppulse.ECSR.Task.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Course.CSR.CourseRepository;
import tek_up.tekuppulse.ECSR.Task.DTO.TaskRequestDTO;
import tek_up.tekuppulse.ECSR.Task.DTO.TaskResponseDTO;
import tek_up.tekuppulse.ECSR.Task.Task;
import tek_up.tekuppulse.ECSR.User.CSR.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    private TaskResponseDTO toResponseDTO(Task task) {
        return TaskResponseDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .dueDate(task.getDueDate())
                .courseId(task.getCourse() != null ? task.getCourse().getId() : null)
                .createdById(task.getCreatedBy() != null ? task.getCreatedBy().getId() : null)
                .build();
    }

    private Task toEntity(TaskRequestDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());

        if (dto.getCourseId() != null) {
            courseRepository.findById(dto.getCourseId()).ifPresent(task::setCourse);
        }

        if (dto.getCreatedById() != null) {
            userRepository.findById(dto.getCreatedById()).ifPresent(task::setCreatedBy);
        }

        return task;
    }

    public List<TaskResponseDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public TaskResponseDTO getTaskById(Long id) {
        return taskRepository.findById(id)
                .map(this::toResponseDTO)
                .orElse(null);
    }

    public TaskResponseDTO saveTask(TaskRequestDTO dto) {
        Task saved = taskRepository.save(toEntity(dto));
        return toResponseDTO(saved);
    }

    public TaskResponseDTO updateTask(Long id, TaskRequestDTO dto) {
        Task existing = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setDueDate(dto.getDueDate());

        if (dto.getCourseId() != null) {
            courseRepository.findById(dto.getCourseId()).ifPresent(existing::setCourse);
        }

        if (dto.getCreatedById() != null) {
            userRepository.findById(dto.getCreatedById()).ifPresent(existing::setCreatedBy);
        }

        Task updated = taskRepository.save(existing);
        return toResponseDTO(updated);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}

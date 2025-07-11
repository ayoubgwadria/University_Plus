package tek_up.tekuppulse.ECSR.Course.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequestDTO {
    private String name;
    private String code;
    private Long teacherId;
    private Long groupId;
}

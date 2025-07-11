package tek_up.tekuppulse.ECSR.Group.DTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupResponseDTO {
    private Long id;
    private String name;
    private String level;
    private int year;
}
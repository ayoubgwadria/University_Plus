package tek_up.tekuppulse.ECSR.User.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import tek_up.tekuppulse.ECSR.User.Role;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class CreateUserDTO {
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private Long groupId;

}
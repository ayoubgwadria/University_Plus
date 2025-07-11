package tek_up.tekuppulse.ECSR.User.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tek_up.tekuppulse.ECSR.User.Role;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private String profilePictureUrl;
    private String lastLoginIp;
    private LocalDateTime lastLoginTime;
    private Long groupId;
}
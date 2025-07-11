package tek_up.tekuppulse.ECSR.User.CSR;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tek_up.tekuppulse.ECSR.User.DTO.CreateUserDTO;
import tek_up.tekuppulse.ECSR.User.DTO.LoginResponseDTO;
import tek_up.tekuppulse.ECSR.User.DTO.UserDTO;
import tek_up.tekuppulse.ECSR.User.DTO.UserLoginDTO;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login (@RequestBody UserLoginDTO request){
        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

        @GetMapping("/{id}")
        public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
            UserDTO dto = userService.getUserById(id);
            return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
        }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserDTO dto) {
        UserDTO created = userService.createUser(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO dto) {
        dto.setId(id);
        UserDTO updated = userService.saveUser(dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

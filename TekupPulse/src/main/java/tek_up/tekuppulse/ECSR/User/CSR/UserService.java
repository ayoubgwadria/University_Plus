package tek_up.tekuppulse.ECSR.User.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.Config.JwtService;
import tek_up.tekuppulse.ECSR.Group.CSR.GroupRepository;
import tek_up.tekuppulse.ECSR.Group.Group;
import tek_up.tekuppulse.ECSR.User.DTO.CreateUserDTO;
import tek_up.tekuppulse.ECSR.User.DTO.LoginResponseDTO;
import tek_up.tekuppulse.ECSR.User.DTO.UserDTO;
import tek_up.tekuppulse.ECSR.User.DTO.UserLoginDTO;
import tek_up.tekuppulse.ECSR.User.Professor;
import tek_up.tekuppulse.ECSR.User.Role;
import tek_up.tekuppulse.ECSR.User.Student;
import tek_up.tekuppulse.ECSR.User.User;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private  final GroupRepository groupRepository;
    @Autowired
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    public UserDTO createUser(CreateUserDTO request) {
        Optional<User> existing = userRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Cet email est déjà utilisé");
        }

        String generatedPassword = UUID.randomUUID().toString().substring(0, 8);
        String encodedPassword = passwordEncoder.encode(generatedPassword);

        User user;

        switch (request.getRole()) {
            case STUDENT -> {
                Student student = new Student();
                user = student;
            }

            case PROFESSOR -> {
                Professor professor = new Professor();
                user = professor;
            }

            default -> throw new IllegalArgumentException("Invalid role provided");
        }

        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole());
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        sendEmailWithPassword(request.getEmail(), generatedPassword);

        return toDTO(savedUser);
    }


    public LoginResponseDTO login(UserLoginDTO request){
        User user =  userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("utilisateur incorrect"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Mot de passe incorrect");
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("role",  user.getRole().name());
        claims.put("userId",  user.getId());
        String token = jwtService.generateToken(claims, user);
        return new LoginResponseDTO(token, user.getEmail(), user.getRole());
    }

    private UserDTO toDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .profilePictureUrl(user.getProfilePictureUrl())
                .lastLoginIp(user.getLastLoginIp())
                .lastLoginTime(user.getLastLoginTime())
                .build();
    }

    private User toEntity(UserDTO dto) {
        User user;

        switch (dto.getRole()) {
            case STUDENT -> user = new Student();
            case PROFESSOR -> user = new Professor();
            case ADMIN -> throw new UnsupportedOperationException("Admin creation is not supported here");
            default -> throw new IllegalArgumentException("Unknown role: " + dto.getRole());
        }

        user.setId(dto.getId());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setProfilePictureUrl(dto.getProfilePictureUrl());
        user.setLastLoginIp(dto.getLastLoginIp());
        user.setLastLoginTime(dto.getLastLoginTime());

        return user;
    }


    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        return userRepository.findById(id).map(this::toDTO).orElse(null);
    }

    public UserDTO saveUser(UserDTO dto) {
        User saved = userRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private void sendEmailWithPassword(String toEmail, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Votre mot de passe TEK-UP");
        message.setText("Bonjour,\n\nVotre mot de passe temporaire est : " + password +
                "\nMerci de le changer à votre première connexion.\n\nCordialement,\nBNA");
        mailSender.send(message);
    }
}

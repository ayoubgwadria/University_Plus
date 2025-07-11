package tek_up.tekuppulse.ECSR.Group.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Group.DTO.GroupRequestDTO;
import tek_up.tekuppulse.ECSR.Group.DTO.GroupResponseDTO;
import tek_up.tekuppulse.ECSR.Group.Group;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    private GroupResponseDTO toResponseDTO(Group group) {
        return GroupResponseDTO.builder()
                .id(group.getId())
                .name(group.getName())
                .level(group.getLevel())
                .year(group.getYear())
                .build();
    }

    private Group toEntity(GroupRequestDTO dto) {
        Group group = new Group();
        group.setName(dto.getName());
        group.setLevel(dto.getLevel());
        group.setYear(dto.getYear());
        return group;
    }

    public List<GroupResponseDTO> getAllGroups() {
        return groupRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public GroupResponseDTO getGroupById(Long id) {
        return groupRepository.findById(id)
                .map(this::toResponseDTO)
                .orElse(null);
    }

    public GroupResponseDTO createGroup(GroupRequestDTO dto) {
        Group group = toEntity(dto);
        Group saved = groupRepository.save(group);
        return toResponseDTO(saved);
    }

    public GroupResponseDTO updateGroup(Long id, GroupRequestDTO dto) {
        return groupRepository.findById(id).map(existingGroup -> {
            existingGroup.setName(dto.getName());
            existingGroup.setLevel(dto.getLevel());
            existingGroup.setYear(dto.getYear());
            Group updated = groupRepository.save(existingGroup);
            return toResponseDTO(updated);
        }).orElse(null);
    }

    public void deleteGroup(Long id) {
        groupRepository.deleteById(id);
    }
}

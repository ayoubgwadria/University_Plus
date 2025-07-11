package tek_up.tekuppulse.ECSR.Document.CSR;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tek_up.tekuppulse.ECSR.Document.DTO.DocumentRequestDTO;
import tek_up.tekuppulse.ECSR.Document.DTO.DocumentResponseDTO;
import tek_up.tekuppulse.ECSR.Document.Document;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository repository;

    private DocumentResponseDTO toResponseDTO(Document doc) {
        return DocumentResponseDTO.builder()
                .id(doc.getId())
                .title(doc.getTitle())
                .fileUrl(doc.getFileUrl())
                .uploadedAt(doc.getUploadedAt())
                .build();
    }

    private Document toEntity(DocumentRequestDTO dto) {
        return Document.builder()
                .title(dto.getTitle())
                .fileUrl(dto.getFileUrl())
                .uploadedAt(dto.getUploadedAt())
                .build();
    }

    public List<DocumentResponseDTO> getAllDocuments() {
        return repository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public DocumentResponseDTO getDocumentById(Long id) {
        return repository.findById(id).map(this::toResponseDTO).orElse(null);
    }

    public DocumentResponseDTO createDocument(DocumentRequestDTO dto) {
        Document saved = repository.save(toEntity(dto));
        return toResponseDTO(saved);
    }

    public DocumentResponseDTO updateDocument(Long id, DocumentRequestDTO dto) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(dto.getTitle());
            existing.setFileUrl(dto.getFileUrl());
            existing.setUploadedAt(dto.getUploadedAt());
            return toResponseDTO(repository.save(existing));
        }).orElse(null);
    }

    public void deleteDocument(Long id) {
        repository.deleteById(id);
    }
}

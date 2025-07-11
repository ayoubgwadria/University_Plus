export interface CourseMaterialRequestDTO {
  title: string;
  fileUrl: string;
  uploadedAt: string; 
  courseId?: number;
  uploadedById?: number;
}
export interface CourseMaterialDTO {
  id?: number;
  title: string;
  fileUrl: string;
  uploadedAt?: string;  
  courseId?: number;    
  uploadedById?: number;
}

export interface TaskResponseDTO {
  id?: number;
  title: string;
  description: string;
  dueDate: string;     
  courseId?: number;
  createdById?: number;
}

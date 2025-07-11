
export interface TaskRequestDTO {
  title: string;
  description: string;
  dueDate: string;     
  courseId?: number;
  createdById?: number;
}
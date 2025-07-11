export interface GradeDTO {
  id?: number;
  type: string;        
  value: number;
  outOf: number;
  date: string;        
  studentId?: number;
  courseId?: number;  
}

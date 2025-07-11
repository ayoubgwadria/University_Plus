export interface ExamPlanningDTO {
  id?: number;
  examDate: string;     
  startTime: string;    
  endTime: string;     
  room: string;
  courseId?: number;   
  groupId?: number;    
}

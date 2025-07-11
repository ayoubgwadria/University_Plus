export interface ExamPlanningRequestDTO {
  examDate: string;   
  startTime: string;   
  endTime: string;
  room: string;
  courseId: number;
  groupId: number;
}
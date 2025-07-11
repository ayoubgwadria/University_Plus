export interface ClassSessionRequestDTO {
  subjectName: string;
  date: string;           
  startTime: string;       
  endTime: string;
  room: string;
  integratedClassroom: boolean;
  teacherId?: number | null;
  groupId?: number | null;
}
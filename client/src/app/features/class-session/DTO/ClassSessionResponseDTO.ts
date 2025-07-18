export interface ClassSessionResponseDTO {
  id: number;
  subjectName: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  integratedClassroom: boolean;
  teacherId?: number | null;
  groupId?: number | null;
  absentCount?: number;
}
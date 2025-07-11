export interface UserDTO {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; 
  role: 'STUDENT' | 'PROFESSOR' | 'ADMIN' | string;
  profilePictureUrl?: string;
  lastLoginIp?: string;
  lastLoginTime?: string;
  createdAt?: string;   
  groupId?: number;  
}

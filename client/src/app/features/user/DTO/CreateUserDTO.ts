import { Role } from "../../../core/models/User";

export interface CreateUserDTO {
    email: string;
    firstName: string;
    lastName: string;
    role: Role; 
   
}
import { Role } from "../../../core/models/User";

export interface LoginResponseDTO {
  token: string;
  email: string;
  role: Role;
}

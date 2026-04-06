import type { GenericResponseDto } from "./common.dto";

// User DTO
export interface UserDTO {
    id: number;
    email: string;
    role: string;
}

// Register Response DTO
export interface RegisterResponseDto extends GenericResponseDto {
  user?: UserDTO;
}
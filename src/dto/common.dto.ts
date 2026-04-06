import type { UserDTO } from "./auth.dto";

// Generic DTO response
export interface GenericResponseDto {
  success: boolean;
  error?: string;
  details?: string;
  token?: string;
}


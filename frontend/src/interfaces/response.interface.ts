import { User } from "./user.interface";
import { Word } from "./word.interface";

export interface LoginResponse {
  success: boolean;
  data: string;
  message: string;
}

export interface RegisterResponse {
  success: boolean;
  data: Word;
  message: string;
}

export interface UserResponse {
  success: boolean;
  data: User;
  message: string;
}

export interface WordListResponse {
  success: boolean;
  data: Word[];
  message: string;
}

export interface WordResponse {
  success: boolean;
  data: Word;
  message: string;
}

export interface DeleteWordResponse {
  success: boolean;
  data: boolean;
  message: string;
}
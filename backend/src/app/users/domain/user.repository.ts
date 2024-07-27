import { UserEntity } from "./user.entity";

export interface UserRepository {
  createUser(user: UserEntity): Promise<UserEntity | null>
  findUserByUsername(username: string): Promise<UserEntity | null>
}
import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";

export class MockRepositoryImplementation implements UserRepository {
  private readonly users: UserEntity[] = [] 

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    const user = this.users.find((u) => u.username === username)
    if (!user) return null
    return Promise.resolve(user)
  }

  async createUser(user: UserEntity): Promise<UserEntity | null> {
    this.users.push(user)
    return Promise.resolve(user)
  }
}
import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import UserModel from "../user.schema"

export class MongoRepository implements UserRepository {
  constructor() {}

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    try {
      const user = await UserModel.findOne({ username })
      if (!user) return null
      return user
    } catch (error) {
      return null
    }
  }

  async createUser(userIn: UserEntity): Promise<UserEntity | null> {
    try {
      const user = await UserModel.create(userIn)
      if (!user) return null
      return user
    } catch (error) {
      return null
    }
  }
}
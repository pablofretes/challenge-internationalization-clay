import { CryptoAdapter } from "../../shared/hash";
import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import { UserValue } from "../domain/user.value";

export class UserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoAdapter: CryptoAdapter
  ) {}

  public findUserByUsername = async (username: string) => {
    try {
      const user = await this.userRepository.findUserByUsername(username)
      if (!user) null
      return user
    } catch (error) {
      throw null
    }
  }

  public createUser = async ({ username, password }: Omit<UserEntity, "uuid">) => {
    try {
      const hash = this.cryptoAdapter.hashPassword(password)
      const userValue = new UserValue({ username, password: hash })
      const user = await this.userRepository.createUser(userValue)
      if (!user) return null
      return user
    } catch (error) {
      return null
    }
  }
}
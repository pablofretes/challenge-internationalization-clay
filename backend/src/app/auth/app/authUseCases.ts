import { AuthRepository } from "../domain/auth.repository";

export class AuthUseCases {
  constructor(private readonly authRepository: AuthRepository) {}

  public hashPassword = (password: string) => {
    const hash = this.authRepository.hashPassword(password)
    return hash
  }

  public createToken = (uuid: string) => {
    const token = this.authRepository.createToken(uuid)
    return token
  }

  public verifyToken = (token: string) => {
    try {
      const isValid = this.authRepository.verifyToken(token)
      return isValid
    } catch (error) {
      console.error(error)
      throw new Error(`error: ${error}`)
    }
  }
}
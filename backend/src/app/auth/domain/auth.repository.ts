export interface AuthRepository {
  verifyToken(token: string): Boolean
  createToken(uuid: string): string
  hashPassword(password: string): string
}
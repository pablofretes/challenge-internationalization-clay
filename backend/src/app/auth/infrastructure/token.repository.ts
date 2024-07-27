import { CryptoAdapter } from "../../shared/hash";
import { JwtAdapter } from "../../shared/jwt";
import { AuthRepository } from "../domain/auth.repository";

export class TokenRepository implements AuthRepository {
  constructor(
    private readonly cryptoAdapter: CryptoAdapter,
    private readonly jwtAdapter: JwtAdapter
  ) {}

  hashPassword(password: string) {
    const hash = this.cryptoAdapter.hashPassword(password)
    return hash
  }

  createToken(uuid: string): string {
    const token = this.jwtAdapter.createToken(uuid)
    return token
  }

  verifyToken(token: string): Boolean {
    const isValid = this.jwtAdapter.validateToken(token)
    return isValid
  }
}
import jwt from 'jsonwebtoken'

export class JwtAdapter {
  public createToken(uuid: string): string {
    const token = jwt.sign(uuid, process.env.JWT_SECRET as string)
    return token
  }

  public validateToken(token: string): Boolean {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
    if (decodedToken) return true
    return false
  }
}
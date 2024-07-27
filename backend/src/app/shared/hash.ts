import crypto from 'crypto'

export class CryptoAdapter {
  public hashPassword(password: string): string {
    const iterations = 1000
    const keyLength = 64
    const algorithm = 'sha512'
    const salt = process.env.SALT as string
    const hash = crypto.pbkdf2Sync(password, salt, iterations, keyLength, algorithm).toString('hex');
    return hash
  }
}
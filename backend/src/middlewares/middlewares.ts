import { NextFunction, Request, Response } from "express";
import { TokenRepository } from "../app/auth/infrastructure/token.repository";

export class Middlewares {
  constructor(private readonly tokenRepository: TokenRepository) {
    this.verifyToken = this.verifyToken.bind(this)
  }

  public verifyToken(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization
    if (!token) return res.status(401).json({ message: "no token" })

    if (!token.includes('Bearer')) return res.status(401).json({ message: "token must comply with bearer standard" })

    token = req.headers.authorization && req.headers.authorization.replace('Bearer', '').trim()
    if (!token) return res.status(401).json({ message: "no valid token" })

    const isValid = this.tokenRepository.verifyToken(token)
    if (!isValid) return res.status(401).json({ message: "invalid token" })

    return next()
  }
}
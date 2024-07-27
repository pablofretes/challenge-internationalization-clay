import { Request, Response } from "express";
import { UserUseCases } from "../../users/application/userUseCases";
import { AuthUseCases } from "../app/authUseCases";
import { ResultFactory, ValidationError } from "express-validator";

export class AuthController {
  constructor(
    private readonly usersUseCases: UserUseCases,
    private readonly authUseCases: AuthUseCases,
    private readonly validationResult: ResultFactory<Request | ValidationError>
  ) {
    this.login = this.login.bind(this)
  }

  public async login(req: Request, res: Response) {
    const body = req.body
    try {
      const validationRes = this.validationResult(req)
      if (validationRes && !validationRes.isEmpty()) return res.status(400).json({ message: "validation errors", errors: validationRes.array() })

      const user = await this.usersUseCases.findUserByUsername(body.username)
      if (!user) return res.status(404).json({ success: false, data: null, message: 'user not found' })
        
      const hash = this.authUseCases.hashPassword(body.password)
      if (hash !== user.password) return res.status(400).json({ success: false, data: null, message: 'incorrect username or password' })
    
      const token = this.authUseCases.createToken(user?.uuid!)
      return res.status(200).json({ success: true, data: token, message: "token created!" })
    } catch (error) {
      return res.status(500).json({ success: false, data: null, message: "internal server error" })
    }
  }
}
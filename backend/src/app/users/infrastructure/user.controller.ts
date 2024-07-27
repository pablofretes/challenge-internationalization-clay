import { Request, Response } from "express";
import { UserUseCases } from "../application/userUseCases";
import { ResultFactory, ValidationError } from "express-validator";

export class UserController {
  constructor(
    private readonly userUseCases: UserUseCases,
    private readonly validationResult: ResultFactory<Request | ValidationError>
  ) {
    this.create = this.create.bind(this)
  }

  public async create(req: Request, res: Response) {
    const body = req.body
    try {
      const validationRes = this.validationResult(req)
      if (validationRes && !validationRes.isEmpty()) return res.status(400).json({ message: "validation errors", errors: validationRes.array() })

      const user = await this.userUseCases.createUser(body)
      if (!user) return res.status(400).json({ success: false, data: null, message: "user not created" })

      return res.status(201).json({ success: true, data: user, message: "user created!" })
    } catch (error) {
      return res.status(500).json({ success: false, data: null, message: "internal server error" })
    }
  }
}
import { Request, Response } from "express";
import { WordUseCases } from "../application/wordUseCases";
import { ResultFactory, ValidationError } from "express-validator";

export class WordController {
  constructor(
    private wordUseCases: WordUseCases,
    private readonly validationResult: ResultFactory<Request | ValidationError>
  ) {
    this.list = this.list.bind(this)
    this.get = this.get.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  public async list(req: Request, res: Response) {
    try {
      const words = await this.wordUseCases.findAll()
      if (!words) return res.status(400).json({ success: false, data: null, message: "words not found" })

      return res.status(200).json({ success: true, data: words, message: "words found!" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, data: null, message: "internal server error" })
    }
  }

  public async get(req: Request, res: Response) {
    const uuid = req.params.uuid
    try {
      const validationRes = this.validationResult(req)
      if (!validationRes.isEmpty()) return res.status(400).json({ message: "validation errors", errors: validationRes.array() })

      const word = await this.wordUseCases.findWordById(uuid)
      if (!word) return res.status(400).json({ success: false, data: null, message: "word not found" })

      return res.status(200).json({ success: true, data: word, message: "word found!" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, data: null, message: "internal server error" })
    }
  }

  public async create(req: Request, res: Response) {
    const body = req.body
    try {
      const validationRes = this.validationResult(req)
      if (validationRes && !validationRes.isEmpty()) return res.status(400).json({ message: "validation errors", errors: validationRes.array() })

      const word = await this.wordUseCases.createWord(body)
      if (!word) return res.status(400).json({ success: false, data: null, message: "word not created" })

      return res.status(200).json({ success: true, data: word, message: "word created!" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, data: null, message: "internal server error" })
    }
  }

  public async update(req: Request, res: Response) {
    const uuid = req.params.id
    const body = req.body
    try {
      const validationRes = this.validationResult(req)
      if (validationRes && !validationRes.isEmpty()) return res.status(400).json({ message: "validation errors", errors: validationRes.array() })

      if (!body?.translations && !body?.defaultLanguage) return res.status(400).json({ success: false, data: null, message: "one of translations or default must exist to update word" })

      const word = await this.wordUseCases.updateWord(uuid, body)
      if (!word) return res.status(400).json({ success: false, data: null, message: "word not updated" })

      return res.status(200).json({ success: true, data: word, message: "word updated!" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, data: null, message: "internal server error" })
    }
  }

  public async delete(req: Request, res: Response) {
    const uuid = req.params.id
    try {
      const validationRes = this.validationResult(req)
      if (validationRes && !validationRes.isEmpty()) return res.status(400).json({ message: "validation errors", errors: validationRes.array() })

      const word = await this.wordUseCases.deleteWord(uuid)
      if (!word) return res.status(400).json({ success: false, data: null, message: "word not deleted" })
        
      return res.status(200).json({ success: true, data: null, message: "word deleted!" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, data: null, message: "internal server error" })
    }
  }
}
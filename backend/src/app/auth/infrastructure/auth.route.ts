import { Router } from "express";
import { AuthController } from "./auth.controller";
import { UserUseCases } from "../../users/application/userUseCases";
import { AuthUseCases } from "../app/authUseCases";
import { TokenRepository } from "./token.repository";
import { CryptoAdapter } from "../../shared/hash";
import { JwtAdapter } from "../../shared/jwt";
import { body, validationResult } from "express-validator";
import { MongoRepository as UserRepository } from "../../users/infrastructure/repositories/mongo.repository";

const route = Router()

const userRepository = new UserRepository()
const tokenRepository = new TokenRepository(new CryptoAdapter, new JwtAdapter)
const userUseCases = new UserUseCases(userRepository, new CryptoAdapter)
const authUseCases = new AuthUseCases(tokenRepository)
const authController = new AuthController(userUseCases, authUseCases, validationResult)

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate a user with username and password and receive a token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "incorrect username or password"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "user not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 */
route.post(
  `/auth`,
  body("username")
    .notEmpty()
    .withMessage("username cannot be empty")
    .isLength({ min: 4, max: 20 })
    .withMessage("username must be at least 4 charactes with a max amount of 20")
    .isString()
    .withMessage("username must be a string"),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 4, max: 20 })
    .withMessage("password must be at least 4 charactes with a max amount of 20")
    .isString()
    .withMessage("password must be a string"),
  authController.login
)

export default route
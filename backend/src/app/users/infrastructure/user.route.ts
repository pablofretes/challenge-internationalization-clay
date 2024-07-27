import { Router } from "express";
import { UserUseCases } from "../application/userUseCases";
import { UserController } from "./user.controller";
import { MongoRepository } from "./repositories/mongo.repository";
import { CryptoAdapter } from "../../shared/hash";
import { body, validationResult } from "express-validator";

const route = Router()

const userRepository = new MongoRepository()
const userUseCases = new UserUseCases(userRepository, new CryptoAdapter)
const userController = new UserController(userUseCases, validationResult)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user with the provided username and password.
 *     tags:
 *       - Users
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
 *                 description: The username of the new user
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: The password of the new user
 *                 example: "securePassword123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the updated user
 *                   example: "507f1f77bcf86cd799439011"
 *                 username:
 *                   type: string
 *                   description: The username of the user
 *                   example: "newusername"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid request body"
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
route.post(`/users`,
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
userController.create)

export default route
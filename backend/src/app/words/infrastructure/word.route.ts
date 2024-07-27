import { Router } from "express";
import { WordUseCases } from "../application/wordUseCases";
import { WordController } from "./word.controller";
import { MongoRepository } from "./repositories/mongo.repository";
import { TokenRepository } from "../../auth/infrastructure/token.repository";
import { CryptoAdapter } from "../../shared/hash";
import { JwtAdapter } from "../../shared/jwt";
import { param, body, validationResult } from "express-validator";
import { Middlewares } from "../../../middlewares/middlewares";

const route = Router()

const wordRepository = new MongoRepository()
const wordUseCases = new WordUseCases(wordRepository)
const wordController = new WordController(wordUseCases, validationResult)
const instanceOfJWT = new JwtAdapter
const tokenRepository = new TokenRepository(new CryptoAdapter, instanceOfJWT)
const middlewares = new Middlewares(tokenRepository)

/**
 * @swagger
 * components:
 *   schemas:
 *     Word:
 *       type: object
 *       required:
 *         - title
 *         - translations
 *         - _id
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the word
 *         translations:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *             fr:
 *               type: string
 *             de:
 *               type: string
 *             es:
 *               type: string
 *           required:
 *             - en
 *             - fr
 *             - de
 *             - es
 *         _id:
 *           type: string
 *           description: A unique identifier for the word
 *       example:
 *         title: Hello
 *         translations:
 *           en: Hello
 *           fr: Bonjour
 *           de: Hallo
 *           es: Hola
 *         _id: 123e4567-e89b-12d3-a456-426614174000
 */

/**
 * @swagger
 * tags:
 *   name: Words
 *   description: The words managing API
 */

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Returns the list of all the words
 *     tags: [Words]
 *     responses:
 *       200:
 *         description: The list of the words
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Word'
 */
route.get(
  `/words/`,
  middlewares.verifyToken,
  wordController.list
)

/**
 * @swagger
 * /words/{title}:
 *   get:
 *     summary: Get the word by title
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The word title
 *     responses:
 *       200:
 *         description: The word description by title
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Word'
 *       404:
 *         description: The word was not found
 */
route.get(
  `/words/:id`,
  middlewares.verifyToken,
  param("id")
    .isString().withMessage('id must be a string')
    .isUUID().withMessage('id must be a uuid'),
  wordController.get
)

/**
 * @swagger
 * /words:
 *   post:
 *     summary: Create a new word
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - translations
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the word
 *               translations:
 *                 type: object
 *                 required:
 *                   - en
 *                   - fr
 *                   - de
 *                   - es
 *                 properties:
 *                   en:
 *                     type: string
 *                   fr:
 *                     type: string
 *                   de:
 *                     type: string
 *                   es:
 *                     type: string
 *             example:
 *               title: Hello
 *               translations:
 *                 en: Hello
 *                 fr: Bonjour
 *                 de: Hallo
 *                 es: Hola
 *     responses:
 *       201:
 *         description: The word was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Word'
 *       400:
 *         description: Bad request
 */
route.post(
  `/words`,
  middlewares.verifyToken,
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('translations.en').isString().notEmpty().withMessage('English translation is required'),
  body('translations.fr').isString().notEmpty().withMessage('French translation is required'),
  body('translations.de').isString().notEmpty().withMessage('German translation is required'),
  body('translations.es').isString().notEmpty().withMessage('Spanish translation is required'),
  wordController.create
)

/**
 * @swagger
 * /words/{_id}:
 *   patch:
 *     summary: Update the word by the _id
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The word _id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Word'
 *     responses:
 *       200:
 *         description: The word was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Word'
 *       404:
 *         description: The word was not found
 *       400:
 *         description: Bad request
 */
route.patch(`/words/:id`,
  middlewares.verifyToken,
  param('id').isUUID().withMessage('Invalid UUID format'),
  body('title').optional().isString().withMessage('Title must be a string'),
  body('translations.en').optional().isString().withMessage('English translation must be a string'),
  body('translations.fr').optional().isString().withMessage('French translation must be a string'),
  body('translations.de').optional().isString().withMessage('German translation must be a string'),
  body('translations.es').optional().isString().withMessage('Spanish translation must be a string'),
  wordController.update
)

/**
 * @swagger
 * /words/{uuid}:
 *   delete:
 *     summary: Remove the word by uuid
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The word uuid
 *     responses:
 *       200:
 *         description: The word was deleted
 *       404:
 *         description: The word was not found
 */
route.delete(
  `/words/:id`,
  middlewares.verifyToken,
  param("id")
    .isUUID()
    .withMessage("id must be uuid"),
  wordController.delete
)

export default route
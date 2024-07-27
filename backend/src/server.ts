import "dotenv/config";
import express, { Application } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc'
import path from 'path'
import MongoDatabase from './data/mongo/database'
import wordsRoute from './app/words/infrastructure/word.route'
import userRoute from './app/users/infrastructure/user.route'
import authRoute from './app/auth/infrastructure/auth.route'

class ServerBootstrap {
  private app: Application = express();
  private port: string = process.env.PORT || '3000'
  
  constructor() {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Challenge Documentation',
          version: '1.0.0',
          description: 'This is the API documentation'
        }
      },
    
      apis: [path.join(__dirname, '/app/**/infrastructure/*.route.ts')]
    }
    const specs = swaggerJsDoc(options)
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended:true }))
    this.app.use(cors())
    this.app.use(wordsRoute)
    this.app.use(userRoute)
    this.app.use(authRoute)
    // this.app.use(commentRoute)
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );
    new MongoDatabase
    this.listen()
  }

  listen() {
    try {
      this.app.listen(this.port, () => {
        console.log(`Server running on port: ${this.port}`)
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default ServerBootstrap
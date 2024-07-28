import mongoose from "mongoose";

class Database {
  constructor() {
    this.connectDb()
  }

  async connectDb(): Promise<void> {
    try {
      await mongoose.connect(`${process.env.MONGO_URI!}/${process.env.MONGO_DB_NAME}`)
      console.log("connected to mongo")
    } catch (error) {
      console.log("error connecting to mongo", error)
    }
  }

  async close(): Promise<void> {
    try {
      await mongoose.connection.close()
      console.log("closed mongo connection")
    } catch (error) {
      console.log("error closing mongo connection", error)
    }
  }
}

export default Database
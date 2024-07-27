const { MongoClient } = require('mongodb')
const { v4 } = require('uuid')
const crypto = require('crypto')

const generateUser = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI)
  try {
    const db = client.db('test')
    const users = await db.collection('users').find({}).toArray()
    if (users.length) await db.collection('users').drop()

    const iterations = 1000
    const keyLength = 64
    const algorithm = 'sha512'
    const salt = process.env.SALT
    const hash = crypto.pbkdf2Sync("123456", salt, iterations, keyLength, algorithm).toString('hex');
    
    const user = {
      username: "pablo",
      password: hash,
      uuid: v4()
    }
    
    await db.collection('users').insertOne(user)
    client.close()
    console.log("user generated")
    return
  } catch (error) {
    client.close()
    console.error("error generating users", error)
  }
}

const generateWords = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI)
  try {
    const db = client.db('test')
    const words = await db.collection('words').find({}).toArray()
    if (words.length) await db.collection('words').drop()
    
    const wordsToInsert = [
      {
        title: "welcome",
        translations: {
          en: "welcome",
          es: "bienvenidos",
          de: "willkommen",
          fr: "bienvenue",
        },
        uuid: v4()
      },
      {
        title: "to",
        translations: {
          en: "to",
          es: "a",
          de: "zu",
          fr: "a",
        },
        uuid: v4()
      },
      {
        title: "clay",
        translations: {
          en: "clay",
          es: "clay",
          de: "clay",
          fr: "clay",
        },
        uuid: v4()
      }
    ]
    
    await db.collection('words').insertMany(wordsToInsert)
    client.close()
    console.log("words generated")
    return
  } catch (error) {
    client.close()
    console.error("error generating words", error)
    return
  }
}

generateUser()
generateWords()
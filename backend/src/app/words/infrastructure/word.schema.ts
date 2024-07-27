import { Schema, model } from "mongoose";


const TranslationSchema = new Schema(
  {
    en: { 
      type: String,
      required: true,
      lowercase: true
    },
    fr: { 
      type: String,
      required: true,
      lowercase: true
    },
    de: { 
      type: String,
      required: true,
      lowercase: true
    },
    es: { 
      type: String,
      required: true,
      lowercase: true
    },
    
  },
  { _id: false }
)

const WordSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true
    },
    translations: {
      type: TranslationSchema,
      required: true
    },
    uuid: {
      type: String,
      unique: true,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const WordModel = model("Word", WordSchema)

export default WordModel
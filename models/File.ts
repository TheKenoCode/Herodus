import mongoose, { Schema, Document } from 'mongoose'
import { nanoid } from 'nanoid'

interface FileDocument extends Document {
  filename: string
  originalName: string
  path: string
  mimeType: string
  size: number
  uploadedAt: Date
  uploader: string // Assuming you might want to link files to the user who uploaded them
}

const FileSchema: Schema = new Schema({
  _id: { type: String, default: () => nanoid(9) },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: () => new Date() },
  uploader: { type: String, ref: 'User' }, // Reference to the user model, if you want to keep track
})

export const FileModel =
  mongoose.models.File || mongoose.model<FileDocument>('File', FileSchema)

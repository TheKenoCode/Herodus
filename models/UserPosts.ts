import mongoose, { Schema, Document } from 'mongoose'
import { nanoid } from 'nanoid'
import mongooseAutoPopulate from 'mongoose-autopopulate'

const UserPostSchema: Schema = new Schema({
  _id: { type: String, default: () => nanoid(9) },
  content: { type: String, required: true },
  author: { type: String, ref: 'User', required: true },
  createdAt: { type: Date, default: () => new Date() },
})
UserPostSchema.plugin(mongooseAutoPopulate)

export const UserPostModel =
  mongoose.models.UserPost ||
  mongoose.model<
    Document & {
      content: string
      author: string
      createdAt: Date
    }
  >('UserPost', UserPostSchema)

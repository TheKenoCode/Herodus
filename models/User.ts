import mongoose, { Schema, Document } from 'mongoose'
import { nanoid } from 'nanoid'
import mongooseAutoPopulate from 'mongoose-autopopulate'

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  EDITOR = 'editor',
  // Add other roles as needed
}

const UserSchema: Schema = new Schema({
  _id: { type: String, default: () => nanoid(9) },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  createdAt: { type: Date, default: () => new Date() },
})

UserSchema.plugin(mongooseAutoPopulate)
export const UserModel =
  mongoose.models.User ||
  mongoose.model<
    Document & {
      name: string
      email: string
      password: string
      role: UserRole
      createdAt: Date
    }
  >('User', UserSchema)

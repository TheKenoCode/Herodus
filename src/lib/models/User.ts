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
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  userLink: { type: String, default: '' },
  YHaplogroup: { type: String, default: '' },
  MtHaplogroup: { type: String, default: '' },
  imageUrl: {
    type: String,
    default:
      'https://irishparade.org/wp-content/uploads/2016/01/1024px-Gnome-stock_person.svg_.png',
  },
  coverImage: {
    type: String,
    default:
      'https://res.cloudinary.com/dso1bwkac/image/upload/v1694176794/herodus/coverPictures/pcpejn4m31ynuoxdv9z0.jpg',
  },
  following: [{ type: String, ref: 'User', autopopulate: true }],
  followers: [{ type: String, ref: 'User', autopopulate: true }],
  createdAt: { type: Date, default: () => new Date() },
})
UserSchema.plugin(mongooseAutoPopulate)

export const UserModel =
  mongoose.models.User ||
  mongoose.model<
    Document & {
      _id: string
      name: string
      email: string
      location: string
      userLink: string
      password: string
      role: UserRole
      bio: string
      YHaplogroup: string
      MtHaplogroup: string
      imageUrl: string
      coverImage: string
      following: string[]
      followers: string[]
      createdAt: Date
    }
  >('User', UserSchema)

import { prop, plugin } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'
import mongooseAutoPopulate from 'mongoose-autopopulate'

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  EDITOR = 'editor',
  // Add other roles as needed
}
@plugin(mongooseAutoPopulate as any)
export class User {
  @prop({ default: () => nanoid(9) })
  _id: string

  @prop()
  name: string

  @prop()
  email: string

  @prop()
  password: string

  @prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole

  @prop({ default: () => new Date() })
  createdAt: Date
}

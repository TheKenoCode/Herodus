import { prop, Ref, plugin } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'
import { User } from './User'
import mongooseAutoPopulate from 'mongoose-autopopulate'

@plugin(mongooseAutoPopulate as any)
export class BlogPost {
  @prop({ default: () => nanoid(9) })
  _id: string

  @prop({ required: true })
  title: string

  @prop({ required: true })
  content: string

  @prop({ autopopulate: true, ref: () => User })
  author: Ref<User>

  @prop({ default: () => new Date() })
  createdAt: Date
}

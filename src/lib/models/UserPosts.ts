import mongoose, { Document, Schema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { nanoid } from 'nanoid';

const UserPostSchema: Schema = new Schema({
  _id: { type: String, default: () => nanoid(9) },
  content: { type: String, default: '' },
  author: { type: String, ref: 'User', required: true },
  createdAt: { type: Date, default: () => new Date() },
  imageUrl: { type: String, default: '' },
  likes: [{ type: String, ref: 'User' }],
});

UserPostSchema.plugin(mongooseAutoPopulate);

export const UserPostModel =
  mongoose.models.UserPost ||
  mongoose.model<
    Document & {
      content: string;
      author: string;
      createdAt: Date;
      imageUrl: string;
      likes: string[];
    }
  >('UserPost', UserPostSchema);

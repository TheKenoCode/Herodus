import mongoose, { Document, Schema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { nanoid } from 'nanoid';

const BlogPostSchema: Schema = new Schema({
  _id: { type: String, default: () => nanoid(9) },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, ref: 'User', autopopulate: true },
  createdAt: { type: Date, default: () => new Date() },
});

BlogPostSchema.plugin(mongooseAutoPopulate);

export const BlogPostModel =
  mongoose.models.BlogPost ||
  mongoose.model<
    Document & {
      title: string;
      content: string;
      author: string;
      createdAt: Date;
    }
  >('BlogPost', BlogPostSchema);

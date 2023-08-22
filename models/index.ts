import { User } from './User'
import { BlogPost } from './BlogPost'

import { getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose' // Ensure mongoose is installed and imported

// Check if the model already exists and use that, or create a new one
const UserModel = mongoose.models.User || getModelForClass(User)
const BlogPostModel = mongoose.models.BlogPost || getModelForClass(BlogPost)

export { UserModel, BlogPostModel }

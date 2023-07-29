import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class User {
  @prop({ default: () => nanoid(9) })

  @prop()
  Name: string;

  @prop()
  username: string;

  @prop()
  email: string;

  @prop()
  password: string;
  
  @prop({ default: () => new Date() })
  createdAt: Date;
}
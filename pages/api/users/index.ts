// pages/api/todos/index.ts
import { UserModel } from "../../../models";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
interface CreateTodoBody {
  name: string;
  username: string;
  email: string;
  password: string;


}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method === "GET") {
    // for retrieving todos list
    const users = await UserModel.find({}).limit(10).lean();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    // creating a single todo
    const body = req.body as CreateTodoBody;
    const todo = new UserModel({
        name: body.name,
        username: body.username,
        email: body.email,
        password: body.password,
    });
    await todo.save();

    res.status(200).json(todo.toJSON());
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

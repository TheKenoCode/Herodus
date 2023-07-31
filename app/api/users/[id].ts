// pages/api/todos/[id].ts
import { UserModel } from "../../../models";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import { User } from "../../../models/User";
type UpdateUserBody = Partial<User>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // first connect to the database
  await connectDB();
  const id = req.query.id as string;
  if (req.method === "GET") {
    // for retrieving a single todo
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
    }
  } else if (req.method === "PUT") {
    // updating a single todo
    const body = req.body as UpdateUserBody;
    const user = await UserModel.findById(id);
    if (user) {
        user.set({ ...body });
      await user.save();
      res.status(200).json(user.toJSON());
    } else {
      res.status(404);
    }
  } else if (req.method === "DELETE") {
    // deleting a single todo
    const user = await UserModel.findByIdAndRemove(id);
    if (user) {
      res.status(200).json(user.toJSON());
    } else {
      res.status(404);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

import type { IUser } from "./user.model.js";
import { User } from "./user.model.js";
import { NotFoundError } from "../../utils/AppError.js";
import { logger } from "../../utils/logger.js";

/** Sanitized user for service return (no Mongoose doc). */
export type UserLean = Pick<IUser, "email" | "name" | "createdAt"> & {
  _id: import("mongoose").Types.ObjectId;
};

/**
 * User domain service.
 * Handles business logic for user operations.
 */
export async function getUserById(id: string): Promise<UserLean | null> {
  return User.findById(id).select("-password").lean<UserLean>().exec();
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email: email.toLowerCase() }).exec();
}

export async function getMe(userId: string): Promise<UserLean> {
  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
}

export async function createUser(data: {
  email: string;
  password: string;
  name?: string;
}): Promise<IUser> {
  const user = await User.create({
    email: data.email.toLowerCase(),
    password: data.password,
    name: data.name,
  });
  logger.info({ userId: user._id, email: user.email }, "User created");
  return user;
}

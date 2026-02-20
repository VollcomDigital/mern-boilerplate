import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { User } from "../users/user.model.js";
import { UnauthorizedError, ConflictError } from "../../utils/AppError.js";
import { getUserByEmail } from "../users/user.service.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = "7d";

/**
 * Auth domain service.
 * Handles authentication and token generation.
 */
export async function login(input: LoginInput): Promise<{ token: string; user: object }> {
  const user = await User.findOne({ email: input.email.toLowerCase() }).select("+password");
  if (!user || !(await bcrypt.compare(input.password, user.password))) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const token = jwt.sign({ userId: user._id.toString(), email: user.email }, env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
    },
  };
}

export async function register(input: RegisterInput): Promise<{ token: string; user: object }> {
  const existing = await getUserByEmail(input.email);
  if (existing) {
    throw new ConflictError("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await User.create({
    email: input.email.toLowerCase(),
    password: hashedPassword,
    name: input.name,
  });

  const token = jwt.sign({ userId: user._id.toString(), email: user.email }, env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
    },
  };
}

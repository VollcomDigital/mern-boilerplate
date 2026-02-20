import mongoose, { Schema, model, type Document, type Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    name: { type: String, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const User: Model<IUser> = mongoose.models.User ?? model<IUser>("User", userSchema);

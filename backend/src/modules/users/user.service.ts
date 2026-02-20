import type { UserDto } from '@mern/shared';

import { AppError } from '../../utils/app-error.js';
import { User, type IUser } from './user.model.js';

function toUserDto(user: IUser): UserDto {
  return {
    id: String(user._id),
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export async function getUserById(id: string): Promise<UserDto> {
  const user = await User.findById(id);

  if (!user) {
    throw AppError.notFound('User not found');
  }

  return toUserDto(user);
}

export async function getAllUsers(
  page = 1,
  limit = 20,
): Promise<{ users: UserDto[]; total: number }> {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  return {
    users: users.map(toUserDto),
    total,
  };
}

export async function updateUser(
  id: string,
  data: { name?: string; email?: string },
): Promise<UserDto> {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw AppError.notFound('User not found');
  }

  return toUserDto(user);
}

export async function deleteUser(id: string): Promise<void> {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw AppError.notFound('User not found');
  }
}

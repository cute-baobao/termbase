import { SignUpSchema } from '@/features/auth/schemas';
import { db } from '@/lib/db';

export class AuthRepository {
  static async findEmailAlreadyExists(email: string) {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    return user !== null;
  }

  static async createUser(user: SignUpSchema) {
    return await db.user.create({
      data: {
        ...user,
      },
      select: {
        id: true,
        username: true,
        email: true,
        globalRole: true,
        createdAt: true,
      },
    });
  }

  static async findUserByEmail(email: string) {
    return await db.user.findUnique({
      where: {
        email,
      }
    });
  }
}


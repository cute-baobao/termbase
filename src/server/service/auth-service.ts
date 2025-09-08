import { SignUpSchema } from '@/features/auth/schemas';
import bcrypt from 'bcryptjs';
import { AuthRepository } from '../repositories/auth-repository';

export class AuthService {
  static async findEmailAlreadyExists(email: string) {
    return await AuthRepository.findEmailAlreadyExists(email);
  }

  static async createUser(user: SignUpSchema) {
    //密码加密
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    user.password = hashedPassword;

    return await AuthRepository.createUser(user);
  }

  static async signIn(email: string, password: string) {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}


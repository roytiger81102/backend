import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/createUser.input';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { name, email, password } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}

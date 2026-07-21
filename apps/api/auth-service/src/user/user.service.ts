import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) {}

  async create(data: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Вже є таке чудо');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
      select: { id: true, email: true },
    });

    this.client.emit('user.created', {
      id: user.id,
      email: user.email,
    });

    return user;
  }
  findAll() {
    return this.prisma.user.findMany({ select: { id: true, email: true } });
  }
  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, password: true },
    });
  }
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });
  }
}

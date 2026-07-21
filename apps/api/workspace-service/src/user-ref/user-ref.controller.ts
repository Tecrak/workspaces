import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class UserRefController {
  private readonly logger = new Logger(UserRefController.name);

  constructor(private readonly prisma: PrismaService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: { id: string; email: string }) {
    this.logger.log(`Спіймав за руку user.created: ${data.email}`);

    await this.prisma.userRef.upsert({
      where: { id: data.id },
      create: { id: data.id, email: data.email },
      update: { email: data.email },
    });
  }
}

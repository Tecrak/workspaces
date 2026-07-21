import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    PassportModule,
    RabbitMQModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UserRefController } from './user-ref.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserRefController],
})
export class UserRefModule {}

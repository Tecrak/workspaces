import { Module } from '@nestjs/common';
import { WorkspaceModule } from './workspace/workspace.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { UserRefModule } from './user-ref/user-ref.module';
import { JwtStrategy } from './auth/strategy/jwt-strategy';

@Module({
  imports: [
    PrismaModule,
    WorkspaceModule,
    PassportModule,
    UserRefModule,
    CacheModule.registerAsync({
      // реєструю кеш модуль
      isGlobal: true,
      useFactory: async () => ({
        stores: [createKeyv('redis://localhost:6379')], // ОБОВЯЗКОВО порт 6379, бо в Redis в конфгах таке стоїть
        ttl: 60_000,
      }),
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}

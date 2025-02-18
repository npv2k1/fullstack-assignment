import { MenuModule } from './modules/menu/menu.module';
import { RoleModule } from './modules/role/role.module';
import { PrismaModule } from './shared/prisma';
import config from '@/common/configs/config';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/user/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    UsersModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MypageModule } from './mypage/mypage.module';
import { PrismaModule } from './prisma.module';

@Module({        //main 모듈이고 딴 모듈을 생성할때마다 여기에 저장이된다.
  imports: [
    BoardModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MypageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

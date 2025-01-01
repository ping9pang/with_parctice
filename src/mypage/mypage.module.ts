import { Module } from '@nestjs/common';
import { MypageController } from './mypage.controller';
import { MypageService } from './mypage.service';
import { PrismaModule } from 'src/prisma.module'; // 데이터베이스 접근
import { AuthModule } from 'src/auth/auth.module'; // 인증

@Module({
  controllers: [MypageController],
  providers: [MypageService],
  imports: [PrismaModule, AuthModule], // 인증 필요
})
export class MypageModule {}

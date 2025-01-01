import { Module } from '@nestjs/common';
import { MypageController } from './mypage.controller';
import { MypageService } from './mypage.service';
import { PrismaModule } from 'src/prisma.module'; 
import { AuthModule } from 'src/auth/auth.module'; 

@Module({
  controllers: [MypageController],
  providers: [MypageService],
  imports: [PrismaModule, AuthModule], 
})
export class MypageModule {}

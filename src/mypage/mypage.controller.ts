import { Controller, Get, UseGuards, Patch, Body, Req } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('mypage')
@UseGuards(JwtAuthGuard) // 본인만 접근할 수 있도록 가드 적용
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  // 사용자가 작성한 게시물 조회
  @Get('posts')
  async getMyPosts(@Req() req: Request) {
    const userId = req.user['userId']; // JWT에서 userId 추출
    return this.mypageService.getPosts(userId); // 작성한 게시물 조회
  }

  // 사용자 정보 수정
  @Patch('update-info')
  async updateUser(
    @Body('userId') userId: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
  ) {
    return this.mypageService.updateUser(userId, name, email, phone); // 사용자 정보 수정
  }
}

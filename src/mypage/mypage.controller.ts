import { Controller, Get, UseGuards, Patch, Body, Req } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('mypage')
@UseGuards(JwtAuthGuard) // 본인만 접근 적용
export class MypageController {
  constructor(private readonly mypageService: MypageService) { }


  @Get('posts')
  async getMyPosts(@Req() req) {    // 게시물 조회
    const userId = req.user.id;
    return this.mypageService.getPosts(userId); // 작성한 게시물 조회
  }

  @Patch('update-info')
  async updateUser(    // 사용자 정보 수정
    @Body('userId') userId: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
  ) {
    return this.mypageService.updateUser(userId, name, email, phone); // 정보 수정
  }
}

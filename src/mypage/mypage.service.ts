import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MypageService {
  constructor(private readonly prisma: PrismaService) { }

  async getPosts(userId: number) {  // 작성한 게시물 조회 
    return await this.prisma.board.findMany({
      where: {
        authorId: userId,
      },
      select: {
        boardId: true,
        title: true,
        description: true,
        view: true,
        like: true,
      },
    });
  }

  async updateUser(userId: number, name: string, email: string, phone: string) {   //정보 수정
    return await this.prisma.user.update({
      where: { userId },
      data: {
        name,
        email,
        phone,
      },
    });
  }
}


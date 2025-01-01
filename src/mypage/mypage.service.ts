import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MypageService {
    constructor(private readonly prisma: PrismaService) { }

    // 사용자가 작성한 게시물 조회 (조회수, 좋아요 수 포함)
    async getPosts(userId: number) {
        return await this.prisma.board.findMany({
          where: {
            authorId: userId,  // userId에 맞는 게시물을 찾으려면 authorId를 사용
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
      

    // 사용자 정보 수정
    async updateUser(userId: number, name: string, email: string, phone: string) {
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


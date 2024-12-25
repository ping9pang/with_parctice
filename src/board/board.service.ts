import { Injectable } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardService {
    constructor(private readonly prisma:PrismaService){}
    getbye(): String{
        return 'bye';
    }
    getname(): String{
        return 'haho';
    }


    async createBoard(title:string ,description:string, author:string){
        return await this.prisma.board.create({                       //create랑 update는 무조건 data를 객체사용
            data:{
                title, 
                description, 
                author
            }
        })
    }

    async getALL(){
        return await this.prisma.board.findMany({
        })
    }

    async getBoardById(boardId: number){
        return await this.prisma.board.findMany({
            where :{boardId}
        })
    }

    async updateBoard(boardId: number, title:string, description:string, author:string){
        return await this.prisma.board.update({
            where:{boardId},
            data:{
                title,
                description,
                author
            }
        })
    }
    async deleteBoard(boardId:number){
        return await this.prisma.board.delete({
            where:{boardId}
        })
    }
}

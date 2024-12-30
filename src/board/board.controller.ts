import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { title } from 'process';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller("board")
@UseGuards(JwtAuthGuard)
export class BoardController {
    constructor(private readonly boardservice: BoardService) { }

    @Get("/bye")
    getbye(): String {
        return this.boardservice.getbye();
    }

    @Post()
    async createBoard(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('author') author: string
    ) {
        return this.boardservice.createBoard(title, description, author);
    }

    @Get(":BoardId")
    async getBoardById(@Param('boardId', ParseIntPipe) boardId: number){       //param은 쿼리랑은 다르게 ?를 안쓰고 /1 < 이런식으로 1번쨰 값을 나타낼때 이렇게 사용
        return await this.boardservice.getBoardById(boardId);                  //param이 정적라우터  query는 동적라우터 생각하셈 무적건 오류나게 되어있음
    }

    @Post()
    async getALL(){    //query가 값을 스트링으로 변경시켜버리는데 ParseIntPipe를 써야 int형식으로 다시 형변환을 할수 있다.
        return await this.boardservice.getALL();
    }
    

    @Post("update")           //update , create , delete는 무조건 post방식
    async updateBoard(         //board를 업데이트 해서 새로 만든 정보를 덮어씌움
        @Body('boardId') boardId: number,
        @Body('title') title : string,
        @Body('description') description : string,
        @Body('author') author : string,){
            
        return await this.boardservice.updateBoard(boardId,title,description,author);
    }

    /*@Post("update:/boardId")            //param 형식
    async updateBoard(        
        @Param('boardId',ParseIntPipe) boardId: number,
        @Body('title') title : string,
        @Body('description') description : string,
        @Body('author') author : string,){
            
        return await this.boardservice.updateBoard(boardId,title,description,author);
    }*/

    @Post("delete")                         //http://localhost:3000/board/delete 로 들어가서 body로 가서 보드 아이디 순서를 누르고 샌드하면 됨
    async deleteBoard(@Body('boardId',ParseIntPipe) boardId: number){
        return await this.boardservice.deleteBoard(boardId);
    }

}

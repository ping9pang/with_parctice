import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from './dto/register-uesr.dto';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {   //회원가입 함수
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
        ){}

    async registerUser(registerUserDto : RegisterUserDto){
        try{
            const existUser = await this.prisma.user.findUnique({
                where: {id : registerUserDto.id}
            });
            
            if(existUser){
                throw new Error("유저가 있어요");
            }
            
            return await this.prisma.user.create({    //registeruser dto에 만들어 놓은걸 고대로 가져옴
                data: {
                    ...registerUserDto
                }
            })
        } 
        catch(error) {
            throw error;
        }
    }
    async generateJwtToken(id: string){     
        const payload={id}; //id를 payload 변수 안에 넣는다.
        return this.jwtService.sign(payload); //sign은 payload를 만든다고 생각하면댐.
    }

    async getUserByIdAndPassword(id: string, password:string){
        return await this.prisma.user.findFirst({  //먼저 찾는다  id와 password를 
            where : {id, password}
        })

    }
}


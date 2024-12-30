import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-uesr.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Resolver } from 'dns';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('register')
    async register (@Body() registerUserDto: RegisterUserDto, @Res() res: Response){
        try{
            const newUser = await this.authService.registerUser(registerUserDto);
            const token = await this.authService.generateJwtToken(newUser.id);
            res.status(201).json({
                message: "회원가입 성공",
                token: token,
                userData: newUser
            });   
        }
        catch(error){
            res.status(500).json({
                message: '회원가입 실패',
                error: error.message
            });

        }
    }
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response){
        const {id,password}= loginUserDto;
        const user = await this.authService.getUserByIdAndPassword(id,password);

        if(user){
            const token = await this.authService.generateJwtToken(user.id);

            res.json({
                message: "로그인 success",
                needsRegister: false,
                token,
                userData: user,
            });
        }else{
            res.json({
                message : "로그인 필요",
                needRegister: true
            });
        }

    }
}

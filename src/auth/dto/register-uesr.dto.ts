import { IsString } from "class-validator";

export class RegisterUserDto{
    @IsString()
    id: string;

    @IsString()
    password: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;
    
    @IsString()
    name: string;

}
import { IsString, IsTaxId } from "class-validator";

export class LoginUserDto{
    @IsString()
    id : string;

    @IsString()
    password : string;

}
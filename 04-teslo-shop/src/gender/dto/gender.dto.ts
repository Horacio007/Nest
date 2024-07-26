import { IsString, IsUUID, MinLength } from "class-validator";

export class GenderDto {

    @IsString()
    @IsUUID()
    genderId:string;
    
    @IsString()
    @MinLength(1)
    clave:string;

    @IsString()
    @MinLength(1)
    name:string;
}
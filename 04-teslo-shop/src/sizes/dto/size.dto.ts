import { Type } from "class-transformer";
import { IsString, IsUUID, MinLength } from "class-validator";

export class SizeDto {
    
    @IsString()
    @IsUUID()
    sizeId:string;

    @IsString()
    @MinLength(1)
    clave:string;

    @IsString()
    @MinLength(1)
    name:string;
}
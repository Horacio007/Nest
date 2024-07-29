import { Type } from "class-transformer";
import { IsString, IsUUID, MinLength } from "class-validator";
import { ISize } from "../interfaces/size.interface";

export class SizeDto implements ISize {
    
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
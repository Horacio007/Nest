import { IsString, IsUUID, MinLength } from "class-validator";
import { IGender } from "../interfaces/gender.interface";

export class GenderDto implements IGender {

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
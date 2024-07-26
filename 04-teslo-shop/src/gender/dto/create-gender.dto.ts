import { IsString, MinLength } from "class-validator";

export class CreateGenderDto {
    
    @IsString()
    @MinLength(1)
    clave:string;

    @IsString()
    @MinLength(1)
    name:string;
}

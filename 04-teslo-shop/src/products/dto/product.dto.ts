import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min, MinLength, ValidateNested } from "class-validator";
import { GenderDto } from "src/gender/dto/gender.dto";
import { SizeDto } from "src/sizes/dto/size.dto";

export class ProductDto {

    @IsString()
    @IsUUID()
    genderId:string;
    
    @IsString()
    @MinLength(1)
    title:string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?:number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    description?:string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    slug?:string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?:number;

    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested({each:true})
    @Type(() => SizeDto)
    sizes: SizeDto[];

    @Type(() => GenderDto)
    @ValidateNested()
    gender:GenderDto;

}

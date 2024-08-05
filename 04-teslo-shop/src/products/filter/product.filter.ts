import { IsOptional, IsString, IsUUID } from "class-validator";

export class ProductFilter {
    
    @IsString()
    //@IsUUID()
    @IsOptional()
    productId?:string;
    
    @IsString()
    @IsOptional()
    slug?:string;
}
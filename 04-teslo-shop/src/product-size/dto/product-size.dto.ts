import { IsString, IsUUID } from "class-validator";

export class ProductSizeDto {

    @IsString()
    @IsUUID()
    productSizeId:string;

    @IsString()
    @IsUUID()
    productId:string;

    @IsString()
    @IsUUID()
    sizeId:string;
}

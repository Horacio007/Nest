import { IsString, IsUUID } from "class-validator";

export class CreateProductSizeDto {

    @IsString()
    @IsUUID()
    productId:string;

    @IsString()
    @IsUUID()
    sizeId:string;
}

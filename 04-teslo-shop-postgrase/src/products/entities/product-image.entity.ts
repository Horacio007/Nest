import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./index";

@Entity()
export class ProductImage{
    
    @PrimaryGeneratedColumn('uuid')
    imageId:string;

    @Column('text')
    url:string;

    @ManyToOne(
        () => Product,
        (product) => product.images
    )
    @JoinColumn({  name: "productId" })
    product:Product;
}
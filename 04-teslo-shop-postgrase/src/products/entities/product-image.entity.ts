import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./index";

@Entity({name: 'product_images'})
export class ProductImage{
    
    @PrimaryGeneratedColumn('uuid')
    imageId:string;

    @Column('text')
    url:string;

    @ManyToOne(
        () => Product,
        (product) => product.images,
        {onDelete: 'CASCADE'}
    )
    @JoinColumn({  name: "productId" })
    product:Product;
}
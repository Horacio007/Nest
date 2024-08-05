import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class ProductSize {
    @PrimaryGeneratedColumn('uuid')
    productSizeId: string;

    @Column('uuid')
    productId:string;

    @Column('uuid')
    sizeId:string;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @Column('varchar',{
        unique:true,
        length:50
    })
    title:string;
}

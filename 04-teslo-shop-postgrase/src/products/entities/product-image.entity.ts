import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductImage{
    
    @PrimaryGeneratedColumn('uuid')
    imageId:string;

    @Column('text')
    url:string;
}
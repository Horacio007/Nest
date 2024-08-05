import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gender {

    @PrimaryGeneratedColumn('uuid')
    genderId: string;

    @Column('varchar',{
        length:5,
        unique:true
    })
    clave:string;

    @Column('varchar',{
        length:20,
        unique:true
    })
    name:string;
}

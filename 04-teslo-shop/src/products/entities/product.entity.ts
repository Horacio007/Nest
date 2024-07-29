import { Gender } from "src/gender/entities/gender.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @Column('varchar',{
        unique:true,
        length:50
    })
    title:string;

    @Column('decimal',{
        scale:4,
        precision:16
    })
    price:number;

    @Column('varchar',{
        length:100,
        nullable: true
    })
    description:string;

    @Column('varchar',{
        length:50,
        unique: true
    })
    slug:string;

    @Column('int',{
        default:0
    })
    stock:number;

    @Column({ type: 'uuid' })
    genderId: string;
    
    // tags
    // images
}

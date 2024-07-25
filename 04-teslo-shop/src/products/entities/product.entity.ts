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

    @Column('simple-array',{
        select: false
    })
    sizes:string[];

    @Column('varchar',{
        length:10
    })
    gender:string;
    
    // tags
    // images
}

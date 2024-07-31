import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @Column('varchar',{
        unique:true,
        length:50
    })
    title:string;

    @Column('float',{
        default:0
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

    @Column('text',{
        array:true
    })
    sizes:string[];

    @Column('text')
    gender: string;

    @BeforeInsert()
    checkSlugBeforeInsert() {
        if (!this.slug) this.slug = this.title;
     
        this.slug = this.slug
          .toLowerCase()
          .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?/\s/]/g, '-');
    }
    
    // tags
    // images
}

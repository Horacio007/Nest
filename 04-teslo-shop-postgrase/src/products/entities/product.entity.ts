import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./index";

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

    @Column('text',{
        array:true,
        default:[]
    })
    tags:string[];

    @OneToMany(
        () => ProductImage, 
        (productImage) => productImage.product,
        {
            cascade: true
        }
    )
    images?:ProductImage;

    @BeforeInsert()
    checkSlugBeforeInsert() {
        if (!this.slug) this.slug = this.title;
     
        this.slug = this.slug
          .toLowerCase()
          .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?/\s/]/g, '-');
    }

    @BeforeUpdate()
    checkSlugBeforeUpdate() {
        this.slug = this.slug
          .toLowerCase()
          .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?/\s/]/g, '-');
    }

}

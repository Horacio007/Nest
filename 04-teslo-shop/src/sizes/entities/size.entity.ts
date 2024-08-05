import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Size {
    
    @PrimaryGeneratedColumn('uuid')
    sizeId:string;

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

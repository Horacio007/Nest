import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar',{
        length: 50,
        unique: true
    })
    email: string;

    @Column('text',{
        select: false
    })
    password: string;

    @Column('varchar',{
        length: 50
    })
    fullName: string;

    @Column('bool',{
        default: true
    })
    isActive: boolean;

    @Column('text',{
        array: true,
        default: ['user']
    })
    roles: string[];
}

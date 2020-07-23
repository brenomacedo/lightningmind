import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity({ name: "user" })
export default class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    descriptiion!: string
    
    @Column()
    login!: string

    @Column()
    password!: string

    @Column()
    email!: string
}
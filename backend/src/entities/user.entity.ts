import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm'
import bcrypt from 'bcrypt'
import Post from './post.entity'

@Entity({ name: "user" })
export default class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string
    
    @Column()
    login!: string

    @Column()
    password!: string

    @Column()
    email!: string

    @Column()
    image!: string

    @OneToMany(type => Post, post => post.user)
    posts: Post[]

    // @BeforeInsert()
    // async passwordEncrypting() {
    //     this.password = await bcrypt.hash(this.password, 10)
    // }
}
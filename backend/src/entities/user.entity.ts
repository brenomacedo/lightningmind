import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
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

    @OneToMany(type => Post, post => post.user)
    posts: Post[]
}
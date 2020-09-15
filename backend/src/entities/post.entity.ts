import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import User from './user.entity'

@Entity({ name: "post" })
export default class PostEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    description!: string
    
    @Column()
    views!: number

    @Column()
    videoURL!: string

    @Column()
    userId: number

    @Column()
    usersLikes: string

    @ManyToOne(type => User, user => user.posts)
    user: User
}
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
} from "typeorm";

import User from './User'
@Entity()
export default class Playlist extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    name!: string;

    @Column(() => User)
    creator: User;

    @Column()
    spotifyId!: string;

    @Column()
    picture!: string;

    @ManyToMany(() => User, user => user.playlists)
    users: User[]
}
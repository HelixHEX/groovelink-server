import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";
import Playlist from "./Playlist";

type song = {
    name: string;
    artist: string;
    duration: string;
  };

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column('text', {nullable: true})
    name: string | null;

    @Column('text', {nullable: true})
    email: string | null;

    @Column('text', {nullable: true})
    picture: string | null;

    @Column()
    spotifyId!: string;

    @ManyToMany(() => User, user => user.friends)
    @JoinTable()
    friends: User[]

    @ManyToMany(() => Playlist, playlist => playlist.users)
    @JoinTable()
    playlists: Playlist[]

    @Column("jsonb", { nullable: true, default: [] })
    highlightedsongs: song[];
}
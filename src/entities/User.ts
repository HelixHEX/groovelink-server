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
    artists: any[];
    spotifyId: string;
  };

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    name!: string;

    @Column()
    age!: number;

    @Column()
    city!: string;

    @Column()
    state!: string;

    @Column()
    email!: string;

    @Column('text', {nullable: true})
    picture: string | null;

    @Column()
    spotifyId!: string;

    @ManyToMany(() => User, user => user.friends, {onDelete: "CASCADE"})
    @JoinTable()
    friends: User[]

    @ManyToMany(() => Playlist, playlist => playlist.users, {onDelete: "CASCADE"})
    @JoinTable()
    playlists: Playlist[]

    @Column("jsonb", { nullable: true, default: [] })
    highlightedsongs: song[];

    @ManyToMany(() => User, user => user.added, {onDelete: "CASCADE"})
    @JoinTable()
    added: User[]
}
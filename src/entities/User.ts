import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    // RelationCount
} from "typeorm";
// import Friendship from "./Friendship";
// import Playlist from "./Playlist";

type song = {
    name: string;
    artists: any[];
    spotifyId: string;
};

type chat = {
    chatid: string;
    users: User[]
}

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

    @Column('text', { nullable: true })
    picture: string | null;

    @Column()
    spotifyId!: string;

    // @ManyToMany(() => User, user => user.friends, {onDelete: "CASCADE", onUpdate: 'CASCADE'})
    // @JoinTable()
    // friends: User[]
    // @ManyToMany(() => User)
    // @JoinTable()
    // friends: User[]
    @ManyToMany(() => User, user => user.following)
    @JoinTable()
    followers: User[]

    @ManyToMany(() => User, user => user.followers)
    following: User[]
  

    @Column("jsonb", { nullable: true, default: [] })
    highlightedsongs: song[];

    @Column('jsonb', {nullable: true, default: []})
    chats: chat[];

    @ManyToMany(() => User, user => user.beenSkippedBy)
    @JoinTable()
    hasSkipped: User[]

    @ManyToMany(() => User, user => user.hasSkipped)
    beenSkippedBy: User[]

    // @RelationCount((user: User) => user.followers)
    // followersCount: number;

    // @RelationCount((user: User) => user.following)
    // followingCount: number;
}
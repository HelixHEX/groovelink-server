import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    // OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column('text', {nullable: true, default: 'test'})
    name: string | null;

    @Column('text', {nullable: true, default: 'test'})
    email: string | null;

    @Column('text', {nullable: true, default: 'test'})
    picture: string | null;

    @Column()
    spotifyId!: string;

    @ManyToMany(() => User, user => user.friends)
    @JoinTable()
    friends: User[]
}
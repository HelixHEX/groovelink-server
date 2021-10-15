import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";
import User from './User'

@Entity()
export default class Friendship extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
}
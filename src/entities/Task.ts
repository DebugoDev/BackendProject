import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import User from "./User";
import BaseEntity from "./BaseEntity";

@Entity("task")
export default class Task extends BaseEntity {
    @Column()
    title?: string;

    @Column()
    description?: string;

    @Column({ default: false })
    done?: boolean;

    @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
    user?: User;
}
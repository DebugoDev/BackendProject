import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from "./BaseEntity";
import Task from "./Task";

@Entity("user")
export default class User extends BaseEntity {
    @Column()
    username?: string;

    @Column()
    password?: string;

    @OneToMany(() => Task, (task) => task.user, { cascade: true })
    tasks?: Task[];
}
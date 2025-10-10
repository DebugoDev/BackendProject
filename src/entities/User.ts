import { Column, Entity } from "typeorm";
import BaseEntity from "./BaseEntity";

@Entity("user")
export default class User extends BaseEntity {
    @Column()
    username?: string;

    @Column()
    password?: string;
}
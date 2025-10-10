import { PrimaryGeneratedColumn } from "typeorm";

export default abstract class BasEntity {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
}
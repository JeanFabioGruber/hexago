import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserORM } from "./UserORM";
import { Car } from "../domain/Car";

@Entity()
export class CarsORM implements Car {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column()
  color!: string;

  @ManyToOne(() => UserORM, (user) => user.cars, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: UserORM;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

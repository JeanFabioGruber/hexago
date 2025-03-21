import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Produto } from "../domain/Produto";

@Entity("produtos")
export class ProdutoORM implements Produto {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column()
    nome!: string;
    @Column()
    descricao!: string;
    @Column()
    preco!: number;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}
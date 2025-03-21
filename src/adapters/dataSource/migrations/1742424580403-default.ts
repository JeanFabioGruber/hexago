import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1742424580403 implements MigrationInterface {
    name = 'Default1742424580403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_orm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0cdf47b1b57fb6d0fc367cecd7e" UNIQUE ("email"), CONSTRAINT "PK_4fdc636f375e88848512de33d6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars_orm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "brand" character varying NOT NULL, "color" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_269b5b8f835a9ed6ca2abab56b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "preco" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars_orm" ADD CONSTRAINT "FK_20bb260f02ecc5360b8516744ed" FOREIGN KEY ("user_id") REFERENCES "user_orm"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars_orm" DROP CONSTRAINT "FK_20bb260f02ecc5360b8516744ed"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "cars_orm"`);
        await queryRunner.query(`DROP TABLE "user_orm"`);
    }

}

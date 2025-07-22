import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrations1753169375349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `CREATE TABLE users (
                uuid varchar(26) PRIMARY KEY ,
                email varchar(255) NOT NULL ,
                password text NOT NULL 
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

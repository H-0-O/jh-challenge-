import { Migration } from '@mikro-orm/migrations';

export class Migration20250722094729 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tags" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "name" varchar(50) not null);`);

    this.addSql(`create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "email" varchar(255) not null, "password" text not null);`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "tags" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);
  }

}

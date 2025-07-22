import { Migration } from '@mikro-orm/migrations';

export class Migration20250722102443 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "questions" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "title" varchar(200) not null, "description" text not null, "user_id" int not null);`);

    this.addSql(`alter table "questions" add constraint "questions_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "questions" cascade;`);
  }

}

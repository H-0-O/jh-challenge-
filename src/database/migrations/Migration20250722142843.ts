import { Migration } from '@mikro-orm/migrations';

export class Migration20250722142843 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "votes" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "user_id" int not null, "answer_id" int not null, "value" text check ("value" in ('+1', '-1')) not null);`);

    this.addSql(`alter table "votes" add constraint "votes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "votes" add constraint "votes_answer_id_foreign" foreign key ("answer_id") references "answers" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "votes" cascade;`);
  }

}

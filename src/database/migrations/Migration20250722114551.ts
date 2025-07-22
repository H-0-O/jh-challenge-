import { Migration } from '@mikro-orm/migrations';

export class Migration20250722114551 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "answers" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "content" text not null, "correct" boolean not null, "user_id" int not null, "question_id" int not null);`);

    this.addSql(`alter table "answers" add constraint "answers_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "answers" add constraint "answers_question_id_foreign" foreign key ("question_id") references "questions" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "answers" cascade;`);
  }

}

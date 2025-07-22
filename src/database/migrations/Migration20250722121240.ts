import { Migration } from '@mikro-orm/migrations';

export class Migration20250722121240 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tags_questions" ("tag_id" int not null, "question_id" int not null, constraint "tags_questions_pkey" primary key ("tag_id", "question_id"));`);

    this.addSql(`create table "questions_tags" ("question_id" int not null, "tag_id" int not null, constraint "questions_tags_pkey" primary key ("question_id", "tag_id"));`);

    this.addSql(`alter table "tags_questions" add constraint "tags_questions_tag_id_foreign" foreign key ("tag_id") references "tags" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "tags_questions" add constraint "tags_questions_question_id_foreign" foreign key ("question_id") references "questions" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "questions_tags" add constraint "questions_tags_question_id_foreign" foreign key ("question_id") references "questions" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "questions_tags" add constraint "questions_tags_tag_id_foreign" foreign key ("tag_id") references "tags" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "answers" alter column "correct" type boolean using ("correct"::boolean);`);
    this.addSql(`alter table "answers" alter column "correct" set default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "tags_questions" cascade;`);

    this.addSql(`drop table if exists "questions_tags" cascade;`);

    this.addSql(`alter table "answers" alter column "correct" drop default;`);
    this.addSql(`alter table "answers" alter column "correct" type boolean using ("correct"::boolean);`);
  }

}

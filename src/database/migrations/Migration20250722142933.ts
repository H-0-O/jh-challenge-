import { Migration } from '@mikro-orm/migrations';

export class Migration20250722142933 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "votes" add constraint "votes_user_id_answer_id_unique" unique ("user_id", "answer_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "votes" drop constraint "votes_user_id_answer_id_unique";`);
  }

}

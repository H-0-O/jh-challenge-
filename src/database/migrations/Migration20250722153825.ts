import { Migration } from '@mikro-orm/migrations';

export class Migration20250722153825 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create index "tags_name_index" on "tags" ("name");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index "tags_name_index";`);
  }

}

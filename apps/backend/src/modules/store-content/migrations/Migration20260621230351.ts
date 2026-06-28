import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260621230351 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "menu_item" ("id" text not null, "label" text not null, "url" text not null, "location" text check ("location" in ('header', 'footer')) not null, "rank" integer not null default 0, "new_tab" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "menu_item_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_menu_item_deleted_at" ON "menu_item" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "menu_item" cascade;`);
  }

}

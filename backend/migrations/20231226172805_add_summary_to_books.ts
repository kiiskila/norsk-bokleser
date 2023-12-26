import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("books", function (table) {
    table.text("summary_english").nullable();
    table.text("summary_norwegian").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("books", function (table) {
    table.dropColumn("summary_english");
    table.dropColumn("summary_norwegian");
  });
}

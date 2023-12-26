import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("books", (table) => {
    table.increments("id").unsigned().primary();
    table.string("slug").unique();
    table.string("title");
    table.specificType("author", "text[]");
    table.string("isbn").unique();
    table.string("cover_art");
    table.timestamp("published_date");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("books");
}

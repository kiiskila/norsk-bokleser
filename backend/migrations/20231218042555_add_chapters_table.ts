import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("chapters", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("book_id").unsigned().notNullable();
    table.foreign("book_id").references("books.id").onDelete("CASCADE");
    table.integer("number").unsigned().notNullable();
    table.unique(["book_id", "number"]);
    table.string("title");
    table.text("body", "longtext");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("chapters");
}

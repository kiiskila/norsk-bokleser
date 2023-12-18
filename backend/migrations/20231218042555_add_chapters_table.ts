import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("chapters", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("book_id").unsigned().notNullable();
    table.foreign("book_id").references("books.id");
    table.integer("number").unsigned().unique().notNullable();
    table.string("title");
    table.text("body", "longtext");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("chapters");
}

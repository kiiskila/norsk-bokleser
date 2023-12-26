import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("email_logs", (table) => {
    table.increments("id").unsigned().primary();
    table
      .enum("type", ["request", "report"], {
        useNative: true,
        enumName: "EmailType",
      })
      .notNullable();
    table.text("details").notNullable();
    table.string("contact_email");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("email_logs");
  await knex.raw(`DROP TYPE "EmailType";`);
}

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const channel = sqliteTable("channel", {
  channelId: text({
    length: 24,
  })
    .primaryKey()
    .notNull(),
  nameKor: text().notNull(),
  names: text({ mode: "json" }).$type<string[]>().notNull(),
  channelAddr: text().notNull(),
  handleName: text().notNull(),
  waiting: integer({ mode: "boolean" }).notNull(),
  alive: integer({ mode: "boolean" }).notNull(),
  createdAt: text(),
});

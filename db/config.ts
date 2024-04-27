import { column, defineDb, defineTable } from "astro:db";

const Level = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    width: column.number(),
    height: column.number(),
    map: column.text(),
    moves: column.number(),
    pushes: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Level,
  },
});

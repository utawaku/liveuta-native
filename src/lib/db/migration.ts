// import { resourceDir } from "@tauri-apps/api/path";
// import { readDir, readTextFile } from "@tauri-apps/plugin-fs";
// import { sqlite } from ".";

// export type ProxyMigrator = (migrationQueries: string[]) => Promise<void>;

// export async function migrate() {
//   const resourcePath = await resourceDir();
//   const files = await readDir(`${resourcePath}/migrations`);
//   let migrations = files
//     .filter((migration) => migration.name.endsWith(".sql"))
//     .sort((a, b) => {
//       const aVersion = parseInt(a.name.split("_")[0]);
//       const bVersion = parseInt(b.name.split("_")[0]);
//       return aVersion - bVersion;
//     });

//   // const createMigrationsTable =
//   //   "CREATE TABLE IF NOT EXISTS migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, version INTEGER NOT NULL);";
//   // await sqlite.execute(createMigrationsTable);

//   const migrated = (await sqlite.select(
//     `SELECT * FROM migrations ORDER BY version DESC`,
//   )) as unknown as { id: number; version: number }[];
//   const hasMigrated = (version: number) => migrated.some((m) => m.version === version);

//   for (const migration of migrations) {
//     const migrationVersion = parseInt(migration.name.split("_")[0]);

//     if (hasMigrated(migrationVersion)) {
//       continue;
//     }

//     const migrationQueries = await readTextFile(`${resourcePath}/migrations/${migration.name}`);
//     console.log(migrationQueries);
//   }
// }

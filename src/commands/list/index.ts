import { readMapConfig } from "../../utlis";
import Table from "cli-table";

export default async function run(): Promise<void> {
  const config = readMapConfig();
  const table = new Table({
    head: ["alias name", "source"],
  });

  table.push(...Object.entries(config));

  console.log(table.toString());
}

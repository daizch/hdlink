import { program } from "commander";
// import { addCommand, removeCommand, listCommand } from "./commands";
import addCommand, { AddCommandOptions } from "./commands/add";
import removeCommand from "./commands/remove";
import listCommand from "./commands/list";
import syncCommand, { SyncCommandOptions } from "./commands/sync";
import { IPackageJson } from "package-json-type";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson: IPackageJson = require("../package.json");
const progVersion = packageJson.version || "Unknown";

program.version(progVersion);

async function runCommand(commandHandler: () => Promise<void>) {
  try {
    await commandHandler();
  } catch (err) {
    console.error(err);
  }
}

program
  .command("add")
  .alias("a")
  .description(`add folder as source folder`)
  .option("-n, --name [name]", "alias name for source folder")
  .option("-s, --source [source]", "source folder to be synced")
  .action(async function (options: AddCommandOptions) {
    runCommand(async () => {
      await addCommand(options);
    });
  });

program
  .command("remove <name>")
  .alias("rm")
  .description(`remove linked source folder`)
  .action(async function (name: string) {
    runCommand(async () => {
      await removeCommand(name);
    });
  });

program
  .command("list")
  .alias("ls")
  .description(`list details about the linked folders`)
  .action(async function () {
    runCommand(listCommand);
  });

program
  .description(`sync up source folder to target folder`)
  .option("-n, --name [name]", "alias name of source folder")
  .option("-s, --source [source]", "source folder to be synced")
  .option("-d, --dest [dest]", "destination folder")
  .option(
    "-w, --watch",
    "watching source folder and sync up the change once source folder got changed"
  )
  .option("-si, --silent", "output the log of the synced files/folders")
  .option("-e, --exclude [exclude]", "exclude the file/folder to be synced")
  .action(async function (options: SyncCommandOptions) {
    runCommand(async () => {
      await syncCommand(options);
    });
  });

program.parse();

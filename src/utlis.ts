import * as os from "os";
import * as path from "path";
import * as fs from "fs-extra";
import { GLOBAL_LINK_MAP_PATH } from "./constants";

const globalConfigPath = resolvePath(GLOBAL_LINK_MAP_PATH);
export function resolvePath(filepath: string): string {
  filepath = filepath.trim();

  if (filepath.startsWith("~/")) {
    return path.resolve(os.homedir(), filepath.slice(2));
  }

  return path.resolve(filepath);
}

export function saveSourcetoMapConfig(source = ".", name?: string) {
  source = resolvePath(source);
  name = name || path.basename(source);

  const config = readMapConfig();
  config[name] = source;

  writeMapConfig(config);

  console.log(`Added below into hardlink map
  source: ${source} 
  name: ${name}
try the below CLI to have a hard link:
  $ ilink -s ${name} -w`);
}

export function writeMapConfig(config: Record<string, string>) {
  fs.ensureFileSync(globalConfigPath);
  fs.writeFileSync(globalConfigPath, JSON.stringify(config, null, 2));
}

export function readMapConfig() {
  try {
    fs.ensureFileSync(globalConfigPath);
    const rawContent = fs.readFileSync(globalConfigPath, {
      encoding: "utf-8",
    });
    return JSON.parse(rawContent || "{}");
  } catch (err) {
    throw new Error(`Cannot read config, IO error. ${err}`);
  }
}

export function getSourcetypeMapConfig(name: string): string {
  const config = readMapConfig();

  if (!config[name]) {
    throw new Error(`source ${name} is not found`);
  }

  return config[name];
}

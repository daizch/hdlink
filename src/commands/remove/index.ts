import { readMapConfig, writeMapConfig } from "../../utlis";

export default async function run(name: string): Promise<void> {
  const config = readMapConfig();

  for (const [key, value] of Object.entries(config)) {
    if (key === name || value === name) {
      delete config[key];
      writeMapConfig(config);
      console.log(`successfully removed ${key} ${value}`);

      break;
    }
  }
}

import { saveSourcetoMapConfig } from "../../utlis";

export interface AddCommandOptions {
  name?: string;
  source?: string;
}

export default async function run({
  name,
  source = "."
}: AddCommandOptions): Promise<void> {
    saveSourcetoMapConfig(source, name);
}

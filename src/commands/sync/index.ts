import syncDirectory from "sync-directory";
import { resolvePath } from "../../utlis";
import { getSourcetypeMapConfig } from "../../utlis";

export interface SyncCommandOptions {
  name?: string;
  watch?: boolean;
  silent?: boolean;
  exclude?: string;
  type?: string;
  source?: string;
  dest?: string;
}

export default async function run({
  name,
  watch = false,
  silent = false,
  exclude,
  type = "hardlink",
  source,
  dest='.',
}: SyncCommandOptions): Promise<void> {
  if (!name && !source) {
    throw new Error(`source not found`);
  }

  if (name) {
    source = getSourcetypeMapConfig(name);
  } else if (!/\//.test(source as string)) {
    //alias name
    source = getSourcetypeMapConfig(source as string);
  }

  source = resolvePath(source as string);
  dest = resolvePath(dest);

  const options: any = {
    watch,
    type,
    afterEachSync: ({ nodeType, srcPath, targetPath }: any) => {
      if (!silent) {
        console.log(`synced ${nodeType} ${srcPath} to ${targetPath}`);
      }
    },
  };
  if (exclude) {
    options.exclude = exclude;
  }

  syncDirectory(source, dest, options);
}

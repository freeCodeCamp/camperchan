import { readFile, readdir, stat } from "fs/promises";
import { join } from "path";

import { logHandler } from "../src/utils/logHandler";

const loadDirectory = async (path: string): Promise<string[]> => {
  const files: string[] = [];
  const status = await stat(path);
  if (status.isDirectory()) {
    const filesInDir = await readdir(path);
    for (const file of filesInDir) {
      files.push(...(await loadDirectory(join(path, file))));
    }
  } else {
    files.push(path);
  }
  return files;
};

(async () => {
  const checkNycOutput = process.argv.includes("--post-coverage");
  const src = await loadDirectory(join(process.cwd(), "src"));
  const test = await loadDirectory(join(process.cwd(), "test"));
  if (!checkNycOutput) {
    const filesUntested = src.filter(
      (file) =>
        // exclude files in the src/interface directory as types do not need testing
        !/src\/index\.ts/.test(file) &&
        !/src\/interface/.test(file) &&
        !test.includes(file.replace("src", "test").replace(".ts", ".spec.ts"))
    );
    if (filesUntested.length) {
      logHandler.error(
        `The following files do not have a corresponding spec:\n${filesUntested.join(
          "\n"
        )}`
      );
      process.exit(1);
    }
    logHandler.info("All files have a corresponding spec.");
    return;
  }
  const nycProcessData = await readFile(
    join(process.cwd(), ".nyc_output", "processinfo", "index.json"),
    "utf-8"
  );
  const nycProcessInfo = JSON.parse(nycProcessData);
  const coveredFileList = Object.keys(nycProcessInfo.files);
  const nonCoveredFiles = src.filter(
    (file) =>
      // exclude files in the src/interface directory as types do not need testing
      // and ignore the index file because that will not be tested
      !/src\/index\.ts/.test(file) &&
      !/src\/interface/.test(file) &&
      !coveredFileList.includes(file)
  );
  if (nonCoveredFiles.length) {
    logHandler.error(
      `The following files were not found in the coverage report:\n${nonCoveredFiles.join(
        "\n"
      )}`
    );
    process.exit(1);
  }
  logHandler.info("All files are covered by the coverage report.");
})();

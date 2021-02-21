import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';

/**
 * Traverse folder (recursive)
 *
 * @export
 * @param {string} srcPath source path
 * @param {(path: string, item: Dirent) => Promise<void>} [callback] executed on each entry
 * @return {*}  {Promise<void>}
 */
export async function traverse(
  srcPath: string,
  callback?: (path: string, item: Dirent) => Promise<void>
): Promise<void> {
  const entries = await fs.readdir(srcPath, { withFileTypes: true });
  for (const entry of entries) {
    if (callback) {
      const entryPath = path.join(srcPath, entry.name);
      await callback(entryPath, entry);
      if (entry.isDirectory()) {
        await traverse(entryPath, callback);
      }
    }
  }
}

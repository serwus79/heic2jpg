import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import convert from 'heic-convert';
import path from 'path';

import { traverse } from '../methods/traverse';

export async function processDirectory(directoryPath: string): Promise<void> {
  console.log('start', directoryPath);
  if (!existsSync(directoryPath)) {
    console.error(`Directory not exists: ${directoryPath}`);
    throw new Error(`Directory not exists: ${directoryPath}`);
  }
  let summary = { files: 0, folders: 0, heic: 0, converted: 0 };
  await traverse(directoryPath, async (entryPath, entry) => {
    console.log('check', entryPath);
    if (entry.isFile()) {
      summary.files++;
      if (path.extname(entry.name).toLowerCase() === '.heic') {
        summary.heic++;
        const dirName = path.dirname(entryPath);
        const outputName = entry.name + '.jpg';
        const outputPath = path.join(dirName, outputName);
        if (existsSync(outputPath)) {
          console.log('  already converted, skip');
          return;
        }
        try {
          console.log('  convert...');
          const buffer = await readFile(entryPath);
          const outputBuffer = await convert({
            buffer, // the HEIC file buffer
            format: 'JPEG', // output format
            quality: 1 // the jpeg compression quality, between 0 and 1
          });
          await writeFile(outputPath, outputBuffer);
          console.log(`  done ${outputPath}`);
          summary.converted++;
        } catch (err) {
          console.error('cannot convert', entryPath, err);
        }
        return;
      }
    }

    if (entry.isDirectory()) {
      summary.folders++;
    }
  });
  console.log('total:', summary);
}

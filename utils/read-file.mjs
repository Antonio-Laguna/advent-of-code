import fs from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function readFile(fileName) {
  return fs.readFile(resolve(__dirname, `../${fileName}`), 'utf8');
}

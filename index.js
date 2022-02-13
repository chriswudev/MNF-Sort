import { readFile } from 'fs/promises';
import fs from 'fs';

import { sort } from './libs.js';

const json = JSON.parse(
  await readFile(new URL('./input.json', import.meta.url))
);

const result = sort(json.data);
let output = JSON.stringify(result, null, 2);
fs.writeFileSync('output.json', output);

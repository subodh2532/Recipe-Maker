import fs from 'node:fs';

const file = 'package.json';
const content = fs.readFileSync(file, 'utf8');

try {
  JSON.parse(content);
  console.log('package.json is valid JSON');
} catch (error) {
  console.error('Invalid package.json JSON syntax');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

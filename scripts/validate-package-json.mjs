import fs from 'node:fs';

const file = 'package.json';
const content = fs.readFileSync(file, 'utf8');

const hasLiteralEscapedNewlines = content.includes('\\n');

try {
  JSON.parse(content);

  if (hasLiteralEscapedNewlines) {
    console.warn(
      'Warning: package.json contains literal "\\n" sequences. If this came from pasting escaped JSON, reformat the file before deploy.'
    );
  }

  console.log('package.json is valid JSON');
} catch (error) {
  console.error('Invalid package.json JSON syntax');

  if (hasLiteralEscapedNewlines) {
    console.error(
      'Detected literal "\\n" sequences. This usually means escaped JSON was pasted into package.json. Replace with normal multiline JSON.'
    );
  }

  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

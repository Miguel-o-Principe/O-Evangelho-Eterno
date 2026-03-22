const fs = require('fs');
const path = 'd:/Users/Tx/Desktop/Hostinger/src/pages/Admin.tsx';
const text = fs.readFileSync(path, 'utf8');
const stack = [];
const pairs = { ')': '(', ']': '[', '}': '{' };
let line = 1;
let col = 0;
for (let i = 0; i < text.length; i++) {
  const ch = text[i];
  if (ch === '\n') { line++; col = 0; continue; }
  col++;
  if (ch === '"' || ch === "'" || ch === '`') {
    const quote = ch;
    i++;
    col++;
    while (i < text.length) {
      if (text[i] === '\\') { i += 2; col += 2; continue; }
      if (text[i] === quote) break;
      if (text[i] === '\n') { line++; col = 0; } else col++;
      i++;
    }
    continue;
  }
  if (ch === '/' && text[i+1] === '/') { i = text.indexOf('\n', i); if (i === -1) break; line++; col = 0; continue; }
  if (ch === '/' && text[i+1] === '*') { i = text.indexOf('*/', i+2); if (i === -1) break; const m = text.substring(0, i).split('\n').length; line = m; col = i - text.lastIndexOf('\n', i); continue; }
  if ('([{'.includes(ch)) stack.push({ ch, line, col });
  if (')]}'.includes(ch)) {
    const need = pairs[ch]; const top = stack.pop();
    if (!top || top.ch !== need) {
      console.log('mismatch', ch, 'at', line, col, 'top', top);
      process.exit(1);
    }
  }
}
console.log('done line', line, 'col', col, 'stack', stack.length); if (stack.length) console.log('top', stack[stack.length-1]);
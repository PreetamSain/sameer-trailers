const fs = require('fs');
const path = require('path');
const base = 'C:/Files/VS/Sameer Trailer/brochure/3d/Initial Scene - 2026-09-02';

const f1 = fs.readdirSync(path.join(base, '1')).map(f => path.join(base, '1', f));
const f2 = fs.readdirSync(path.join(base, '2')).map(f => path.join(base, '2', f));
const f3 = fs.readdirSync(path.join(base, '3')).map(f => path.join(base, '3', f));

console.log('F1 count:', f1.length, 'F2 count:', f2.length, 'F3 count:', f3.length);
console.log('Folder 1 last 3 files:', f1.slice(-3).map(f => path.basename(f)));
console.log('Folder 2 first 3 files:', f2.slice(0, 3).map(f => path.basename(f)));
console.log('Folder 2 last 3 files:', f2.slice(-3).map(f => path.basename(f)));
console.log('Folder 3 first 3 files:', f3.slice(0, 3).map(f => path.basename(f)));

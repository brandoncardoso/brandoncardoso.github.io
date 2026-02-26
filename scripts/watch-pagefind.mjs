import { watch } from 'fs';
import { exec } from 'child_process';

let timer;

function rebuild() {
  clearTimeout(timer);
  // Delay to let Hugo finish writing its output before indexing
  timer = setTimeout(() => {
    exec('pagefind --site public', (err) => {
      if (err) console.error('[pagefind] error:', err.message);
      else console.log('[pagefind] index updated');
    });
  }, 1500);
}

for (const dir of ['content', 'layouts']) {
  watch(dir, { recursive: true }, (_, filename) => {
    if (filename) rebuild();
  });
}

console.log('[pagefind] watching content/ and layouts/ for changes...');

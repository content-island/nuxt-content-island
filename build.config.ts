import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  rollup: {
    emitCJS: true,
  },
  entries: ['src/module'],
  declaration: true,
  clean: true,
  hooks: {
    'build:done': ctx => {
      // Copy types file to dist
      const fs = require('fs');
      const path = require('path');

      const sourceTypes = path.join(ctx.options.rootDir, 'src', 'types.ts');
      const targetTypes = path.join(ctx.options.outDir, 'types.d.ts');

      if (fs.existsSync(sourceTypes)) {
        fs.copyFileSync(sourceTypes, targetTypes);
        console.log('✓ Copied types.ts to dist/types.d.ts');
      }

      // Add triple slash directive to the top of the file
      const targetTypesMts = path.join(ctx.options.outDir, 'types.d.mts');
      if (fs.existsSync(targetTypesMts)) {
        const content = fs.readFileSync(targetTypesMts, 'utf8');
        fs.writeFileSync(targetTypesMts, '/// <reference types="./types.d.ts" />\n\n');
        fs.appendFileSync(targetTypesMts, content);
        console.log('✓ Appended reference to types.d.ts to dist/types.d.mts');
      }
    },
  },
});

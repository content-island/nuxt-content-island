/// <reference types="vitest/globals" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    restoreMocks: true,
  },
});

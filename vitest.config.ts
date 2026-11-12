import { tmpdir } from 'node:os';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**'],
    // Os testes da fachada usam o registrador padrão: o log vai para o tmp, não para a raiz do repo.
    env: { PONTE_ARQUIVO_LOG: `${tmpdir()}/ponte-testes.log` },
  },
});

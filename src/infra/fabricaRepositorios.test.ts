import { rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { criarRepositorioUsuarios, criarRepositorioVagas } from './fabricaRepositorios.js';
import { RepositorioUsuariosArquivo } from './RepositorioUsuariosArquivo.js';
import { RepositorioUsuariosRAM } from './RepositorioUsuariosRAM.js';
import { RepositorioVagasArquivo } from './RepositorioVagasArquivo.js';
import { RepositorioVagasRAM } from './RepositorioVagasRAM.js';

describe('criarRepositorioUsuarios', () => {
  const caminhoArquivo = join(tmpdir(), `ponte-fabrica-${Date.now()}.bin`);

  afterEach(() => {
    rmSync(caminhoArquivo, { force: true });
  });

  it('deve_criar_repositorio_em_ram_por_padrao', () => {
    expect(criarRepositorioUsuarios('ram')).toBeInstanceOf(RepositorioUsuariosRAM);
  });

  it('deve_criar_repositorio_em_arquivo_quando_solicitado', () => {
    expect(criarRepositorioUsuarios('arquivo', caminhoArquivo)).toBeInstanceOf(RepositorioUsuariosArquivo);
  });

  it('deve_lancar_erro_para_tipo_de_persistencia_desconhecido', () => {
    expect(() => criarRepositorioUsuarios('invalido' as never)).toThrow();
  });
});

describe('criarRepositorioVagas', () => {
  it('deve_criar_repositorio_de_vagas_em_ram', () => {
    expect(criarRepositorioVagas('ram')).toBeInstanceOf(RepositorioVagasRAM);
  });

  it('deve_criar_repositorio_de_vagas_em_arquivo_quando_solicitado', () => {
    expect(criarRepositorioVagas('arquivo', join(tmpdir(), 'ponte-vagas.bin'))).toBeInstanceOf(
      RepositorioVagasArquivo,
    );
  });

  it('deve_lancar_erro_para_tipo_de_persistencia_de_vagas_desconhecido', () => {
    expect(() => criarRepositorioVagas('invalido' as never)).toThrow();
  });
});

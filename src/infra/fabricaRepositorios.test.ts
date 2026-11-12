import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { FabricaRepositorios } from '../entidades/FabricaRepositorios.js';
import {
  criarFabricaRepositorios,
  FabricaRepositoriosArquivo,
  FabricaRepositoriosRAM,
} from './fabricaRepositorios.js';
import { RepositorioAcessosArquivo } from './RepositorioAcessosArquivo.js';
import { RepositorioAcessosRAM } from './RepositorioAcessosRAM.js';
import { RepositorioUsuariosArquivo } from './RepositorioUsuariosArquivo.js';
import { RepositorioUsuariosRAM } from './RepositorioUsuariosRAM.js';
import { RepositorioVagasArquivo } from './RepositorioVagasArquivo.js';
import { RepositorioVagasRAM } from './RepositorioVagasRAM.js';

describe('criarFabricaRepositorios', () => {
  it('deve_escolher_a_fabrica_em_ram', () => {
    expect(criarFabricaRepositorios('ram')).toBeInstanceOf(FabricaRepositoriosRAM);
  });

  it('deve_escolher_a_fabrica_em_arquivo_quando_solicitado', () => {
    expect(criarFabricaRepositorios('arquivo')).toBeInstanceOf(FabricaRepositoriosArquivo);
  });

  it('deve_lancar_erro_para_tipo_de_persistencia_desconhecido', () => {
    expect(() => criarFabricaRepositorios('invalido' as never)).toThrow(/desconhecido/);
  });
});

describe('FabricaRepositoriosRAM', () => {
  it('deve_criar_toda_a_familia_de_repositorios_em_ram', () => {
    const fabrica: FabricaRepositorios = new FabricaRepositoriosRAM();

    expect(fabrica.criarRepositorioUsuarios()).toBeInstanceOf(RepositorioUsuariosRAM);
    expect(fabrica.criarRepositorioVagas()).toBeInstanceOf(RepositorioVagasRAM);
    expect(fabrica.criarRepositorioAcessos()).toBeInstanceOf(RepositorioAcessosRAM);
  });
});

describe('FabricaRepositoriosArquivo', () => {
  let diretorio: string;

  beforeEach(() => {
    diretorio = mkdtempSync(join(tmpdir(), 'ponte-fabrica-'));
  });

  afterEach(() => {
    rmSync(diretorio, { recursive: true, force: true });
  });

  it('deve_criar_toda_a_familia_de_repositorios_em_arquivo', () => {
    const fabrica: FabricaRepositorios = new FabricaRepositoriosArquivo({
      usuarios: join(diretorio, 'usuarios.bin'),
      vagas: join(diretorio, 'vagas.bin'),
      acessos: join(diretorio, 'acessos.bin'),
    });

    expect(fabrica.criarRepositorioUsuarios()).toBeInstanceOf(RepositorioUsuariosArquivo);
    expect(fabrica.criarRepositorioVagas()).toBeInstanceOf(RepositorioVagasArquivo);
    expect(fabrica.criarRepositorioAcessos()).toBeInstanceOf(RepositorioAcessosArquivo);
  });
});

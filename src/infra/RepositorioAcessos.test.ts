import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { Acesso } from '../entidades/Acesso.js';
import { ErroDeArquivo } from '../entidades/erros/ErroDePersistencia.js';
import { RepositorioAcessosArquivo } from './RepositorioAcessosArquivo.js';
import { RepositorioAcessosRAM } from './RepositorioAcessosRAM.js';

const diretorio = mkdtempSync(join(tmpdir(), 'ponte-acessos-'));
let contador = 0;
const novoCaminho = () => join(diretorio, `acessos-${contador++}.bin`);

afterAll(() => rmSync(diretorio, { recursive: true, force: true }));

describe.each([
  ['RepositorioAcessosRAM', () => new RepositorioAcessosRAM()],
  ['RepositorioAcessosArquivo', () => new RepositorioAcessosArquivo(novoCaminho())],
])('%s', (_nome, criar) => {
  it('deve_comecar_sem_acessos', () => {
    expect(criar().listarTodos()).toEqual([]);
  });

  it('deve_registrar_acessos_com_ids_sequenciais', () => {
    const repositorio = criar();

    expect(repositorio.adicionar(new Acesso(1, new Date('2026-11-11T10:00:00Z'))).id).toBe(1);
    expect(repositorio.adicionar(new Acesso(1, new Date('2026-11-11T11:00:00Z'))).id).toBe(2);
    expect(repositorio.listarTodos()).toHaveLength(2);
  });

  it('deve_remover_apenas_os_acessos_do_usuario_informado', () => {
    const repositorio = criar();
    repositorio.adicionar(new Acesso(1, new Date('2026-11-11T10:00:00Z')));
    repositorio.adicionar(new Acesso(2, new Date('2026-11-11T11:00:00Z')));
    repositorio.adicionar(new Acesso(1, new Date('2026-11-11T12:00:00Z')));

    repositorio.removerPorUsuario(1);

    expect(repositorio.listarTodos().map((acesso) => acesso.usuarioId)).toEqual([2]);
  });
});

describe('RepositorioAcessosArquivo (persistência)', () => {
  it('deve_manter_os_acessos_entre_instancias_preservando_a_data', () => {
    const caminho = novoCaminho();
    new RepositorioAcessosArquivo(caminho).adicionar(new Acesso(7, new Date('2026-11-11T10:00:00Z')));

    const [acesso] = new RepositorioAcessosArquivo(caminho).listarTodos();

    expect(acesso).toBeInstanceOf(Acesso);
    expect(acesso.usuarioId).toBe(7);
    expect(acesso.dataHora).toEqual(new Date('2026-11-11T10:00:00Z'));
  });

  it('deve_lancar_erro_de_arquivo_quando_o_arquivo_esta_corrompido', () => {
    const caminho = novoCaminho();
    writeFileSync(caminho, 'isto não é um arquivo v8');

    expect(() => new RepositorioAcessosArquivo(caminho).listarTodos()).toThrow(ErroDeArquivo);
  });
});

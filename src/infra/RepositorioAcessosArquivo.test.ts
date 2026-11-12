import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ErroDeArquivo } from '../entidades/erros/ErroDePersistencia.js';
import { RegistroDeAcesso } from '../entidades/RegistroDeAcesso.js';
import { RepositorioAcessosArquivo } from './RepositorioAcessosArquivo.js';

const novoRegistro = () => new RegistroDeAcesso(1, 'cadastro', '2026-11-11T10:00:00.000Z');

describe('RepositorioAcessosArquivo', () => {
  let diretorio: string;
  let caminhoArquivo: string;

  beforeEach(() => {
    diretorio = mkdtempSync(join(tmpdir(), 'ponte-acessos-'));
    caminhoArquivo = join(diretorio, 'acessos.bin');
  });

  afterEach(() => {
    rmSync(diretorio, { recursive: true, force: true });
  });

  it('deve_retornar_lista_vazia_quando_o_arquivo_ainda_nao_existe', () => {
    expect(new RepositorioAcessosArquivo(caminhoArquivo).listarTodos()).toEqual([]);
  });

  it('deve_manter_os_registros_entre_instancias_como_instancias_de_registro', () => {
    new RepositorioAcessosArquivo(caminhoArquivo).adicionar(novoRegistro());

    const registros = new RepositorioAcessosArquivo(caminhoArquivo).listarTodos();

    expect(registros).toHaveLength(1);
    expect(registros[0]).toBeInstanceOf(RegistroDeAcesso);
    expect(registros[0]).toMatchObject({ id: 1, usuarioId: 1, acao: 'cadastro' });
  });

  it('deve_atribuir_ids_sequenciais', () => {
    const repositorio = new RepositorioAcessosArquivo(caminhoArquivo);

    expect(repositorio.adicionar(novoRegistro()).id).toBe(1);
    expect(repositorio.adicionar(novoRegistro()).id).toBe(2);
  });

  it('deve_lancar_erro_de_arquivo_quando_o_arquivo_esta_corrompido', () => {
    writeFileSync(caminhoArquivo, 'isto não é um arquivo v8');

    expect(() => new RepositorioAcessosArquivo(caminhoArquivo).listarTodos()).toThrow(ErroDeArquivo);
  });

  it('nao_deve_atribuir_id_a_registro_quando_a_escrita_falha', () => {
    const repositorio = new RepositorioAcessosArquivo(join(diretorio, 'pasta-inexistente', 'acessos.bin'));
    const registro = novoRegistro();

    expect(() => repositorio.adicionar(registro)).toThrow(ErroDeArquivo);
    expect(registro.id).toBeUndefined();
  });
});

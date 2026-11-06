import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { EntidadeNaoEncontradaError } from '../entidades/erros/EntidadeNaoEncontradaError.js';
import { ErroDeArquivo } from '../entidades/erros/ErroDePersistencia.js';
import { Vaga } from '../entidades/Vaga.js';
import { RepositorioVagasArquivo } from './RepositorioVagasArquivo.js';

const novaVaga = () => new Vaga(1, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);

describe('RepositorioVagasArquivo', () => {
  let diretorio: string;
  let caminhoArquivo: string;

  beforeEach(() => {
    diretorio = mkdtempSync(join(tmpdir(), 'ponte-vagas-'));
    caminhoArquivo = join(diretorio, 'vagas.bin');
  });

  afterEach(() => {
    rmSync(diretorio, { recursive: true, force: true });
  });

  it('deve_retornar_lista_vazia_quando_o_arquivo_ainda_nao_existe', () => {
    expect(new RepositorioVagasArquivo(caminhoArquivo).listarTodas()).toEqual([]);
  });

  it('deve_manter_as_vagas_entre_instancias_como_instancias_de_vaga', () => {
    new RepositorioVagasArquivo(caminhoArquivo).adicionar(novaVaga());

    const vagas = new RepositorioVagasArquivo(caminhoArquivo).listarTodas();

    expect(vagas).toHaveLength(1);
    expect(vagas[0]).toBeInstanceOf(Vaga);
    expect(vagas[0]).toMatchObject({ id: 1, ongId: 1, local: 'Centro Comunitário', quantidadeVagas: 5 });
  });

  it('deve_atribuir_ids_sequenciais', () => {
    const repositorio = new RepositorioVagasArquivo(caminhoArquivo);

    expect(repositorio.adicionar(novaVaga()).id).toBe(1);
    expect(repositorio.adicionar(novaVaga()).id).toBe(2);
  });

  it('deve_atualizar_e_remover_vaga_persistida', () => {
    const repositorio = new RepositorioVagasArquivo(caminhoArquivo);
    const vaga = repositorio.adicionar(novaVaga());

    vaga.quantidadeVagas = 8;
    repositorio.atualizar(vaga);
    expect(new RepositorioVagasArquivo(caminhoArquivo).buscarPorId(vaga.id!)?.quantidadeVagas).toBe(8);

    repositorio.remover(vaga.id!);
    expect(new RepositorioVagasArquivo(caminhoArquivo).listarTodas()).toEqual([]);
  });

  it('deve_lancar_erro_ao_atualizar_vaga_inexistente', () => {
    const vaga = novaVaga();
    vaga.id = 999;

    expect(() => new RepositorioVagasArquivo(caminhoArquivo).atualizar(vaga)).toThrow(EntidadeNaoEncontradaError);
  });

  it('deve_lancar_erro_ao_remover_vaga_inexistente', () => {
    expect(() => new RepositorioVagasArquivo(caminhoArquivo).remover(999)).toThrow(EntidadeNaoEncontradaError);
  });

  it('deve_lancar_erro_de_arquivo_quando_o_arquivo_esta_corrompido', () => {
    writeFileSync(caminhoArquivo, 'isto não é um arquivo v8');

    expect(() => new RepositorioVagasArquivo(caminhoArquivo).listarTodas()).toThrow(ErroDeArquivo);
  });

  it('nao_deve_atribuir_id_a_vaga_quando_a_escrita_falha', () => {
    const repositorio = new RepositorioVagasArquivo(join(diretorio, 'pasta-inexistente', 'vagas.bin'));
    const vaga = novaVaga();

    expect(() => repositorio.adicionar(vaga)).toThrow(ErroDeArquivo);
    expect(vaga.id).toBeUndefined();
  });
});

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ErroDeArquivo } from '../entidades/erros/ErroDePersistencia.js';
import { Ong } from '../entidades/Ong.js';
import { RepositorioUsuariosArquivo } from './RepositorioUsuariosArquivo.js';
import { Voluntario } from '../entidades/Voluntario.js';

const SENHA_VALIDA = 'Abcdef@1';

describe('RepositorioUsuariosArquivo', () => {
  let diretorio: string;
  let caminhoArquivo: string;

  beforeEach(() => {
    diretorio = mkdtempSync(join(tmpdir(), 'ponte-repositorio-'));
    caminhoArquivo = join(diretorio, 'usuarios.bin');
  });

  afterEach(() => {
    rmSync(diretorio, { recursive: true, force: true });
  });

  it('deve_retornar_lista_vazia_quando_o_arquivo_ainda_nao_existe', () => {
    const repositorio = new RepositorioUsuariosArquivo(caminhoArquivo);

    expect(repositorio.listarTodos()).toEqual([]);
  });

  it('deve_persistir_e_reidratar_ongs_e_voluntarios_como_instancias_corretas', () => {
    const repositorio = new RepositorioUsuariosArquivo(caminhoArquivo);
    repositorio.adicionar(new Ong('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.'));
    repositorio.adicionar(
      new Voluntario('Rafael', 'rafael', SENHA_VALIDA, ['enfermagem'], 'manhãs', 'João Pessoa/PB'),
    );

    const usuarios = repositorio.listarTodos();

    expect(usuarios).toHaveLength(2);
    expect(usuarios[0]).toBeInstanceOf(Ong);
    expect(usuarios[1]).toBeInstanceOf(Voluntario);
    expect((usuarios[0] as Ong).areaAtuacao).toBe('Saúde');
  });

  it('deve_sobreviver_a_uma_nova_instancia_apontando_para_o_mesmo_arquivo', () => {
    const primeiraExecucao = new RepositorioUsuariosArquivo(caminhoArquivo);
    primeiraExecucao.adicionar(new Ong('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.'));

    const novaExecucao = new RepositorioUsuariosArquivo(caminhoArquivo);
    const segundoUsuario = novaExecucao.adicionar(
      new Voluntario('Rafael', 'rafael', SENHA_VALIDA, ['enfermagem'], 'manhãs', 'João Pessoa/PB'),
    );

    expect(segundoUsuario.id).toBe(2);
    expect(novaExecucao.listarTodos()).toHaveLength(2);
  });

  it('deve_lancar_erro_de_arquivo_quando_o_conteudo_esta_corrompido', () => {
    writeFileSync(caminhoArquivo, 'isto não é um arquivo v8 válido');
    const repositorio = new RepositorioUsuariosArquivo(caminhoArquivo);

    expect(() => repositorio.listarTodos()).toThrow(ErroDeArquivo);
  });

  it('deve_lancar_erro_de_arquivo_quando_o_diretorio_de_destino_nao_existe', () => {
    const repositorio = new RepositorioUsuariosArquivo(join(diretorio, 'pasta-inexistente', 'usuarios.bin'));

    expect(() =>
      repositorio.adicionar(new Ong('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.')),
    ).toThrow(ErroDeArquivo);
  });

  it('nao_deve_atribuir_id_ao_usuario_quando_a_escrita_falha', () => {
    const repositorio = new RepositorioUsuariosArquivo(join(diretorio, 'pasta-inexistente', 'usuarios.bin'));
    const ong = new Ong('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.');

    expect(() => repositorio.adicionar(ong)).toThrow(ErroDeArquivo);
    expect(ong.id).toBeUndefined();
  });

  it('deve_buscar_usuario_por_id', () => {
    const repositorio = new RepositorioUsuariosArquivo(caminhoArquivo);
    const ong = repositorio.adicionar(
      new Ong('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.'),
    );

    expect(repositorio.buscarPorId(ong.id!)).toEqual(ong);
  });

  it('deve_retornar_undefined_ao_buscar_id_inexistente', () => {
    const repositorio = new RepositorioUsuariosArquivo(caminhoArquivo);

    expect(repositorio.buscarPorId(999)).toBeUndefined();
  });

  it('deve_atualizar_usuario_existente', () => {
    const repositorio = new RepositorioUsuariosArquivo(caminhoArquivo);
    const ong = repositorio.adicionar(
      new Ong('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.'),
    ) as Ong;
    ong.descricao = 'Nova descrição.';

    repositorio.atualizar(ong);

    expect((repositorio.buscarPorId(ong.id!) as Ong).descricao).toBe('Nova descrição.');
  });

  it('deve_lancar_erro_ao_atualizar_usuario_inexistente', () => {
    const repositorio = new RepositorioUsuariosArquivo(caminhoArquivo);
    const ong = new Ong('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.');
    ong.id = 999;

    expect(() => repositorio.atualizar(ong)).toThrow();
  });

  it('deve_remover_usuario_existente', () => {
    const repositorio = new RepositorioUsuariosArquivo(caminhoArquivo);
    const ong = repositorio.adicionar(
      new Ong('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.'),
    );

    repositorio.remover(ong.id!);

    expect(repositorio.listarTodos()).toEqual([]);
  });

  it('deve_lancar_erro_ao_remover_usuario_inexistente', () => {
    const repositorio = new RepositorioUsuariosArquivo(caminhoArquivo);

    expect(() => repositorio.remover(999)).toThrow();
  });
});

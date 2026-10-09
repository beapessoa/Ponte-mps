import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ErroDeArquivo } from './erros/ErroDePersistencia.js';
import { Ong } from './Ong.js';
import { RepositorioUsuariosArquivo } from './RepositorioUsuariosArquivo.js';
import { Voluntario } from './Voluntario.js';

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
});

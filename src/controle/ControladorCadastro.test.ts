import { beforeEach, describe, expect, it } from 'vitest';
import { LoginInvalidoError, SenhaInvalidaError } from '../entidades/erros/ErroDeValidacao.js';
import { RepositorioUsuariosRAM } from '../entidades/RepositorioUsuariosRAM.js';
import { ControladorCadastro } from './ControladorCadastro.js';

const SENHA_VALIDA = 'Abcdef@1';

describe('ControladorCadastro', () => {
  let repositorio: RepositorioUsuariosRAM;
  let controlador: ControladorCadastro;

  beforeEach(() => {
    repositorio = new RepositorioUsuariosRAM();
    controlador = new ControladorCadastro(repositorio);
  });

  it('deve_cadastrar_ong_quando_os_dados_sao_validos', () => {
    const ong = controlador.cadastrarONG(
      'Amigos do Bairro',
      'amigos',
      SENHA_VALIDA,
      'Saúde comunitária',
      'Ações de saúde em bairros periféricos.',
    );

    expect(ong.id).toBe(1);
    expect(repositorio.listarTodos()).toEqual([ong]);
  });

  it('deve_lancar_erro_ao_cadastrar_ong_sem_area_de_atuacao', () => {
    expect(() =>
      controlador.cadastrarONG('Amigos do Bairro', 'amigos', SENHA_VALIDA, '', 'Ações de saúde.'),
    ).toThrow();
    expect(repositorio.listarTodos()).toHaveLength(0);
  });

  it('deve_lancar_erro_ao_cadastrar_ong_com_descricao_contendo_apenas_espacos', () => {
    expect(() =>
      controlador.cadastrarONG('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', '   '),
    ).toThrow();
    expect(repositorio.listarTodos()).toHaveLength(0);
  });

  it('deve_lancar_login_invalido_ao_cadastrar_ong_com_login_contendo_numeros', () => {
    expect(() =>
      controlador.cadastrarONG('Amigos do Bairro', 'amigos1', SENHA_VALIDA, 'Saúde', 'Ações de saúde.'),
    ).toThrow(LoginInvalidoError);
    expect(repositorio.listarTodos()).toHaveLength(0);
  });

  it('deve_lancar_senha_invalida_ao_cadastrar_ong_com_senha_fraca', () => {
    expect(() =>
      controlador.cadastrarONG('Amigos do Bairro', 'amigos', 'fraca', 'Saúde', 'Ações de saúde.'),
    ).toThrow(SenhaInvalidaError);
    expect(repositorio.listarTodos()).toHaveLength(0);
  });

  it('deve_cadastrar_voluntario_quando_os_dados_sao_validos', () => {
    const voluntario = controlador.cadastrarVoluntario(
      'Rafael',
      'rafael',
      SENHA_VALIDA,
      ['enfermagem'],
      'manhãs',
      'João Pessoa/PB',
    );

    expect(voluntario.id).toBe(1);
    expect(repositorio.listarTodos()).toEqual([voluntario]);
  });

  it('deve_lancar_erro_ao_cadastrar_voluntario_sem_habilidades', () => {
    expect(() =>
      controlador.cadastrarVoluntario('Rafael', 'rafael', SENHA_VALIDA, [], 'manhãs', 'João Pessoa/PB'),
    ).toThrow();
    expect(repositorio.listarTodos()).toHaveLength(0);
  });

  it('deve_lancar_erro_ao_cadastrar_voluntario_com_localizacao_contendo_apenas_espacos', () => {
    expect(() =>
      controlador.cadastrarVoluntario('Rafael', 'rafael', SENHA_VALIDA, ['enfermagem'], 'manhãs', '   '),
    ).toThrow();
    expect(repositorio.listarTodos()).toHaveLength(0);
  });

  it('deve_lancar_login_invalido_ao_cadastrar_voluntario_com_login_vazio', () => {
    expect(() =>
      controlador.cadastrarVoluntario('Rafael', '', SENHA_VALIDA, ['enfermagem'], 'manhãs', 'João Pessoa/PB'),
    ).toThrow(LoginInvalidoError);
    expect(repositorio.listarTodos()).toHaveLength(0);
  });
});

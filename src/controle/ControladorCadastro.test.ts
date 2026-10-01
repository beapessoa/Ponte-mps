import { beforeEach, describe, expect, it } from 'vitest';
import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { ControladorCadastro } from './ControladorCadastro.js';

describe('ControladorCadastro', () => {
  let repositorio: RepositorioUsuarios;
  let controlador: ControladorCadastro;

  beforeEach(() => {
    repositorio = new RepositorioUsuarios();
    controlador = new ControladorCadastro(repositorio);
  });

  it('deve_cadastrar_ong_quando_os_dados_sao_validos', () => {
    const ong = controlador.cadastrarONG('Amigos do Bairro', 'Saúde comunitária', 'Ações de saúde em bairros periféricos.');

    expect(ong.id).toBe(1);
    expect(repositorio.listarTodos()).toEqual([ong]);
  });

  it('deve_lancar_erro_ao_cadastrar_ong_sem_area_de_atuacao', () => {
    expect(() => controlador.cadastrarONG('Amigos do Bairro', '', 'Ações de saúde.')).toThrow();
    expect(repositorio.listarTodos()).toHaveLength(0);
  });

  it('deve_cadastrar_voluntario_quando_os_dados_sao_validos', () => {
    const voluntario = controlador.cadastrarVoluntario('Rafael', ['enfermagem'], 'manhãs', 'João Pessoa/PB');

    expect(voluntario.id).toBe(1);
    expect(repositorio.listarTodos()).toEqual([voluntario]);
  });

  it('deve_lancar_erro_ao_cadastrar_voluntario_sem_habilidades', () => {
    expect(() => controlador.cadastrarVoluntario('Rafael', [], 'manhãs', 'João Pessoa/PB')).toThrow();
    expect(repositorio.listarTodos()).toHaveLength(0);
  });
});

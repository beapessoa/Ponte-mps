import { describe, expect, it } from 'vitest';
import { RegistroDeAcesso } from '../entidades/RegistroDeAcesso.js';
import { RepositorioAcessosRAM } from './RepositorioAcessosRAM.js';

const criarRegistro = (acao = 'cadastro') => new RegistroDeAcesso(1, acao, '2026-11-11T10:00:00.000Z');

describe('RepositorioAcessosRAM', () => {
  it('deve_atribuir_id_e_armazenar_registro_ao_adicionar', () => {
    const repositorio = new RepositorioAcessosRAM();
    const registro = criarRegistro();

    const armazenado = repositorio.adicionar(registro);

    expect(armazenado.id).toBe(1);
    expect(repositorio.listarTodos()).toEqual([registro]);
  });

  it('deve_atribuir_ids_sequenciais_a_cada_novo_registro', () => {
    const repositorio = new RepositorioAcessosRAM();

    const primeiro = repositorio.adicionar(criarRegistro());
    const segundo = repositorio.adicionar(criarRegistro('remocao'));

    expect(primeiro.id).toBe(1);
    expect(segundo.id).toBe(2);
  });

  it('deve_retornar_lista_vazia_quando_nenhum_registro_foi_adicionado', () => {
    const repositorio = new RepositorioAcessosRAM();

    expect(repositorio.listarTodos()).toEqual([]);
  });

  it('nao_deve_permitir_que_alteracoes_na_lista_retornada_afetem_o_repositorio', () => {
    const repositorio = new RepositorioAcessosRAM();
    repositorio.adicionar(criarRegistro());

    const lista = repositorio.listarTodos();
    lista.push(criarRegistro());

    expect(repositorio.listarTodos()).toHaveLength(1);
  });
});

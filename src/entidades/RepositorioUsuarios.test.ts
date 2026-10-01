import { describe, expect, it } from 'vitest';
import { RepositorioUsuarios } from './RepositorioUsuarios.js';
import { Voluntario } from './Voluntario.js';

function criarVoluntario(nome: string): Voluntario {
  return new Voluntario(nome, ['primeiros socorros'], 'manhãs', 'João Pessoa/PB');
}

describe('RepositorioUsuarios', () => {
  it('deve_atribuir_id_e_armazenar_usuario_ao_adicionar', () => {
    const repositorio = new RepositorioUsuarios();
    const voluntario = criarVoluntario('Rafael');

    const armazenado = repositorio.adicionar(voluntario);

    expect(armazenado.id).toBe(1);
    expect(repositorio.listarTodos()).toEqual([voluntario]);
  });

  it('deve_atribuir_ids_sequenciais_a_cada_novo_usuario', () => {
    const repositorio = new RepositorioUsuarios();

    const primeiro = repositorio.adicionar(criarVoluntario('Rafael'));
    const segundo = repositorio.adicionar(criarVoluntario('João'));

    expect(primeiro.id).toBe(1);
    expect(segundo.id).toBe(2);
  });

  it('deve_retornar_lista_vazia_quando_nenhum_usuario_foi_adicionado', () => {
    const repositorio = new RepositorioUsuarios();

    expect(repositorio.listarTodos()).toEqual([]);
  });

  it('nao_deve_permitir_que_alteracoes_na_lista_retornada_afetem_o_repositorio', () => {
    const repositorio = new RepositorioUsuarios();
    repositorio.adicionar(criarVoluntario('Rafael'));

    const lista = repositorio.listarTodos();
    lista.push(criarVoluntario('Intruso'));

    expect(repositorio.listarTodos()).toHaveLength(1);
  });
});

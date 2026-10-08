import { describe, expect, it } from 'vitest';
import { RepositorioUsuariosRAM } from './RepositorioUsuariosRAM.js';
import { Voluntario } from './Voluntario.js';

function criarVoluntario(nome: string, login: string): Voluntario {
  return new Voluntario(nome, login, 'Abcdef@1', ['primeiros socorros'], 'manhãs', 'João Pessoa/PB');
}

describe('RepositorioUsuariosRAM', () => {
  it('deve_atribuir_id_e_armazenar_usuario_ao_adicionar', () => {
    const repositorio = new RepositorioUsuariosRAM();
    const voluntario = criarVoluntario('Rafael', 'rafael');

    const armazenado = repositorio.adicionar(voluntario);

    expect(armazenado.id).toBe(1);
    expect(repositorio.listarTodos()).toEqual([voluntario]);
  });

  it('deve_atribuir_ids_sequenciais_a_cada_novo_usuario', () => {
    const repositorio = new RepositorioUsuariosRAM();

    const primeiro = repositorio.adicionar(criarVoluntario('Rafael', 'rafael'));
    const segundo = repositorio.adicionar(criarVoluntario('João', 'joao'));

    expect(primeiro.id).toBe(1);
    expect(segundo.id).toBe(2);
  });

  it('deve_retornar_lista_vazia_quando_nenhum_usuario_foi_adicionado', () => {
    const repositorio = new RepositorioUsuariosRAM();

    expect(repositorio.listarTodos()).toEqual([]);
  });

  it('nao_deve_permitir_que_alteracoes_na_lista_retornada_afetem_o_repositorio', () => {
    const repositorio = new RepositorioUsuariosRAM();
    repositorio.adicionar(criarVoluntario('Rafael', 'rafael'));

    const lista = repositorio.listarTodos();
    lista.push(criarVoluntario('Intruso', 'intruso'));

    expect(repositorio.listarTodos()).toHaveLength(1);
  });
});

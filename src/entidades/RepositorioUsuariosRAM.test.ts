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

  it('deve_buscar_usuario_por_id', () => {
    const repositorio = new RepositorioUsuariosRAM();
    const voluntario = repositorio.adicionar(criarVoluntario('Rafael', 'rafael'));

    expect(repositorio.buscarPorId(voluntario.id!)).toBe(voluntario);
  });

  it('deve_retornar_undefined_ao_buscar_id_inexistente', () => {
    const repositorio = new RepositorioUsuariosRAM();

    expect(repositorio.buscarPorId(999)).toBeUndefined();
  });

  it('deve_atualizar_usuario_existente', () => {
    const repositorio = new RepositorioUsuariosRAM();
    const voluntario = repositorio.adicionar(criarVoluntario('Rafael', 'rafael'));
    voluntario.nome = 'Rafael Souza';

    repositorio.atualizar(voluntario);

    expect(repositorio.buscarPorId(voluntario.id!)?.nome).toBe('Rafael Souza');
  });

  it('deve_lancar_erro_ao_atualizar_usuario_inexistente', () => {
    const repositorio = new RepositorioUsuariosRAM();
    const voluntario = criarVoluntario('Rafael', 'rafael');
    voluntario.id = 999;

    expect(() => repositorio.atualizar(voluntario)).toThrow();
  });

  it('deve_remover_usuario_existente', () => {
    const repositorio = new RepositorioUsuariosRAM();
    const voluntario = repositorio.adicionar(criarVoluntario('Rafael', 'rafael'));

    repositorio.remover(voluntario.id!);

    expect(repositorio.listarTodos()).toEqual([]);
  });

  it('deve_lancar_erro_ao_remover_usuario_inexistente', () => {
    const repositorio = new RepositorioUsuariosRAM();

    expect(() => repositorio.remover(999)).toThrow();
  });
});

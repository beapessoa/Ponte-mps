import { describe, expect, it } from 'vitest';
import { RepositorioVagasRAM } from './RepositorioVagasRAM.js';
import { Vaga } from './Vaga.js';

function criarVaga(local = 'Centro Comunitário'): Vaga {
  return new Vaga(1, '2026-11-20', local, 5, ['primeiros socorros']);
}

describe('RepositorioVagasRAM', () => {
  it('deve_atribuir_id_e_armazenar_vaga_ao_adicionar', () => {
    const repositorio = new RepositorioVagasRAM();
    const vaga = criarVaga();

    const armazenada = repositorio.adicionar(vaga);

    expect(armazenada.id).toBe(1);
    expect(repositorio.listarTodas()).toEqual([vaga]);
  });

  it('deve_atribuir_ids_sequenciais_a_cada_nova_vaga', () => {
    const repositorio = new RepositorioVagasRAM();

    const primeira = repositorio.adicionar(criarVaga());
    const segunda = repositorio.adicionar(criarVaga());

    expect(primeira.id).toBe(1);
    expect(segunda.id).toBe(2);
  });

  it('deve_retornar_lista_vazia_quando_nenhuma_vaga_foi_adicionada', () => {
    const repositorio = new RepositorioVagasRAM();

    expect(repositorio.listarTodas()).toEqual([]);
  });

  it('nao_deve_permitir_que_alteracoes_na_lista_retornada_afetem_o_repositorio', () => {
    const repositorio = new RepositorioVagasRAM();
    repositorio.adicionar(criarVaga());

    const lista = repositorio.listarTodas();
    lista.push(criarVaga());

    expect(repositorio.listarTodas()).toHaveLength(1);
  });

  it('deve_buscar_vaga_por_id', () => {
    const repositorio = new RepositorioVagasRAM();
    const vaga = repositorio.adicionar(criarVaga());

    expect(repositorio.buscarPorId(vaga.id!)).toBe(vaga);
  });

  it('deve_retornar_undefined_ao_buscar_id_inexistente', () => {
    const repositorio = new RepositorioVagasRAM();

    expect(repositorio.buscarPorId(999)).toBeUndefined();
  });

  it('deve_atualizar_vaga_existente', () => {
    const repositorio = new RepositorioVagasRAM();
    const vaga = repositorio.adicionar(criarVaga());
    vaga.local = 'Praça Central';

    repositorio.atualizar(vaga);

    expect(repositorio.buscarPorId(vaga.id!)?.local).toBe('Praça Central');
  });

  it('deve_lancar_erro_ao_atualizar_vaga_inexistente', () => {
    const repositorio = new RepositorioVagasRAM();
    const vaga = criarVaga();
    vaga.id = 999;

    expect(() => repositorio.atualizar(vaga)).toThrow();
  });

  it('deve_remover_vaga_existente', () => {
    const repositorio = new RepositorioVagasRAM();
    const vaga = repositorio.adicionar(criarVaga());

    repositorio.remover(vaga.id!);

    expect(repositorio.listarTodas()).toEqual([]);
  });

  it('deve_lancar_erro_ao_remover_vaga_inexistente', () => {
    const repositorio = new RepositorioVagasRAM();

    expect(() => repositorio.remover(999)).toThrow();
  });
});

import { beforeEach, describe, expect, it } from 'vitest';
import { Ong } from '../entidades/Ong.js';
import { Voluntario } from '../entidades/Voluntario.js';
import { RepositorioUsuariosRAM } from '../infra/RepositorioUsuariosRAM.js';
import { RepositorioVagasRAM } from '../infra/RepositorioVagasRAM.js';
import { ControladorVagas } from './ControladorVagas.js';

const SENHA_VALIDA = 'Abcdef@1';

describe('ControladorVagas', () => {
  let repositorio: RepositorioVagasRAM;
  let usuarios: RepositorioUsuariosRAM;
  let controlador: ControladorVagas;

  beforeEach(() => {
    repositorio = new RepositorioVagasRAM();
    usuarios = new RepositorioUsuariosRAM();
    usuarios.adicionar(new Ong('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.'));
    controlador = new ControladorVagas(repositorio, usuarios);
  });

  it('deve_lancar_erro_ao_publicar_vaga_para_ong_inexistente', () => {
    expect(() =>
      controlador.publicarVaga(999, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']),
    ).toThrow(/ONG 999 não encontrada/);
    expect(repositorio.listarTodas()).toHaveLength(0);
  });

  it('deve_lancar_erro_ao_publicar_vaga_com_id_de_voluntario', () => {
    const voluntario = usuarios.adicionar(
      new Voluntario('Rafael', 'rafael', SENHA_VALIDA, ['enfermagem'], 'manhãs', 'João Pessoa/PB'),
    );

    expect(() =>
      controlador.publicarVaga(voluntario.id!, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']),
    ).toThrow(/não encontrada/);
    expect(repositorio.listarTodas()).toHaveLength(0);
  });

  it('deve_publicar_vaga_quando_os_dados_sao_validos', () => {
    const vaga = controlador.publicarVaga(1, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);

    expect(vaga.id).toBe(1);
    expect(repositorio.listarTodas()).toEqual([vaga]);
  });

  it('deve_lancar_erro_ao_publicar_vaga_sem_data', () => {
    expect(() =>
      controlador.publicarVaga(1, '   ', 'Centro Comunitário', 5, ['primeiros socorros']),
    ).toThrow();
    expect(repositorio.listarTodas()).toHaveLength(0);
  });

  it('deve_lancar_erro_ao_publicar_vaga_sem_local', () => {
    expect(() => controlador.publicarVaga(1, '2026-11-20', '', 5, ['primeiros socorros'])).toThrow();
    expect(repositorio.listarTodas()).toHaveLength(0);
  });

  it('deve_lancar_erro_ao_publicar_vaga_com_quantidade_zero', () => {
    expect(() =>
      controlador.publicarVaga(1, '2026-11-20', 'Centro Comunitário', 0, ['primeiros socorros']),
    ).toThrow();
    expect(repositorio.listarTodas()).toHaveLength(0);
  });

  it('deve_lancar_erro_ao_publicar_vaga_sem_habilidades_exigidas', () => {
    expect(() => controlador.publicarVaga(1, '2026-11-20', 'Centro Comunitário', 5, [])).toThrow();
    expect(repositorio.listarTodas()).toHaveLength(0);
  });

  it('deve_listar_vagas_publicadas', () => {
    const vaga = controlador.publicarVaga(1, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);

    expect(controlador.listarVagas()).toEqual([vaga]);
  });

  it('deve_buscar_vaga_por_id', () => {
    const vaga = controlador.publicarVaga(1, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);

    expect(controlador.buscarVaga(vaga.id!)).toBe(vaga);
  });

  it('deve_atualizar_vaga_existente', () => {
    const vaga = controlador.publicarVaga(1, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);

    const atualizada = controlador.atualizarVaga(vaga.id!, { quantidadeVagas: 8 });

    expect(atualizada.quantidadeVagas).toBe(8);
    expect(controlador.buscarVaga(vaga.id!)?.quantidadeVagas).toBe(8);
  });

  it('deve_lancar_erro_ao_atualizar_vaga_com_dados_invalidos', () => {
    const vaga = controlador.publicarVaga(1, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);

    expect(() => controlador.atualizarVaga(vaga.id!, { local: '' })).toThrow();
  });

  it('deve_lancar_erro_ao_atualizar_vaga_inexistente', () => {
    expect(() => controlador.atualizarVaga(999, { quantidadeVagas: 8 })).toThrow();
  });

  it('deve_remover_vaga_existente', () => {
    const vaga = controlador.publicarVaga(1, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);

    controlador.removerVaga(vaga.id!);

    expect(controlador.listarVagas()).toEqual([]);
  });

  it('deve_lancar_erro_ao_remover_vaga_inexistente', () => {
    expect(() => controlador.removerVaga(999)).toThrow();
  });
});

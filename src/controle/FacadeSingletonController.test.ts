import { afterEach, describe, expect, it } from 'vitest';
import { FacadeSingletonController } from './FacadeSingletonController.js';

const SENHA_VALIDA = 'Abcdef@1';

describe('FacadeSingletonController', () => {
  afterEach(() => {
    FacadeSingletonController.reiniciar();
  });

  it('deve_retornar_sempre_a_mesma_instancia', () => {
    const primeira = FacadeSingletonController.obterInstancia();
    const segunda = FacadeSingletonController.obterInstancia();

    expect(primeira).toBe(segunda);
  });

  it('deve_retornar_uma_nova_instancia_apos_reiniciar', () => {
    const primeira = FacadeSingletonController.obterInstancia();
    FacadeSingletonController.reiniciar();
    const segunda = FacadeSingletonController.obterInstancia();

    expect(primeira).not.toBe(segunda);
  });

  it('deve_cadastrar_e_listar_usuarios_atraves_da_fachada', () => {
    const facade = FacadeSingletonController.obterInstancia();

    const ong = facade.cadastrarONG('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.');
    const voluntario = facade.cadastrarVoluntario(
      'Rafael',
      'rafael',
      SENHA_VALIDA,
      ['enfermagem'],
      'manhãs',
      'João Pessoa/PB',
    );

    const { senha: _senhaOng, ...ongSemSenha } = ong;
    const { senha: _senhaVoluntario, ...voluntarioSemSenha } = voluntario;
    expect(facade.listarUsuarios()).toEqual([ongSemSenha, voluntarioSemSenha]);
  });

  it('deve_atualizar_e_remover_usuarios_atraves_da_fachada', () => {
    const facade = FacadeSingletonController.obterInstancia();
    const ong = facade.cadastrarONG('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.');
    const voluntario = facade.cadastrarVoluntario(
      'Rafael',
      'rafael',
      SENHA_VALIDA,
      ['enfermagem'],
      'manhãs',
      'João Pessoa/PB',
    );

    const ongAtualizada = facade.atualizarONG(
      ong.id!,
      'Amigos do Bairro Unidos',
      'amigos',
      SENHA_VALIDA,
      'Saúde',
      'Ações de saúde comunitária.',
    );
    expect(ongAtualizada.nome).toBe('Amigos do Bairro Unidos');

    const voluntarioAtualizado = facade.atualizarVoluntario(
      voluntario.id!,
      'Rafael Souza',
      'rafael',
      SENHA_VALIDA,
      ['enfermagem', 'primeiros socorros'],
      'manhãs',
      'João Pessoa/PB',
    );
    expect(voluntarioAtualizado.habilidades).toEqual(['enfermagem', 'primeiros socorros']);

    facade.removerUsuario(ong.id!);
    const { senha: _senhaVoluntarioAtualizado, ...voluntarioAtualizadoSemSenha } = voluntarioAtualizado;
    expect(facade.listarUsuarios()).toEqual([voluntarioAtualizadoSemSenha]);
  });

  it('deve_publicar_buscar_atualizar_e_remover_vaga_atraves_da_fachada', () => {
    const facade = FacadeSingletonController.obterInstancia();
    const ong = facade.cadastrarONG('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.');

    const vaga = facade.publicarVaga(ong.id!, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);
    expect(facade.buscarVaga(vaga.id!)).toBe(vaga);

    const atualizada = facade.atualizarVaga(vaga.id!, { quantidadeVagas: 8 });
    expect(atualizada.quantidadeVagas).toBe(8);

    facade.removerVaga(vaga.id!);
    expect(facade.listarVagas()).toEqual([]);
  });

  it('deve_contar_usuarios_e_vagas_cadastrados_no_sistema', () => {
    const facade = FacadeSingletonController.obterInstancia();

    expect(facade.contarEntidadesCadastradas()).toBe(0);

    const ong = facade.cadastrarONG('Amigos do Bairro', 'amigos', SENHA_VALIDA, 'Saúde', 'Ações de saúde.');
    facade.cadastrarVoluntario('Rafael', 'rafael', SENHA_VALIDA, ['enfermagem'], 'manhãs', 'João Pessoa/PB');
    facade.publicarVaga(ong.id!, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);

    expect(facade.contarEntidadesCadastradas()).toBe(3);
  });
});

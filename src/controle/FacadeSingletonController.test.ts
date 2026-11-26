import { afterEach, describe, expect, it } from 'vitest';
import { FacadeSingletonController } from './FacadeSingletonController.js';
import { EntidadeNaoEncontradaError } from '../entidades/erros/EntidadeNaoEncontradaError.js';
import { NadaParaDesfazerError } from '../entidades/erros/NadaParaDesfazerError.js';
import { NivelRegistro, Registrador } from '../entidades/Registrador.js';

class RegistradorEmMemoria implements Registrador {
  fechado = false;
  registrar(_nivel: NivelRegistro, _mensagem: string, _contexto?: Record<string, unknown>): void {}
  fechar(): void {
    this.fechado = true;
  }
}

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

  it('deve_inicializar_a_fachada_com_o_mecanismo_escolhido', () => {
    const inicializada = FacadeSingletonController.inicializar('ram');

    expect(FacadeSingletonController.obterInstancia()).toBe(inicializada);
  });

  it('deve_lancar_erro_ao_inicializar_a_fachada_duas_vezes', () => {
    FacadeSingletonController.inicializar('ram');

    expect(() => FacadeSingletonController.inicializar('ram')).toThrow(/já foi inicializada/);
  });

  it('deve_fechar_o_registrador_ao_reiniciar', () => {
    const registrador = new RegistradorEmMemoria();
    FacadeSingletonController.inicializar('ram', registrador);

    FacadeSingletonController.reiniciar();

    expect(registrador.fechado).toBe(true);
  });

  it('deve_recusar_vaga_de_ong_inexistente_atraves_da_fachada', () => {
    const facade = FacadeSingletonController.obterInstancia();

    expect(() => facade.publicarVaga(42, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros'])).toThrow(EntidadeNaoEncontradaError);
    expect(facade.contarEntidadesCadastradas()).toBe(0);
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

  it('deve_entrar_e_gerar_relatorio_de_acessos_atraves_da_fachada', () => {
    const facade = FacadeSingletonController.obterInstancia();
    facade.cadastrarVoluntario('Rafael', 'rafael', SENHA_VALIDA, ['enfermagem'], 'manhãs', 'João Pessoa/PB');

    facade.entrar('rafael', SENHA_VALIDA);
    facade.entrar('rafael', SENHA_VALIDA);

    expect(facade.gerarRelatorioAcessos('csv')).toMatch(/^Rafael,rafael,Voluntário,2,/m);
  });
  describe('desfazer a última atualização de vaga (Command + Memento)', () => {
    const publicar = (facade: FacadeSingletonController) => {
      const ong = facade.cadastrarONG('Casa Amiga', 'casaamiga', SENHA_VALIDA, 'Educação', 'Reforço escolar');
      return facade.publicarVaga(ong.id!, '2026-11-20', 'Centro Comunitário', 5, ['primeiros socorros']);
    };

    it('deve_restaurar_todos_os_campos_da_vaga_ao_desfazer', () => {
      const facade = FacadeSingletonController.obterInstancia();
      const vaga = publicar(facade);

      facade.atualizarVaga(vaga.id!, { local: 'Escola', quantidadeVagas: 9, habilidadesExigidas: ['ensino'] });
      facade.desfazerUltimaAtualizacaoDeVaga();

      expect(facade.buscarVaga(vaga.id!)).toMatchObject({
        data: '2026-11-20',
        local: 'Centro Comunitário',
        quantidadeVagas: 5,
        habilidadesExigidas: ['primeiros socorros'],
      });
    });

    it('deve_desfazer_so_a_ultima_de_duas_atualizacoes', () => {
      const facade = FacadeSingletonController.obterInstancia();
      const vaga = publicar(facade);
      facade.atualizarVaga(vaga.id!, { quantidadeVagas: 8 });
      facade.atualizarVaga(vaga.id!, { quantidadeVagas: 12 });

      facade.desfazerUltimaAtualizacaoDeVaga();

      expect(facade.buscarVaga(vaga.id!)?.quantidadeVagas).toBe(8);
      expect(() => facade.desfazerUltimaAtualizacaoDeVaga()).toThrow(NadaParaDesfazerError);
    });

    it('deve_lancar_erro_quando_nenhuma_vaga_foi_atualizada', () => {
      const facade = FacadeSingletonController.obterInstancia();
      publicar(facade);

      expect(() => facade.desfazerUltimaAtualizacaoDeVaga()).toThrow(NadaParaDesfazerError);
    });

    it('deve_nao_guardar_atualizacao_recusada_por_dados_invalidos', () => {
      const facade = FacadeSingletonController.obterInstancia();
      const vaga = publicar(facade);

      expect(() => facade.atualizarVaga(vaga.id!, { local: '' })).toThrow();

      expect(() => facade.desfazerUltimaAtualizacaoDeVaga()).toThrow(NadaParaDesfazerError);
    });

    it('deve_lancar_erro_ao_desfazer_se_a_vaga_foi_removida', () => {
      const facade = FacadeSingletonController.obterInstancia();
      const vaga = publicar(facade);
      facade.atualizarVaga(vaga.id!, { quantidadeVagas: 8 });
      facade.removerVaga(vaga.id!);

      expect(() => facade.desfazerUltimaAtualizacaoDeVaga()).toThrow(EntidadeNaoEncontradaError);
    });
  });
});

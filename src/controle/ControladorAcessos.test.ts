import { beforeEach, describe, expect, it } from 'vitest';
import { NivelRegistro, Registrador } from '../entidades/Registrador.js';
import { CredenciaisInvalidasError } from '../entidades/erros/CredenciaisInvalidasError.js';
import { RepositorioAcessosRAM } from '../infra/RepositorioAcessosRAM.js';
import { RepositorioUsuariosRAM } from '../infra/RepositorioUsuariosRAM.js';
import { ControladorAcessos } from './ControladorAcessos.js';
import { ControladorCadastro } from './ControladorCadastro.js';

const SENHA = 'Abcdef@1';
const AGORA = new Date('2026-11-11T20:00:00Z');

class RegistradorEmMemoria implements Registrador {
  readonly registros: { nivel: NivelRegistro; mensagem: string; contexto?: Record<string, unknown> }[] = [];
  registrar(nivel: NivelRegistro, mensagem: string, contexto?: Record<string, unknown>): void {
    this.registros.push({ nivel, mensagem, contexto });
  }
}

describe('ControladorAcessos', () => {
  let acessos: RepositorioAcessosRAM;
  let registrador: RegistradorEmMemoria;
  let controlador: ControladorAcessos;

  beforeEach(() => {
    const usuarios = new RepositorioUsuariosRAM();
    new ControladorCadastro(usuarios).cadastrarVoluntario('Rafael', 'rafael', SENHA, ['enfermagem'], 'manhãs', 'João Pessoa/PB');
    acessos = new RepositorioAcessosRAM();
    registrador = new RegistradorEmMemoria();
    controlador = new ControladorAcessos(usuarios, acessos, registrador, () => AGORA);
  });

  it('deve_registrar_o_acesso_quando_login_e_senha_conferem', () => {
    const usuario = controlador.entrar('rafael', SENHA);

    expect(usuario).not.toHaveProperty('senha');
    expect(acessos.listarTodos()).toMatchObject([{ usuarioId: usuario.id, dataHora: AGORA }]);
    expect(registrador.registros).toEqual([
      { nivel: 'informacao', mensagem: 'Acesso registrado', contexto: { usuarioId: usuario.id, login: 'rafael' } },
    ]);
  });

  it('deve_recusar_senha_errada_sem_registrar_acesso_e_sem_logar_a_senha', () => {
    expect(() => controlador.entrar('rafael', 'SenhaErrada@9')).toThrow(CredenciaisInvalidasError);

    expect(acessos.listarTodos()).toEqual([]);
    expect(registrador.registros).toEqual([
      { nivel: 'aviso', mensagem: 'Tentativa de acesso recusada', contexto: { login: 'rafael' } },
    ]);
  });

  it('deve_recusar_login_inexistente', () => {
    expect(() => controlador.entrar('ninguem', SENHA)).toThrow(CredenciaisInvalidasError);
  });

  it('deve_gerar_o_relatorio_no_formato_escolhido', () => {
    controlador.entrar('rafael', SENHA);

    expect(controlador.gerarRelatorio('csv')).toContain('Rafael,rafael,Voluntário,1,2026-11-11T20:00:00.000Z');
    expect(controlador.gerarRelatorio('html')).toContain('<td>Rafael</td>');
  });

  it('deve_recusar_formato_de_relatorio_desconhecido', () => {
    expect(() => controlador.gerarRelatorio('pdf' as never)).toThrow(/desconhecido/);
  });
});

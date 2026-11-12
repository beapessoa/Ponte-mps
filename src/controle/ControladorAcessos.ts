import { Acesso } from '../entidades/Acesso.js';
import { Registrador } from '../entidades/Registrador.js';
import { RepositorioAcessos } from '../entidades/RepositorioAcessos.js';
import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { Usuario, omitirSenha } from '../entidades/Usuario.js';
import { CredenciaisInvalidasError } from '../entidades/erros/CredenciaisInvalidasError.js';
import { RelatorioAcessos } from './relatorios/RelatorioAcessos.js';
import { RelatorioAcessosCSV } from './relatorios/RelatorioAcessosCSV.js';
import { RelatorioAcessosHTML } from './relatorios/RelatorioAcessosHTML.js';

export type FormatoRelatorio = 'html' | 'csv';

const RELATORIOS: Record<FormatoRelatorio, RelatorioAcessos> = {
  html: new RelatorioAcessosHTML(),
  csv: new RelatorioAcessosCSV(),
};

export class ControladorAcessos {
  constructor(
    private readonly repositorioUsuarios: RepositorioUsuarios,
    private readonly repositorioAcessos: RepositorioAcessos,
    private readonly registrador: Registrador,
    private readonly agora: () => Date = () => new Date(),
  ) {}

  /** RF15: confere login e senha e registra o acesso. A senha nunca vai para o log. */
  entrar(login: string, senha: string): Omit<Usuario, 'senha'> {
    const usuario = this.repositorioUsuarios.listarTodos().find((u) => u.login === login && u.senha === senha);
    if (!usuario) {
      this.registrador.registrar('aviso', 'Tentativa de acesso recusada', { login });
      throw new CredenciaisInvalidasError();
    }
    this.repositorioAcessos.adicionar(new Acesso(usuario.id!, this.agora()));
    this.registrador.registrar('informacao', 'Acesso registrado', { usuarioId: usuario.id, login });
    return omitirSenha(usuario);
  }

  /** RF16: relatório de estatísticas de acesso no formato escolhido. */
  gerarRelatorio(formato: FormatoRelatorio): string {
    const relatorio = RELATORIOS[formato];
    if (!relatorio) {
      throw new Error(`Formato de relatório desconhecido: "${formato}".`);
    }
    const conteudo = relatorio.gerar(this.repositorioUsuarios.listarTodos(), this.repositorioAcessos.listarTodos(), this.agora());
    this.registrador.registrar('informacao', 'Relatório de acessos gerado', { formato });
    return conteudo;
  }
}

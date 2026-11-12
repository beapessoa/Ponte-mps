import { Acesso } from '../../entidades/Acesso.js';
import { Ong } from '../../entidades/Ong.js';
import { Usuario } from '../../entidades/Usuario.js';

export interface EstatisticaUsuario {
  nome: string;
  login: string;
  tipo: 'ONG' | 'Voluntário';
  quantidadeAcessos: number;
  ultimoAcesso?: Date;
}

/**
 * Template Method: `gerar()` fixa o algoritmo do relatório de acessos (RF16) —
 * calcular as estatísticas, ordenar, e montar cabeçalho, uma linha por usuário e
 * rodapé. As subclasses só decidem como cada parte é escrita em seu formato.
 */
export abstract class RelatorioAcessos {
  gerar(usuarios: Usuario[], acessos: Acesso[], geradoEm: Date = new Date()): string {
    const estatisticas = this.calcularEstatisticas(usuarios, acessos);
    const totalAcessos = estatisticas.reduce((soma, e) => soma + e.quantidadeAcessos, 0);
    return [
      this.cabecalho(geradoEm),
      ...estatisticas.map((estatistica) => this.linha(estatistica)),
      this.rodape(totalAcessos, estatisticas.length),
    ].join('\n');
  }

  /** Passo invariante: igual em todos os formatos. Usuários sem acesso aparecem com 0. */
  private calcularEstatisticas(usuarios: Usuario[], acessos: Acesso[]): EstatisticaUsuario[] {
    return usuarios
      .map((usuario) => {
        const doUsuario = acessos.filter((acesso) => acesso.usuarioId === usuario.id);
        const ultimo = doUsuario.reduce<Date | undefined>(
          (maisRecente, { dataHora }) => (!maisRecente || dataHora > maisRecente ? dataHora : maisRecente),
          undefined,
        );
        return {
          nome: usuario.nome,
          login: usuario.login,
          tipo: usuario instanceof Ong ? ('ONG' as const) : ('Voluntário' as const),
          quantidadeAcessos: doUsuario.length,
          ultimoAcesso: ultimo,
        };
      })
      .sort((a, b) => b.quantidadeAcessos - a.quantidadeAcessos || a.login.localeCompare(b.login));
  }

  protected abstract cabecalho(geradoEm: Date): string;
  protected abstract linha(estatistica: EstatisticaUsuario): string;
  protected abstract rodape(totalAcessos: number, totalUsuarios: number): string;
}

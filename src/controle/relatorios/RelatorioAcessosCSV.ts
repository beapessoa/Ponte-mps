import { EstatisticaUsuario, RelatorioAcessos } from './RelatorioAcessos.js';

const campoCSV = (valor: string) => (/[",\n]/.test(valor) ? `"${valor.replace(/"/g, '""')}"` : valor);

/** Relatório de acessos em CSV, para abrir em planilha. */
export class RelatorioAcessosCSV extends RelatorioAcessos {
  protected cabecalho(): string {
    return 'nome,login,tipo,acessos,ultimo_acesso';
  }

  protected linha({ nome, login, tipo, quantidadeAcessos, ultimoAcesso }: EstatisticaUsuario): string {
    return [nome, login, tipo, String(quantidadeAcessos), ultimoAcesso?.toISOString() ?? ''].map(campoCSV).join(',');
  }

  protected rodape(totalAcessos: number): string {
    return `TOTAL,,,${totalAcessos},`;
  }
}

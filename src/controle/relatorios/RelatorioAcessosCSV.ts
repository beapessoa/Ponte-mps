import { EstatisticaUsuario, RelatorioAcessos } from './RelatorioAcessos.js';

// Campos como "nome" são texto livre: um valor começando com =, +, - ou @ seria
// interpretado como fórmula ao abrir o CSV numa planilha (CWE-1236). Um apóstrofo
// na frente neutraliza isso sem mudar o valor exibido.
const neutralizarFormula = (valor: string) => (/^[=+\-@]/.test(valor) ? `'${valor}` : valor);

// \r também precisa de aspas: sem isso, um CR solto no meio do campo pode ser
// lido como fim de linha por algumas planilhas, quebrando o registro em dois.
const campoCSV = (valor: string) => {
  const seguro = neutralizarFormula(valor);
  return /[",\r\n]/.test(seguro) ? `"${seguro.replace(/"/g, '""')}"` : seguro;
};

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

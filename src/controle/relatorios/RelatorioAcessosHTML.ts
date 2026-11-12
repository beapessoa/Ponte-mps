import { EstatisticaUsuario, RelatorioAcessos } from './RelatorioAcessos.js';

const escaparHTML = (texto: string) =>
  texto.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Relatório de acessos como página HTML com uma tabela. */
export class RelatorioAcessosHTML extends RelatorioAcessos {
  protected cabecalho(geradoEm: Date): string {
    return [
      '<!doctype html>',
      '<html lang="pt-BR"><head><meta charset="utf-8"><title>Relatório de acessos — Ponte</title></head><body>',
      '<h1>Relatório de acessos</h1>',
      `<p>Gerado em ${geradoEm.toISOString()}</p>`,
      '<table>',
      '<tr><th>Nome</th><th>Login</th><th>Tipo</th><th>Acessos</th><th>Último acesso</th></tr>',
    ].join('\n');
  }

  protected linha({ nome, login, tipo, quantidadeAcessos, ultimoAcesso }: EstatisticaUsuario): string {
    const celulas = [nome, login, tipo, String(quantidadeAcessos), ultimoAcesso?.toISOString() ?? '—'];
    return `<tr>${celulas.map((celula) => `<td>${escaparHTML(celula)}</td>`).join('')}</tr>`;
  }

  protected rodape(totalAcessos: number, totalUsuarios: number): string {
    return `</table>\n<p>Total: ${totalAcessos} acessos de ${totalUsuarios} usuários.</p>\n</body></html>`;
  }
}

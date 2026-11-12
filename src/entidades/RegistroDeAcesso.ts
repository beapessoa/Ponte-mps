export class RegistroDeAcesso {
  id?: number;
  usuarioId: number;
  acao: string;
  dataHora: string;

  constructor(usuarioId: number, acao: string, dataHora: string = new Date().toISOString()) {
    this.usuarioId = usuarioId;
    this.acao = acao;
    this.dataHora = dataHora;
  }
}

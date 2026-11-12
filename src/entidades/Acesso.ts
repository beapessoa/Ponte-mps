/** Entrada bem-sucedida de um usuário no sistema (RF15). É a matéria-prima do relatório de acessos (RF16). */
export class Acesso {
  id?: number;
  usuarioId: number;
  dataHora: Date;

  constructor(usuarioId: number, dataHora: Date) {
    this.usuarioId = usuarioId;
    this.dataHora = dataHora;
  }
}

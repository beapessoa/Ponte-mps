/** Foi pedido para desfazer, mas nenhuma atualização desfazível está guardada. */
export class NadaParaDesfazerError extends Error {
  constructor(message = 'Não há atualização para desfazer.') {
    super(message);
    this.name = new.target.name;
  }
}

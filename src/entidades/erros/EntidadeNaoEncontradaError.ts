/** A operação referencia um id que não existe, ou que pertence a outro tipo de entidade. */
export class EntidadeNaoEncontradaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

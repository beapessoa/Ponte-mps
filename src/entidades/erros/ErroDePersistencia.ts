export abstract class ErroDePersistencia extends Error {
  protected constructor(
    message: string,
    readonly causa?: unknown,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

/** Equivalente a um IOException: falha ao ler ou gravar o arquivo de usuários. */
export class ErroDeArquivo extends ErroDePersistencia {
  constructor(message: string, causa?: unknown) {
    super(message, causa);
  }
}

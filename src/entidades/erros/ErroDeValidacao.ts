export abstract class ErroDeValidacao extends Error {
  protected constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class LoginInvalidoError extends ErroDeValidacao {
  constructor(message: string) {
    super(message);
  }
}

export class SenhaInvalidaError extends ErroDeValidacao {
  constructor(message: string) {
    super(message);
  }
}

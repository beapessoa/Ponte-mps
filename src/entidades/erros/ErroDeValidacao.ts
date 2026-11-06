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

/** Campo obrigatório ausente ou inválido ao cadastrar ou atualizar uma entidade (RN01, RN02, RN03). */
export class CamposObrigatoriosError extends ErroDeValidacao {
  constructor(message: string) {
    super(message);
  }
}

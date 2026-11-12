/** Login ou senha não conferem com nenhum usuário cadastrado. Não diz qual dos dois errou, de propósito. */
export class CredenciaisInvalidasError extends Error {
  constructor() {
    super('Login ou senha inválidos.');
    this.name = new.target.name;
  }
}

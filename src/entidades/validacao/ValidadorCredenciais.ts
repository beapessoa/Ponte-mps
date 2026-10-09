import { LoginInvalidoError, SenhaInvalidaError } from '../erros/ErroDeValidacao.js';

const TAMANHO_MAXIMO_LOGIN = 12;
const TAMANHO_MINIMO_SENHA = 8;
const TAMANHO_MAXIMO_SENHA = 128;
const TIPOS_DE_CARACTERE_EXIGIDOS_NA_SENHA = 3;

const CONTEM_NUMERO = /\d/;
const CONTEM_MAIUSCULA = /[A-Z]/;
const CONTEM_MINUSCULA = /[a-z]/;
const CONTEM_SIMBOLO = /[!@#$%^&*()_+\-=[\]{}|']/;

export function validarLogin(login: string): void {
  if (!login.trim()) {
    throw new LoginInvalidoError('O login não pode ser vazio.');
  }
  if (login.length > TAMANHO_MAXIMO_LOGIN) {
    throw new LoginInvalidoError(`O login não pode ter mais que ${TAMANHO_MAXIMO_LOGIN} caracteres.`);
  }
  if (CONTEM_NUMERO.test(login)) {
    throw new LoginInvalidoError('O login não pode conter números.');
  }
}

/**
 * Segue a política de senha padrão do AWS IAM (ver docs/specs/tratamento-erros-persistencia.md):
 * 8–128 caracteres, ao menos 3 dos 4 tipos de caractere, e diferente do login.
 */
export function validarSenha(senha: string, login: string): void {
  if (!senha || senha.length < TAMANHO_MINIMO_SENHA || senha.length > TAMANHO_MAXIMO_SENHA) {
    throw new SenhaInvalidaError(
      `A senha deve ter entre ${TAMANHO_MINIMO_SENHA} e ${TAMANHO_MAXIMO_SENHA} caracteres.`,
    );
  }

  const tiposPresentes = [CONTEM_MAIUSCULA, CONTEM_MINUSCULA, CONTEM_NUMERO, CONTEM_SIMBOLO].filter((tipo) =>
    tipo.test(senha),
  ).length;

  if (tiposPresentes < TIPOS_DE_CARACTERE_EXIGIDOS_NA_SENHA) {
    throw new SenhaInvalidaError(
      `A senha deve conter ao menos ${TIPOS_DE_CARACTERE_EXIGIDOS_NA_SENHA} dos 4 tipos: ` +
        'letra maiúscula, letra minúscula, número e símbolo.',
    );
  }

  if (senha === login) {
    throw new SenhaInvalidaError('A senha não pode ser igual ao login.');
  }
}

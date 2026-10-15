import { validarLogin, validarSenha } from './validacao/ValidadorCredenciais.js';

export abstract class Usuario {
  id?: number;
  nome: string;
  login: string;
  senha: string;

  protected constructor(nome: string, login: string, senha: string) {
    validarLogin(login);
    validarSenha(senha, login);
    this.nome = nome;
    this.login = login;
    this.senha = senha;
  }
}

export function omitirSenha<T extends Usuario>(usuario: T): Omit<T, 'senha'> {
  const { senha: _senha, ...usuarioSemSenha } = usuario;
  return usuarioSemSenha;
}

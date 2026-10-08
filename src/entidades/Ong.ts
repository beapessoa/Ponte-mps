import { Usuario } from './Usuario.js';

export class Ong extends Usuario {
  areaAtuacao: string;
  descricao: string;

  constructor(nome: string, login: string, senha: string, areaAtuacao: string, descricao: string) {
    super(nome, login, senha);
    this.areaAtuacao = areaAtuacao;
    this.descricao = descricao;
  }
}

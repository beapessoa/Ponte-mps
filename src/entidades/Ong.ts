import { Usuario } from './Usuario.js';

export class Ong extends Usuario {
  areaAtuacao: string;
  descricao: string;

  constructor(nome: string, areaAtuacao: string, descricao: string) {
    super(nome);
    this.areaAtuacao = areaAtuacao;
    this.descricao = descricao;
  }
}

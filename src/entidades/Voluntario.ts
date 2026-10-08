import { Usuario } from './Usuario.js';

export class Voluntario extends Usuario {
  habilidades: string[];
  disponibilidade: string;
  localizacao: string;

  constructor(
    nome: string,
    login: string,
    senha: string,
    habilidades: string[],
    disponibilidade: string,
    localizacao: string,
  ) {
    super(nome, login, senha);
    this.habilidades = habilidades;
    this.disponibilidade = disponibilidade;
    this.localizacao = localizacao;
  }
}

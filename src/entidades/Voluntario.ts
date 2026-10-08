import { Usuario } from './Usuario.js';

export class Voluntario extends Usuario {
  habilidades: string[];
  disponibilidade: string;
  localizacao: string;

  constructor(nome: string, habilidades: string[], disponibilidade: string, localizacao: string) {
    super(nome);
    this.habilidades = habilidades;
    this.disponibilidade = disponibilidade;
    this.localizacao = localizacao;
  }
}

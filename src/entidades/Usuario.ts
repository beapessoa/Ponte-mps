export abstract class Usuario {
  id?: number;
  nome: string;

  protected constructor(nome: string) {
    this.nome = nome;
  }
}

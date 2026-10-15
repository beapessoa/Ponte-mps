import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { Usuario, omitirSenha } from '../entidades/Usuario.js';

export class ControladorListagem {
  constructor(private readonly repositorio: RepositorioUsuarios) {}

  listarUsuarios(): Omit<Usuario, 'senha'>[] {
    return this.repositorio.listarTodos().map(omitirSenha);
  }
}

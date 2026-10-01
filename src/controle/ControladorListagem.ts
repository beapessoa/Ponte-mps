import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { Usuario } from '../entidades/Usuario.js';

export class ControladorListagem {
  constructor(private readonly repositorio: RepositorioUsuarios) {}

  listarUsuarios(): Usuario[] {
    return this.repositorio.listarTodos();
  }
}

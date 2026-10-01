import { Usuario } from './Usuario.js';

export class RepositorioUsuarios {
  private readonly usuarios: Usuario[] = [];
  private proximoId = 1;

  adicionar(usuario: Usuario): Usuario {
    usuario.id = this.proximoId++;
    this.usuarios.push(usuario);
    return usuario;
  }

  listarTodos(): Usuario[] {
    return [...this.usuarios];
  }
}

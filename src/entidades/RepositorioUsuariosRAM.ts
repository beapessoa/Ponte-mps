import { RepositorioUsuarios } from './RepositorioUsuarios.js';
import { Usuario } from './Usuario.js';

/** Mantém os usuários apenas em memória: a coleção é perdida ao reiniciar o processo. */
export class RepositorioUsuariosRAM implements RepositorioUsuarios {
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

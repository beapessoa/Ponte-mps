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

  buscarPorId(id: number): Usuario | undefined {
    return this.usuarios.find((usuario) => usuario.id === id);
  }

  listarTodos(): Usuario[] {
    return [...this.usuarios];
  }

  atualizar(usuario: Usuario): Usuario {
    const indice = this.usuarios.findIndex((u) => u.id === usuario.id);
    if (indice === -1) {
      throw new Error(`Usuário ${usuario.id} não encontrado.`);
    }
    this.usuarios[indice] = usuario;
    return usuario;
  }

  remover(id: number): void {
    const indice = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (indice === -1) {
      throw new Error(`Usuário ${id} não encontrado.`);
    }
    this.usuarios.splice(indice, 1);
  }
}

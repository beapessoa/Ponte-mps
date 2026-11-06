import { Ong } from '../entidades/Ong.js';
import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { Usuario } from '../entidades/Usuario.js';
import { Voluntario } from '../entidades/Voluntario.js';
import { EntidadeNaoEncontradaError } from '../entidades/erros/EntidadeNaoEncontradaError.js';
import { gravarRegistros, lerRegistros, proximoId } from './arquivoBinario.js';

/**
 * A serialização v8 não preserva o protótipo das classes (vira um objeto
 * simples ao desserializar), então cada registro é reconstruído na classe
 * concreta certa, discriminando pelos campos exclusivos de ONG/Voluntário.
 */
function reidratarUsuario(registro: Record<string, unknown>): Usuario {
  let usuario: Usuario;
  if ('areaAtuacao' in registro) {
    usuario = new Ong(
      registro.nome as string,
      registro.login as string,
      registro.senha as string,
      registro.areaAtuacao as string,
      registro.descricao as string,
    );
  } else {
    usuario = new Voluntario(
      registro.nome as string,
      registro.login as string,
      registro.senha as string,
      registro.habilidades as string[],
      registro.disponibilidade as string,
      registro.localizacao as string,
    );
  }
  usuario.id = registro.id as number | undefined;
  return usuario;
}

/**
 * Persiste os usuários num arquivo binário local (serialização v8), sobrevivendo
 * a reinícios do processo. Cada operação relê e regrava o arquivo inteiro.
 */
export class RepositorioUsuariosArquivo implements RepositorioUsuarios {
  constructor(private readonly caminhoArquivo: string) {}

  adicionar(usuario: Usuario): Usuario {
    const usuarios = this.lerArquivo();
    const novoId = proximoId(usuarios);
    this.escreverArquivo([...usuarios, { ...usuario, id: novoId }]);
    usuario.id = novoId;
    return usuario;
  }

  buscarPorId(id: number): Usuario | undefined {
    return this.lerArquivo().find((usuario) => usuario.id === id);
  }

  listarTodos(): Usuario[] {
    return this.lerArquivo();
  }

  atualizar(usuario: Usuario): Usuario {
    const usuarios = this.lerArquivo();
    const indice = usuarios.findIndex((u) => u.id === usuario.id);
    if (indice === -1) {
      throw new EntidadeNaoEncontradaError(`Usuário ${usuario.id} não encontrado.`);
    }
    usuarios[indice] = usuario;
    this.escreverArquivo(usuarios);
    return usuario;
  }

  remover(id: number): void {
    const usuarios = this.lerArquivo();
    const indice = usuarios.findIndex((usuario) => usuario.id === id);
    if (indice === -1) {
      throw new EntidadeNaoEncontradaError(`Usuário ${id} não encontrado.`);
    }
    usuarios.splice(indice, 1);
    this.escreverArquivo(usuarios);
  }

  private lerArquivo(): Usuario[] {
    return lerRegistros(this.caminhoArquivo, 'usuários', reidratarUsuario);
  }

  private escreverArquivo(usuarios: Usuario[]): void {
    gravarRegistros(this.caminhoArquivo, 'usuários', usuarios);
  }
}

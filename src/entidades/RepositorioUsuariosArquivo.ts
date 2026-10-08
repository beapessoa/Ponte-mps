import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { deserialize, serialize } from 'node:v8';
import { ErroDeArquivo } from './erros/ErroDePersistencia.js';
import { Ong } from './Ong.js';
import { RepositorioUsuarios } from './RepositorioUsuarios.js';
import { Usuario } from './Usuario.js';
import { Voluntario } from './Voluntario.js';

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
    const maiorId = usuarios.reduce((maior, u) => Math.max(maior, u.id ?? 0), 0);
    usuario.id = maiorId + 1;
    usuarios.push(usuario);
    this.escreverArquivo(usuarios);
    return usuario;
  }

  listarTodos(): Usuario[] {
    return this.lerArquivo();
  }

  private lerArquivo(): Usuario[] {
    if (!existsSync(this.caminhoArquivo)) {
      return [];
    }
    try {
      const conteudo = readFileSync(this.caminhoArquivo);
      const registros = deserialize(conteudo) as Record<string, unknown>[];
      return registros.map(reidratarUsuario);
    } catch (causa) {
      throw new ErroDeArquivo(`Falha ao ler o arquivo de usuários em "${this.caminhoArquivo}".`, causa);
    }
  }

  private escreverArquivo(usuarios: Usuario[]): void {
    try {
      writeFileSync(this.caminhoArquivo, serialize(usuarios));
    } catch (causa) {
      throw new ErroDeArquivo(`Falha ao gravar o arquivo de usuários em "${this.caminhoArquivo}".`, causa);
    }
  }
}

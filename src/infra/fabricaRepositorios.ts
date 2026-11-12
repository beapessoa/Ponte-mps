import { FabricaRepositorios } from '../entidades/FabricaRepositorios.js';
import { RepositorioAcessosArquivo } from './RepositorioAcessosArquivo.js';
import { RepositorioAcessosRAM } from './RepositorioAcessosRAM.js';
import { RepositorioUsuariosArquivo } from './RepositorioUsuariosArquivo.js';
import { RepositorioUsuariosRAM } from './RepositorioUsuariosRAM.js';
import { RepositorioVagasArquivo } from './RepositorioVagasArquivo.js';
import { RepositorioVagasRAM } from './RepositorioVagasRAM.js';

export type TipoPersistencia = 'ram' | 'arquivo';

/** Fábrica concreta da família em memória (RAM). */
export class FabricaRepositoriosRAM implements FabricaRepositorios {
  criarRepositorioUsuarios() {
    return new RepositorioUsuariosRAM();
  }

  criarRepositorioVagas() {
    return new RepositorioVagasRAM();
  }

  criarRepositorioAcessos() {
    return new RepositorioAcessosRAM();
  }
}

export interface CaminhosArquivos {
  usuarios: string;
  vagas: string;
  acessos: string;
}

const caminhosPadrao = (): CaminhosArquivos => ({
  usuarios: process.env.PONTE_ARQUIVO_USUARIOS ?? 'usuarios.bin',
  vagas: process.env.PONTE_ARQUIVO_VAGAS ?? 'vagas.bin',
  acessos: process.env.PONTE_ARQUIVO_ACESSOS ?? 'acessos.bin',
});

/** Fábrica concreta da família em arquivo binário, um arquivo por entidade. */
export class FabricaRepositoriosArquivo implements FabricaRepositorios {
  constructor(private readonly caminhos: CaminhosArquivos = caminhosPadrao()) {}

  criarRepositorioUsuarios() {
    return new RepositorioUsuariosArquivo(this.caminhos.usuarios);
  }

  criarRepositorioVagas() {
    return new RepositorioVagasArquivo(this.caminhos.vagas);
  }

  criarRepositorioAcessos() {
    return new RepositorioAcessosArquivo(this.caminhos.acessos);
  }
}

const tipoPadrao = (): TipoPersistencia =>
  (process.env.PONTE_PERSISTENCIA as TipoPersistencia | undefined) ?? 'ram';

function tipoDesconhecido(tipo: never): never {
  throw new Error(`Tipo de persistência desconhecido: "${tipo}".`);
}

/**
 * Seleciona, no início da execução, qual fábrica concreta usar. Por padrão usa RAM;
 * defina PONTE_PERSISTENCIA=arquivo (e, opcionalmente, PONTE_ARQUIVO_USUARIOS,
 * PONTE_ARQUIVO_VAGAS e PONTE_ARQUIVO_ACESSOS) para persistir em arquivos binários locais.
 */
export function criarFabricaRepositorios(tipo: TipoPersistencia = tipoPadrao()): FabricaRepositorios {
  switch (tipo) {
    case 'arquivo':
      return new FabricaRepositoriosArquivo();
    case 'ram':
      return new FabricaRepositoriosRAM();
    default:
      return tipoDesconhecido(tipo);
  }
}

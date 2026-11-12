import { RepositorioAcessos } from '../entidades/RepositorioAcessos.js';
import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { RepositorioVagas } from '../entidades/RepositorioVagas.js';
import { RepositorioAcessosArquivo } from './RepositorioAcessosArquivo.js';
import { RepositorioAcessosRAM } from './RepositorioAcessosRAM.js';
import { RepositorioUsuariosArquivo } from './RepositorioUsuariosArquivo.js';
import { RepositorioUsuariosRAM } from './RepositorioUsuariosRAM.js';
import { RepositorioVagasArquivo } from './RepositorioVagasArquivo.js';
import { RepositorioVagasRAM } from './RepositorioVagasRAM.js';

export type TipoPersistencia = 'ram' | 'arquivo';

const tipoPadrao = (): TipoPersistencia =>
  (process.env.PONTE_PERSISTENCIA as TipoPersistencia | undefined) ?? 'ram';

function tipoDesconhecido(tipo: never): never {
  throw new Error(`Tipo de persistência desconhecido: "${tipo}".`);
}

/**
 * Seleciona o mecanismo de persistência no início da execução. Por padrão
 * usa RAM; defina PONTE_PERSISTENCIA=arquivo (e, opcionalmente,
 * PONTE_ARQUIVO_USUARIOS / PONTE_ARQUIVO_VAGAS / PONTE_ARQUIVO_ACESSOS) para
 * persistir em arquivos binários locais.
 */
export function criarRepositorioUsuarios(
  tipo: TipoPersistencia = tipoPadrao(),
  caminhoArquivo: string = process.env.PONTE_ARQUIVO_USUARIOS ?? 'usuarios.bin',
): RepositorioUsuarios {
  switch (tipo) {
    case 'arquivo':
      return new RepositorioUsuariosArquivo(caminhoArquivo);
    case 'ram':
      return new RepositorioUsuariosRAM();
    default:
      return tipoDesconhecido(tipo);
  }
}

export function criarRepositorioVagas(
  tipo: TipoPersistencia = tipoPadrao(),
  caminhoArquivo: string = process.env.PONTE_ARQUIVO_VAGAS ?? 'vagas.bin',
): RepositorioVagas {
  switch (tipo) {
    case 'arquivo':
      return new RepositorioVagasArquivo(caminhoArquivo);
    case 'ram':
      return new RepositorioVagasRAM();
    default:
      return tipoDesconhecido(tipo);
  }
}

export function criarRepositorioAcessos(
  tipo: TipoPersistencia = tipoPadrao(),
  caminhoArquivo: string = process.env.PONTE_ARQUIVO_ACESSOS ?? 'acessos.bin',
): RepositorioAcessos {
  switch (tipo) {
    case 'arquivo':
      return new RepositorioAcessosArquivo(caminhoArquivo);
    case 'ram':
      return new RepositorioAcessosRAM();
    default:
      return tipoDesconhecido(tipo);
  }
}

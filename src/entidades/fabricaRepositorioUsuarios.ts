import { RepositorioUsuarios } from './RepositorioUsuarios.js';
import { RepositorioUsuariosArquivo } from './RepositorioUsuariosArquivo.js';
import { RepositorioUsuariosRAM } from './RepositorioUsuariosRAM.js';

export type TipoPersistencia = 'ram' | 'arquivo';

const CAMINHO_ARQUIVO_PADRAO = 'usuarios.bin';

/**
 * Seleciona o mecanismo de persistência no início da execução. Por padrão
 * usa RAM; defina PONTE_PERSISTENCIA=arquivo (e, opcionalmente,
 * PONTE_ARQUIVO_USUARIOS) para persistir num arquivo binário local.
 */
export function criarRepositorioUsuarios(
  tipo: TipoPersistencia = (process.env.PONTE_PERSISTENCIA as TipoPersistencia | undefined) ?? 'ram',
  caminhoArquivo: string = process.env.PONTE_ARQUIVO_USUARIOS ?? CAMINHO_ARQUIVO_PADRAO,
): RepositorioUsuarios {
  switch (tipo) {
    case 'arquivo':
      return new RepositorioUsuariosArquivo(caminhoArquivo);
    case 'ram':
      return new RepositorioUsuariosRAM();
    default:
      throw new Error(`Tipo de persistência desconhecido: "${tipo}".`);
  }
}

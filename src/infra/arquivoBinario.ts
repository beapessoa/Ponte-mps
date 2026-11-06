import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { deserialize, serialize } from 'node:v8';
import { ErroDeArquivo } from '../entidades/erros/ErroDePersistencia.js';

/**
 * Leitura e gravação de uma coleção inteira num arquivo binário (serialização v8),
 * compartilhadas pelos repositórios em arquivo. Toda falha de E/S vira `ErroDeArquivo`.
 *
 * A serialização v8 não preserva o protótipo das classes, por isso quem lê informa
 * como reconstruir cada registro (`reidratar`).
 */
export function lerRegistros<T>(
  caminho: string,
  conteudo: string,
  reidratar: (registro: Record<string, unknown>) => T,
): T[] {
  if (!existsSync(caminho)) {
    return [];
  }
  try {
    const registros = deserialize(readFileSync(caminho)) as Record<string, unknown>[];
    return registros.map(reidratar);
  } catch (causa) {
    throw new ErroDeArquivo(`Falha ao ler o arquivo de ${conteudo} em "${caminho}".`, causa);
  }
}

export function gravarRegistros(caminho: string, conteudo: string, registros: object[]): void {
  try {
    writeFileSync(caminho, serialize(registros));
  } catch (causa) {
    throw new ErroDeArquivo(`Falha ao gravar o arquivo de ${conteudo} em "${caminho}".`, causa);
  }
}

export function proximoId(registros: { id?: number }[]): number {
  return registros.reduce((maior, registro) => Math.max(maior, registro.id ?? 0), 0) + 1;
}

import { EntidadeNaoEncontradaError } from '../entidades/erros/EntidadeNaoEncontradaError.js';
import { RepositorioVagas } from '../entidades/RepositorioVagas.js';
import { Vaga } from '../entidades/Vaga.js';
import { gravarRegistros, lerRegistros, proximoId } from './arquivoBinario.js';

function reidratarVaga(registro: Record<string, unknown>): Vaga {
  const vaga = new Vaga(
    registro.ongId as number,
    registro.data as string,
    registro.local as string,
    registro.quantidadeVagas as number,
    registro.habilidadesExigidas as string[],
  );
  vaga.id = registro.id as number | undefined;
  return vaga;
}

/**
 * Persiste as vagas num arquivo binário local (serialização v8), sobrevivendo
 * a reinícios do processo. Cada operação relê e regrava o arquivo inteiro.
 */
export class RepositorioVagasArquivo implements RepositorioVagas {
  constructor(private readonly caminhoArquivo: string) {}

  adicionar(vaga: Vaga): Vaga {
    const vagas = this.lerArquivo();
    const novoId = proximoId(vagas);
    this.escreverArquivo([...vagas, { ...vaga, id: novoId }]);
    vaga.id = novoId;
    return vaga;
  }

  buscarPorId(id: number): Vaga | undefined {
    return this.lerArquivo().find((vaga) => vaga.id === id);
  }

  listarTodas(): Vaga[] {
    return this.lerArquivo();
  }

  atualizar(vaga: Vaga): Vaga {
    const vagas = this.lerArquivo();
    const indice = vagas.findIndex((v) => v.id === vaga.id);
    if (indice === -1) {
      throw new EntidadeNaoEncontradaError(`Vaga ${vaga.id} não encontrada.`);
    }
    vagas[indice] = vaga;
    this.escreverArquivo(vagas);
    return vaga;
  }

  remover(id: number): void {
    const vagas = this.lerArquivo();
    const indice = vagas.findIndex((vaga) => vaga.id === id);
    if (indice === -1) {
      throw new EntidadeNaoEncontradaError(`Vaga ${id} não encontrada.`);
    }
    vagas.splice(indice, 1);
    this.escreverArquivo(vagas);
  }

  private lerArquivo(): Vaga[] {
    return lerRegistros(this.caminhoArquivo, 'vagas', reidratarVaga);
  }

  private escreverArquivo(vagas: object[]): void {
    gravarRegistros(this.caminhoArquivo, 'vagas', vagas);
  }
}

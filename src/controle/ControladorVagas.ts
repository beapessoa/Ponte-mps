import { RepositorioVagas } from '../entidades/RepositorioVagas.js';
import { Vaga } from '../entidades/Vaga.js';

type DadosVaga = Pick<Vaga, 'data' | 'local' | 'quantidadeVagas' | 'habilidadesExigidas'>;

function validarCampos({ data, local, quantidadeVagas, habilidadesExigidas }: DadosVaga): void {
  if (!data.trim() || !local.trim() || quantidadeVagas <= 0 || habilidadesExigidas.length === 0) {
    throw new Error(
      'Data, local, quantidade de vagas e habilidades exigidas são obrigatórios para publicar uma vaga.',
    );
  }
}

export class ControladorVagas {
  constructor(private readonly repositorio: RepositorioVagas) {}

  publicarVaga(
    ongId: number,
    data: string,
    local: string,
    quantidadeVagas: number,
    habilidadesExigidas: string[],
  ): Vaga {
    validarCampos({ data, local, quantidadeVagas, habilidadesExigidas });
    const vaga = new Vaga(ongId, data, local, quantidadeVagas, habilidadesExigidas);
    return this.repositorio.adicionar(vaga);
  }

  buscarVaga(id: number): Vaga | undefined {
    return this.repositorio.buscarPorId(id);
  }

  listarVagas(): Vaga[] {
    return this.repositorio.listarTodas();
  }

  atualizarVaga(id: number, dados: Partial<DadosVaga>): Vaga {
    const vaga = this.repositorio.buscarPorId(id);
    if (!vaga) {
      throw new Error(`Vaga ${id} não encontrada.`);
    }

    const atualizada = { ...vaga, ...dados };
    validarCampos(atualizada);
    Object.assign(vaga, atualizada);
    return this.repositorio.atualizar(vaga);
  }

  removerVaga(id: number): void {
    this.repositorio.remover(id);
  }
}

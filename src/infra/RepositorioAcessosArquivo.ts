import { Acesso } from '../entidades/Acesso.js';
import { RepositorioAcessos } from '../entidades/RepositorioAcessos.js';
import { gravarRegistros, lerRegistros, proximoId } from './arquivoBinario.js';

function reidratarAcesso(registro: Record<string, unknown>): Acesso {
  const acesso = new Acesso(registro.usuarioId as number, registro.dataHora as Date);
  acesso.id = registro.id as number | undefined;
  return acesso;
}

/** Persiste o histórico de acessos num arquivo binário local (serialização v8, que preserva `Date`). */
export class RepositorioAcessosArquivo implements RepositorioAcessos {
  constructor(private readonly caminhoArquivo: string) {}

  adicionar(acesso: Acesso): Acesso {
    const acessos = this.listarTodos();
    acesso.id = proximoId(acessos);
    gravarRegistros(this.caminhoArquivo, 'acessos', [...acessos, acesso]);
    return acesso;
  }

  listarTodos(): Acesso[] {
    return lerRegistros(this.caminhoArquivo, 'acessos', reidratarAcesso);
  }

  removerPorUsuario(usuarioId: number): void {
    const restantes = this.listarTodos().filter((acesso) => acesso.usuarioId !== usuarioId);
    gravarRegistros(this.caminhoArquivo, 'acessos', restantes);
  }
}

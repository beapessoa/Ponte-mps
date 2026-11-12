import { RegistroDeAcesso } from '../entidades/RegistroDeAcesso.js';
import { RepositorioAcessos } from '../entidades/RepositorioAcessos.js';
import { gravarRegistros, lerRegistros, proximoId } from './arquivoBinario.js';

function reidratarRegistro(registro: Record<string, unknown>): RegistroDeAcesso {
  const registroDeAcesso = new RegistroDeAcesso(
    registro.usuarioId as number,
    registro.acao as string,
    registro.dataHora as string,
  );
  registroDeAcesso.id = registro.id as number | undefined;
  return registroDeAcesso;
}

/**
 * Persiste os registros de acesso num arquivo binário local (serialização v8),
 * sobrevivendo a reinícios do processo. Log de apenas-inserção: cada operação
 * relê e regrava o arquivo inteiro, sem atualizar ou remover registros.
 */
export class RepositorioAcessosArquivo implements RepositorioAcessos {
  constructor(private readonly caminhoArquivo: string) {}

  adicionar(registro: RegistroDeAcesso): RegistroDeAcesso {
    const registros = this.lerArquivo();
    const novoId = proximoId(registros);
    this.escreverArquivo([...registros, { ...registro, id: novoId }]);
    registro.id = novoId;
    return registro;
  }

  listarTodos(): RegistroDeAcesso[] {
    return this.lerArquivo();
  }

  private lerArquivo(): RegistroDeAcesso[] {
    return lerRegistros(this.caminhoArquivo, 'registros de acesso', reidratarRegistro);
  }

  private escreverArquivo(registros: object[]): void {
    gravarRegistros(this.caminhoArquivo, 'registros de acesso', registros);
  }
}

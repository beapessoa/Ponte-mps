import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { FacadeSingletonController } from '../controle/FacadeSingletonController.js';
import { TipoPersistencia } from '../infra/fabricaRepositorioUsuarios.js';

/**
 * Ponto de entrada em linha de comando (camada de fronteira). Escolhe o
 * mecanismo de persistência no início da execução e só conversa com o
 * sistema através da fachada única.
 */
const MENU = `
[1] Cadastrar ONG           [5] Publicar vaga
[2] Cadastrar voluntário    [6] Listar vagas
[3] Listar usuários         [7] Atualizar vaga
[4] Remover usuário         [8] Remover vaga
[9] Quantidade de entidades cadastradas
[0] Sair`;

const terminal = createInterface({ input: stdin });
// Iterador em vez de question(): mantém em buffer as linhas que chegam antes da pergunta (entrada via pipe).
const linhas = terminal[Symbol.asyncIterator]();

async function perguntar(texto: string): Promise<string> {
  stdout.write(`${texto}: `);
  const { value, done } = await linhas.next();
  if (done) process.exit(0);
  return value.trim();
}

const perguntarNumero = async (texto: string) => Number(await perguntar(texto));
const perguntarLista = async (texto: string) =>
  (await perguntar(`${texto} (separe por vírgula)`))
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

async function escolherPersistencia(): Promise<TipoPersistencia> {
  const opcao = await perguntar('Persistência dos usuários — [1] memória (RAM) [2] arquivo binário');
  return opcao === '2' ? 'arquivo' : 'ram';
}

async function executar(opcao: string, fachada: FacadeSingletonController): Promise<void> {
  switch (opcao) {
    case '1': {
      const ong = fachada.cadastrarONG(
        await perguntar('Nome'),
        await perguntar('Login'),
        await perguntar('Senha'),
        await perguntar('Área de atuação'),
        await perguntar('Descrição'),
      );
      console.log(`ONG cadastrada com id ${ong.id}.`);
      return;
    }
    case '2': {
      const voluntario = fachada.cadastrarVoluntario(
        await perguntar('Nome'),
        await perguntar('Login'),
        await perguntar('Senha'),
        await perguntarLista('Habilidades'),
        await perguntar('Disponibilidade'),
        await perguntar('Localização'),
      );
      console.log(`Voluntário cadastrado com id ${voluntario.id}.`);
      return;
    }
    case '3':
      console.table(fachada.listarUsuarios());
      return;
    case '4':
      fachada.removerUsuario(await perguntarNumero('Id do usuário'));
      console.log('Usuário removido.');
      return;
    case '5': {
      const vaga = fachada.publicarVaga(
        await perguntarNumero('Id da ONG'),
        await perguntar('Data (AAAA-MM-DD)'),
        await perguntar('Local'),
        await perguntarNumero('Quantidade de vagas'),
        await perguntarLista('Habilidades exigidas'),
      );
      console.log(`Vaga publicada com id ${vaga.id}.`);
      return;
    }
    case '6':
      console.table(fachada.listarVagas());
      return;
    case '7': {
      const id = await perguntarNumero('Id da vaga');
      const quantidadeVagas = await perguntarNumero('Nova quantidade de vagas');
      const vaga = fachada.atualizarVaga(id, { quantidadeVagas });
      console.log(`Vaga ${vaga.id} agora tem ${vaga.quantidadeVagas} posições.`);
      return;
    }
    case '8':
      fachada.removerVaga(await perguntarNumero('Id da vaga'));
      console.log('Vaga removida.');
      return;
    case '9':
      console.log(`Entidades cadastradas: ${fachada.contarEntidadesCadastradas()}.`);
      return;
    default:
      console.log('Opção inválida.');
  }
}

console.log('Ponte — conectando quem quer ajudar a quem precisa de ajuda.');
const fachada = FacadeSingletonController.inicializar(await escolherPersistencia());

for (;;) {
  console.log(MENU);
  const opcao = await perguntar('Opção');
  if (opcao === '0') break;
  try {
    await executar(opcao, fachada);
  } catch (erro) {
    console.log(`Erro: ${(erro as Error).message}`);
  }
}
terminal.close();

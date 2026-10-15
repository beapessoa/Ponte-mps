# ADR-0001: Tornar o mecanismo de persistência substituível

- **Status:** aceito
- **Data:** 2026-10-14
- **Requisitos relacionados:** NF-MAN-01

## Contexto

Na Sprint 1, os usuários (ONGs e voluntários) ficam apenas em memória (`RepositorioUsuariosRAM`), perdendo os dados a cada reinício do processo. A partir do Laboratório 2 (Sprint 2), é preciso também guardá-los de forma durável — em arquivo binário —, escolhendo o mecanismo no início da execução, sem reescrever as regras de negócio dos controladores (`ControladorCadastro`, `ControladorListagem`).

## Decisão

As classes de controle dependem apenas da interface `RepositorioUsuarios` (`adicionar(usuario)`, `listarTodos()`), nunca de uma implementação concreta. Existem duas implementações: `RepositorioUsuariosRAM` (memória, não sobrevive a reinício) e `RepositorioUsuariosArquivo` (arquivo binário, serializado com `node:v8`, sobrevive a reinício). A escolha é feita uma única vez, na inicialização, pela fábrica `criarRepositorioUsuarios(tipo, caminhoArquivo?)`, configurável por variáveis de ambiente (`PONTE_PERSISTENCIA`, `PONTE_ARQUIVO_USUARIOS`). Falhas de E/S na implementação em arquivo são convertidas em `ErroDeArquivo` (subclasse de `ErroDePersistencia`), nunca propagadas como exceção nativa do sistema de arquivos.

## Alternativas consideradas

| Alternativa | Por que não |
|---|---|
| `if (tipo === 'arquivo')` espalhado pelos controladores | Duplica a decisão de qual mecanismo usar e mistura regra de negócio com detalhe de infraestrutura |
| Banco de dados desde o início | Exige infraestrutura (servidor de banco) antes de haver regra de negócio estável para testar; a Sprint 1 pede explicitamente persistência em memória |

## Consequências

- Positivas: testes de `ControladorCadastro`/`ControladorListagem` rodam inteiramente em memória, sem E/S; trocar o mecanismo de persistência não altera os controladores nem a camada de entidade além da nova implementação; prepara o terreno para um banco de dados real em iteração futura.
- Negativas: uma interface e uma fábrica a mais para manter; a serialização binária (`node:v8`) não preserva o protótipo das classes, exigindo reconstrução manual de `Ong`/`Voluntario` a cada leitura (ver [`docs/specs/tratamento-erros-persistencia.md`](../../specs/tratamento-erros-persistencia.md)).

# ADR-0003: Repository para todas as entidades, criados por uma Abstract Factory

- **Status:** aceito
- **Data:** 2026-11-11
- **Requisitos relacionados:** NF-MAN-01, RF15, RF16

## Contexto

Com a Sprint 4, o sistema passou a ter três entidades persistidas: `Usuario`, `Vaga` e o novo `Acesso`. Até a Sprint 3, cada repositório era criado por uma função-fábrica solta (`criarRepositorioUsuarios(tipo)`, `criarRepositorioVagas(tipo)`), e nada impedia uma execução de guardar usuários em arquivo e vagas em memória. Com uma terceira entidade, essa mistura ficaria ainda mais fácil, e os acessos de um usuário em RAM apontariam para ids que não existem mais depois de reiniciar.

## Decisão

Toda entidade tem uma porta de **Repository** em `entidades` (`RepositorioUsuarios`, `RepositorioVagas`, `RepositorioAcessos`), com uma implementação em RAM e outra em arquivo binário em `infra`. Os repositórios são criados por uma **Abstract Factory**: a interface `FabricaRepositorios` (em `entidades`) declara `criarRepositorioUsuarios()`, `criarRepositorioVagas()` e `criarRepositorioAcessos()`, e as fábricas concretas `FabricaRepositoriosRAM` e `FabricaRepositoriosArquivo` (em `infra`) criam a família inteira de um mesmo mecanismo. A função `criarFabricaRepositorios(tipo)` escolhe a fábrica no início da execução, e a fachada só conhece a interface. Esta decisão estende o [ADR-0001](0001-persistencia-substituivel.md).

## Alternativas consideradas

| Alternativa | Por que não |
|---|---|
| Manter uma função-fábrica por entidade (Factory Method) | Não garante que todos os repositórios usem o mesmo mecanismo, e cada entidade nova exige lembrar de repassar o `tipo` em mais um lugar |
| Repositório genérico `Repositorio<T>` único | `Acesso` não tem `atualizar`/`remover` (histórico só cresce) e cada entidade precisa de uma reidratação própria ao ler o arquivo |
| Injeção de dependência com container | Uma biblioteca a mais para resolver três objetos criados uma única vez |

## Consequências

- Positivas: impossível misturar mecanismos numa execução; acrescentar um banco de dados é criar uma terceira fábrica concreta, sem tocar nos controladores nem na fachada; os testes trocam a família inteira de uma vez.
- Negativas: cada entidade nova exige um método a mais na interface e nas duas fábricas.

**Atualização (12/11/2026):** `RepositorioAcessos` ganhou `removerPorUsuario(usuarioId)`, a única exceção ao "histórico só cresce" citado acima. Sem ela, remover um usuário e cadastrar outro que reaproveite o mesmo id (persistência em arquivo, onde o id é `max(existentes) + 1`) fazia o relatório de acessos (RF16) atribuir ao novo usuário o histórico de acesso de quem tinha o id antes — `ControladorCadastro.removerUsuario` agora chama `removerPorUsuario` ao remover o usuário, antes que o id seja reaproveitado.

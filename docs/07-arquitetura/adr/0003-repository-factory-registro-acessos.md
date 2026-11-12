# ADR-0003: Repository e Factory Method para todas as entidades

- **Status:** aceito
- **Data:** 2026-11-11
- **Requisitos relacionados:** NF-MAN-01

## Contexto

Desde a Sprint 1, `RepositorioUsuarios` e, desde a Sprint 3, `RepositorioVagas` já seguem a mesma forma: uma interface (porta) no domínio, duas implementações (RAM e arquivo binário) e uma fábrica (`criarRepositorioUsuarios`/`criarRepositorioVagas`) que escolhe a implementação no início da execução — ver [ADR-0001](0001-persistencia-substituivel.md). Isso já é o padrão **Repository** (a porta esconde onde e como a coleção é guardada) combinado com **Factory Method** (a fábrica decide qual implementação instanciar), mas nunca tinha sido nomeado como tal na tabela de padrões.

A Sprint 4 pede explicitamente que **toda** entidade do projeto tenha repositório — e traz uma entidade nova, `RegistroDeAcesso` (change `relatorio-de-acessos`), que alimenta o relatório de estatísticas de acesso dos usuários (S4.4). Sem essa decisão registrada, haveria risco de o registro de acesso ser gravado de forma ad-hoc (por exemplo, direto num array dentro do controlador), fora do padrão já estabelecido para as outras entidades.

## Decisão

`RegistroDeAcesso` segue exatamente a mesma forma de `Usuario` e `Vaga`: uma porta `RepositorioAcessos` em `entidades/`, com duas implementações em `infra/` (`RepositorioAcessosRAM`, `RepositorioAcessosArquivo`) e uma função de fábrica, `criarRepositorioAcessos(tipo, caminhoArquivo?)`, adicionada a `infra/fabricaRepositorios.ts` ao lado das já existentes, selecionável pela mesma variável `PONTE_PERSISTENCIA` e configurável por `PONTE_ARQUIVO_ACESSOS`. Diferença deliberada: como acesso é um registro histórico, a porta só tem `adicionar` e `listarTodos` — não existe `atualizar` nem `remover` para um acesso já registrado.

Com isso, toda entidade do sistema (`Usuario`, `Vaga`, `RegistroDeAcesso`) passa a ter: porta própria, implementação substituível (RAM ↔ arquivo) e criação centralizada na fábrica — nenhuma delas é instanciada diretamente fora de `fabricaRepositorios.ts`.

## Alternativas consideradas

| Alternativa | Por que não |
|---|---|
| Guardar os acessos direto numa lista dentro do controlador que gera o relatório | Acopla a regra de negócio do relatório ao mecanismo de armazenamento e quebra a persistência substituível que as demais entidades já têm (ADR-0001) |
| Uma fábrica genérica única, parametrizada pelo tipo de entidade (`criarRepositorio<T>(entidade, tipo)`) | Exigiria um mapeamento genérico entre entidade e suas implementações RAM/arquivo, mais complexo do que o necessário para três entidades; as funções especializadas atuais já são simples e explícitas |

## Consequências

- Positivas: o padrão Repository + Factory Method, já em uso desde a Sprint 1, fica formalizado e nomeado; estender para uma nova entidade segue uma receita conhecida (porta + RAM + arquivo + função na fábrica); o relatório de acessos (S4.4) pode trocar de mecanismo de persistência sem alterar quem gera o relatório.
- Negativas: mais um par de arquivos (porta + implementações) para cada entidade nova; `RepositorioAcessosArquivo` relê e regrava o arquivo inteiro a cada inserção, como os demais repositórios em arquivo — aceitável no volume atual, mas não escala para um log de acessos muito grande (fica para uma futura migração a banco de dados, já prevista em NF-MAN-01).

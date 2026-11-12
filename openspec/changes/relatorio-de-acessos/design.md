# Design: relatorio-de-acessos

## Context

Até a Sprint 3 o sistema tinha Repository para Usuário e Vaga, escolhido por duas funções-fábrica. A Sprint 4 pede Repository para todas as entidades, Factory, Adapter e Template Method, e o relatório de acessos é a funcionalidade que junta os quatro.

## Goals / Non-Goals

**Goals:**
- Registrar cada entrada bem-sucedida e gerar o relatório em mais de um formato sem duplicar o cálculo das estatísticas.
- Garantir que todos os repositórios de uma execução usem o mesmo mecanismo de persistência.
- Registrar eventos em log sem acoplar o negócio a uma biblioteca de log.

**Non-Goals:**
- Sessão autenticada e permissão para ver o relatório.
- Relatório em PDF (o Template Method permite acrescentar o formato com uma subclasse nova).

## Decisions

- **`Acesso` é uma entidade com repositório próprio**, só com `adicionar` e `listarTodos`: o histórico de acessos não é editado nem apagado.
- **Abstract Factory `FabricaRepositorios`** (porta em `entidades`) com `FabricaRepositoriosRAM` e `FabricaRepositoriosArquivo` (em `infra`). `criarFabricaRepositorios(tipo)` escolhe a fábrica. Com três entidades, as funções soltas permitiam misturar mecanismos; a família garante a coerência. Ver [ADR-0003](../../../docs/07-arquitetura/adr/0003-repository-abstract-factory.md).
- **Adapter `AdaptadorRegistradorPino`** faz a biblioteca pino atender à porta `Registrador`. O log vai para `ponte.log`, não para o terminal, para não poluir a CLI. Ver [ADR-0004](../../../docs/07-arquitetura/adr/0004-adapter-log.md).
- **Template Method em `RelatorioAcessos.gerar()`**, na camada de controle (negócio). Calcular, ordenar e montar as partes é fixo na classe base; `RelatorioAcessosHTML` e `RelatorioAcessosCSV` só implementam `cabecalho`, `linha` e `rodape`. CSV no lugar de PDF: dá para abrir numa planilha e não exige outra dependência.
- **Relógio injetável** em `ControladorAcessos` (`agora`), para os testes terem data fixa.

## Risks / Trade-offs

- Com persistência em arquivo, cada acesso relê e regrava `acessos.bin` inteiro. Isso basta para o volume de uma disciplina; com uso real seria preciso um banco de dados.
- A senha ainda é comparada em texto. A correção fica para NF-SEG-01.

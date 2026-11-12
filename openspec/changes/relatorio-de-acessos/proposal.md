# Proposta: relatorio-de-acessos

## Why

A Sprint 4 pede relatórios de estatísticas de acesso dos usuários (ver `docs/00-entregas.md`). Para a equipe do Ponte, eles mostram quais ONGs e voluntários realmente usam a plataforma e quais se cadastraram e sumiram, o que orienta o contato com quem está inativo. Até aqui o sistema não tinha o conceito de "entrar": era preciso primeiro registrar cada acesso para depois contá-lo.

## What Changes

- Novo requisito **RF15 — Entrar no Sistema**: o usuário informa login e senha; quando conferem, o sistema registra um acesso com data e hora.
- Novo requisito **RF16 — Relatório de Acessos**: o sistema gera, em HTML ou CSV, a quantidade de acessos e o último acesso de cada usuário, com o total.
- Nova entidade `Acesso` com repositório próprio (RAM e arquivo), criado pela mesma fábrica dos demais repositórios.
- Tentativas de acesso recusadas e relatórios gerados passam a ser registrados em log (`ponte.log`).

**Fora do escopo:** sessão e controle de permissão (quem pode ver o relatório), filtro por período, relatório em PDF, gráficos, hash de senha (a senha continua comparada em texto, como no cadastro, e será tratada junto com NF-SEG-01) e limite de tentativas de login.

## Capabilities

### New Capabilities
- `acessos`: entrada no sistema com registro do acesso e relatório de estatísticas de acesso

### Modified Capabilities
- (nenhuma)

## Impact

- Novas classes `Acesso`, `RepositorioAcessos` (porta), `RepositorioAcessosRAM`, `RepositorioAcessosArquivo`, `ControladorAcessos`, `RelatorioAcessos` (+ `RelatorioAcessosHTML`, `RelatorioAcessosCSV`), `Registrador` (porta) e `AdaptadorRegistradorPino`.
- `infra/fabricaRepositorios.ts` passa de funções-fábrica para uma Abstract Factory (`FabricaRepositorios`). Ver ADR-0003.
- Nova dependência de produção: `pino`. Ver ADR-0004.
- `FacadeSingletonController` ganha `entrar()` e `gerarRelatorioAcessos()`; a CLI ganha as opções 10 e 11.

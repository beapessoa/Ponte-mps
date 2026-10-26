# Ponte-mps

Ponte — conectando quem quer ajudar a quem precisa de ajuda. Plataforma que liga voluntários a ONGs.

## Stack

TypeScript / Node.js.

## Estrutura de pacotes

Organização por camadas (fronteira, controle, entidade, infraestrutura), conforme o diagrama de classes de análise do sistema:

```
src/
  entidades/   # domínio: modelos, regras e as PORTAS de persistência (interfaces)
  controle/    # orquestram casos de uso, chamando as entidades
  infra/       # adaptadores concretos das portas: persistência em RAM e arquivo binário
```

A persistência fica em `infra/` (adaptadores) e depende das interfaces definidas no domínio (`entidades/`), não o contrário — inversão de dependência, conforme o [ADR-0001](docs/07-arquitetura/adr/0001-persistencia-substituivel.md). A camada `fronteira` (telas/API) será adicionada quando a stack de interface for definida.

## Especificação

**Prazos e o que entregar em cada sprint: [`docs/00-entregas.md`](docs/00-entregas.md).**

A documentação de requisitos está migrando para o formato versionado adotado pela disciplina (spec-driven):

- [`docs/01-visao.md`](docs/01-visao.md) — introdução e descrição geral
- [`docs/02-glossario.md`](docs/02-glossario.md) — glossário
- [`docs/03-elicitacao.md`](docs/03-elicitacao.md) — técnicas de elicitação
- [`openspec/specs/`](openspec/specs/) — requisitos funcionais e não funcionais (fonte da verdade)
- [`docs/specs/`](docs/specs/README.md) — casos de uso, diagramas de classes de análise e módulo de gerenciamento de usuários (ainda no formato anterior)

Leia antes de implementar qualquer funcionalidade.

## Equipe

**Sistema:** Ponte

| Integrante | Matrícula | GitHub |
|---|---|---|
| Beatriz Pessôa | 20240008600 | [@beapessoa](https://github.com/beapessoa) |
| Emyle Lucena | 20240007907 | [@Emysntts](https://github.com/Emysntts) |
| Maria Clara Dantas | 20240008083 | [@claratdantass](https://github.com/claratdantass) |

**Professor:** Raoni Kulesza

## Rodando o projeto

```bash
npm install
npm test        # roda a suíte de testes
npm run build   # compila para dist/
npm run typecheck
```

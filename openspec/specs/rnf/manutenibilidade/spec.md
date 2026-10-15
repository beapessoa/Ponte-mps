# rnf/manutenibilidade Specification

## Purpose
Requisitos não funcionais de organização em camadas e substituição de mecanismos de persistência.

## Requirements

### Requirement: NF-MAN-01 — Arquitetura em Camadas e Persistência Substituível
O sistema DEVE ser organizado em camadas (fronteira, controle e entidade), de modo que a camada de persistência possa evoluir — da atual persistência em memória para um banco de dados durável — sem alterar os contratos públicos das camadas de controle, favorecendo a manutenção e a portabilidade.

**Prioridade:** Desejável
**Casos de uso:** requisito do sistema como um todo
**Status:** Implementado parcialmente — ver [`docs/specs/tratamento-erros-persistencia.md`](../../../docs/specs/tratamento-erros-persistencia.md) (dois mecanismos de persistência já implementados: RAM e arquivo binário)

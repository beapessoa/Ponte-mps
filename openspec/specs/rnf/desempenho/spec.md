# rnf/desempenho Specification

## Purpose
Requisitos não funcionais de tempo de resposta do sistema.

## Requirements

### Requirement: NF-DES-01 — Desempenho na Busca
O tempo de carregamento da lista de vagas e do sistema de recomendação (Match) NÃO DEVE ultrapassar 3 segundos.

**Prioridade:** Importante
**Casos de uso:** UC04

#### Scenario: Carregamento dentro do limite
- **GIVEN** existem 500 vagas publicadas e um voluntário com perfil completo
- **WHEN** ele abre a tela inicial para ver as sugestões (Match)
- **THEN** a lista é exibida em até 3 segundos

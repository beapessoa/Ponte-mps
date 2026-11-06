# match Specification

## Purpose
Busca manual e sugestão automática (Match) de ações compatíveis com o perfil do voluntário. Ainda não implementado; especificado para orientar o desenvolvimento da próxima sprint.

## Requirements

### Requirement: RF04 — Busca e Sugestão Automática de Ações (Match)
O sistema DEVE sugerir automaticamente ações compatíveis com o perfil técnico, a disponibilidade e a localização do voluntário, além de permitir a busca manual por filtros.

**Regra de negócio:** o sistema só sugere uma vaga a um voluntário quando há compatibilidade entre habilidades, disponibilidade e localização do voluntário e os requisitos da vaga (RN04).
**Prioridade:** Essencial
**Casos de uso:** UC04
**Status:** Não implementado

#### Scenario: Sugestão só de vagas compatíveis
- **GIVEN** um voluntário com a habilidade "enfermagem", disponível de manhã, em João Pessoa, e duas vagas publicadas: uma em João Pessoa pela manhã exigindo "enfermagem" e outra exigindo "carpintaria"
- **WHEN** o voluntário abre as sugestões (Match)
- **THEN** o sistema sugere apenas a vaga de enfermagem

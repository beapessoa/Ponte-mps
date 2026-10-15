# rnf/usabilidade Specification

## Purpose
Requisitos não funcionais de facilidade de uso e acessibilidade da interface.

## Requirements

### Requirement: NF-USA-01 — Acessibilidade Cognitiva e Facilidade de Uso
O sistema DEVE ter uma interface de gestão da ONG extremamente simplificada, limpa e sem jargões técnicos, permitindo a publicação de vagas de forma intuitiva.

**Prioridade:** Essencial
**Casos de uso:** UC01, UC03, UC06

#### Scenario: Coordenadora sem experiência prévia
- **GIVEN** uma coordenadora de ONG que nunca usou a plataforma
- **WHEN** ela publica sua primeira vaga
- **THEN** ela conclui a publicação sem precisar de ajuda externa ou entender jargão técnico

### Requirement: NF-USA-02 — Responsividade e Portabilidade
O sistema DEVE ser totalmente responsivo (abordagem mobile first), garantindo que o voluntário possa buscar vagas, inscrever-se e receber lembretes pelo celular de forma fluida.

**Prioridade:** Essencial
**Casos de uso:** UC02, UC04, UC05

#### Scenario: Uso em celular
- **GIVEN** um voluntário acessa a plataforma pelo celular
- **WHEN** ele busca vagas e se inscreve em uma delas
- **THEN** todas as telas são exibidas sem rolagem horizontal e sem perda de funcionalidade

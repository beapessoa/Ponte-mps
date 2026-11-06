# rnf/usabilidade Specification

## Purpose
Requisitos não funcionais de facilidade de uso e acessibilidade da interface.

## Requirements

### Requirement: NF-USA-01 — Facilidade de Uso na Gestão da ONG
Em teste de usabilidade com coordenadoras de ONG sem experiência prévia na plataforma, pelo menos **4 de cada 5** DEVEM conseguir publicar uma vaga em **até 2 minutos**, sem ajuda externa e sem erro que impeça a conclusão. O fluxo de publicação NÃO DEVE conter termos técnicos (código, configuração ou jargão de TI).

**Prioridade:** Essencial
**Casos de uso:** UC01, UC03, UC06
**Métrica:** ≥ 80% de sucesso (4/5 usuários) · tempo ≤ 2 min · 0 termo técnico no fluxo

#### Scenario: Coordenadora sem experiência publica em até 2 minutos
- **GIVEN** 5 coordenadoras de ONG que nunca usaram a plataforma
- **WHEN** cada uma publica sua primeira vaga, sem ajuda externa
- **THEN** pelo menos 4 concluem a publicação em até 2 minutos

### Requirement: NF-USA-02 — Responsividade (mobile first)
Em qualquer largura de tela entre **320 px e 1920 px**, todas as funcionalidades do voluntário (buscar vagas, inscrever-se e consultar lembretes) DEVEM permanecer utilizáveis **sem rolagem horizontal**, sem sobreposição de elementos e sem perda de funcionalidade. Os alvos de toque DEVEM ter no mínimo **44×44 px**.

**Prioridade:** Essencial
**Casos de uso:** UC02, UC04, UC05
**Métrica:** 320–1920 px · 0 ocorrência de rolagem horizontal · alvos de toque ≥ 44×44 px

#### Scenario: Uso em celular de 320 px
- **GIVEN** um voluntário acessa a plataforma em uma tela de 320 px de largura
- **WHEN** ele busca vagas e se inscreve em uma delas
- **THEN** todas as telas são exibidas sem rolagem horizontal e todas as ações continuam acessíveis

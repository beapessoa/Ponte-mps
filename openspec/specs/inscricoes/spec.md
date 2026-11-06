# inscricoes Specification

## Purpose
Inscrição do voluntário em uma ação e gestão das inscrições pela ONG (aprovação/recusa), incluindo os lembretes decorrentes da aprovação. Ainda não implementado; especificado para orientar o desenvolvimento das próximas sprints.

## Requirements

### Requirement: RF05 — Inscrição Simplificada
O sistema DEVE permitir que o voluntário se inscreva em uma ação disponível de forma simples e rápida, agilizando seu processo de candidatura.

**Regra de negócio:** toda inscrição depende de aprovação da ONG responsável; o voluntário só é confirmado na ação após essa aprovação (RN05).
**Prioridade:** Essencial
**Casos de uso:** UC05
**Status:** Não implementado

#### Scenario: Inscrição fica pendente até a aprovação
- **GIVEN** uma vaga publicada com posições disponíveis
- **WHEN** um voluntário se inscreve nela
- **THEN** a inscrição é registrada com status "pendente" e o voluntário só aparece como confirmado depois da aprovação da ONG

### Requirement: RF06 — Painel de Gestão de Vagas
O sistema DEVE permitir que a ONG visualize a lista de inscritos em suas vagas e aprove ou recuse cada candidatura, organizando a equipe e evitando faltas.

**Regra de negócio:** uma vaga que atinge o número máximo de aprovados não aceita novas aprovações (RN06).
**Prioridade:** Importante
**Casos de uso:** UC06
**Status:** Não implementado

#### Scenario: Aprovação além do limite é recusada
- **GIVEN** uma vaga com 2 posições e 2 inscrições já aprovadas
- **WHEN** a ONG tenta aprovar uma terceira inscrição
- **THEN** o sistema recusa a aprovação e mantém a vaga com 2 aprovados

### Requirement: RF08 — Sistema de Lembretes
O sistema DEVE enviar notificações ao voluntário aprovado sobre a ação (data e local), reduzindo as chances de ausência.

**Regra de negócio:** lembretes automáticos só são enviados a voluntários cuja inscrição na ação foi aprovada (RN08).
**Prioridade:** Importante
**Casos de uso:** UC06
**Status:** Não implementado

#### Scenario: Lembrete só para aprovados
- **GIVEN** uma ação com um voluntário aprovado e outro com inscrição pendente
- **WHEN** chega o momento de enviar os lembretes da ação
- **THEN** apenas o voluntário aprovado recebe o lembrete com data e local

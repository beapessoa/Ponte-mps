# avaliacoes Specification

## Purpose
Avaliação mútua entre ONG e voluntário após a ação, histórico de participações (currículo de impacto) e emissão de certificado digital. Ainda não implementado; especificado para orientar o desenvolvimento das próximas sprints.

## Requirements

### Requirement: RF07 — Geração de Certificado
O sistema DEVE permitir que o voluntário baixe um certificado digital após a conclusão de uma ação, comprovando horas em atividades extracurriculares.

**Regra de negócio:** o certificado digital de horas só pode ser emitido após a ONG confirmar a participação efetiva do voluntário na ação (RN07).
**Prioridade:** Importante
**Casos de uso:** UC07
**Status:** Não implementado

#### Scenario: Certificado só após participação confirmada
- **GIVEN** um voluntário inscrito numa ação já realizada, cuja participação a ONG ainda não confirmou
- **WHEN** ele tenta baixar o certificado
- **THEN** o sistema não emite o certificado e informa que falta a confirmação da ONG; após a confirmação, o certificado fica disponível para download

### Requirement: RF09 — Avaliação Mútua (ONG e Voluntário)
O sistema DEVE permitir que ONG e voluntário avaliem um ao outro após a ação, gerando um histórico de confiança e segurança na plataforma.

**Regra de negócio:** a avaliação mútua entre ONG e voluntário só fica disponível após a data de realização da ação (RN09).
**Prioridade:** Importante
**Casos de uso:** UC07
**Status:** Não implementado

#### Scenario: Avaliação liberada só após a ação
- **GIVEN** uma ação marcada para 20/11/2026 com um voluntário aprovado
- **WHEN** a ONG ou o voluntário tenta avaliar o outro antes de 20/11/2026
- **THEN** o sistema não permite a avaliação; a partir do dia seguinte à ação, os dois lados podem avaliar

### Requirement: RF10 — Currículo de Impacto (Histórico)
O sistema DEVE permitir que o voluntário visualize o histórico de todas as ações de que participou, utilizável como um currículo de impacto social.

**Prioridade:** Desejável
**Casos de uso:** UC07 (`include` histórico)
**Status:** Não implementado

#### Scenario: Histórico lista as ações concluídas
- **GIVEN** um voluntário que participou de 3 ações com participação confirmada
- **WHEN** ele abre o seu currículo de impacto
- **THEN** o sistema lista as 3 ações com ONG, data e horas, sem incluir inscrições recusadas ou ações futuras

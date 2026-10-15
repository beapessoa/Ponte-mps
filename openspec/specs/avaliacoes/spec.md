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

### Requirement: RF09 — Avaliação Mútua (ONG e Voluntário)
O sistema DEVE permitir que ONG e voluntário avaliem um ao outro após a ação, gerando um histórico de confiança e segurança na plataforma.

**Regra de negócio:** a avaliação mútua entre ONG e voluntário só fica disponível após a data de realização da ação (RN09).
**Prioridade:** Importante
**Casos de uso:** UC07
**Status:** Não implementado

### Requirement: RF10 — Currículo de Impacto (Histórico)
O sistema DEVE permitir que o voluntário visualize o histórico de todas as ações de que participou, utilizável como um currículo de impacto social.

**Prioridade:** Desejável
**Casos de uso:** UC07 (`include` histórico)
**Status:** Não implementado

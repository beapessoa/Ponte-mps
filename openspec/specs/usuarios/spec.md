# usuarios Specification

## Purpose
Gerenciamento dos usuários do sistema (ONG e Voluntário): cadastro com validação de campos obrigatórios e de credenciais (login/senha), e listagem dos usuários cadastrados. Única capacidade implementada até a Sprint 1/2 — RF01 e RF02 representam os 20% mais importantes do sistema (ver [`docs/01-visao.md`](../../../docs/01-visao.md) §2.3).

## Requirements

### Requirement: RF01 — Cadastro de ONG
O sistema DEVE permitir que a coordenadora de uma ONG crie o perfil da organização, informando nome, área de atuação e descrição, para que os voluntários conheçam seu trabalho e confirmem sua credibilidade.

**Regra de negócio:** uma ONG só é cadastrada com nome, área de atuação e descrição preenchidos (RN01).
**Prioridade:** Essencial
**Casos de uso:** UC01
**Status:** Implementado na Sprint 1 — ver [`docs/specs/gerenciamento-usuarios.md`](../../../docs/specs/gerenciamento-usuarios.md)

### Requirement: RF02 — Cadastro de Voluntário
O sistema DEVE permitir que o voluntário crie seu perfil preenchendo habilidades, disponibilidade e localização, de modo a habilitar a busca e a sugestão de ações compatíveis.

**Regra de negócio:** um voluntário só é cadastrado com nome, habilidades, disponibilidade e localização preenchidos (RN02).
**Prioridade:** Essencial
**Casos de uso:** UC02
**Status:** Implementado na Sprint 1 — ver [`docs/specs/gerenciamento-usuarios.md`](../../../docs/specs/gerenciamento-usuarios.md)

### Requirement: Listagem de usuários
O sistema DEVE permitir consultar todos os usuários (ONGs e voluntários) já cadastrados.

**Prioridade:** Essencial
**Status:** Implementado na Sprint 1 — `ControladorListagem.listarUsuarios()`

### Requirement: Credenciais de acesso
O sistema DEVE validar login (não vazio, no máximo 12 caracteres, sem números) e senha (política padrão do AWS IAM: 8–128 caracteres, ao menos 3 dos 4 tipos de caractere, diferente do login) no cadastro de qualquer usuário, lançando `LoginInvalidoError` ou `SenhaInvalidaError` em caso de violação.

**Prioridade:** Essencial
**Status:** Implementado no Laboratório 2 — ver [`docs/specs/tratamento-erros-persistencia.md`](../../../docs/specs/tratamento-erros-persistencia.md)

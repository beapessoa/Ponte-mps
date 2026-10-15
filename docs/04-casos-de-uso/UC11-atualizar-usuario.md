# [UC11] Atualizar Usuário

Permite que uma ONG ou um voluntário atualize os dados do próprio perfil.

| Campo | Valor |
|---|---|
| **Ator** | ONG ou Voluntário |
| **Prioridade** | Importante |
| **Requisitos** | RF13 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Implementado na Sprint 3 — `ControladorCadastro.atualizarONG()` / `atualizarVoluntario()` |

**Entradas e pré-condições**
- O usuário já possui cadastro ativo (UC01 ou UC02).

**Saídas e pós-condições**
- O perfil passa a refletir os novos dados na listagem (UC08).

## Fluxo principal

1. O usuário acessa a edição do próprio perfil.
2. O usuário altera um ou mais campos (dados institucionais para ONG; habilidades, disponibilidade ou localização para voluntário).
3. O sistema valida os campos obrigatórios, nas mesmas regras do cadastro (RN01/RN02).
4. O sistema atualiza o perfil e exibe mensagem de sucesso.

## Fluxos secundários

**FE1 — Campos obrigatórios ausentes (passo 3)**
1. O sistema exibe mensagem de erro e mantém o perfil com os dados anteriores.

**FE2 — Usuário inexistente ou tipo incompatível**
1. O sistema recusa a atualização — por exemplo, ao tentar atualizar um voluntário através do fluxo de ONG.

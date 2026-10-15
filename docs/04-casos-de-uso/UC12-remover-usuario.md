# [UC12] Remover Usuário

Permite remover o cadastro de um usuário (ONG ou voluntário).

| Campo | Valor |
|---|---|
| **Ator** | ONG ou Voluntário |
| **Prioridade** | Importante |
| **Requisitos** | RF14 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Implementado na Sprint 3 — `ControladorCadastro.removerUsuario()` |

**Entradas e pré-condições**
- O usuário já possui cadastro ativo (UC01 ou UC02).

**Saídas e pós-condições**
- O usuário deixa de aparecer na listagem (UC08).

## Fluxo principal

1. O usuário (ou a Secretaria/ONG responsável) confirma a remoção do cadastro.
2. O sistema remove o usuário e exibe mensagem de sucesso.

## Fluxos secundários

**FE1 — Usuário inexistente**
1. O sistema recusa a remoção, informando que o usuário não foi encontrado.

# [UC02] Cadastrar Voluntário

Permite que um voluntário crie seu perfil informando habilidades, disponibilidade e localização, para receber sugestões de vagas compatíveis.

| Campo | Valor |
|---|---|
| **Ator** | Voluntário |
| **Prioridade** | Essencial |
| **Requisitos** | RF02, NF-USA-02, NF-SEG-01 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Implementado na Sprint 1 — ver [`docs/specs/gerenciamento-usuarios.md`](../specs/gerenciamento-usuarios.md) |

**Entradas e pré-condições**
- O voluntário ainda não possui cadastro na plataforma.

**Saídas e pós-condições**
- O perfil de voluntário é criado e fica apto a buscar (UC04) e se inscrever em vagas (UC05).

## Fluxo principal

1. O voluntário acessa "Cadastrar Voluntário".
2. O sistema solicita dados pessoais, habilidades, disponibilidade e localização.
3. O voluntário preenche e confirma os dados.
4. O sistema valida o perfil preenchido (RN02).
5. O sistema cria o perfil do voluntário e exibe mensagem de sucesso.

## Fluxos secundários

**FE1 — Dados incompletos (passo 4)**
1. O sistema solicita complementação antes de liberar buscas e inscrições.

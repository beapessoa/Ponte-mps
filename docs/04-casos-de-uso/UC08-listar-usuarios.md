# [UC08] Listar Usuários Cadastrados

Permite consultar todos os usuários (ONGs e voluntários) já cadastrados na plataforma, sem expor a senha de nenhum deles.

| Campo | Valor |
|---|---|
| **Ator** | ONG, Voluntário |
| **Prioridade** | Essencial |
| **Requisitos** | "Listagem de usuários" ([`openspec/specs/usuarios`](../../openspec/specs/usuarios/spec.md)), NF-SEG-02 |
| **Interfaces** | — (pendente, UI ainda não definida; na CLI, opção "Listar usuários") |
| **Status** | Implementado na Sprint 1 — `ControladorListagem.listarUsuarios()`, via `FacadeSingletonController.listarUsuarios()` |

**Entradas e pré-condições**
- Nenhuma.

**Saídas e pós-condições**
- Lista com nome, login e dados de perfil de cada usuário, **sem o campo senha** (NF-SEG-02).

## Fluxo principal

1. O usuário escolhe "Listar usuários".
2. O sistema consulta todos os usuários no mecanismo de persistência escolhido (RAM ou arquivo).
3. O sistema remove a senha de cada registro e exibe a lista.

## Fluxos secundários

**FA1 — Nenhum usuário cadastrado (passo 2)**
1. O sistema exibe uma lista vazia.

**FE1 — Falha ao ler o arquivo de usuários (passo 2)**
1. O sistema informa que não foi possível ler os dados (`ErroDeArquivo`), sem exibir a exceção nativa (NF-CON-02).

# [UC01] Cadastrar ONG

Permite que uma organização crie seu perfil na plataforma, informando dados institucionais e áreas de atuação, para que voluntários conheçam seu trabalho e confirmem sua credibilidade.

| Campo | Valor |
|---|---|
| **Ator** | ONG (Coordenadora) |
| **Prioridade** | Essencial |
| **Requisitos** | RF01, NF-USA-01, NF-SEG-01 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Implementado na Sprint 1 — ver [`docs/specs/gerenciamento-usuarios.md`](../specs/gerenciamento-usuarios.md) |

**Entradas e pré-condições**
- A organização ainda não possui cadastro na plataforma.

**Saídas e pós-condições**
- O perfil da ONG é criado e fica disponível para publicação de vagas (UC03).

## Fluxo principal

1. A coordenadora acessa a opção "Cadastrar ONG".
2. O sistema solicita dados institucionais (nome, descrição, contato, áreas de atuação).
3. A coordenadora preenche e confirma os dados.
4. O sistema valida os campos obrigatórios (RN01).
5. O sistema cria o perfil da ONG e exibe mensagem de sucesso.

## Fluxos secundários

**FE1 — Campos obrigatórios ausentes ou inválidos (passo 4)**
1. O sistema exibe mensagem de erro e solicita correção.

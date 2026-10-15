# [UC05] Inscrever-se em Vaga

Permite que o voluntário se inscreva em uma vaga publicada de forma simples e rápida, com um único clique.

| Campo | Valor |
|---|---|
| **Ator** | Voluntário |
| **Prioridade** | Essencial |
| **Requisitos** | RF05, NF-USA-02, NF-CON-01 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Não implementado |

**Entradas e pré-condições**
- O voluntário está autenticado e visualiza os detalhes de uma vaga (UC04).

**Saídas e pós-condições**
- A inscrição fica pendente de aprovação pela ONG (UC06).

## Fluxo principal

1. O voluntário acessa a tela de detalhes da vaga.
2. O voluntário seleciona "Quero Ajudar / Inscrever-se".
3. O sistema registra a inscrição com status "pendente".
4. O sistema notifica a ONG responsável sobre a nova inscrição.

## Fluxos secundários

**FA1 — Vaga já atingiu o número necessário (passo 1)**
1. O sistema informa a indisponibilidade e sugere vagas similares.

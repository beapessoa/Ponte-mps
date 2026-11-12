# [UC14] Gerar Relatório de Acessos

Permite que a equipe da Ponte veja quantas vezes cada usuário entrou na plataforma e quando foi a última vez.

| Campo | Valor |
|---|---|
| **Ator** | Equipe Ponte (quem opera a plataforma) |
| **Prioridade** | Importante |
| **Requisitos** | RF16 |
| **Interfaces** | CLI, opção 11 (tela web pendente) |
| **Status** | Implementado na Sprint 4 — `ControladorAcessos.gerarRelatorio()` |

**Entradas e pré-condições**
- Formato escolhido: HTML ou CSV.

**Saídas e pós-condições**
- Arquivo `relatorio-acessos.html` ou `relatorio-acessos.csv` com, por usuário, nome, login, tipo, quantidade de acessos e último acesso, e o total.

## Fluxo principal

1. A equipe escolhe o formato do relatório.
2. O sistema calcula as estatísticas a partir dos usuários e dos acessos registrados (UC13).
3. O sistema gera o relatório no formato escolhido e informa onde ele foi salvo.

## Fluxos secundários

**FE1 — Formato não suportado**
1. O sistema recusa informando que o formato é desconhecido.

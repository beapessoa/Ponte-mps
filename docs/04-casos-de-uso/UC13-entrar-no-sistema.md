# [UC13] Entrar no Sistema

Permite que uma ONG ou um voluntário cadastrado entre com login e senha. Cada entrada bem-sucedida fica registrada como um acesso.

| Campo | Valor |
|---|---|
| **Ator** | ONG ou Voluntário |
| **Prioridade** | Importante |
| **Requisitos** | RF15 |
| **Interfaces** | CLI, opção 10 (tela web pendente) |
| **Status** | Implementado na Sprint 4 — `ControladorAcessos.entrar()` |

**Entradas e pré-condições**
- O usuário já possui cadastro ativo (UC01 ou UC02).

**Saídas e pós-condições**
- Um acesso com o usuário e a data e hora fica registrado e passa a contar no relatório (UC14).

## Fluxo principal

1. O usuário informa login e senha.
2. O sistema confere as credenciais, registra o acesso e dá as boas-vindas.

## Fluxos secundários

**FE1 — Login ou senha inválidos**
1. O sistema recusa com "Login ou senha inválidos.", sem dizer qual dos dois errou.
2. Nenhum acesso é registrado; a tentativa vai para o log, sem a senha.

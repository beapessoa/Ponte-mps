# [UC01] Cadastrar ONG

Permite que uma organização crie seu perfil na plataforma, informando dados institucionais e áreas de atuação, para que voluntários conheçam seu trabalho e confirmem sua credibilidade.

| Campo | Valor |
|---|---|
| **Ator** | ONG (Coordenadora) |
| **Prioridade** | Essencial |
| **Requisitos** | RF01, NF-USA-01, NF-SEG-01 |
| **Interfaces** | [TL01 — Cadastro de ONG](../06-interface/README.md#tl01--cadastro-de-ong) |
| **Status** | Implementado na Sprint 1 — ver [`docs/specs/gerenciamento-usuarios.md`](../specs/gerenciamento-usuarios.md) |

**Entradas e pré-condições**
- A organização ainda não possui cadastro na plataforma.

**Saídas e pós-condições**
- O perfil da ONG é criado e fica disponível para publicação de vagas (UC03).

## Fluxo principal

1. A coordenadora acessa a opção "Cadastrar ONG".
2. O sistema solicita os dados de acesso (login e senha) e os dados institucionais (nome, área de atuação e descrição).
3. A coordenadora preenche e confirma os dados.
4. O sistema valida os campos obrigatórios (RN01), o login e a senha ([`openspec/specs/usuarios`](../../openspec/specs/usuarios/spec.md)).
5. O sistema cria o perfil da ONG e exibe mensagem de sucesso.

## Fluxos secundários

**FE1 — Campos obrigatórios ausentes (passo 4)**
1. Nome, área de atuação ou descrição em branco.
2. O sistema exibe mensagem de erro e solicita correção, sem criar o perfil.

**FE2 — Login inválido (passo 4)**
1. O login está vazio, tem mais de 12 caracteres ou contém números.
2. O sistema exibe a regra violada (`LoginInvalidoError`) e não cria o perfil.

**FE3 — Senha inválida (passo 4)**
1. A senha tem menos de 8 ou mais de 128 caracteres, usa menos de 3 dos 4 tipos de caractere (maiúscula, minúscula, número, símbolo) ou é igual ao login.
2. O sistema exibe a regra violada (`SenhaInvalidaError`) e não cria o perfil. A senha digitada nunca é exibida (NF-SEG-02).

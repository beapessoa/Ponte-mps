# Descrição da interface com o usuário

> Seção 8 do modelo. Rascunhos (wireframes) das telas dos três casos de uso detalhados da Entrega 2: [UC01](../04-casos-de-uso/UC01-cadastrar-ong.md), [UC03](../04-casos-de-uso/UC03-publicar-vaga.md) e [UC09](../04-casos-de-uso/UC09-atualizar-vaga.md).
> Cada tela tem um ID (TLnn) citado nos casos de uso. As telas web ainda não foram implementadas. Hoje, os mesmos fluxos rodam na CLI (`npm start`, ver [README](../../README.md#rodando-o-projeto)), que chama os mesmos métodos da `FacadeSingletonController`.

Princípios aplicados a todas as telas, vindos dos RNFs:

- **NF-USA-01:** só os campos obrigatórios, rótulos sem jargão técnico e no máximo uma tela por tarefa. A meta é publicar uma vaga em até 2 minutos.
- **NF-USA-02:** layout em uma coluna abaixo de 600 px e botões com pelo menos 44×44 px.
- **NF-SEG-02:** a senha nunca aparece depois de digitada. Nas listagens não existe coluna de senha.

## TL01 — Cadastro de ONG

Relacionada a: UC01 · RF01, NF-USA-01, NF-SEG-01, NF-SEG-02

```text
┌────────────────────────────────────────────────┐
│ Ponte                              Entrar      │
├────────────────────────────────────────────────┤
│ Cadastrar ONG                                  │
│                                                │
│ Nome da organização  [Amigos do Bairro______]  │
│ Área de atuação      [Saúde ▾]                 │
│ Descrição            [Ações de saúde em____]   │
│                      [comunidades de JP____]   │
│                                                │
│ Login                [amigos_______________]   │
│   até 12 letras, sem números                   │
│ Senha                [••••••••_____________]   │
│   8+ caracteres, 3 de: A-Z a-z 0-9 símbolo     │
│                                                │
│ ☐ Li e aceito o uso dos dados (LGPD)           │
│                                                │
│ ⚠ Senha inválida: use pelo menos 3 tipos de    │
│   caractere.               ← só aparece no FE3 │
│                                                │
│                    [ Cancelar ] [ Cadastrar ]  │
└────────────────────────────────────────────────┘
```

As dicas abaixo de Login e Senha antecipam as regras e evitam os fluxos FE2 e FE3. Quando há erro, a mensagem cita a regra violada e o formulário continua preenchido, exceto a senha.

## TL02 — Publicar vaga

Relacionada a: UC03 (publicar), UC09 (editar: mesma tela, já preenchida) · RF03, RF11, NF-USA-01

```text
┌────────────────────────────────────────────────┐
│ Ponte · Amigos do Bairro          Minhas vagas │
├────────────────────────────────────────────────┤
│ Publicar vaga              (Editar vaga #1)    │
│                                                │
│ Data                 [20/11/2026 📅]           │
│ Local                [Centro Comunitário____]  │
│ Quantas pessoas?     [ - ]  5  [ + ]           │
│ Habilidades          [primeiros socorros ×]    │
│                      [logística ×] [+ outra]   │
│                                                │
│ ⚠ Informe ao menos uma habilidade.             │
│                       ← só aparece no FE1      │
│                                                │
│                    [ Cancelar ] [ Publicar ]   │
│                                  ([ Salvar ])  │
└────────────────────────────────────────────────┘
```

- O publicador vem da sessão da ONG logada. A coordenadora não digita o próprio ID, e por isso o FE2 do UC03 ("não é uma ONG cadastrada") não acontece pela tela, só por chamadas diretas.
- O contador `[-] n [+]` não deixa escolher 0 ou um valor negativo, o que já atende parte da RN03 antes do envio.

## TL03 — Minhas vagas

Relacionada a: UC03 (resultado da publicação), UC09 (ponto de partida da edição), UC10 · RF03, RF11, RF12, NF-USA-01

```text
┌──────────────────────────────────────────────────────────────┐
│ Ponte · Amigos do Bairro                    [ + Nova vaga ]  │
├──────────────────────────────────────────────────────────────┤
│ ✔ Vaga publicada!                                            │
├──────────────────────────────────────────────────────────────┤
│ #  Data        Local               Vagas  Habilidades        │
│ 1  20/11/2026  Centro Comunitário    5    primeiros socorros │
│                                           logística          │
│                                   [ Editar ] [ Remover ]     │
│ 2  27/11/2026  Escola Municipal      3    recreação          │
│                                   [ Editar ] [ Remover ]     │
└──────────────────────────────────────────────────────────────┘
```

**Editar** abre a TL02 preenchida (UC09). **Remover** pede confirmação antes de apagar (UC10).

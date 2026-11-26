# ADR-0006: Memento para desfazer a atualização de vaga

- **Status:** aceito
- **Data:** 2026-11-25
- **Requisitos relacionados:** RF17

## Contexto

Desfazer a última atualização de uma vaga exige devolver data, local, quantidade de vagas e habilidades aos valores anteriores. `ControladorVagas.atualizarVaga` altera a vaga existente, então o estado antigo se perde a menos que alguém o guarde antes. Esse "alguém" não pode ser quem edita os campos da vaga por fora, senão o conhecimento de quais campos existem se espalha.

## Decisão

Padrão Memento, com três papéis:

- **Originator — `Vaga`:** `criarMemento()` tira o retrato e `restaurar(memento)` volta a ele.
- **Memento — `VagaMemento`:** cópia imutável (`readonly`) dos quatro campos editáveis; a lista de habilidades é copiada para uma alteração posterior não mudar o retrato. Não guarda `id` nem `ongId`, que a atualização não altera.
- **Caretaker — `ComandoAtualizarVaga` e `Invocador`:** o comando tira o memento antes de atualizar e só o mantém se a atualização der certo; o `Invocador` guarda o último comando desfazível (um nível). `ControladorVagas.restaurarVaga()` aplica o memento e grava no repositório.

## Alternativas consideradas

| Alternativa | Por que não |
|---|---|
| Guardar uma cópia inteira da vaga (`{ ...vaga }`) | Copia `id` e `ongId` sem necessidade e expõe os campos para quem guarda a cópia mexer neles |
| Guardar um histórico de alterações com data e autor | Mais do que RF17 pede; vira funcionalidade própria (auditoria) |
| Vários níveis de desfazer (pilha) | Fora do escopo: a Sprint 5 pede só a última atualização |

## Consequências

- Positivas: `Vaga` é a única que conhece seus campos editáveis; a restauração funciona igual com persistência em RAM ou em arquivo, porque passa pelo repositório.
- Negativas: o desfazer vale só enquanto o programa está aberto; um novo campo editável em `Vaga` precisa ser incluído no memento e em `restaurar()`, e o teste de restauração cobre isso.

# ADR-0005: Operações da fachada como comandos (Command)

- **Status:** aceito
- **Data:** 2026-11-25
- **Requisitos relacionados:** RF17, NF-MAN-01

## Contexto

Até a Sprint 4, cada método de `FacadeSingletonController` chamava direto o método do controlador correspondente. Para desfazer a última atualização de uma vaga (RF17) a fachada precisa guardar *o que foi feito*, não só o resultado, e saber reverter. A Sprint 5 pede que a fachada da camada de negócio use o padrão Command.

## Decisão

Cada operação que altera estado ou autentica vira uma classe de comando (`ComandoCadastrarONG`, `ComandoAtualizarVaga`, `ComandoEntrar`…, em `controle/comandos/ComandosFachada.ts`), que implementa `Comando<R>` (`executar()`). O comando guarda o **receptor** (o controlador) e os argumentos. A fachada, que é o **cliente**, monta o comando e o entrega ao `Invocador`, que o executa. Comandos que sabem reverter implementam também `ComandoDesfazivel<R>` (`desfazer()`), e o `Invocador` guarda o último deles. A API pública da fachada não muda, só ganha `desfazerUltimaAtualizacaoDeVaga()`. Consultas (`listarUsuarios`, `buscarVaga`, `listarVagas`, `contarEntidadesCadastradas`) continuam chamando o controlador direto, porque não alteram estado e não têm o que desfazer.

## Alternativas consideradas

| Alternativa | Por que não |
|---|---|
| Guardar o estado anterior direto na fachada, em `atualizarVaga` | Mistura a regra de desfazer com a delegação e não generaliza para outra operação que precise ser desfeita |
| Fechos (funções) em vez de classes de comando | Funciona, mas esconde o conjunto de operações do sistema e dificulta testar cada comando e acrescentar `desfazer()` |
| Comandos também para as consultas | Dez classes a mais sem ganho: consulta não muda estado, não é desfeita e não precisa de histórico |

## Consequências

- Positivas: a fachada fica fina e uniforme; desfazer é uma capacidade do comando, sem a fachada saber como; o `Invocador` é um ponto único para, no futuro, registrar histórico ou log de operações.
- Negativas: mais classes pequenas (uma por operação) e um nível de indireção a mais para quem lê o código.

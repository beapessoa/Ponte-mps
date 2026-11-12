# ADR-0004: Registrar eventos por uma porta própria, adaptando a biblioteca pino

- **Status:** aceito
- **Data:** 2026-11-11
- **Requisitos relacionados:** NF-MAN-01, NF-SEG-01, RF15

## Contexto

Com a entrada no sistema (RF15), passou a ser importante registrar tentativas de acesso recusadas e os relatórios gerados. A Sprint 4 sugere usar uma biblioteca de log com o padrão Adapter. Bibliotecas de log têm interfaces próprias (a pino usa `logger.info(contexto, mensagem)` e níveis em inglês), e espalhar essa chamada pelos controladores prenderia a camada de negócio à biblioteca.

## Decisão

A camada de negócio usa só a porta `Registrador` (em `entidades`), com um único método `registrar(nivel, mensagem, contexto?)` e níveis do domínio (`informacao`, `aviso`, `erro`). A classe `AdaptadorRegistradorPino` (em `infra`) é o **Adapter**: implementa `Registrador`, guarda um `Logger` da pino e traduz o nível e a ordem dos argumentos. Por padrão grava JSON em `ponte.log` (configurável por `PONTE_ARQUIVO_LOG`), para não misturar o log com a saída da CLI. A senha nunca é passada ao registrador.

## Alternativas consideradas

| Alternativa | Por que não |
|---|---|
| Chamar `console.log` direto nos controladores | Mistura o log com a saída da CLI e não tem níveis nem formato estruturado |
| Usar a pino direto nos controladores | Acopla o negócio à biblioteca; trocá-la exigiria mexer em todo controlador que registra algo |
| winston | Funciona igual atrás do Adapter; a pino é menor, mais rápida e já grava JSON |

## Consequências

- Positivas: trocar de biblioteca de log muda só o adaptador; os testes dos controladores usam um registrador em memória e verificam o que foi registrado (inclusive que a senha não aparece).
- Negativas: primeira dependência de produção do projeto (`pino`), que precisa ser mantida atualizada.

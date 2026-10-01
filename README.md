# Ponte-mps

Ponte — conectando quem quer ajudar a quem precisa de ajuda. Plataforma que liga voluntários a ONGs.

## Stack

TypeScript / Node.js.

## Estrutura de pacotes

Organização por camadas (fronteira, controle, entidade), conforme o diagrama de classes de análise do sistema:

```
src/
  entidades/   # modelos de domínio e persistência (RAM, nesta fase)
  controle/    # orquestram casos de uso, chamando as entidades
```

A camada `fronteira` (telas/API) será adicionada quando a stack de interface for definida.

## Especificação

O contrato de requisitos (histórias de usuário, regras de negócio, casos de uso e diagramas) está em [`docs/specs/`](docs/specs/README.md). Leia-o antes de implementar qualquer funcionalidade.

## Rodando o projeto

```bash
npm install
npm test        # roda a suíte de testes
npm run build   # compila para dist/
npm run typecheck
```

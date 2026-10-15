# Projeto detalhado — pacotes, classes de projeto e padrões

> Diferente do diagrama de **análise** ([`05-analise.md`](05-analise.md)), que é conceitual e muda pouco, este diagrama tem atributos e assinaturas de método, e evolui a cada sprint.

## 1. Divisão de pacotes

```text
src/
├── entidades/          ← modelos de domínio e persistência (RAM e arquivo binário)
│   ├── erros/           ← ErroDeValidacao, ErroDePersistencia e subclasses
│   └── validacao/        ← ValidadorCredenciais (login, senha)
└── controle/            ← orquestram casos de uso, chamando as entidades
```

A camada `fronteira` (telas/API) será adicionada quando a stack de interface for definida (ver [`01-visao.md`](01-visao.md) §2.5).

**Regra de dependência:** `controle` depende de `entidades`; `entidades` não depende de `controle`.

## 2. Diagrama de classes de projeto

### Estado atual: Sprints 1 a 3 (Gerenciamento de Usuários, Laboratório 2, CRUD de Vaga e fachada)

```mermaid
classDiagram
    class Usuario {
        <<entidade>>
        #id: number
        +nome: string
        +login: string
        +senha: string
        #Usuario(nome, login, senha)
    }
    class Ong {
        <<entidade>>
        +areaAtuacao: string
        +descricao: string
    }
    class Voluntario {
        <<entidade>>
        +habilidades: string[]
        +disponibilidade: string
        +localizacao: string
    }
    Usuario <|-- Ong
    Usuario <|-- Voluntario

    class RepositorioUsuarios {
        <<interface>>
        +adicionar(usuario) Usuario
        +buscarPorId(id) Usuario
        +listarTodos() Usuario[]
        +atualizar(usuario) Usuario
        +remover(id) void
    }
    class RepositorioUsuariosRAM {
        <<entidade>>
        -usuarios: Usuario[]
        -proximoId: number
    }
    class RepositorioUsuariosArquivo {
        <<entidade>>
        -caminhoArquivo: string
    }
    RepositorioUsuarios <|.. RepositorioUsuariosRAM
    RepositorioUsuarios <|.. RepositorioUsuariosArquivo
    RepositorioUsuarios o-- Usuario : armazena 1..*

    class Vaga {
        <<entidade>>
        +id: number
        +ongId: number
        +data: string
        +local: string
        +quantidadeVagas: number
        +habilidadesExigidas: string[]
    }
    class RepositorioVagas {
        <<interface>>
        +adicionar(vaga) Vaga
        +buscarPorId(id) Vaga
        +listarTodas() Vaga[]
        +atualizar(vaga) Vaga
        +remover(id) void
    }
    class RepositorioVagasRAM {
        <<entidade>>
        -vagas: Vaga[]
        -proximoId: number
    }
    RepositorioVagas <|.. RepositorioVagasRAM
    RepositorioVagas o-- Vaga : armazena 1..*

    class ControladorCadastro {
        <<controle>>
        +cadastrarONG(nome, login, senha, areaAtuacao, descricao) Ong
        +cadastrarVoluntario(nome, login, senha, habilidades, disponibilidade, localizacao) Voluntario
        +atualizarONG(id, nome, login, senha, areaAtuacao, descricao) Ong
        +atualizarVoluntario(id, nome, login, senha, habilidades, disponibilidade, localizacao) Voluntario
        +removerUsuario(id) void
    }
    class ControladorListagem {
        <<controle>>
        +listarUsuarios() UsuarioSemSenha[]
    }
    class ControladorVagas {
        <<controle>>
        +publicarVaga(ongId, data, local, quantidadeVagas, habilidadesExigidas) Vaga
        +buscarVaga(id) Vaga
        +listarVagas() Vaga[]
        +atualizarVaga(id, dados) Vaga
        +removerVaga(id) void
    }
    ControladorCadastro ..> RepositorioUsuarios
    ControladorListagem ..> RepositorioUsuarios : consulta
    ControladorVagas ..> RepositorioVagas

    class FacadeSingletonController {
        <<controle>>
        +obterInstancia() FacadeSingletonController
        +contarEntidadesCadastradas() number
    }
    FacadeSingletonController ..> ControladorCadastro
    FacadeSingletonController ..> ControladorListagem
    FacadeSingletonController ..> ControladorVagas

    class ErroDeValidacao {
        <<erro>>
    }
    class LoginInvalidoError
    class SenhaInvalidaError
    ErroDeValidacao <|-- LoginInvalidoError
    ErroDeValidacao <|-- SenhaInvalidaError
    Usuario ..> ErroDeValidacao : lança

    class ErroDePersistencia {
        <<erro>>
        +causa: unknown
    }
    class ErroDeArquivo
    ErroDePersistencia <|-- ErroDeArquivo
    RepositorioUsuariosArquivo ..> ErroDeArquivo : lança
```

Uma função `criarRepositorioUsuarios(tipo, caminhoArquivo?)` (não é uma classe, por isso fora do diagrama) seleciona a implementação de `RepositorioUsuarios` no início da execução — ver [ADR-0001](07-arquitetura/adr/0001-persistencia-substituivel.md). `FacadeSingletonController` concentra o acesso aos três controladores atrás de uma única instância compartilhada — ver [ADR-0002](07-arquitetura/adr/0002-facade-singleton-controller.md). `RepositorioVagas` ainda só tem implementação em memória (`RepositorioVagasRAM`); a persistência em arquivo/banco para `Vaga` fica para quando o padrão Repository for generalizado (Sprint 4).

## 3. Padrões de projeto utilizados

Preencha uma linha por padrão aplicado. Cada padrão relevante também tem um ADR.

| Padrão | Sprint | Classes participantes (papel no padrão) | Problema que resolve no projeto | ADR |
|---|---|---|---|---|
| Factory Method | S2 | `criarRepositorioUsuarios` (fábrica) → `RepositorioUsuariosRAM` / `RepositorioUsuariosArquivo` | Escolher a implementação de persistência sem acoplar os controladores a uma classe concreta | [ADR-0001](07-arquitetura/adr/0001-persistencia-substituivel.md) |
| Singleton | S3 | `FacadeSingletonController` (`obterInstancia()`, `reiniciar()`) | Garantir uma única instância compartilhada dos controladores, evitando recriar os repositórios em cada ponto de uso | [ADR-0002](07-arquitetura/adr/0002-facade-singleton-controller.md) |
| Facade | S3 | `FacadeSingletonController` unificando `ControladorCadastro`, `ControladorListagem` e `ControladorVagas` | Expor uma única API simples para cadastro/listagem/CRUD de usuários e vagas, com `contarEntidadesCadastradas()` agregando os dois | [ADR-0002](07-arquitetura/adr/0002-facade-singleton-controller.md) |
| Repository | S4 | | | |
| Adapter | S4 | | | |
| Template Method | S4 | | | |
| Command | S5 | | | |
| Memento | S5 | | | |

# ADR-0002: Fachada única (Facade + Singleton) para os controladores

- **Status:** aceito
- **Data:** 2026-10-14
- **Requisitos relacionados:** NF-MAN-01

## Contexto

Com a Sprint 3, o sistema passou a ter três controladores (`ControladorCadastro`, `ControladorListagem` e `ControladorVagas`), cada um dependendo de seu próprio repositório. É preciso um ponto único de acesso a esses controladores — em especial para obter a quantidade total de entidades cadastradas no sistema (usuários + vagas) — sem duplicar a instanciação dos repositórios em cada lugar que precisar deles.

## Decisão

Uma única classe, `FacadeSingletonController`, concentra os três controladores (Facade) e é acessada por uma única instância compartilhada obtida via `FacadeSingletonController.obterInstancia()` (Singleton), que cria os repositórios padrão (`criarRepositorioUsuarios()`, `RepositorioVagasRAM`) apenas na primeira chamada. A fachada expõe os métodos de cadastro, listagem e CRUD de cada controlador, além de `contarEntidadesCadastradas()`, que soma o total de usuários e de vagas. `FacadeSingletonController.reiniciar()` descarta a instância atual, para permitir testes isolados.

## Alternativas consideradas

| Alternativa | Por que não |
|---|---|
| Instanciar `ControladorCadastro`, `ControladorListagem` e `ControladorVagas` separadamente em cada ponto de uso | Duplica a criação dos repositórios e não dá um único lugar para agregar a contagem de entidades |
| Um método estático de contagem em cada controlador, chamado externamente | Espalha a lógica de agregação em várias classes, sem um ponto único de acesso ao sistema |

## Consequências

- Positivas: um único ponto de entrada simplifica o uso pela futura camada de fronteira; `contarEntidadesCadastradas()` fica centralizado; a fábrica dos repositórios roda uma única vez por processo.
- Negativas: acopla os três controladores a uma única classe; o estado global do Singleton exige o método `reiniciar()` só para possibilitar testes isolados — um dos efeitos colaterais conhecidos do padrão.

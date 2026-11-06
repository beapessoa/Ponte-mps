# Design: crud-vaga

## Context

Os usuários já têm CRUD com persistência substituível (ADR-0001). A Sprint 3 também pede uma fachada única para os controles, com Facade + Singleton, e um método que conte as entidades cadastradas.

## Goals / Non-Goals

**Goals:**
- CRUD completo de Vaga, com as mesmas regras de preenchimento na publicação e na atualização (RN03).
- Vaga sempre ligada a uma ONG existente.
- Um único ponto de entrada para todos os controles.

**Non-Goals:**
- Persistência durável de vagas (Sprint 4, padrão Repository).
- Autorização por dono da vaga.

## Decisions

- **`ControladorVagas` separado de `ControladorCadastro`.** Cada controle orquestra uma entidade, o que mantém o padrão por caso de uso do ICONIX.
- **Vínculo por `ongId`, verificado no controle.** `ControladorVagas` recebe também o `RepositorioUsuarios` e só publica se o id pertence a uma `Ong`. Alternativa descartada: guardar a referência ao objeto `Ong` dentro de `Vaga`. Isso duplicaria o usuário na persistência e quebraria a serialização em arquivo.
- **Validação única `validarCampos`**, usada na publicação e na atualização. A atualização monta o estado final antes de validar e só então aplica a mudança, então uma atualização inválida não deixa a vaga pela metade.
- **`FacadeSingletonController`** cria e guarda os três controles. `inicializar(tipo)` permite que a fronteira escolha a persistência no início da execução. Registrado no [ADR-0002](../../../../docs/07-arquitetura/adr/0002-facade-singleton-controller.md).

## Risks / Trade-offs

- Vagas em RAM se perdem ao reiniciar o processo. Isso é aceitável até a Sprint 4 e está documentado em `docs/08-projeto.md`.
- Remover uma ONG não remove as vagas dela. As vagas órfãs serão tratadas junto com o UC12 + LGPD (NF-SEG-01).

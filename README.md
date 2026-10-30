# ColheFácil

Sistema de marketplace que conecta **produtores rurais** a **consumidores**, permitindo que o produtor cadastre e publique seus produtos, receba pedidos e acompanhe suas vendas, enquanto o consumidor encontra produtos próximos e manifesta interesse neles.

> **Status:** em desenvolvimento inicial. Hoje o repositório contém a modelagem do banco de dados (migrations e models) e a documentação de requisitos. Os controllers existem como esqueletos e ainda não há rotas de API nem interface.

## Sumário

- [Funcionalidades previstas](#funcionalidades-previstas)
- [Tecnologias](#tecnologias)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Modelo de dados](#modelo-de-dados)
- [Como executar](#como-executar)
- [Estado atual do projeto](#estado-atual-do-projeto)
- [Documentação](#documentação)

## Funcionalidades previstas

Conforme os requisitos funcionais em [`documentacao/`](documentacao/):

**Produtor**
- Cadastro com nome completo, nome da propriedade, município, estado, telefone/WhatsApp e tipos de produção, com aceite dos termos de uso.
- Login, edição de perfil, endereço de retirada e horários de funcionamento.
- Cadastro e publicação de produtos (foto, nome, categoria, descrição, preço, unidade de medida, estoque, retirada e/ou entrega local), com status *Ativo* ou *Pausado*.
- Gestão de pedidos por status (*Novo*, *Em preparo*, *Pronto*, *Concluído*), com aceite ou recusa de pedidos novos.
- Painel inicial com indicadores e área de vendas por período: total vendido, quantidade de pedidos, ticket médio, produto mais vendido, gráfico semanal e últimas vendas.

**Consumidor**
- Marketplace com produtos próximos, indicando a distância até o produtor.
- Busca e filtro por categoria (Frutas, Verduras, Legumes, Laticínios, Orgânicos).
- Detalhes do produto, escolha de quantidade e manifestação de interesse.

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Linguagem | PHP 8.2+ |
| Framework | Laravel 12 |
| Banco de dados | SQLite (padrão do `.env.example`) |
| Front-end / build | Vite 7, Tailwind CSS 4, Axios |
| Testes | PHPUnit 11 |
| Qualidade de código | Laravel Pint |

## Estrutura do repositório

```
sistema_colher_facil/
├── backend/          # Aplicação Laravel
│   ├── app/
│   │   ├── Http/Controllers/   # Categoria, Pedido, Produto, TipoDeProducao
│   │   └── Models/             # Categoria, Pedido, Produto, TipoDeProducao, User
│   ├── database/migrations/    # Estrutura das tabelas
│   ├── routes/web.php
│   └── tests/
└── documentacao/     # Requisitos funcionais e regras de negócio (PDF)
```

## Modelo de dados

| Tabela | Descrição | Principais campos |
| --- | --- | --- |
| `users` | Usuários (produtores e consumidores) | `name`, `email`, `password` |
| `tipos_de_producao` | Tipos de produção | `nome`, `descricao` |
| `categorias` | Categorias de produto | `nome`, `descricao` |
| `produtos` | Produtos de um produtor | `nome`, `descricao`, `preco`, `imagem`, `tipo_de_producao_id`, `categoria_id`, `user_id` |
| `pedidos` | Pedidos entre produtor e consumidor | `produtor`, `consumidor` (ambos FK de `users`), `valor_total` |
| `table_pedidos_produtos` | Itens do pedido (pivô) | `pedido_id`, `produto_id`, `quantidade`, `preco_unitario` |

Relacionamento já implementado em código: `Pedido` ↔ `Produto` (muitos para muitos) pela tabela `table_pedidos_produtos`, com `quantidade` e `preco_unitario` no pivô.

## Como executar

Pré-requisitos: PHP 8.2+, Composer e Node.js com npm.

```bash
git clone https://github.com/toniolo09/sistema_colher_facil.git
cd sistema_colher_facil/backend

# Instala dependências, cria o .env, gera a APP_KEY, roda as migrations e compila os assets
composer run setup
```

Se preferir fazer manualmente:

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite   # necessário com DB_CONNECTION=sqlite
php artisan migrate
npm install
npm run build
```

Para desenvolvimento (servidor, fila, logs e Vite juntos):

```bash
composer run dev
```

A aplicação fica disponível em `http://localhost:8000`.

Para rodar os testes:

```bash
composer run test
```

## Estado atual do projeto

- **Implementado:** models, migrations e relacionamento entre pedidos e produtos.
- **Esqueleto (sem lógica):** `CategoriaController`, `PedidoController`, `ProdutoController` e `TipoDeProducaoController`.
- **Pendente:** rotas, autenticação, validações das regras de negócio, interface e demais requisitos funcionais.
- **Atenção:** a migration `create_tipos_de_producao` usa `$table->category(...)`, método que não existe no Laravel. Enquanto isso não for corrigido (por exemplo, trocando por `$table->enum('tipo', [...])`), o `php artisan migrate` falha nessa etapa.
- O `.env.example` ainda está com valores padrão do Laravel (`APP_NAME=Laravel`, `APP_LOCALE=en`), e o `backend/README.md` é o texto padrão do framework.

## Documentação

- [Requisitos Funcionais](documentacao/Requisitos_Funcionais_ColheFacil.pdf)
- [Regras de Negócio](documentacao/Regras_de_Negocio_ColheFacil.pdf)

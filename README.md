# FindAFriendAPI

API para facilitar a adoção de pets, conectando organizações (ONGs) com pessoas interessadas em adotar. A aplicação foi desenvolvida seguindo os princípios do **SOLID**, com testes unitários e end-to-end para garantir a qualidade do código e a confiabilidade das funcionalidades.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no backend.
- **Fastify**: Framework web rápido e eficiente.
- **Prisma**: ORM para manipulação do banco de dados.
- **PostgreSQL**: Banco de dados relacional utilizado.
- **Zod**: Biblioteca para validação de dados.
- **Vitest**: Framework de testes para unitários e E2E.
- **Supertest**: Biblioteca para testes de APIs HTTP.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **bcryptjs**: Biblioteca para hashing de senhas.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **GitHub Actions**: Para integração contínua e execução de testes automatizados.

---

## 📜 Regras da Aplicação

- [X] Deve ser possível cadastrar um pet.
- [X] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade.
- [X] Deve ser possível filtrar pets por suas características.
- [X] Deve ser possível visualizar detalhes de um pet para adoção.
- [X] Deve ser possível se cadastrar como uma ORG.
- [X] Deve ser possível realizar login como uma ORG.

---

## 📋 Regras de Negócio

- [X] Para listar os pets, obrigatoriamente precisamos informar a cidade.
- [X] Uma ORG precisa ter um endereço e um número de WhatsApp.
- [X] Um pet deve estar ligado a uma ORG.
- [X] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp.
- [X] Todos os filtros, além da cidade, são opcionais.
- [X] Para uma ORG acessar a aplicação como admin, ela precisa estar logada.

---

## 🛠️ Aplicação dos Princípios SOLID

1. **S - Single Responsibility Principle (Princípio da Responsabilidade Única):**
   - Cada classe ou função tem uma única responsabilidade. Por exemplo, os controladores lidam apenas com a lógica de entrada e saída, enquanto os serviços contêm a lógica de negócios.

2. **O - Open/Closed Principle (Princípio Aberto/Fechado):**
   - O código está aberto para extensão, mas fechado para modificação. Por exemplo, o repositório de pets pode ser substituído por outro (como um repositório em memória para testes) sem alterar os serviços.

3. **L - Liskov Substitution Principle (Princípio da Substituição de Liskov):**
   - As implementações de repositórios (como `PrismaPetRepository` e `InMemoryPetRepository`) podem ser usadas de forma intercambiável, pois seguem a mesma interface.

4. **I - Interface Segregation Principle (Princípio da Segregação de Interfaces):**
   - Interfaces específicas foram criadas para cada repositório, garantindo que as classes implementem apenas os métodos necessários.

5. **D - Dependency Inversion Principle (Princípio da Inversão de Dependência):**
   - Os serviços dependem de abstrações (interfaces de repositórios) em vez de implementações concretas.

---

## 🧪 Testes

### **Testes Unitários**
Os testes unitários garantem que cada unidade de código funcione isoladamente. Exemplos de testes unitários implementados:
- **Listagem de pets por cidade:** Verifica se os pets são filtrados corretamente com base na cidade e nos filtros opcionais.
- **Detalhes de um pet:** Garante que os detalhes de um pet específico sejam retornados corretamente.

### **Testes End-to-End (E2E)**
Os testes E2E garantem que os fluxos principais da aplicação funcionem corretamente em um ambiente completo. Exemplos de testes E2E implementados:
- **Criação de uma organização:** Verifica se uma organização pode ser criada com sucesso.
- **Autenticação de uma organização:** Garante que uma organização pode fazer login e obter um token JWT.
- **Criação de um pet:** Testa se um pet pode ser criado por uma organização autenticada.
- **Listagem de pets:** Verifica se os pets disponíveis em uma cidade podem ser listados.
- **Filtros de pets:** Garante que os filtros (idade, tamanho, nível de energia, etc.) funcionem corretamente.

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── app.ts                     # Configuração principal do Fastify
├── server.ts                  # Inicialização do servidor
├── modules/
│   ├── orgs/                  # Módulo de organizações
│   ├── pets/                  # Módulo de pets
│   │   ├── controllers/       # Controladores de pets
│   │   ├── repositories/      # Repositórios de pets
│   │   ├── services/          # Serviços de pets
│   │   ├── errors/            # Erros específicos de pets
│   │   └── tests/             # Testes unitários de pets
├── routes/
│   ├── orgs.routes.ts         # Rotas de organizações
│   ├── pets.routes.ts         # Rotas de pets
│   └── authenticate.routes.ts # Rotas de autenticação
├── utils/
│   └── create-and-authenticate.ts # Utilitário para criar e autenticar organizações
└── tests/
    └── e2e/                   # Testes end-to-end

---
```

## 🔧 Configuração do Ambiente

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/FindAFriendAPI.git
cd FindAFriendAPI
```

Instale as dependências:
```bash
npm install
```

Configure as variáveis de ambiente: Crie um arquivo .env com as seguintes variáveis:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/findafriend
JWT_SECRET=supersecretkey
```

Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

Inicie o servidor:
```bash
npm run dev
```

---

## 👨‍💻 Autor

Desenvolvido por Alex da Costa. 🚀

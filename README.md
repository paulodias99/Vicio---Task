# Sistema de Gerenciamento de Cursos

## Introdução

Você foi contratado para criar um sistema de gerenciamento de cursos. O sistema permite que usuários sejam cadastrados, matriculados em cursos e consultem seus dados. Cada operação realizada no sistema deve registrar a data e hora no servidor, mas o frontend deve exibir as informações no fuso horário local do cliente.

---

## Instruções para Execução do Projeto

### **1. Clonar o Repositório**

```bash
# Clone o repositório
git clone https://github.com/paulodias99/Vicio---Task/
cd Vicio---Task
```

### **2. Configurar as Dependências**

Instale as dependências utilizando o gerenciador de pacotes **npm** ou **yarn**:

```bash
npm install
# ou
yarn install
```

### **3. Configurar o Banco de Dados**

1. Certifique-se de que o PostgreSQL está instalado e rodando em sua máquina.
2. Crie um banco de dados chamado `taskdevback`.
3. Configure o arquivo `.env` com as credenciais do banco de dados:

```env
DATABASE_URL="postgresql://<USUARIO>:<SENHA>@localhost:5432/taskdevback"
DATABASE_URL_TEST="postgresql://<USUARIO>:<SENHA>@localhost:5432/taskdevback_test"
PORT=3000
```

### **4. Rodar Migrações do Prisma**

Crie as tabelas no banco de dados com o comando:

```bash
npx prisma migrate dev --name init
```

### **5. Executar o Servidor**

Inicie o servidor em ambiente de desenvolvimento:

```bash
npm run dev
```

O servidor estará rodando em: [http://localhost:3000](http://localhost:3000)

### **6. Rodar os Testes**

Para garantir que todas as funcionalidades estão funcionando corretamente:

```bash
npm test
```

---

## Descrição das APIs

### **Usuários**

#### **POST /api/users**
Cadastra um novo usuário.

**Exemplo de Requisição:**
```json
{
  "name": "Paulo Dias",
  "email": "paulodias@test.com",
  "password": "password123"
}
```

**Exemplo de Resposta:**
```json
{
  "id": 1,
  "name": "Paulo Dias",
  "email": "paulodias@test.com",
  "createdAt": "2025-01-15T12:00:00Z"
}
```

#### **GET /api/users/:id**
Retorna os detalhes de um usuário.

**Exemplo de Requisição:**
```bash
GET /api/users/1
Headers: { "x-timezone-offset": "180" }
```

**Exemplo de Resposta:**
```json
{
  "id": 1,
  "name": "Paulo Dias",
  "email": "paulodias@test.com",
  "createdAt": "2025-01-15T15:00:00-03:00"
}
```

### **Cursos**

#### **POST /api/courses**
Cria um novo curso.

**Exemplo de Requisição:**
```json
{
  "title": "Introduction to NodeJS",
  "description": "Learn the fundamentals of Node.js.",
  "hours": 14
}
```

**Exemplo de Resposta:**
```json
{
  "id": 1,
  "title": "Introduction to NodeJS",
  "description": "Learn the fundamentals of Node.js.",
  "hours": 14,
  "createdAt": "2025-01-15T12:00:00Z"
}
```

#### **GET /api/courses**
Lista todos os cursos.

**Exemplo de Resposta:**
```json
[
  {
    "id": 1,
    "title": "Introduction to NodeJS",
    "description": "Learn the fundamentals of Node.js.",
    "hours": 14,
    "createdAt": "2025-01-15T12:00:00Z"
  }
]
```

### **Matrículas**

#### **POST /api/enrollments**
Matricula um usuário em um curso.

**Exemplo de Requisição:**
```json
{
  "userId": 1,
  "courseId": 1
}
```

**Exemplo de Resposta:**
```json
{
  "id": 1,
  "userId": 1,
  "courseId": 1,
  "enrolledAt": "2025-01-15T12:00:00Z"
}
```

#### **GET /api/enrollments/:userId**
Lista os cursos de um usuário, ajustando as datas de matrícula para o fuso horário do cliente.

**Exemplo de Requisição:**
```bash
GET /api/enrollments/1
Headers: { "x-timezone-offset": "180" }
```

**Exemplo de Resposta:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "courseId": 1,
    "enrolledAt": "2025-01-15T15:00:00-03:00",
    "course": {
      "title": "Introduction to NodeJS",
    }
  }
]
```
## Principais Escolhas Técnicas

### **Framework: Express**
- Escolhi o Express pela sua simplicidade e flexibilidade.
- Poderia ter sido utilizado qualquer outro, como o NestJS por exemplo, mas optei pelo Express para mostrar como construir a lógica e demonstrar mais domínio.

### **ORM: Prisma**
- Prisma foi minha escolha por ser leve e robusto.

### **Validação: Zod**
- O Zod foi escolhido pela sua simplicidade e capacidade de criar esquemas reutilizáveis para validação.

### **Testes: Jest**
- Jest foi usado para garantir que todas as funcionalidades fossem testadas antes da entrega.

### **Linguagem: TypeScript**
- Escolhi o TypeScript pela segurança adicional oferecida pela tipagem estática.
- Trabalhar em equipe torna a utilização do TypeScript praticamente obrigatória, uma vez que proporciona uma manutenção do código mais eficiente e reduz erros em tempo de execução.

### **CORS: Configuração para Cross-Origin Requests**
- Adicionei o CORS para permitir que o frontend e o backend possam se comunicar sem restrições.
- Como a aplicação possui um frontend em React (http://localhost:5173) e um backend em Express (http://localhost:3000), sem a configuração do CORS, as requisições HTTP do frontend para o backend seriam bloqueadas pelo navegador devido à política de mesma origem.
- O front-end do projeto está nesse repositório: https://github.com/paulodias99/Vicio---Task---Front

---

## **Padronização do Código**

### **1. Prettier**
- Padroniza o código automaticamente.

### **2. EditorConfig**
- Mantém a consistência de espaçamento e indentação.

### **3. Tipagem com TypeScript**
- Criei o arquivo **`@types/types.ts`** para padronizar as tipagens das requests e responses da API.
- Isso garante maior segurança na manipulação dos dados, evitando erros comuns.

## Estrutura do Projeto

```
src/
├── config/
│   ├── prisma.ts
├── controllers/
│   ├── userController.ts
│   ├── courseController.ts
│   ├── enrollmentController.ts
├── middlewares/
│   ├── validateSchema.ts
├── models/
│   ├── user.ts
│   ├── course.ts
│   ├── enrollment.ts
├── repositories/
│   ├── userRepository.ts
│   ├── courseRepository.ts
│   ├── enrollmentRepository.ts
├── routes/
│   ├── userRoutes.ts
│   ├── courseRoutes.ts
│   ├── enrollmentRoutes.ts
├── services/
│   ├── userService.ts
│   ├── courseService.ts
│   ├── enrollmentService.ts
├── tests/
│   ├── userRoutes.test.ts
│   ├── courseRoutes.test.ts
│   ├── enrollmentRoutes.test.ts
├── app.ts
├── server.ts
```
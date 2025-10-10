# 🚀 Projeto - Desenvolvimento Backend (Node.js + Express)

Este repositório contém o projeto desenvolvido para a disciplina de **Desenvolvimento Backend**, utilizando **Node.js** e **Express**.  
Aqui você encontrará toda a estrutura necessária para rodar a aplicação em ambiente local e entender como ela foi construída.

---

## ⚙️ Como Rodar o Projeto
1. **Clone este repositório**  
   ```bash
   git clone https://github.com/DebugoDev/BackendProject.git
   ```

2. **Acesse a pasta do projeto**  
   ```bash
   cd backendproject
   ```

3. **Instale as dependências**  
   ```bash
   npm install
   ```

4. **Inicie o servidor**  
   ```bash
   npm run dev
   ```

5. A aplicação estará rodando em:  
   👉 `http://localhost:3000`

---

## 👨‍💻 Colaboradores

- Adrian Gobara Falci  
- Lorena Gobara Falci 
- Maria Vitória Garcia Pimenta

---

✨ Feito com dedicação para a disciplina de **Desenvolvimento Backend**.  

---

## 🔐 DOTENV

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```
DB_HOST=host
DB_PORT=port
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=database

PORT=3000

SECRET_KEY=key
```

## 🗂️ Migrations (TypeORM)

Este projeto utiliza TypeORM para gerenciar o banco de dados e suas alterações de forma estruturada.

### Gerar uma nova migration

Sempre que você fizer alterações no modelo do banco de dados (entidades), gere uma nova migration com o seguinte comando:

```
npm run typeorm migration:generate ./src/migrations/{nome-da-migration}
```
> Substitua {nome-da-migration} por um nome descritivo que indique a alteração (ex.: CreateUsersTable).


### Rodar as migrations

Para aplicar as migrations e atualizar o banco de dados com as alterações definidas, execute:

```
npm run typeorm migration:run
```
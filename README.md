# 💼 Financial Management Frontend

Frontend moderno para a plataforma de gerenciamento de finanças, construído com foco em performance, acessibilidade e experiência do usuário.

---

## ✨ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/) – Componentes acessíveis e customizáveis
- [React Query](https://tanstack.com/query/latest) – Gerenciamento de estado assíncrono e cache de dados

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/ayranoliveira1/finance-ia-web.git
cd nome-do-repo-frontend

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais (API, Next-auth)

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Integração com a API

O frontend se comunica com a [API de gerenciamento de finanças](https://github.com/ayranoliveira1/finance-api.git) utilizando **React Query** para requisições otimizadas e cache inteligente.  
As URLs da API são configuradas via variáveis de ambiente no arquivo `.env`.

---

## 📁 Estrutura do Projeto

- `app/`: Páginas e rotas do App Router
- `components/`: Componentes reutilizáveis (usando ShadCN UI)
- `lib/`: Utilitários, clientes de API, e helpers
- `auth/`: Gerenciamento de estado de login
- `hooks/`: Custom hooks (incluindo React Query)
- `http/`: Requisições Server Sides

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🤝 Contribuição

Contribuições são bem-vindas!  
Sinta-se à vontade para abrir _issues_, enviar _pull requests_ ou sugerir melhorias.

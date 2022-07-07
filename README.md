# Chat

O projeto tem como objetivo desenvolver uma aplicação de chat para aprimorar meus conhecimentos em programação.

## Tecnologias utilizadas

- Backend: [NestJs](https://nestjs.com/)
- Frontend: [Vue](https://vuejs.org/)
- Database: [PostgreSQL](https://www.postgresql.org/)
- Redis: [Redis](https://redis.io/)

## Descrição da aplicação backend NestJS

- Foi desenvolvido o módulo de autenticação com o uso de JWT.
- O usuário para ter acesso tem cadstrar e confirmar seu email.
- O envio de email através de filas é feito utilizando o [SendGrid](https://sendgrid.com/).
- O modulo chat ainda está desenvolvimento, e vai utlizar websockets para o envio de mensagens.

## Descrição da aplicação frontend Vue

- Foi utilizado a versão 3 do Vue, para gerência de estado o [Pinia](https://pinia.vuejs.org/) e para os compoenentes foi utilizado o [Quasar](https://quasar.dev/).
- Para o usuario se cadastrar, deve fornecer um email válido e uma senha.
- Após o cadastro, o usuário recebe um email com um link para confirmação do email.
- Após a confirmação do email, o usuário pode fazer login.

## Hospedagem

- Para o backend foi utlizado o [Railway](https://railway.app)
- A APi pode ser acessado em [chat-production-e6a8.up.railway.app](https://chat-production-e6a8.up.railway.app)
- Para o frontend foi utilizado o [Netlify](https://netlify.com/)
- O app pode ser acessado [papaya-pithivier-d030db.netlify.app/](https://papaya-pithivier-d030db.netlify.app/)

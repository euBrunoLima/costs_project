# 💰 Costs

Costs é uma aplicação web desenvolvida com React para o gerenciamento de projetos e seus respectivos serviços. A plataforma permite criar e editar projetos, adicionar serviços, controlar o orçamento e visualizar detalhes de cada projeto de forma simples e eficiente.
</br>
</br>
## 🚀 Funcionalidades

✅ Cadastro de projetos com nome, orçamento e categoria

➕ Adição, edição e remoção de serviços em cada projeto

💸 Controle do orçamento total e dos custos individuais dos serviços

📢 Exibição de mensagens de feedback para ações do usuário

📱 Interface responsiva, moderna e intuitiva

📄 Páginas de contato e informações sobre a empresa
</br>
</br>
## 🎞️ Preview do Projeto
<img src="https://github.com/user-attachments/assets/2d2ca33d-6ef7-4fe0-818a-7fda7bb3a975" width="800" height="auto">
</br>
</br>

## 📁 Estrutura de Pastas

```
src/
  App.jsx
  index.js
  index.css
  components/
    layout/
      NavBar.jsx
      Footer.jsx
      Container.jsx
      Message.jsx
      Loading.jsx
      LinkButton.jsx
    pages/
      Home.jsx
      Projects.jsx
      Project.jsx
      NewProject.jsx
      Contact.jsx
      Comapany.jsx
    projects/
      ProjectCard.jsx
      ProjectForm.jsx
    services/
      ServiceCard.jsx
      ServiceForm.jsx
    form/
      Input.jsx
      Select.jsx
      SubmitButton.jsx
      TextArea.jsx
  img/
    ...
public/
  index.html
db.json
```

## 📦 Scripts Disponíveis

- `npm start` — Inicia o app em modo desenvolvimento ([http://localhost:3000](http://localhost:3000))
- `npm run build` — Gera o build de produção na pasta `build`
- `npm test` — Executa os testes
- `npm run backend` — Inicia o backend fake com JSON Server ([http://localhost:5000](http://localhost:5000))
  
</br>

## 🔧 Backend Fake

O projeto utiliza o [JSON Server](https://github.com/typicode/json-server) para simular uma API REST. Os dados estão em [`db.json`](db.json).

Para iniciar o backend:
```sh
npm run backend
```

</br>

## ▶️ Como Rodar o Projeto

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o backend fake:
   ```sh
   npm run backend
   ```
3. Inicie o frontend:
   ```sh
   npm start
   ```

</br>

## 🛠️ Tecnologias Utilizadas

- React
- React Router DOM
- React Icons
- JSON Server

</br>

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](https://opensource.org/licenses/MIT).

</br>

## ✏️ Customizações e Melhorias Pessoais

Este projeto foi originalmente desenvolvido durante o curso do professor <strong>Matheus Battisti</strong>, do canal <strong>Hora de Codar</strong>, como base para estudos em React.

Após a conclusão do conteúdo principal, realizei diversas melhorias e extensões por conta própria, incluindo:

✅ Continuação e finalização das páginas Contact e Company

🔧 Criação de uma nova rota no JSON Server para armazenar os dados do formulário da página de contato

🧩 Desenvolvimento de novos componentes e atualização dos componentes existentes

✏️ Adição da funcionalidade de edição de serviços, com suporte a modal personalizado

📱 Implementação de responsividade completa, garantindo que o site funcione bem em mobile e desktop

Essas customizações foram feitas com foco em praticar conceitos avançados de React, componentização, organização de código e integração com API fake.


## Links Uteis

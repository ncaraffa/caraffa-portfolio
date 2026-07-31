# Nicolas Caraffa — Portfólio

Portfólio pessoal desenvolvido para apresentar minha trajetória, minhas habilidades e os projetos que venho construindo enquanto evoluo na programação.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## ✨ Sobre o projeto

O site foi criado como uma experiência visual dark-tech, com identidade própria e foco em uma navegação moderna, fluida e responsiva. A página reúne:

- apresentação e informações sobre mim;
- tecnologias e habilidades em desenvolvimento;
- seleção de projetos;
- formas de contato e redes sociais;
- animações, efeitos de profundidade e elementos 3D;
- adaptações de layout e movimento para diferentes telas e preferências de acessibilidade.

A direção visual parte do conceito **“CARAFFA DEVELOPER”**, combinando fundo escuro, luzes em violeta, tipografia marcante, transparências e atmosferas animadas sem prejudicar a leitura.

## 🛠️ Tecnologias utilizadas

- **React 19** — construção da interface em componentes;
- **TypeScript** — tipagem e maior segurança durante o desenvolvimento;
- **Vite** — ambiente de desenvolvimento e geração da versão de produção;
- **Tailwind CSS 4** — composição visual e responsividade;
- **Three.js**, **React Three Fiber** e **Drei** — elementos e efeitos tridimensionais;
- **Framer Motion** — transições e animações da interface;
- **Lucide React** — ícones utilizados no projeto;
- **Oxlint** — análise estática e padronização do código.

## 🎨 Como foi criado

O portfólio foi desenvolvido com uma arquitetura baseada em componentes React. Cada área da página — apresentação, sobre, habilidades, projetos e contato — possui seu próprio componente, facilitando manutenção e evolução.

A atmosfera visual foi construída com gradientes, máscaras CSS, luzes ambientais, textura de granulação e elementos WebGL. As animações foram planejadas para permanecer sutis e respeitam a configuração `prefers-reduced-motion` do sistema.

O projeto também recebeu atenção especial em:

- contraste e legibilidade;
- responsividade para celulares e computadores;
- semântica e acessibilidade;
- desempenho das animações;
- organização e reutilização de componentes.

## 📁 Estrutura principal

```text
src/
├── assets/          # imagens e recursos visuais
├── components/      # componentes e seções da interface
├── App.tsx          # composição principal da página
├── index.css        # tema, efeitos e estilos globais
└── main.tsx         # inicialização da aplicação
```

## 🚀 Executando localmente

```bash
# Clone o repositório
git clone https://github.com/ncaraffa/caraffa-portfolio.git

# Entre na pasta
cd caraffa-portfolio

# Instale as dependências
npm install

# Inicie o ambiente de desenvolvimento
npm run dev
```

Para gerar a versão otimizada de produção:

```bash
npm run build
```

## 🌐 Publicação

O projeto é preparado para publicação na **Vercel**, com build executado pelo Vite e arquivos finais gerados na pasta `dist`.

## 📫 Contato

- GitHub: [@ncaraffa](https://github.com/ncaraffa)
- Instagram: [@ncaraffa_](https://www.instagram.com/ncaraffa_/)

---

Desenvolvido por **Nicolas Caraffa** como parte da minha evolução na programação.

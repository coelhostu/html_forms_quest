# 🎮 HTML Forms Quest

**HTML Forms Quest** é um jogo educativo e interativo no estilo RPG/Pixel Art desenvolvido para auxiliar estudantes e desenvolvedores a dominar a criação e validação de formulários HTML.

Criado para as atividades do **Prof. João Coelho**, o jogo combina mecânicas de quizzes dinâmicos com tempo limite e um sistema de combos, tornando o aprendizado de tags semânticas, acessibilidade e validação divertido e engajador.

---

## 🚀 Novidade: Modo Laboratório (Laboratório Interativo) 🧪

Agora o projeto conta com um **Modo Laboratório** (modo de visualização) completo, projetado especialmente para uso em sala de aula ou para estudo focado:
* **Exploração Livre**: Navegue pelos 10 níveis do jogo sem a pressão do cronômetro ou perda de vidas.
* **Renderização Interativa (Live Render)**: Veja em tempo real como o navegador interpreta o código de cada desafio.
* **Testes Físicos**: Interaja diretamente com os elementos renderizados (clique em labels para focar inputs, digite textos, visualize a ocultação de senhas, teste mensagens de erro nativas e seletores de data/calendário).
* **Gabarito com Solução**: Visualize instantaneamente a resposta ou a estrutura correta para cada desafio.
* **Assistente de Partida**: Durante o jogo normal, você pode ativar o botão **"Visualizar HTML"** para abrir um painel de pré-visualização instantânea do elemento em questão.

---

## 🗺️ Estrutura dos Níveis

O jogo é dividido em 10 níveis progressivos:
1. **A Tag `<form>`**: Entendendo a raiz do formulário, atributos `action` e `method` (GET/POST).
2. **Inputs e Labels**: A importância da acessibilidade vinculando labels a inputs através do `id` e `for`.
3. **Tipos de Input Essenciais**: Uso de `password`, `email`, `date` e seus comportamentos.
4. **Checkboxes**: Múltipla escolha e o atributo `checked`.
5. **Radio Buttons**: Escolha exclusiva e o agrupamento com o atributo `name`.
6. **Select e Options**: Criação de menus suspensos e seleção padrão com `selected`.
7. **Textarea**: Blocos de texto multilinha e controle de tamanho com `rows`.
8. **Validação HTML5**: Atributos de validação nativa como `required`, `maxlength`, `min` e `max`.
9. **Fieldset e Legend**: Agrupamento visual e semântico de campos de formulário.
10. **Boss Level (Formulário Completo)**: Integração de múltiplos tipos de inputs, botões de envio e campos ocultos (`type="hidden"`).

---

## 🛠️ Tecnologias Utilizadas

O projeto é estruturado como um monorepo gerenciado por `pnpm workspaces`:

* **Frontend (Jogo)**:
  - **React** (v19) com **TypeScript**
  - **Vite** (v7) como bundler de alta performance
  - **Tailwind CSS** (v4) para estilização responsiva e pixel-art
  - **Framer Motion** para animações fluidas e transições
  - **Radix UI** para componentes acessíveis
  - **Wouter** para roteamento leve

---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de possuir o **Node.js** (v20+) e o **pnpm** instalados.

### 1. Instalar Dependências
Na raiz do projeto (`Form-Builder-Quest`), instale todos os pacotes:
```bash
pnpm install
```

### 2. Executar o Servidor de Desenvolvimento
Inicie o ambiente de desenvolvimento local para o jogo:
```bash
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/html-forms-quest run dev
```
O jogo estará acessível em: **`http://localhost:5000/`**

### 3. Compilar para Produção (Build)
Para gerar a build de produção estática otimizada:
```bash
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/html-forms-quest run build
```

---

## 📄 Licença

Este projeto foi desenvolvido com fins educacionais. Sinta-se livre para utilizar, expandir e aplicar em suas aulas ou estudos!

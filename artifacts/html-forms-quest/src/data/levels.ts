export type ChallengeType = 'multiple_choice' | 'fill_in_blank' | 'find_bug' | 'sort_tags';

export interface BaseChallenge {
  id: string;
  type: ChallengeType;
  question: string;
}

export interface MultipleChoiceChallenge extends BaseChallenge {
  type: 'multiple_choice';
  options: string[];
  correctIndex: number;
}

export interface FillInBlankChallenge extends BaseChallenge {
  type: 'fill_in_blank';
  snippetBefore: string;
  snippetAfter: string;
  answer: string;
}

export interface FindBugChallenge extends BaseChallenge {
  type: 'find_bug';
  code: string;
  options: string[];
  correctIndex: number;
}

export interface SortTagsChallenge extends BaseChallenge {
  type: 'sort_tags';
  tags: string[];
  correctOrder: string[];
}

export type Challenge = MultipleChoiceChallenge | FillInBlankChallenge | FindBugChallenge | SortTagsChallenge;

export interface Level {
  id: number;
  title: string;
  briefing: {
    text: string;
    codeExample: string;
  };
  timeLimit: number; // in seconds
  challenges: Challenge[];
}

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "A Tag <form>",
    briefing: {
      text: "Todo formulário HTML deve estar envolvido na tag <form>. Ela define como os dados serão enviados. Os atributos principais são 'action' (para onde enviar) e 'method' (como enviar, GET ou POST).",
      codeExample: "<form action=\"/submit\" method=\"POST\">\n  <!-- campos aqui -->\n</form>"
    },
    timeLimit: 90,
    challenges: [
      {
        id: "1-1",
        type: "multiple_choice",
        question: "Qual tag é a raiz de um formulário HTML?",
        options: ["<input>", "<form>", "<fieldset>", "<group>"],
        correctIndex: 1
      },
      {
        id: "1-2",
        type: "fill_in_blank",
        question: "Complete o código para enviar os dados via POST:",
        snippetBefore: "<form action=\"/api\" ",
        snippetAfter: "=\"POST\">",
        answer: "method"
      },
      {
        id: "1-3",
        type: "find_bug",
        question: "Encontre o erro nesta declaração de formulário:",
        code: "<form action=\"/login\" method=\"SEND\">",
        options: ["A tag form não precisa de action", "method SEND não existe (deve ser GET ou POST)", "Falta fechar a tag"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 2,
    title: "Inputs e Labels",
    briefing: {
      text: "O <input> é o campo onde o usuário digita. O <label> é o texto que descreve o campo. Conectar o 'for' do label ao 'id' do input ajuda na acessibilidade e clareza.",
      codeExample: "<label for=\"nome\">Seu Nome:</label>\n<input type=\"text\" id=\"nome\" name=\"nome\" placeholder=\"João\">"
    },
    timeLimit: 80,
    challenges: [
      {
        id: "2-1",
        type: "multiple_choice",
        question: "Como conectar um <label> a um <input>?",
        options: ["Usando o atributo 'name' no label", "Colocando o input antes do label", "Atributo 'for' no label igual ao 'id' do input", "Não é necessário conectar"],
        correctIndex: 2
      },
      {
        id: "2-2",
        type: "fill_in_blank",
        question: "Complete para adicionar um texto de dica dentro do campo (que some ao digitar):",
        snippetBefore: "<input type=\"text\" ",
        snippetAfter: "=\"Digite aqui\">",
        answer: "placeholder"
      },
      {
        id: "2-3",
        type: "find_bug",
        question: "Qual é o bug neste código?",
        code: "<label for=\"user\">Usuário:</label>\n<input type=\"text\" name=\"user\">",
        options: ["O input não tem 'id' correspondente ao 'for' do label", "O label deve estar dentro do input", "A tag input precisa de fechamento </input>"],
        correctIndex: 0
      }
    ]
  },
  {
    id: 3,
    title: "Tipos de Input Essenciais",
    briefing: {
      text: "O atributo 'type' muda completamente o comportamento do <input>. Use 'email' para validar e-mails, 'password' para ocultar a senha, 'number' para números, e 'date' para um calendário.",
      codeExample: "<input type=\"email\" name=\"email\">\n<input type=\"password\" name=\"senha\">"
    },
    timeLimit: 80,
    challenges: [
      {
        id: "3-1",
        type: "multiple_choice",
        question: "Qual tipo de input esconde os caracteres digitados (geralmente com asteriscos ou bolinhas)?",
        options: ["hidden", "password", "secret", "masked"],
        correctIndex: 1
      },
      {
        id: "3-2",
        type: "fill_in_blank",
        question: "Defina o tipo correto para um campo que aceita apenas endereços de e-mail:",
        snippetBefore: "<input type=\"",
        snippetAfter: "\" name=\"contato\">",
        answer: "email"
      },
      {
        id: "3-3",
        type: "sort_tags",
        question: "Ordene as tags para criar um campo de data válido com seu label:",
        tags: ["<input type=\"date\" id=\"nasc\">", "<label for=\"nasc\">Nascimento:</label>"],
        correctOrder: ["<label for=\"nasc\">Nascimento:</label>", "<input type=\"date\" id=\"nasc\">"]
      }
    ]
  },
  {
    id: 4,
    title: "Checkboxes",
    briefing: {
      text: "O <input type=\"checkbox\"> permite ao usuário selecionar uma ou mais opções. Para agrupar opções relacionadas no backend, costuma-se usar o mesmo 'name' com colchetes (ex: name=\"interesses[]\"). Use 'checked' para marcar por padrão.",
      codeExample: "<input type=\"checkbox\" id=\"termos\" name=\"termos\" checked>\n<label for=\"termos\">Aceito os termos</label>"
    },
    timeLimit: 70,
    challenges: [
      {
        id: "4-1",
        type: "multiple_choice",
        question: "Qual atributo deixa o checkbox marcado ao carregar a página?",
        options: ["selected", "active", "checked", "on"],
        correctIndex: 2
      },
      {
        id: "4-2",
        type: "fill_in_blank",
        question: "Complete o código para criar uma caixa de seleção:",
        snippetBefore: "<input type=\"",
        snippetAfter: "\" id=\"news\">",
        answer: "checkbox"
      }
    ]
  },
  {
    id: 5,
    title: "Radio Buttons",
    briefing: {
      text: "Os <input type=\"radio\"> permitem escolher apenas UMA opção de um grupo. Para funcionarem juntos, todos os radios do grupo PRECISAM ter o mesmo atributo 'name'.",
      codeExample: "<input type=\"radio\" name=\"plano\" value=\"basico\" id=\"b\">\n<label for=\"b\">Básico</label>\n<input type=\"radio\" name=\"plano\" value=\"pro\" id=\"p\">\n<label for=\"p\">Pro</label>"
    },
    timeLimit: 75,
    challenges: [
      {
        id: "5-1",
        type: "multiple_choice",
        question: "O que agrupa vários radio buttons, forçando a seleção de apenas um?",
        options: ["Mesmo id", "Mesma class", "Mesmo name", "Mesmo value"],
        correctIndex: 2
      },
      {
        id: "5-2",
        type: "find_bug",
        question: "Por que estes radios não estão agrupados corretamente (permitem selecionar ambos)?",
        code: "<input type=\"radio\" name=\"opcao1\" value=\"A\">\n<input type=\"radio\" name=\"opcao2\" value=\"B\">",
        options: ["Eles precisam estar dentro de um div", "Eles têm valores (value) diferentes", "Eles têm nomes (name) diferentes"],
        correctIndex: 2
      }
    ]
  },
  {
    id: 6,
    title: "Select e Options",
    briefing: {
      text: "O <select> cria uma lista suspensa (dropdown). Cada item da lista é uma tag <option>. Use 'selected' no option para ser o padrão, e 'multiple' no select para permitir várias escolhas.",
      codeExample: "<select name=\"cidade\">\n  <option value=\"sp\">São Paulo</option>\n  <option value=\"rj\" selected>Rio de Janeiro</option>\n</select>"
    },
    timeLimit: 85,
    challenges: [
      {
        id: "6-1",
        type: "multiple_choice",
        question: "Qual tag define um item individual dentro de um <select>?",
        options: ["<item>", "<choice>", "<option>", "<li>"],
        correctIndex: 2
      },
      {
        id: "6-2",
        type: "fill_in_blank",
        question: "Complete o atributo para que uma opção venha selecionada por padrão:",
        snippetBefore: "<option value=\"br\" ",
        snippetAfter: ">Brasil</option>",
        answer: "selected"
      },
      {
        id: "6-3",
        type: "sort_tags",
        question: "Monte um select válido:",
        tags: ["<select name=\"cor\">", "</select>", "<option value=\"azul\">Azul</option>"],
        correctOrder: ["<select name=\"cor\">", "<option value=\"azul\">Azul</option>", "</select>"]
      }
    ]
  },
  {
    id: 7,
    title: "Textarea",
    briefing: {
      text: "Diferente do input, a tag <textarea> é usada para textos longos de múltiplas linhas. Ela não tem atributo 'value', o texto inicial vai entre as tags de abertura e fechamento.",
      codeExample: "<textarea name=\"mensagem\" rows=\"4\" cols=\"50\">\nDigite sua mensagem...\n</textarea>"
    },
    timeLimit: 75,
    challenges: [
      {
        id: "7-1",
        type: "multiple_choice",
        question: "Como definir o valor inicial de um <textarea>?",
        options: ["Atributo value=\"texto\"", "Entre as tags <textarea>texto</textarea>", "Atributo text=\"texto\"", "Dentro de um <label>"],
        correctIndex: 1
      },
      {
        id: "7-2",
        type: "fill_in_blank",
        question: "Complete o atributo para definir a altura visível (número de linhas):",
        snippetBefore: "<textarea ",
        snippetAfter: "=\"5\"></textarea>",
        answer: "rows"
      }
    ]
  },
  {
    id: 8,
    title: "Validação HTML5",
    briefing: {
      text: "O HTML5 introduziu validações nativas, sem precisar de JavaScript. 'required' obriga o preenchimento, 'min' e 'max' limitam números, 'minlength' e 'maxlength' limitam texto, e 'pattern' usa expressões regulares.",
      codeExample: "<input type=\"text\" required minlength=\"3\">\n<input type=\"number\" min=\"18\" max=\"99\">"
    },
    timeLimit: 90,
    challenges: [
      {
        id: "8-1",
        type: "multiple_choice",
        question: "Qual atributo impede que o formulário seja enviado se o campo estiver vazio?",
        options: ["mandatory", "required", "validate", "must-fill"],
        correctIndex: 1
      },
      {
        id: "8-2",
        type: "fill_in_blank",
        question: "Complete o atributo para limitar o tamanho MÁXIMO do texto para 100 caracteres:",
        snippetBefore: "<input type=\"text\" ",
        snippetAfter: "=\"100\">",
        answer: "maxlength"
      },
      {
        id: "8-3",
        type: "find_bug",
        question: "Qual o erro na validação deste campo de idade (deve aceitar de 0 a 120)?",
        code: "<input type=\"number\" minlength=\"0\" maxlength=\"120\">",
        options: ["Falta required", "minlength/maxlength são para texto, inputs de number usam min/max", "type number não suporta validação"],
        correctIndex: 1
      }
    ]
  },
  {
    id: 9,
    title: "Fieldset e Legend",
    briefing: {
      text: "Para agrupar logicamente campos de um formulário (ex: 'Dados Pessoais', 'Endereço'), use a tag <fieldset>. O título desse grupo é definido pela tag <legend> logo no início do fieldset.",
      codeExample: "<fieldset>\n  <legend>Contato</legend>\n  <input type=\"email\" name=\"email\">\n</fieldset>"
    },
    timeLimit: 80,
    challenges: [
      {
        id: "9-1",
        type: "multiple_choice",
        question: "Qual tag agrupa campos de formulário visualmente e logicamente?",
        options: ["<group>", "<form-group>", "<fieldset>", "<section>"],
        correctIndex: 2
      },
      {
        id: "9-2",
        type: "sort_tags",
        question: "Monte a estrutura correta de um fieldset com título:",
        tags: ["</fieldset>", "<fieldset>", "<input type=\"text\">", "<legend>Info</legend>"],
        correctOrder: ["<fieldset>", "<legend>Info</legend>", "<input type=\"text\">", "</fieldset>"]
      }
    ]
  },
  {
    id: 10,
    title: "Boss Level: Form Completo",
    briefing: {
      text: "Você aprendeu a base dos formulários! Agora é hora de provar suas habilidades combinando vários conceitos de uma só vez. Fique de olho nos detalhes de acessibilidade e validação.",
      codeExample: "<!-- Mostre o que você sabe! -->"
    },
    timeLimit: 120,
    challenges: [
      {
        id: "10-1",
        type: "find_bug",
        question: "Este botão não submete o formulário, por quê?",
        code: "<form action=\"/send\">\n  <input type=\"text\">\n  <button type=\"button\">Enviar</button>\n</form>",
        options: ["Botões não funcionam em forms", "O type do botão deveria ser 'submit'", "O botão precisa de um 'name'"],
        correctIndex: 1
      },
      {
        id: "10-2",
        type: "fill_in_blank",
        question: "Crie um input oculto (hidden) para enviar um ID sem mostrar na tela:",
        snippetBefore: "<input type=\"",
        snippetAfter: "\" name=\"user_id\" value=\"42\">",
        answer: "hidden"
      },
      {
        id: "10-3",
        type: "sort_tags",
        question: "Monte a estrutura básica do form:",
        tags: ["</form>", "<button type=\"submit\">Vai!</button>", "<form method=\"POST\">", "<input type=\"text\" required>"],
        correctOrder: ["<form method=\"POST\">", "<input type=\"text\" required>", "<button type=\"submit\">Vai!</button>", "</form>"]
      }
    ]
  }
];

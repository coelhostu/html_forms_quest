import { useState } from "react";
import { Link } from "wouter";
import { LEVELS, Challenge } from "@/data/levels";
import { PixelButton } from "@/components/ui/pixel-button";
import { ArrowLeft, BookOpen, Sparkles, RefreshCw, CheckCircle2, Info, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

// Helper components for Live rendering of each challenge
export function LiveChallengePreview({ challenge }: { challenge: Challenge }) {
  const [resetKey, setResetKey] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
    setCharCount(0);
  };

  const renderContent = () => {
    switch (challenge.id) {
      // LEVEL 1: A Tag <form>
      case "1-1":
        return (
          <div className="border-4 border-dashed border-primary/50 p-6 rounded bg-black/40 text-center">
            <span className="font-mono text-primary text-xs uppercase block mb-2">&lt;form&gt; (Container Principal)</span>
            <div className="border border-border p-4 bg-card rounded inline-block text-sm">
              Campos de formulário vão aqui dentro!
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              O navegador sabe que todos os inputs internos pertencem a este formulário por estar envolto pela tag raiz.
            </p>
          </div>
        );
      case "1-2":
        return (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Dados submetidos via POST para '/api' com sucesso!");
            }}
            className="flex flex-col gap-4 border-2 border-border p-4 bg-card"
          >
            <div className="text-xs font-mono text-emerald-400">&lt;form action="/api" method="POST"&gt;</div>
            <input 
              type="text" 
              placeholder="Digite algo para enviar..." 
              required
              className="bg-background border border-border p-2 text-sm outline-none" 
            />
            <PixelButton type="submit" size="sm" variant="secondary">Enviar (POST)</PixelButton>
          </form>
        );
      case "1-3":
        return (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Simulação de Login bem sucedida via POST!");
            }}
            className="flex flex-col gap-4 border-2 border-border p-4 bg-card"
          >
            <div className="text-xs font-mono text-emerald-400">&lt;form action="/login" method="POST"&gt;</div>
            <input 
              type="text" 
              placeholder="Usuário" 
              className="bg-background border border-border p-2 text-sm outline-none" 
            />
            <input 
              type="password" 
              placeholder="Senha" 
              className="bg-background border border-border p-2 text-sm outline-none" 
            />
            <PixelButton type="submit" size="sm">Entrar</PixelButton>
          </form>
        );

      // LEVEL 2: Inputs e Labels
      case "2-1":
      case "2-3":
        return (
          <div className="flex flex-col gap-4 p-4 border border-border bg-card">
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="user-focus-test" 
                className="text-sm font-bold text-accent cursor-pointer hover:underline flex items-center gap-2"
              >
                <span className="bg-accent/10 px-2 py-0.5 text-xs text-accent uppercase font-mono">Label (Clique-me)</span>
                Usuário:
              </label>
              <input 
                type="text" 
                id="user-focus-test"
                placeholder="Observe o foco ao clicar no label acima..."
                className="bg-background border border-border p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 <strong>Acessibilidade:</strong> Ao vincular o <code>htmlFor</code> do label ao <code>id</code> do input, clicar no texto do label transfere automaticamente o foco para o campo de texto.
            </p>
          </div>
        );
      case "2-2":
        return (
          <div className="flex flex-col gap-2 p-4 border border-border bg-card">
            <label className="text-sm font-bold">Campo com Placeholder:</label>
            <input 
              type="text" 
              placeholder="Texto de dica (some ao digitar...)"
              className="bg-background border border-border p-2 text-sm outline-none" 
            />
          </div>
        );

      // LEVEL 3: Tipos de Input Essenciais
      case "3-1":
        return (
          <div className="flex flex-col gap-2 p-4 border border-border bg-card">
            <label className="text-sm font-bold">Senha (type="password"):</label>
            <div className="relative flex items-center">
              <input 
                type={showPassword ? "text" : "password"} 
                defaultValue="senhaSegura123"
                className="bg-background border border-border p-2 pr-10 text-sm outline-none w-full font-mono" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              O atributo <code>type="password"</code> oculta os caracteres digitados por segurança.
            </p>
          </div>
        );
      case "3-2":
        return (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("E-mail válido enviado!");
            }}
            className="flex flex-col gap-2 p-4 border border-border bg-card"
          >
            <label className="text-sm font-bold">E-mail (type="email"):</label>
            <input 
              type="email" 
              placeholder="exemplo@dominio.com" 
              required
              className="bg-background border border-border p-2 text-sm outline-none" 
            />
            <PixelButton type="submit" size="sm" variant="secondary" className="mt-2">Testar Validação</PixelButton>
            <p className="text-xs text-muted-foreground">
              O navegador valida automaticamente o formato (presença do '@' e domínio) antes do envio.
            </p>
          </form>
        );
      case "3-3":
        return (
          <div className="flex flex-col gap-2 p-4 border border-border bg-card">
            <label htmlFor="nasc-preview" className="text-sm font-bold">Nascimento (type="date"):</label>
            <input 
              type="date" 
              id="nasc-preview"
              className="bg-background border border-border p-2 text-sm outline-none font-mono cursor-pointer" 
            />
            <p className="text-xs text-muted-foreground">
              Abre um seletor de calendário nativo fornecido pelo sistema operacional/navegador.
            </p>
          </div>
        );

      // LEVEL 4: Checkboxes
      case "4-1":
      case "4-2":
        return (
          <div className="flex flex-col gap-3 p-4 border border-border bg-card">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="news-preview" 
                defaultChecked 
                className="w-5 h-5 cursor-pointer accent-primary"
              />
              <label htmlFor="news-preview" className="text-sm font-bold cursor-pointer">
                Desejo receber novidades por e-mail (checked por padrão)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="terms-preview" 
                className="w-5 h-5 cursor-pointer accent-primary"
              />
              <label htmlFor="terms-preview" className="text-sm font-bold cursor-pointer">
                Aceito os termos de serviço da plataforma
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              Checkboxes permitem múltipla escolha ou ativação de estados binários (ligado/desligado).
            </p>
          </div>
        );

      // LEVEL 5: Radio Buttons
      case "5-1":
      case "5-2":
        return (
          <div className="flex flex-col gap-4 p-4 border border-border bg-card">
            <div>
              <div className="text-xs text-primary font-mono uppercase mb-2">Grupo Correto (mesmo name="plano"):</div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input type="radio" id="p-basico" name="plano-teste" value="basico" defaultChecked className="accent-primary cursor-pointer" />
                  <label htmlFor="p-basico" className="text-xs font-bold cursor-pointer">Básico</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="p-pro" name="plano-teste" value="pro" className="accent-primary cursor-pointer" />
                  <label htmlFor="p-pro" className="text-xs font-bold cursor-pointer">Pro</label>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="text-xs text-destructive font-mono uppercase mb-2">Simulação de Bug (names diferentes):</div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input type="radio" id="b-opt1" name="opcao1" className="accent-primary cursor-pointer" />
                  <label htmlFor="b-opt1" className="text-xs font-bold cursor-pointer">Opção A</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="b-opt2" name="opcao2" className="accent-primary cursor-pointer" />
                  <label htmlFor="b-opt2" className="text-xs font-bold cursor-pointer">Opção B (Ambos marcam!)</label>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 O atributo <code>name</code> igual liga os botões em um grupo exclusivo. Sem ele, o navegador os trata como independentes.
            </p>
          </div>
        );

      // LEVEL 6: Select e Options
      case "6-1":
      case "6-2":
      case "6-3":
        return (
          <div className="flex flex-col gap-2 p-4 border border-border bg-card">
            <label htmlFor="cidades-select" className="text-sm font-bold">Selecione seu estado/país:</label>
            <select 
              id="cidades-select"
              defaultValue="rj"
              className="bg-background text-foreground border-2 border-border p-2 text-sm outline-none cursor-pointer focus:border-primary font-sans"
            >
              <option value="sp">São Paulo</option>
              <option value="rj">Rio de Janeiro (Selected por padrão)</option>
              <option value="mg">Minas Gerais</option>
              <option value="ba">Bahia</option>
            </select>
            <p className="text-xs text-muted-foreground">
              O menu suspenso economiza espaço na tela agrupando várias opções selecionáveis de forma compacta.
            </p>
          </div>
        );

      // LEVEL 7: Textarea
      case "7-1":
      case "7-2":
        return (
          <div className="flex flex-col gap-2 p-4 border border-border bg-card">
            <label className="text-sm font-bold">Mensagem (textarea):</label>
            <textarea 
              rows={5}
              placeholder="Digite sua mensagem longa aqui..."
              className="bg-background text-foreground border-2 border-border p-3 text-sm outline-none font-sans w-full"
              defaultValue="Olá professor! Este é o valor inicial definido diretamente entre as tags de abertura e fechamento do textarea."
            />
            <p className="text-xs text-muted-foreground">
              O atributo <code>rows</code> define a altura inicial do campo em linhas de texto. O tamanho pode ser redimensionado livremente pelo usuário arrastando o canto inferior.
            </p>
          </div>
        );

      // LEVEL 8: Validação HTML5
      case "8-1":
        return (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Sucesso! O campo obrigatório foi preenchido.");
            }}
            className="flex flex-col gap-3 p-4 border border-border bg-card"
          >
            <label className="text-sm font-bold flex items-center gap-1">
              Nome de Usuário <span className="text-destructive">*</span>:
            </label>
            <input 
              type="text" 
              required
              placeholder="Campo obrigatório (required)" 
              className="bg-background border border-border p-2 text-sm outline-none" 
            />
            <PixelButton type="submit" size="sm" variant="secondary">Enviar Formulário</PixelButton>
            <p className="text-xs text-muted-foreground">
              Se tentar enviar com o campo em branco, o navegador impede e exibe um balão de alerta nativo.
            </p>
          </form>
        );
      case "8-2":
        return (
          <div className="flex flex-col gap-2 p-4 border border-border bg-card">
            <label className="text-sm font-bold flex justify-between">
              <span>Texto curto (maxlength="100"):</span>
              <span className="text-xs font-mono text-muted-foreground">{charCount}/100</span>
            </label>
            <input 
              type="text" 
              maxLength={100}
              onChange={(e) => setCharCount(e.target.value.length)}
              placeholder="Digite aqui para testar o limite..."
              className="bg-background border border-border p-2 text-sm outline-none font-sans" 
            />
            <p className="text-xs text-muted-foreground">
              O atributo <code>maxlength</code> impede fisicamente o usuário de digitar mais caracteres do que o limite especificado.
            </p>
          </div>
        );
      case "8-3":
        return (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Idade válida aceita!");
            }}
            className="flex flex-col gap-3 p-4 border border-border bg-card"
          >
            <label className="text-sm font-bold">Idade (mínimo 0, máximo 120):</label>
            <input 
              type="number" 
              min={0}
              max={120}
              required
              placeholder="Insira idade"
              className="bg-background border border-border p-2 text-sm outline-none font-mono" 
            />
            <PixelButton type="submit" size="sm" variant="secondary">Validar Número</PixelButton>
            <p className="text-xs text-muted-foreground">
              Inputs numéricos utilizam <code>min</code> e <code>max</code> para restringir os valores, em vez de <code>minlength/maxlength</code>.
            </p>
          </form>
        );

      // LEVEL 9: Fieldset e Legend
      case "9-1":
      case "9-2":
        return (
          <div className="p-2 bg-card">
            <fieldset className="border-4 border-double border-border p-4 rounded">
              <legend className="px-3 py-1 bg-primary text-primary-foreground font-mono text-xs uppercase">
                Dados de Contato
              </legend>
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold">Telefone:</label>
                  <input type="tel" placeholder="(11) 99999-9999" className="bg-background border border-border p-1.5 text-xs outline-none" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold">E-mail:</label>
                  <input type="email" placeholder="nome@provedor.com" className="bg-background border border-border p-1.5 text-xs outline-none" />
                </div>
              </div>
            </fieldset>
            <p className="text-xs text-muted-foreground mt-3">
              O <code>fieldset</code> agrupa campos semanticamente, e o <code>legend</code> provê uma legenda ou título visual na borda superior.
            </p>
          </div>
        );

      // LEVEL 10: Boss Level: Form Completo
      case "10-1":
      case "10-2":
      case "10-3":
        return (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              alert(`Formulário Completo Enviado!\nNome: ${data.get("nome")}\nNewsletter: ${data.get("newsletter") ? "Sim" : "Não"}\nUser ID oculto: ${data.get("user_id")}`);
            }}
            className="flex flex-col gap-4 border-2 border-border p-4 bg-card"
          >
            <div className="text-xs font-mono text-primary uppercase border-b border-border pb-1">
              Ficha de Cadastro Completa
            </div>
            
            {/* Campo Oculto */}
            <input type="hidden" name="user_id" value="42" />
            <div className="bg-muted/40 p-2 rounded text-xs font-mono text-accent">
              ℹ️ Campo Oculto Ativo: &lt;input type="hidden" name="user_id" value="42"&gt; (Invisível na submissão real)
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold">Nome Completo:</label>
              <input type="text" name="nome" required placeholder="Seu nome" className="bg-background border border-border p-2 text-sm outline-none" />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" name="newsletter" id="boss-news" className="w-4 h-4" />
              <label htmlFor="boss-news" className="text-xs font-bold cursor-pointer">Assinar boletim informativo</label>
            </div>

            <PixelButton type="submit" size="sm" className="mt-2">Submeter Ficha</PixelButton>
          </form>
        );

      default:
        return <div className="text-sm italic text-muted-foreground">Visualização indisponível.</div>;
    }
  };

  return (
    <div key={resetKey} className="w-full flex flex-col gap-2 mt-4">
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] text-accent uppercase font-mono flex items-center gap-1 font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Laboratório Visual
        </span>
        <button 
          onClick={handleReset} 
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          title="Reiniciar elemento"
        >
          <RefreshCw className="w-3 h-3" /> reiniciar
        </button>
      </div>
      <div className="p-4 bg-black/60 border border-border rounded-md">
        {renderContent()}
      </div>
    </div>
  );
}

export default function Visualizer() {
  const [selectedLevelId, setSelectedLevelId] = useState(1);
  const selectedLevel = LEVELS.find(l => l.id === selectedLevelId) || LEVELS[0];

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col font-sans">
      {/* HEADER */}
      <header className="w-full bg-card border-b-4 border-border p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <PixelButton variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar ao Menu
            </PixelButton>
          </Link>
          <h1 className="hidden md:flex font-display text-primary text-lg gap-2 items-center">
            <BookOpen className="w-5 h-5 text-accent" /> Modo Laboratório
          </h1>
        </div>

        <div className="pixel-box bg-primary text-primary-foreground px-4 py-2 font-display text-xs">
          PROTÓTIPO DE ESTUDO
        </div>
      </header>

      {/* BODY SPLIT LAYOUT */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-8">
        
        {/* SIDEBAR: LEVELS LIST */}
        <aside className="w-full md:w-80 flex flex-col gap-4">
          <div className="pixel-box bg-card p-4">
            <h2 className="font-display text-sm text-accent mb-4 border-b border-border pb-2 flex items-center gap-2">
              📂 Níveis do Jogo
            </h2>
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
              {LEVELS.map(level => {
                const isSelected = level.id === selectedLevelId;
                return (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevelId(level.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left font-mono text-sm border-2 transition-all shrink-0 md:shrink-1 ${
                      isSelected 
                        ? "bg-primary border-primary-foreground text-primary-foreground font-bold translate-x-1" 
                        : "bg-card/45 border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                    style={{ minWidth: "180px" }}
                  >
                    <span className={`w-6 h-6 flex items-center justify-center font-display text-[10px] shrink-0 border ${
                      isSelected ? "border-primary-foreground bg-primary/80" : "border-border bg-black/30"
                    }`}>
                      {level.id}
                    </span>
                    <span className="truncate">{level.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:block pixel-box bg-card p-4 text-xs text-muted-foreground leading-relaxed">
            <h3 className="font-display text-[9px] text-primary mb-2">💡 Dica do Professor</h3>
            <p>
              Use este modo para explicar e demonstrar o funcionamento físico do código HTML na sala de aula. Cada desafio possui uma renderização isolada que simula o comportamento nativo do navegador.
            </p>
          </div>
        </aside>

        {/* MAIN PANEL: LEVEL EXPLORER */}
        <main className="flex-1 flex flex-col gap-6">
          
          {/* LEVEL HEADER & BRIEFING */}
          <section className="pixel-box bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b-2 border-border">
              <h2 className="font-display text-xl text-primary">
                Nível {selectedLevel.id}: {selectedLevel.title}
              </h2>
              <span className="bg-secondary/20 text-secondary border border-secondary px-3 py-1 font-mono text-xs">
                Tempo Limite: {selectedLevel.timeLimit}s no Jogo
              </span>
            </div>
            
            <p className="font-sans text-sm md:text-base text-card-foreground mb-4 leading-relaxed">
              {selectedLevel.briefing.text}
            </p>

            <div className="bg-black/60 p-4 rounded text-xs md:text-sm font-mono text-emerald-400 border border-border overflow-x-auto">
              <span className="text-[10px] text-muted-foreground block uppercase mb-1">// Exemplo de Referência</span>
              <pre>{selectedLevel.briefing.codeExample}</pre>
            </div>
          </section>

          {/* CHALLENGES LIST */}
          <section className="flex flex-col gap-6">
            <h3 className="font-display text-sm text-accent flex items-center gap-2 px-1">
              📝 Desafios do Nível ({selectedLevel.challenges.length})
            </h3>

            {selectedLevel.challenges.map((challenge, idx) => {
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="pixel-box bg-card/65 p-6 backdrop-blur-sm"
                >
                  {/* Challenge Header */}
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                    <span className="text-xs text-muted-foreground font-mono">
                      Questão {challenge.id} • Tipo: <strong className="text-secondary font-mono">{challenge.type}</strong>
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/20 px-2 py-0.5 border border-emerald-900 rounded">
                      <CheckCircle2 className="w-3 h-3" /> Gabarito Resolvido
                    </span>
                  </div>

                  {/* Question */}
                  <p className="font-display text-xs md:text-sm leading-relaxed mb-4 text-foreground">
                    {challenge.question}
                  </p>

                  {/* Challenge details based on type */}
                  <div className="mb-4">
                    {challenge.type === "multiple_choice" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {challenge.options.map((opt, i) => {
                          const isCorrect = i === challenge.correctIndex;
                          return (
                            <div 
                              key={i}
                              className={`p-3 border rounded text-sm font-sans flex items-center justify-between ${
                                isCorrect 
                                  ? "bg-emerald-950/20 border-emerald-500 text-emerald-300 font-semibold" 
                                  : "bg-black/20 border-border text-muted-foreground"
                              }`}
                            >
                              <span>{opt}</span>
                              {isCorrect && <span className="text-[10px] font-display text-emerald-500">CORRETO</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {challenge.type === "fill_in_blank" && (
                      <div className="flex flex-col gap-2">
                        <div className="bg-black/50 p-4 rounded font-mono text-sm border border-border flex flex-wrap items-center gap-1.5">
                          <span className="text-emerald-400">{challenge.snippetBefore}</span>
                          <span className="bg-emerald-500 text-black px-2 py-0.5 font-bold rounded">
                            {challenge.answer}
                          </span>
                          <span className="text-emerald-400">{challenge.snippetAfter}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Resposta de preenchimento: <code className="text-accent bg-accent/15 px-1 rounded font-bold font-mono">{challenge.answer}</code>
                        </p>
                      </div>
                    )}

                    {challenge.type === "find_bug" && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-red-950/20 p-4 rounded font-mono text-sm text-red-300 border border-red-900/40 overflow-x-auto">
                          {challenge.code}
                        </div>
                        <div className="flex flex-col gap-2">
                          {challenge.options.map((opt, i) => {
                            const isCorrect = i === challenge.correctIndex;
                            return (
                              <div 
                                key={i}
                                className={`p-3 border rounded text-xs md:text-sm font-sans flex items-center justify-between ${
                                  isCorrect 
                                    ? "bg-emerald-950/20 border-emerald-500 text-emerald-300 font-semibold" 
                                    : "bg-black/20 border-border text-muted-foreground"
                                }`}
                              >
                                <span>{opt}</span>
                                {isCorrect && <span className="text-[10px] font-display text-emerald-500">SOLUÇÃO</span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {challenge.type === "sort_tags" && (
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-muted-foreground mb-1 uppercase font-mono">Ordem Correta das Tags:</div>
                        <div className="flex flex-col gap-2 bg-black/40 p-4 border-2 border-dashed border-border rounded">
                          {challenge.correctOrder.map((tag, i) => (
                            <div key={i} className="font-mono text-sm text-primary-foreground bg-primary/10 border border-primary/30 px-3 py-1.5 rounded">
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Render Live Preview in Sandbox */}
                  <LiveChallengePreview challenge={challenge} />
                </motion.div>
              );
            })}
          </section>
        </main>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { LEVELS, Challenge } from "@/data/levels";
import { useGameState } from "@/lib/store";
import { audio } from "@/lib/audio";
import { PixelButton } from "@/components/ui/pixel-button";
import { Heart, Clock, Zap, Star, LayoutList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Sub-components for challenges
function MultipleChoiceView({ 
  challenge, 
  onAnswer 
}: { 
  challenge: Challenge & { type: 'multiple_choice' }, 
  onAnswer: (correct: boolean) => void 
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="font-display text-lg leading-relaxed">{challenge.question}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {challenge.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i === challenge.correctIndex)}
            className="pixel-box bg-card p-4 text-left font-sans text-lg hover:bg-muted transition-colors active:bg-primary"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function FillInBlankView({
  challenge,
  onAnswer
}: {
  challenge: Challenge & { type: 'fill_in_blank' },
  onAnswer: (correct: boolean) => void
}) {
  const [val, setVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(val.trim().toLowerCase() === challenge.answer.toLowerCase());
    setVal("");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h3 className="font-display text-lg leading-relaxed">{challenge.question}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
        <div className="bg-black/50 p-6 rounded-md font-mono text-lg flex flex-wrap items-center gap-2 border border-border">
          <span className="text-emerald-400">{challenge.snippetBefore}</span>
          <input 
            type="text" 
            autoFocus
            className="bg-background text-foreground border-b-2 border-primary outline-none w-32 px-2 py-1 text-center"
            value={val}
            onChange={e => setVal(e.target.value)}
          />
          <span className="text-emerald-400">{challenge.snippetAfter}</span>
        </div>
        <PixelButton type="submit" className="self-end">Verificar</PixelButton>
      </form>
    </div>
  );
}

function FindBugView({
  challenge,
  onAnswer
}: {
  challenge: Challenge & { type: 'find_bug' },
  onAnswer: (correct: boolean) => void
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <h3 className="font-display text-lg leading-relaxed">{challenge.question}</h3>
      <div className="bg-red-950/30 p-6 rounded-md font-mono text-lg text-red-300 border border-red-900/50 mt-4 overflow-x-auto whitespace-pre">
        {challenge.code}
      </div>
      <div className="flex flex-col gap-3">
        {challenge.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i === challenge.correctIndex)}
            className="pixel-box bg-card p-4 text-left font-sans hover:bg-muted transition-colors"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SortTagsView({
  challenge,
  onAnswer
}: {
  challenge: Challenge & { type: 'sort_tags' },
  onAnswer: (correct: boolean) => void
}) {
  const [items, setItems] = useState<{id: string, text: string}[]>(() => 
    [...challenge.tags].sort(() => Math.random() - 0.5).map((t, i) => ({ id: `t${i}`, text: t }))
  );
  const [selected, setSelected] = useState<{id: string, text: string}[]>([]);

  const handleSelect = (item: {id: string, text: string}) => {
    setItems(items.filter(i => i.id !== item.id));
    setSelected([...selected, item]);
  };

  const handleDeselect = (item: {id: string, text: string}) => {
    setSelected(selected.filter(i => i.id !== item.id));
    setItems([...items, item]);
  };

  const handleVerify = () => {
    const isCorrect = selected.length === challenge.correctOrder.length && 
      selected.every((s, i) => s.text === challenge.correctOrder[i]);
    
    onAnswer(isCorrect);
    if (!isCorrect) {
      // reset
      setItems([...challenge.tags].map((t, i) => ({ id: `t${i}`, text: t })));
      setSelected([]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h3 className="font-display text-lg leading-relaxed">{challenge.question}</h3>
      
      <div className="flex flex-col gap-4 mt-4">
        <div className="text-sm font-sans text-muted-foreground uppercase">Sua ordem:</div>
        <div className="min-h-[100px] pixel-box bg-black/40 p-4 flex flex-col gap-2 border-dashed border-2 border-muted">
          {selected.map(item => (
            <button 
              key={item.id} 
              onClick={() => handleDeselect(item)}
              className="font-mono bg-primary/20 text-primary-foreground px-4 py-2 text-left hover:bg-destructive/50 transition-colors"
            >
              {item.text}
            </button>
          ))}
          {selected.length === 0 && <div className="text-muted-foreground text-sm italic py-2">Clique nas tags abaixo...</div>}
        </div>

        <div className="text-sm font-sans text-muted-foreground uppercase mt-4">Tags disponíveis:</div>
        <div className="flex flex-wrap gap-3">
          {items.map(item => (
            <button 
              key={item.id}
              onClick={() => handleSelect(item)}
              className="font-mono pixel-box bg-card px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              {item.text}
            </button>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <PixelButton onClick={handleVerify} disabled={selected.length === 0}>
            Verificar Ordem
          </PixelButton>
        </div>
      </div>
    </div>
  );
}

// Main Level Component
export default function LevelPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { state, completeLevel } = useGameState();
  
  const levelId = parseInt(id || "1", 10);
  const level = LEVELS.find(l => l.id === levelId);

  const [phase, setPhase] = useState<'briefing' | 'playing' | 'gameover' | 'victory'>('briefing');
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [errorsMade, setErrorsMade] = useState(0);

  // Shake effect state
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (level) {
      setTimeLeft(level.timeLimit);
    }
  }, [level]);

  // Timer logic
  useEffect(() => {
    if (phase !== 'playing') return;
    
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setPhase('gameover');
          audio.playGameOver();
          return 0;
        }
        if (prev <= 10) audio.playTick();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [phase]);

  if (!level) return <div>Nível não encontrado!</div>;

  const currentChallenge = level.challenges[challengeIdx];

  const handleStart = () => {
    setPhase('playing');
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      audio.playCorrect();
      setCombo(prev => prev + 1);
      const pts = 100 * (1 + combo * 0.5);
      setScore(prev => prev + pts);
      
      if (challengeIdx < level.challenges.length - 1) {
        setChallengeIdx(prev => prev + 1);
      } else {
        // Victory!
        audio.playLevelComplete();
        setPhase('victory');
        
        // Calculate stars
        let stars = 1;
        if (timeLeft > level.timeLimit / 2) stars++;
        if (errorsMade === 0) stars++;
        
        // Bonus points
        const timeBonus = timeLeft * 10;
        const finalScore = score + pts + timeBonus;
        setScore(finalScore);
        
        completeLevel(levelId, stars, finalScore);
      }
    } else {
      audio.playWrong();
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      setCombo(0);
      setErrorsMade(prev => prev + 1);
      setLives(prev => {
        const next = prev - 1;
        if (next <= 0) {
          setPhase('gameover');
          audio.playGameOver();
        }
        return next;
      });
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col items-center">
      {/* HUD */}
      <div className="w-full bg-card border-b-4 border-border p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <PixelButton variant="ghost" size="sm" onClick={() => setLocation('/mapa')} className="hidden sm:flex">
            Sair
          </PixelButton>
          <div className="font-display text-primary sm:text-xl">Lvl {levelId}</div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <Heart key={i} className={cn("w-6 h-6", i <= lives ? "text-destructive fill-destructive" : "text-muted fill-muted")} />
            ))}
          </div>
          
          <div className={cn(
            "flex items-center gap-2 font-display text-xl w-24",
            timeLeft <= 10 && "text-destructive animate-pulse"
          )}>
            <Clock className="w-5 h-5" />
            {timeLeft}s
          </div>

          <div className="flex items-center gap-2 text-accent font-display">
            <Zap className="w-5 h-5 hidden sm:block" />
            {Math.floor(score)}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-3xl p-4 md:p-8 flex flex-col justify-center">
        
        {phase === 'briefing' && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="pixel-box bg-card p-6 md:p-10">
            <h2 className="font-display text-2xl text-primary mb-6 pb-4 border-b-2 border-border">
              {level.title}
            </h2>
            <p className="font-sans text-lg mb-6 leading-relaxed">
              {level.briefing.text}
            </p>
            <div className="bg-black/60 p-4 rounded text-sm md:text-base font-mono text-emerald-400 border border-border mb-8 overflow-x-auto">
              <pre>{level.briefing.codeExample}</pre>
            </div>
            <div className="flex justify-end">
              <PixelButton size="lg" onClick={handleStart}>Iniciar Missão</PixelButton>
            </div>
          </motion.div>
        )}

        {phase === 'playing' && currentChallenge && (
          <motion.div 
            key={currentChallenge.id}
            initial={{ x: 50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            className={cn("pixel-box bg-card/80 p-6 md:p-10 backdrop-blur-sm", shake && "animate-[shake_0.5s_ease-in-out]")}
          >
            <div className="text-sm font-sans text-muted-foreground uppercase mb-6 flex justify-between">
              <span>Desafio {challengeIdx + 1} / {level.challenges.length}</span>
              {combo > 1 && <span className="text-accent font-bold">Combo x{combo}!</span>}
            </div>

            {currentChallenge.type === 'multiple_choice' && <MultipleChoiceView challenge={currentChallenge} onAnswer={handleAnswer} />}
            {currentChallenge.type === 'fill_in_blank' && <FillInBlankView challenge={currentChallenge} onAnswer={handleAnswer} />}
            {currentChallenge.type === 'find_bug' && <FindBugView challenge={currentChallenge} onAnswer={handleAnswer} />}
            {currentChallenge.type === 'sort_tags' && <SortTagsView challenge={currentChallenge} onAnswer={handleAnswer} />}
          </motion.div>
        )}

        <AnimatePresence>
          {phase === 'gameover' && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 z-50 bg-background/95 backdrop-blur flex flex-col items-center justify-center p-4"
            >
              <h2 className="font-display text-5xl text-destructive mb-4 drop-shadow-lg">GAME OVER</h2>
              <p className="text-xl mb-12 font-sans text-muted-foreground">
                {lives <= 0 ? "Você ficou sem vidas." : "O tempo acabou!"}
              </p>
              <div className="flex gap-4">
                <PixelButton variant="secondary" onClick={() => setLocation('/mapa')}>Mapa</PixelButton>
                <PixelButton onClick={() => window.location.reload()}>Tentar Novamente</PixelButton>
              </div>
            </motion.div>
          )}

          {phase === 'victory' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-50 bg-background/95 backdrop-blur flex flex-col items-center justify-center p-4"
            >
              <h2 className="font-display text-5xl text-primary mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">NÍVEL CONCLUÍDO!</h2>
              
              <div className="flex gap-4 mb-8">
                {[1, 2, 3].map(i => {
                  let starsEarned = 1;
                  if (timeLeft > level.timeLimit / 2) starsEarned++;
                  if (errorsMade === 0) starsEarned++;
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -180, scale: 0 }}
                      animate={{ opacity: 1, rotate: 0, scale: i <= starsEarned ? 1 : 0.8 }}
                      transition={{ delay: i * 0.3, type: "spring" }}
                    >
                      <Star className={cn("w-16 h-16", i <= starsEarned ? "text-accent fill-accent drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" : "text-muted fill-muted")} />
                    </motion.div>
                  )
                })}
              </div>

              <div className="pixel-box bg-card p-6 mb-12 min-w-[300px]">
                <div className="flex justify-between mb-2 font-sans text-lg">
                  <span className="text-muted-foreground">Pontos Base:</span>
                  <span>{score - (timeLeft * 10)}</span>
                </div>
                <div className="flex justify-between mb-4 font-sans text-lg">
                  <span className="text-muted-foreground">Bônus de Tempo:</span>
                  <span className="text-accent">+{timeLeft * 10}</span>
                </div>
                <div className="border-t-2 border-border pt-4 flex justify-between font-display text-xl text-primary">
                  <span>TOTAL:</span>
                  <span>{Math.floor(score)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <PixelButton variant="secondary" onClick={() => setLocation('/mapa')} className="flex items-center gap-2">
                  <LayoutList className="w-5 h-5" /> Mapa
                </PixelButton>
                {levelId < 10 && (
                  <PixelButton onClick={() => setLocation(`/nivel/${levelId + 1}`)}>
                    Próximo Nível
                  </PixelButton>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

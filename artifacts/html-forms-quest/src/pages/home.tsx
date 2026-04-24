import { Link } from "wouter";
import { PixelButton } from "@/components/ui/pixel-button";
import { useGameState } from "@/lib/store";
import { Trophy, Play, Settings, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { state } = useGameState();

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 text-primary opacity-20 hidden md:block">
        <pre className="font-mono text-sm">
{`<form action="/quest">
  <input type="hidden">
  <button>PLAY</button>
</form>`}
        </pre>
      </div>
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-center z-10"
      >
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent mb-4 drop-shadow-lg">
          HTML Forms
          <br />
          Quest
        </h1>
        <p className="font-sans text-muted-foreground text-lg md:text-xl mb-12 max-w-md mx-auto">Atividade do Prof. João Coelho</p>
      </motion.div>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 w-full max-w-xs z-10"
      >
        <Link href="/mapa" className="w-full">
          <PixelButton size="lg" className="w-full text-xl flex items-center justify-center gap-2">
            <Play className="w-6 h-6" /> 
            {state.unlockedLevels.length > 1 ? "Continuar" : "Jogar"}
          </PixelButton>
        </Link>
        
        <Link href="/como-jogar" className="w-full">
          <PixelButton variant="secondary" className="w-full flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5" /> Como Jogar
          </PixelButton>
        </Link>

        <Link href="/configuracoes" className="w-full">
          <PixelButton variant="ghost" className="w-full flex items-center justify-center gap-2 border-border bg-card">
            <Settings className="w-5 h-5" /> Configurações
          </PixelButton>
        </Link>
      </motion.div>
      {state.totalScore > 0 && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center gap-3 bg-card px-6 py-3 pixel-box text-card-foreground"
        >
          <Trophy className="w-6 h-6 text-accent" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-display tracking-widest">High Score</span>
            <span className="font-display text-lg text-primary">{state.totalScore}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

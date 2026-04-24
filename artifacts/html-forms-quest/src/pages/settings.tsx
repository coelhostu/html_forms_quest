import { Link } from "wouter";
import { PixelButton } from "@/components/ui/pixel-button";
import { ArrowLeft, Volume2, VolumeX, Trash2 } from "lucide-react";
import { useGameState } from "@/lib/store";

export default function Settings() {
  const { state, toggleSound, resetProgress } = useGameState();

  const handleReset = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o seu progresso? Isso não pode ser desfeito.")) {
      resetProgress();
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto relative">
        
        <Link href="/">
          <PixelButton variant="ghost" size="sm" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </PixelButton>
        </Link>

        <h1 className="font-display text-3xl md:text-4xl text-primary mb-8 pixel-box bg-card p-4 text-center">
          Configurações
        </h1>

        <div className="space-y-6">
          <div className="pixel-box bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl mb-2 text-card-foreground">Efeitos Sonoros</h2>
              <p className="text-muted-foreground font-sans text-sm">
                Ativar bips, alarmes e músicas de vitória.
              </p>
            </div>
            <PixelButton 
              variant={state.soundEnabled ? "primary" : "secondary"} 
              onClick={toggleSound}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {state.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              {state.soundEnabled ? "Ligado" : "Desligado"}
            </PixelButton>
          </div>

          <div className="pixel-box bg-card border-destructive p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl mb-2 text-destructive">Resetar Progresso</h2>
              <p className="text-muted-foreground font-sans text-sm">
                Apaga as estrelas, pontuação e níveis desbloqueados.
              </p>
            </div>
            <PixelButton 
              variant="danger" 
              onClick={handleReset}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Trash2 className="w-5 h-5" /> Resetar
            </PixelButton>
          </div>
        </div>

      </div>
    </div>
  );
}

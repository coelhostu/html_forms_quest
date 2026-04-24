import { Link } from "wouter";
import { PixelButton } from "@/components/ui/pixel-button";
import { ArrowLeft, Terminal, Gamepad2, Award } from "lucide-react";

export default function HowToPlay() {
  return (
    <div className="min-h-[100dvh] w-full bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto relative">
        
        <Link href="/">
          <PixelButton variant="ghost" size="sm" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </PixelButton>
        </Link>

        <h1 className="font-display text-3xl md:text-4xl text-primary mb-8 pixel-box bg-card p-4 text-center">
          Como Jogar
        </h1>

        <div className="space-y-8 font-sans">
          
          <div className="pixel-box bg-card p-6 border-l-4 border-l-secondary">
            <div className="flex items-center gap-4 mb-4 text-secondary">
              <Gamepad2 className="w-8 h-8" />
              <h2 className="font-display text-xl">A Missão</h2>
            </div>
            <p className="text-card-foreground leading-relaxed">
              O HTML Forms Quest é uma jornada por 10 níveis ensinando tudo sobre formulários na web. 
              Em cada nível, você lerá um pequeno <strong>Briefing</strong> e depois enfrentará de 3 a 5 desafios práticos.
            </p>
          </div>

          <div className="pixel-box bg-card p-6 border-l-4 border-l-primary">
            <div className="flex items-center gap-4 mb-4 text-primary">
              <Terminal className="w-8 h-8" />
              <h2 className="font-display text-xl">As Regras</h2>
            </div>
            <ul className="text-card-foreground space-y-4 list-disc pl-6">
              <li><strong>Tempo Corre:</strong> Cada nível tem um timer. Se chegar a zero, é Game Over.</li>
              <li><strong>Vidas Limitadas:</strong> Você tem 3 corações por nível. Errinhos custam corações.</li>
              <li><strong>Combo:</strong> Acertar várias seguidas aumenta seus pontos exponencialmente.</li>
            </ul>
          </div>

          <div className="pixel-box bg-card p-6 border-l-4 border-l-accent">
            <div className="flex items-center gap-4 mb-4 text-accent">
              <Award className="w-8 h-8" />
              <h2 className="font-display text-xl">Estrelas</h2>
            </div>
            <p className="text-card-foreground leading-relaxed mb-4">
              Completar o nível desbloqueia o próximo. Mas para ser um mestre, busque as 3 estrelas:
            </p>
            <ul className="text-card-foreground space-y-2">
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-accent" /> <span className="text-muted-foreground">= Passar de fase</span></li>
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-accent" /><Award className="w-4 h-4 text-accent" /> <span className="text-muted-foreground">= Terminar com folga de tempo</span></li>
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-accent" /><Award className="w-4 h-4 text-accent" /><Award className="w-4 h-4 text-accent" /> <span className="text-muted-foreground">= Completar sem errar nada (Perfeito!)</span></li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}

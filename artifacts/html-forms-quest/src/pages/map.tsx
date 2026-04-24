import { Link } from "wouter";
import { PixelButton } from "@/components/ui/pixel-button";
import { LEVELS } from "@/data/levels";
import { useGameState } from "@/lib/store";
import { ArrowLeft, Lock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MapPage() {
  const { state } = useGameState();

  return (
    <div className="min-h-[100dvh] w-full bg-background p-4 md:p-8 pb-20">
      <div className="max-w-4xl mx-auto relative">
        <div className="flex justify-between items-center mb-12">
          <Link href="/">
            <PixelButton variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </PixelButton>
          </Link>
          
          <div className="pixel-box bg-card px-4 py-2 text-primary font-display text-sm">
            SCORE: {state.totalScore}
          </div>
        </div>

        <h1 className="font-display text-3xl md:text-4xl text-center text-primary mb-16 pixel-box bg-card p-4 mx-auto max-w-xl">
          World Map
        </h1>

        <div className="relative">
          {/* Path line connecting nodes */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted -translate-y-1/2 z-0 hidden md:block" />
          
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-8 md:gap-x-12 md:gap-y-16 z-10 relative">
            {LEVELS.map((level, idx) => {
              const isUnlocked = state.unlockedLevels.includes(level.id);
              const stars = state.stars[level.id] || 0;
              const isCurrent = isUnlocked && !state.stars[level.id]; // Unlocked but not beaten yet
              
              return (
                <div key={level.id} className="relative flex flex-col items-center group">
                  {/* Connection line for mobile */}
                  {idx !== LEVELS.length - 1 && (
                    <div className="absolute top-16 bottom-[-2rem] w-2 bg-muted -z-10 md:hidden" />
                  )}

                  {isUnlocked ? (
                    <Link href={`/nivel/${level.id}`}>
                      <button 
                        className={cn(
                          "w-20 h-20 flex items-center justify-center font-display text-2xl pixel-box transition-transform hover:scale-110",
                          isCurrent 
                            ? "bg-primary text-primary-foreground animate-pulse" 
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {level.id}
                      </button>
                    </Link>
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center pixel-box bg-muted text-muted-foreground opacity-50">
                      <Lock className="w-8 h-8" />
                    </div>
                  )}
                  
                  <div className="mt-4 text-center">
                    <h3 className={cn(
                      "font-sans font-bold text-sm max-w-[120px] leading-tight",
                      isUnlocked ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {level.title}
                    </h3>
                    
                    {isUnlocked && stars > 0 && (
                      <div className="flex justify-center mt-2 gap-1">
                        {[1, 2, 3].map(starIdx => (
                          <Star 
                            key={starIdx} 
                            className={cn(
                              "w-4 h-4", 
                              starIdx <= stars ? "text-accent fill-accent" : "text-muted fill-muted"
                            )} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

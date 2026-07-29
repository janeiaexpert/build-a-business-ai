import { Sparkles, Globe, Zap, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[250px] sm:h-[400px] rounded-full opacity-20 blur-[80px] sm:blur-[120px] pointer-events-none" style={{ background: "hsl(28, 40%, 55%)" }} />

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 sm:mb-8 animate-fade-in-up">
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
        <span className="text-xs sm:text-sm font-medium text-primary tracking-widest uppercase">AI Builder Pro</span>
      </div>

      {/* Heading */}
      <h1 className="relative z-10 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-3 sm:mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        O que você quer
        <br />
        <span className="text-gradient-primary italic inline-block pr-2 sm:pr-4 pb-2 sm:pb-4">Criar Hoje?</span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-muted-foreground text-base sm:text-lg md:text-xl max-w-lg sm:max-w-xl mb-8 sm:mb-10 animate-fade-in-up px-2" style={{ animationDelay: "0.2s" }}>
        Escolha o tipo de projeto e deixe a IA fazer o trabalho pesado.
      </p>

      {/* Features */}
      <div className="relative z-10 flex flex-col sm:flex-wrap sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          <span>Estrutura <strong className="text-foreground">completa</strong></span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          <span>SEO <strong className="text-foreground">otimizado</strong></span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          <span>Publicação <strong className="text-foreground">instantânea</strong></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

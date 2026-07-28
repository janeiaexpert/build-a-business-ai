import { Sparkles, Globe, Zap, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(28, 40%, 55%)" }} />
      
      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in-up">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary tracking-widest uppercase">AI Builder Pro</span>
      </div>

      {/* Heading */}
      <h1 className="relative z-10 font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        O que você quer
        <br />
        <span className="text-gradient-primary italic inline-block pr-4">Criar Hoje?</span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-muted-foreground text-lg md:text-xl max-w-xl mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        Escolha o tipo de projeto e deixe a IA fazer o trabalho pesado.
      </p>

      {/* Features */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="w-4 h-4 text-primary" />
          <span>Estrutura <strong className="text-foreground">completa</strong></span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="w-4 h-4 text-primary" />
          <span>SEO <strong className="text-foreground">otimizado</strong></span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="w-4 h-4 text-primary" />
          <span>Publicação <strong className="text-foreground">instantânea</strong></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

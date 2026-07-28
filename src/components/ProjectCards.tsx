import { Globe, Smartphone, Layout, ArrowRight, Code2 } from "lucide-react";

interface ProjectCardsProps {
  onSelectType: (type: "site" | "app") => void;
}

const ProjectCards = ({ onSelectType }: ProjectCardsProps) => {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 pb-20">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Landing Page Card */}
        <button
          onClick={() => onSelectType("site")}
          className="group text-left rounded-2xl p-8 card-hover glow-border btn-lit cursor-pointer"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
            <Globe className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">Landing Page / Site</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Sites de venda, portfólios, páginas de captura, bio links e muito mais. Estrutura validada para conversão.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Portfólio", "Vendas", "Captura", "Bio Link"].map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full border border-primary/30 text-primary">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary border-t border-border pt-5">
            <Layout className="w-4 h-4" />
            <span className="tracking-wider uppercase text-xs">Site pronto para publicar</span>
            <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>

        {/* App / SaaS Card */}
        <button
          onClick={() => onSelectType("app")}
          className="group text-left rounded-2xl p-8 card-hover glow-border-accent cursor-pointer"
          style={{ background: "var(--gradient-accent-card)" }}
        >
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
            <Smartphone className="w-7 h-7 text-accent" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-heading text-2xl font-bold text-foreground">Aplicativo / SaaS</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-medium">Novo</span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Crie o blueprint de um web app funcional. Especificações técnicas detalhadas para desenvolvedores ou IA.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Calculadoras", "Analisadores", "Geradores", "Ferramentas"].map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full border border-accent/30 text-accent">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-accent border-t border-border pt-5">
            <Code2 className="w-4 h-4" />
            <span className="tracking-wider uppercase text-xs">Planejamento profissional</span>
            <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default ProjectCards;

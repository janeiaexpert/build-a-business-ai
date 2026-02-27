import { useState } from "react";
import { ArrowLeft, Sparkles, Palette, Building2, Zap, Target, ChevronDown, ChevronUp, Users, CreditCard, Wand2, ArrowRight } from "lucide-react";

interface WizardFlowProps {
  projectType: "site" | "app";
  onBack: () => void;
}

const categories = [
  { icon: Palette, title: "Criadores & Marketing", desc: "Ferramentas para conteúdo, redes sociais e copy." },
  { icon: Building2, title: "Negócios & Finanças", desc: "Calculadoras, orçamentos e ferramentas corporativas." },
  { icon: Zap, title: "Produtividade & Utils", desc: "Automação, resumos e organização." },
  { icon: Target, title: "Estratégia & Análise", desc: "Pesquisa, SEO e validação de ideias." },
  { icon: Sparkles, title: "Não encontrei, vou digitar", desc: "Descreva exatamente o que você precisa." },
];

const objectives = ["Vender", "Captar leads", "Monetizar por assinatura", "Validar ideia"];
const monetizations = ["Gratuito", "Assinatura", "Pagamento único", "Ads"];

const TOTAL_STEPS = 5;

const WizardFlow = ({ projectType, onBack }: WizardFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const [audience, setAudience] = useState("");
  const [selectedMonetization, setSelectedMonetization] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const progress = (step / TOTAL_STEPS) * 100;

  const canAdvance = () => {
    switch (step) {
      case 1: return selectedCategory !== null;
      case 2: return selectedObjective !== null;
      case 3: return audience.trim().length > 0;
      case 4: return selectedMonetization !== null;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 max-w-2xl mx-auto w-full">
        <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="uppercase tracking-wider text-xs font-medium">Voltar</span>
        </button>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-muted overflow-hidden mb-6">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "var(--gradient-cta)" }} />
        </div>

        <p className="text-xs text-muted-foreground text-center mb-2">{step} DE {TOTAL_STEPS}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 max-w-2xl mx-auto w-full pb-32">
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">O que vamos construir?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Escolha uma categoria para ver as opções</p>
            <div className="space-y-3">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedCategory(i); setExpandedCategory(expandedCategory === i ? null : i); }}
                  className={`w-full text-left rounded-xl p-4 flex items-center gap-4 transition-all border ${selectedCategory === i ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <cat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{cat.title}</p>
                    <p className="text-xs text-muted-foreground">{cat.desc}</p>
                  </div>
                  {expandedCategory === i ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">Qual o objetivo?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Escolha o que deseja alcançar</p>
            <div className="grid grid-cols-2 gap-3">
              {objectives.map((obj) => (
                <button
                  key={obj}
                  onClick={() => setSelectedObjective(obj)}
                  className={`rounded-xl p-5 text-left border transition-all ${selectedObjective === obj ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
                >
                  <p className="font-semibold text-sm text-foreground">{obj}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">Quem é seu público?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Descreva para quem é o projeto</p>
            <textarea
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Ex: Empreendedores digitais que querem criar landing pages..."
              className="w-full min-h-[160px] rounded-xl border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">Como vai monetizar?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Escolha o modelo de receita</p>
            <div className="grid grid-cols-2 gap-3">
              {monetizations.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonetization(m)}
                  className={`rounded-xl p-5 text-left border transition-all flex items-center gap-3 ${selectedMonetization === m ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
                >
                  <CreditCard className="w-4 h-4 text-primary" />
                  <p className="font-semibold text-sm text-foreground">{m}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in-up text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Wand2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">Tudo pronto!</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
              A IA vai criar a estrutura completa do seu projeto: páginas, backend, SEO e copy otimizada.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95 text-primary-foreground" style={{ background: "var(--gradient-cta)" }}>
              <Sparkles className="w-5 h-5" />
              IA RECOMENDA E CRIA
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {step < 5 && (
        <div className="fixed bottom-0 inset-x-0 p-4 glass border-t border-border">
          <div className="max-w-2xl mx-auto">
            <button
              disabled={!canAdvance()}
              onClick={() => setStep(step + 1)}
              className="w-full py-4 rounded-xl font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] text-primary-foreground flex items-center justify-center gap-2"
              style={{ background: canAdvance() ? "var(--gradient-cta)" : undefined }}
            >
              Continuar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WizardFlow;

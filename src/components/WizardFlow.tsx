import { useState, useMemo } from "react";
import { ArrowLeft, Sparkles, Palette, Building2, Zap, Target, ChevronDown, ChevronUp, CreditCard, Wand2, ArrowRight, Copy, Check, FileText } from "lucide-react";

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
  const [customDescription, setCustomDescription] = useState("");
  const [copied, setCopied] = useState(false);

  const progress = (step / TOTAL_STEPS) * 100;

  const canAdvance = () => {
    switch (step) {
      case 1:
        if (selectedCategory === 4) return customDescription.trim().length > 0;
        return selectedCategory !== null;
      case 2: return selectedObjective !== null;
      case 3: return audience.trim().length > 0;
      case 4: return selectedMonetization !== null;
      default: return true;
    }
  };

  const generatedPRD = useMemo(() => {
    if (step !== 5) return "";

    const tipo = projectType === "site" ? "Landing Page / Site" : "Aplicativo / SaaS";
    const categoria = selectedCategory !== null && selectedCategory < 4
      ? categories[selectedCategory].title
      : customDescription || "Personalizado";

    const monetizationStrategy = (() => {
      switch (selectedMonetization) {
        case "Gratuito": return "Modelo gratuito. Foco em crescimento de base e engajamento. Monetização futura via upsell ou ads.";
        case "Assinatura": return "Modelo de assinatura recorrente (mensal/anual). Implementar trial gratuito, paywall e gestão de planos via Stripe ou gateway de pagamento.";
        case "Pagamento único": return "Modelo de pagamento único. Checkout simplificado, entrega imediata do produto/acesso.";
        case "Ads": return "Modelo baseado em publicidade. Implementar espaços para banners, intersticiais ou conteúdo patrocinado.";
        default: return "";
      }
    })();

    const objectiveStrategy = (() => {
      switch (selectedObjective) {
        case "Vender": return "Foco em conversão de vendas. Páginas otimizadas com CTA forte, prova social, FAQ, garantia e checkout rápido.";
        case "Captar leads": return "Foco em captura de leads. Formulários otimizados, lead magnets, pop-ups de saída e integração com email marketing.";
        case "Monetizar por assinatura": return "Foco em retenção e LTV. Onboarding guiado, área de membros, conteúdo exclusivo e gestão de assinaturas.";
        case "Validar ideia": return "Foco em validação rápida. MVP enxuto, landing page de teste, formulário de interesse e métricas de engajamento.";
        default: return "";
      }
    })();

    const pages = projectType === "site"
      ? `
## 📄 Páginas do Site

1. **Home** — Hero com proposta de valor, CTA principal, benefícios, prova social
2. **Sobre** — História, missão, equipe (se aplicável)
3. **Contato** — Formulário de contato com validação
4. **Blog** — Sistema de posts para SEO programático
5. **Política de Privacidade** — Página legal obrigatória
6. **Termos de Uso** — Página legal obrigatória`
      : `
## 📄 Estrutura do Aplicativo

1. **Dashboard** — Visão geral com métricas e ações rápidas
2. **Funcionalidade Principal** — Core feature baseada na categoria "${categoria}"
3. **Configurações** — Perfil do usuário e preferências
4. **Histórico / Resultados** — Registro de uso e outputs gerados
5. **Onboarding** — Fluxo guiado de primeiro uso`;

    const dbSchema = `
## 🗄️ Estrutura do Banco de Dados

\`\`\`sql
-- Tabela de projetos
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL, -- '${projectType}'
  category TEXT NOT NULL, -- '${categoria}'
  objective TEXT, -- '${selectedObjective}'
  audience TEXT,
  monetization TEXT, -- '${selectedMonetization}'
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de páginas
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  content JSONB DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de assinaturas
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  gateway_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
\`\`\``;

    return `# 📋 PRD — ${tipo}

---

## 🎯 Resumo do Projeto

| Campo | Valor |
|-------|-------|
| **Tipo** | ${tipo} |
| **Categoria** | ${categoria} |
| **Objetivo** | ${selectedObjective} |
| **Público-alvo** | ${audience} |
| **Monetização** | ${selectedMonetization} |

---

## 🧭 Estratégia de Objetivo

${objectiveStrategy}

---

## 💰 Estratégia de Monetização

${monetizationStrategy}

---
${pages}

---
${dbSchema}

---

## 🔍 SEO

- **Meta title**: Dinâmico por página, max 60 caracteres
- **Meta description**: Otimizada por página, max 160 caracteres
- **Heading structure**: H1 único por página
- **URLs amigáveis**: Slugs descritivos
- **Open Graph & Twitter Cards**: Configurados automaticamente
- **Schema JSON-LD**: Implementado para tipo de conteúdo
- **Sitemap XML**: Gerado automaticamente
- **Robots.txt**: Configurado para indexação

---

## 🔐 Segurança

- Row Level Security (RLS) em todas as tabelas
- Autenticação via email + senha
- Rate limiting nas APIs
- Validação de inputs no frontend e backend
- HTTPS obrigatório

---

## 📱 Responsividade

- Mobile-first design
- Breakpoints: 640px, 768px, 1024px, 1280px
- Lazy loading de imagens
- Core Web Vitals otimizado

---

## 🛠️ Stack Técnica

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **Deploy**: Domínio personalizado ou subdomínio automático

---

> **Prompt para IA criar este projeto:**
>
> Crie um ${tipo.toLowerCase()} na categoria "${categoria}" com objetivo de "${selectedObjective?.toLowerCase()}". O público-alvo é: "${audience}". O modelo de monetização será "${selectedMonetization?.toLowerCase()}". Implemente todas as páginas listadas no PRD, com SEO otimizado, banco de dados estruturado, autenticação de usuários e design responsivo premium em modo escuro.
`;
  }, [step, projectType, selectedCategory, selectedObjective, audience, selectedMonetization, customDescription]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPRD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 pb-4 max-w-2xl mx-auto w-full">
        <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="uppercase tracking-wider text-xs font-medium">Voltar</span>
        </button>

        <div className="h-1 rounded-full bg-muted overflow-hidden mb-6">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "var(--gradient-cta)" }} />
        </div>

        <p className="text-xs text-muted-foreground text-center mb-2">{step} DE {TOTAL_STEPS}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 max-w-2xl mx-auto w-full pb-32">
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
            {selectedCategory === 4 && (
              <textarea
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Descreva exatamente o que você precisa criar..."
                className="w-full min-h-[80px] sm:min-h-[100px] rounded-xl border border-border bg-card p-3 sm:p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none mt-4"
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">Qual o objetivo?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Escolha o que deseja alcançar</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {objectives.map((obj) => (
                <button
                  key={obj}
                  onClick={() => setSelectedObjective(obj)}
                  className={`rounded-xl p-4 sm:p-5 text-left border transition-all ${selectedObjective === obj ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
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
              className="w-full min-h-[120px] sm:min-h-[160px] rounded-xl border border-border bg-card p-3 sm:p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">Como vai monetizar?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Escolha o modelo de receita</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {monetizations.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonetization(m)}
                  className={`rounded-xl p-4 sm:p-5 text-left border transition-all flex items-center gap-3 ${selectedMonetization === m ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
                >
                  <CreditCard className="w-4 h-4 text-primary" />
                  <p className="font-semibold text-sm text-foreground">{m}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold">PRD Gerado</h2>
                <p className="text-muted-foreground text-xs">Copie e use para criar seu projeto</p>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="w-full mb-4 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] text-primary-foreground flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-cta)" }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar PRD completo"}
            </button>

            {/* PRD Preview */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5 overflow-auto max-h-[50vh] sm:max-h-[60vh]">
              <pre className="whitespace-pre-wrap text-xs text-foreground/90 font-mono leading-relaxed">{generatedPRD}</pre>
            </div>

            {/* New project button */}
            <button
              onClick={onBack}
              className="w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all border border-border bg-card hover:bg-muted text-foreground flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Criar outro projeto
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {step < 5 && (
        <div className="fixed bottom-0 inset-x-0 p-3 sm:p-4 glass border-t border-border">
          <div className="max-w-2xl mx-auto">
            <button
              disabled={!canAdvance()}
              onClick={() => setStep(step + 1)}
              className="w-full py-3 sm:py-4 rounded-xl font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] text-primary-foreground flex items-center justify-center gap-2"
              style={{ background: canAdvance() ? "var(--gradient-cta)" : undefined }}
            >
              {step === 4 ? "Gerar PRD" : "Continuar"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WizardFlow;

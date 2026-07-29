import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, Copy, Check, FileText, Globe, Layout, ShoppingCart, Camera, Link2, Sparkles } from "lucide-react";

interface SiteWizardProps {
  onBack: () => void;
}

const siteTypes = [
  { icon: Layout, title: "Landing Page", desc: "Página única de vendas ou captação de leads." },
  { icon: Globe, title: "Site Institucional", desc: "Presença online completa para sua empresa." },
  { icon: ShoppingCart, title: "Loja Virtual", desc: "E-commerce com catálogo, carrinho e pagamento." },
  { icon: Camera, title: "Portfólio", desc: "Mostre seus trabalhos e conquistas." },
  { icon: Link2, title: "Bio Link", desc: "Página com todos os seus links em um só lugar." },
  { icon: Sparkles, title: "Outro tipo de site", desc: "Descreva o que precisa e criamos pra você." },
];

const objectives = ["Vender um produto/serviço", "Captar leads", "Mostrar meu trabalho", "Divulgar conteúdo"];
const features = ["Blog/Posts", "Formulário de contato", "Galeria de imagens", "Integração com WhatsApp", "SEO otimizado", "Chat ao vivo"];

const TOTAL_STEPS = 5;

const SiteWizard = ({ onBack }: SiteWizardProps) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [customType, setCustomType] = useState("");
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const progress = (step / TOTAL_STEPS) * 100;

  const toggleFeature = (f: string) => {
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const canAdvance = () => {
    switch (step) {
      case 1: return selectedType !== null;
      case 2: return selectedObjective !== null;
      case 3: return businessName.trim().length > 0;
      case 4: return selectedFeatures.length > 0;
      default: return true;
    }
  };

  const generatedPRD = useMemo(() => {
    if (step !== 5) return "";

    const tipoSite = selectedType !== null ? siteTypes[selectedType].title : customType;

    const objectiveStrategy = (() => {
      switch (selectedObjective) {
        case "Vender um produto/serviço": return "Foco em conversão. Hero com proposta de valor clara, CTA principal em destaque, prova social (depoimentos, notas), seção de benefícios, FAQ, garantia e checkout rápido. Design que gera confiança e urgência.";
        case "Captar leads": return "Foco em captação. Formulários otimizados com poucos campos, lead magnets (ebook, checklist, template), pop-ups de saída, prova social, depoimentos e integração com email marketing (Mailchimp, RD Station).";
        case "Mostrar meu trabalho": return "Foco em impacto visual. Grid de projetos com imagens de alta qualidade, descrição de cada trabalho, métricas de resultado, depoimentos de clientes e CTA para contato direto.";
        case "Divulgar conteúdo": return "Foco em SEO e engajamento. Blog com categorias, busca interna, posts relacionados, compartilhamento social, newsletter e CTA para转化ão em cada artigo.";
        default: return "";
      }
    })();

    const pages = (() => {
      switch (selectedType) {
        case 0: // Landing Page
          return `1. **Hero** — Headline principal, sub-headline, CTA em destaque, imagem/vídeo de apoio
2. **Benefícios** — 3-4 benefícios com ícones e descrição curta
3. **Como funciona** — Passo a passo simplificado (3 etapas)
4. **Prova social** — Depoimentos, logos de clientes, notas
5. **FAQ** — Perguntas frequentes que eliminam objeções
6. **Rodapé** — Links úteis, contato, redes sociais`;
        case 1: // Site Institucional
          return `1. **Home** — Hero com proposta de valor, serviços, sobre, CTA
2. **Sobre** — História, missão, valores, equipe
3. **Serviços** — Lista detalhada com descrição e preços
4. **Portfólio/Cases** — Projetos realizados com resultados
5. **Blog** — Conteúdo para SEO programático
6. **Contato** — Formulário, mapa, WhatsApp, telefone
7. **Política de Privacidade** — Legal obrigatório`;
        case 2: // Loja Virtual
          return `1. **Home** — Hero com ofertas, categorias em destaque, mais vendidos
2. **Catálogo** — Filtros, busca, ordenação, grid de produtos
3. **Página do Produto** — Imagens, descrição, preço, variações, avaliações
4. **Carrinho** — Resumo, frete, cupom, checkout
5. **Checkout** — Dados pessoais, pagamento (Stripe/Pix), confirmação
6. **Minha Conta** — Pedidos, favoritos, dados pessoais
7. **Política de Troca** — Termos e condições`;
        case 3: // Portfólio
          return `1. **Home** — Apresentação pessoal, destaque dos melhores trabalhos
2. **Projetos** — Grid/masonry com filtros por categoria
3. **Detalhe do Projeto** — Imagens, descrição do processo, resultados
4. **Sobre mim** — Bio, experiência, habilidades, ferramentas
5. **Depoimentos** — Feedback de clientes
6. **Contato** — Formulário e links diretos`;
        case 4: // Bio Link
          return `1. **Perfil** — Foto, nome, bio curta
2. **Links** — Lista de links com ícones e descrição
3. **Redes Sociais** — Ícones clicáveis para cada rede
4. **Destaque** — Link principal em destaque (promoção, conteúdo)`;
        default:
          return `1. **Home** — Página principal com proposta de valor
2. **Conteúdo** — Seções dinâmicas baseadas na descrição
3. **Contato** — Formulário e informações de contato`;
      }
    })();

    const featuresList = selectedFeatures.map(f => `- ${f}`).join("\n");

    return `# 📋 PRD — Site: ${tipoSite}

---

## 🎯 Resumo do Projeto

| Campo | Valor |
|-------|-------|
| **Tipo** | ${tipoSite} |
| **Nome/Negócio** | ${businessName} |
| **Objetivo** | ${selectedObjective} |

---

## 🧭 Estratégia

${objectiveStrategy}

---

## 📄 Páginas do Site

${pages}

---

## ✅ Funcionalidades Selecionadas

${featuresList}

---

## 🔍 SEO

- **Meta title**: Dinâmico por página, max 60 caracteres
- **Meta description**: Otimizada por página, max 160 caracteres
- **Heading structure**: H1 único por página
- **URLs amigáveis**: Slugs descritivos
- **Open Graph & Twitter Cards**: Configurados
- **Schema JSON-LD**: Implementado
- **Sitemap XML**: Gerado automaticamente

---

## 📱 Responsividade

- Mobile-first design
- Breakpoints: 640px, 768px, 1024px, 1280px
- Lazy loading de imagens
- Core Web Vitals otimizado

---

## 🛠️ Stack Técnica

- **Frontend**: React + TypeScript + Tailwind CSS
- **CMS**: Sanity / Strapi (para blog) ou conteúdo estático
- **Deploy**: Vercel / Netlify com domínio personalizado

---

## 🎨 Design

- Paleta de cores alinhada com a identidade visual da marca
- Tipografia limpa e legível
- Espaçamento consistente
- Botões com hover states e micro-animações
- Cards e seções com bordas suaves e sombras sutis

---

> **Prompt para IA criar este projeto:**
>
> Crie um ${tipoSite.toLowerCase()} para o negócio "${businessName}" com objetivo de "${selectedObjective?.toLowerCase()}". Implemente todas as páginas listadas acima com design responsivo premium, SEO otimizado e as funcionalidades: ${selectedFeatures.join(", ")}.`;
  }, [step, selectedType, customType, selectedObjective, businessName, selectedFeatures]);

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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Que tipo de site você quer?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Escolha o modelo ideal para seu projeto</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteTypes.map((type, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedType(i)}
                  className={`text-left rounded-xl p-4 sm:p-5 border transition-all ${selectedType === i ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3">
                    <type.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold text-sm text-foreground mb-1">{type.title}</p>
                  <p className="text-xs text-muted-foreground">{type.desc}</p>
                </button>
              ))}
            </div>
            {selectedType === 5 && (
              <textarea
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                placeholder="Descreva o tipo de site que você precisa..."
                className="w-full min-h-[80px] sm:min-h-[100px] rounded-xl border border-border bg-card p-3 sm:p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none mt-4"
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Qual o objetivo?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">O que você quer alcançar com este site?</p>
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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Nome do seu negócio</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Como se chama sua marca, empresa ou projeto?</p>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Ex: Minha Empresa, Studio Design..."
              className="w-full rounded-xl border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Funcionalidades</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Quais recursos você precisa no site?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFeature(f)}
                  className={`rounded-xl p-4 text-left border transition-all flex items-center gap-3 ${selectedFeatures.includes(f) ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${selectedFeatures.includes(f) ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                    {selectedFeatures.includes(f) && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <p className="font-medium text-sm text-foreground">{f}</p>
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
                <h2 className="font-heading text-xl sm:text-2xl font-bold">PRD do Site</h2>
                <p className="text-muted-foreground text-xs">Copie e use para criar seu site</p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="w-full mb-4 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] text-primary-foreground flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-cta)" }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar PRD completo"}
            </button>

            <div className="rounded-xl border border-border bg-card p-4 sm:p-5 overflow-auto max-h-[50vh] sm:max-h-[60vh]">
              <pre className="whitespace-pre-wrap text-xs text-foreground/90 font-mono leading-relaxed">{generatedPRD}</pre>
            </div>

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
              {step === 4 ? "Gerar PRD do Site" : "Continuar"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteWizard;

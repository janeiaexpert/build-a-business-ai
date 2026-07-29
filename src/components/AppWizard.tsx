import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, Copy, Check, FileText, Calculator, BarChart3, Wand2, Wrench, LayoutDashboard, Sparkles } from "lucide-react";
import DesignSystemPicker, { type DesignSystem } from "./DesignSystemPicker";

interface AppWizardProps {
  onBack: () => void;
}

const appTypes = [
  { icon: Calculator, title: "Calculadora", desc: "Ferramentas de cálculo personalizadas." },
  { icon: BarChart3, title: "Analisador", desc: "Análise de dados, relatórios e insights." },
  { icon: Wand2, title: "Gerador", desc: "Gere conteúdo, imagens, documentos." },
  { icon: Wrench, title: "Ferramenta", desc: "Utilitários que resolvem problemas específicos." },
  { icon: LayoutDashboard, title: "Dashboard", desc: "Painel com métricas e gráficos." },
  { icon: Sparkles, title: "Outro tipo de app", desc: "Descreva exatamente o que precisa." },
];

const monetizations = ["Gratuito (foco em usuários)", "Assinatura (mensal/anual)", "Pagamento único", "Freemium (base grátis + premium)"];
const platforms = ["Web App (navegador)", "Mobile responsivo", "PWA (funciona offline)"];

const TOTAL_STEPS = 7;

const AppWizard = ({ onBack }: AppWizardProps) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [customType, setCustomType] = useState("");
  const [appName, setAppName] = useState("");
  const [selectedMonetization, setSelectedMonetization] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean | null>(null);
  const [designSystem, setDesignSystem] = useState<DesignSystem>({ palette: "", typography: "", style: "" });
  const [copied, setCopied] = useState(false);

  const progress = (step / TOTAL_STEPS) * 100;

  const canAdvance = () => {
    switch (step) {
      case 1: return selectedType !== null;
      case 2: return appName.trim().length > 0;
      case 3: return selectedMonetization !== null;
      case 4: return selectedPlatform !== null;
      case 5: return needsAuth !== null;
      case 6: return designSystem.palette !== "" && designSystem.typography !== "" && designSystem.style !== "";
      default: return true;
    }
  };

  const generatedPRD = useMemo(() => {
    if (step !== 7) return "";

    const tipoApp = selectedType !== null ? appTypes[selectedType].title : customType;

    const monetizationStrategy = (() => {
      switch (selectedMonetization) {
        case "Gratuito (foco em usuários)": return "Modelo 100% gratuito. Foco em viralizar e crescimento orgânico. Monetização futura via upsell, ads ou parcerias. Métricas: usuários ativos, retenção, NPS.";
        case "Assinatura (mensal/anual)": return "Modelo SaaS com planos. Implementar: trial gratuito de 14 dias, paywall inteligente, gestão de planos via Stripe, billing portal, dunning para pagamentos falhos.";
        case "Pagamento único": return "Modelo de compra única. Checkout com Stripe/Pix, entrega imediata do acesso, licença por dispositivo, atualizações gratuitas por tempo limitado.";
        case "Freemium (base grátis + premium)": return "Modelo freemium. Funcionalidades básicas gratuitas, premium com recursos avançados. Implementar: upgrade flow, feature gates, usage limits no plano grátis.";
        default: return "";
      }
    })();

    const features = (() => {
      switch (selectedType) {
        case 0:
          return `1. **Input de dados** — Campos de entrada com validação em tempo real
2. **Engine de cálculo** — Lógica de negócio com fórmulas configuráveis
3. **Resultado** — Exibição formatada com destaque para o resultado principal
4. **Histórico** — Registros de cálculos anteriores do usuário
5. **Compartilhar** — Exportar resultado como imagem ou PDF`;
        case 1:
          return `1. **Upload/Input** — Envio de dados (CSV, texto, URL)
2. **Processamento** — Análise automática dos dados
3. **Dashboard de resultados** — Gráficos, tabelas e métricas
4. **Relatórios** — PDF ou shareável com insights
5. **Comparativos** — Evolução ao longo do tempo`;
        case 2:
          return `1. **Formulário de entrada** — Parâmetros e opções de geração
2. **Engine de geração** — IA ou templates para produzir conteúdo
3. **Preview** — Visualização do resultado antes de salvar
4. **Editor** — Edição manual do conteúdo gerado
5. **Exportação** — Copiar, baixar (PDF, TXT, DOCX)`;
        case 3:
          return `1. **Interface principal** — Tool central com todos os controles
2. **Processamento** — Lógica da ferramenta
3. **Resultados** — Output formatado e accionável
4. **Favoritos** — Salvar configurações ou resultados frequentes
5. **Ajuda** — Instruções de uso integradas`;
        case 4:
          return `1. **Visão geral** — KPIs principais em cards
2. **Gráficos** — Evolução de métricas ao longo do tempo
3. **Tabelas** — Dados detalhados com filtros e ordenação
4. **Filtros** — Período, categoria, segmento
5. **Exportação** — Download dos dados em CSV/Excel`;
        default:
          return `1. **Tela principal** — Interface central do app
2. **Funcionalidade core** — Feature principal descrita
3. **Configurações** — Preferências do usuário
4. **Resultados** — Outputs e histórico`;
      }
    })();

    const dbSchema = needsAuth ? `
## 🗄️ Estrutura do Banco de Dados

\`\`\`sql
-- Tabela de projetos/dados do usuário
CREATE TABLE user_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de resultados/saídas
CREATE TABLE outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  result JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE outputs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own data" ON user_data
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own outputs" ON outputs
  FOR ALL USING (auth.uid() = user_id);
\`\`\`` : "";

    return `# 📋 PRD — App: ${tipoApp}

---

## 🎯 Resumo do Projeto

| Campo | Valor |
|-------|-------|
| **Tipo** | ${tipoApp} |
| **Nome do App** | ${appName} |
| **Monetização** | ${selectedMonetization} |
| **Plataforma** | ${selectedPlatform} |
| **Autenticação** | ${needsAuth ? "Sim" : "Não"} |

---

## 💰 Estratégia de Monetização

${monetizationStrategy}

---

## 📱 Funcionalidades Principais

${features}

---

## 🎨 Design System

### Paleta de Cores: ${designSystem.palette}

${designSystem.palette === "Personalizado" ? `| Elemento | Cor |
|----------|-----|
| **Cor primária** | ${designSystem.customPrimary} |
| **Cor secundária** | ${designSystem.customSecondary} |
| **Cor de fundo** | Gerada automaticamente |
| **Texto principal** | Gerado automaticamente |
| **Texto suave** | Gerado automaticamente |` : `| Elemento | Uso |
|----------|-----|
| **Cor primária** | Botões, links, destaques |
| **Cor secundária** | Fundos, badges, ícones |
| **Cor de fundo** | Background geral |
| **Texto principal** | Títulos e parágrafos |
| **Texto suave** | Descrições, placeholders |`}

### Tipografia: ${designSystem.typography}

- **Títulos**: Fonte display com peso bold, escala modular (1.25x)
- **Corpo**: Fonte legível para leitura longa, peso regular 400-500
- **Tamanhos**: H1 (2.5rem), H2 (2rem), H3 (1.5rem), Body (1rem), Small (0.875rem)

### Estilo Visual: ${designSystem.style}

- **Espaçamento**: Sistema de 8px base (8, 16, 24, 32, 48, 64)
- **Border radius**: ${designSystem.style === "Apple" ? "0-12px (sutil)" : designSystem.style === "Airbnb" ? "8-16px (generoso)" : designSystem.style === "Stripe" ? "8-12px com glassmorphism" : designSystem.style === "Coca-Cola" ? "0-4px (mínimo)" : designSystem.style === "Spotify" ? "8-12px (cards arredondados)" : "8px (consistente)"}
- **Sombras**: ${designSystem.style === "Apple" ? "Muito sutis, quase invisíveis" : designSystem.style === "Stripe" ? "Gradientes com blur" : "Leves e naturais"}
- **Animações**: Transições suaves 200-300ms, hover states em todos os elementos interativos

---

## 🏗️ Arquitetura

### Frontend
- **Framework**: React + TypeScript
- **Estilo**: Tailwind CSS
- **State**: React Context + hooks
- **Routing**: React Router v6

### Backend
- **API**: Supabase (PostgreSQL + Edge Functions)
- **Auth**: ${needsAuth ? "Supabase Auth (email + senha + Google OAuth)" : "Não necessário"}
- **Storage**: Supabase Storage (se precisar de uploads)
- **Deploy**: Vercel

---

## 📊 Fluxo do Usuário

1. **Acesso** — Usuário abre o app${needsAuth ? " e faz login" : ""}
2. **Entrada** — Fornece os dados necessários
3. **Processamento** — App processa e gera resultado
4. **Resultado** — Exibe output formatado
5. **Ação** — Usuário pode salvar, copiar ou compartilhar

---

## 🔒 Segurança

${needsAuth ? `- Autenticação via email + senha
- Row Level Security (RLS) em todas as tabelas
- Sessões com refresh token automático
- Rate limiting nas Edge Functions` : `- Sem dados sensíveis armazenados
- Rate limiting básico nas APIs`}

---

## 📱 Responsividade

- Mobile-first design
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly (botões mín. 44px)
- Performance otimizada (Core Web Vitals)

---

## 🛠️ Stack Técnica

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Deploy**: Vercel com domínio personalizado

---

## 📈 Métricas de Sucesso

- **Usabilidade**: Tempo para completar tarefa principal < 30s
- **Performance**: LCP < 2.5s, FID < 100ms
- **Retenção**: ${selectedMonetization?.includes("Gratuito") ? "Dau/Mau ratio > 20%" : "Trial to paid conversion > 5%"}

---

> **Prompt para IA criar este projeto:**
>
> Crie um ${tipoApp.toLowerCase()} chamado "${appName}". O modelo de monetização é "${selectedMonetization?.toLowerCase()}" e a plataforma é "${selectedPlatform?.toLowerCase()}". Use o estilo visual "${designSystem.style}" com paleta de cores "${designSystem.palette}" e tipografia "${designSystem.typography}". ${needsAuth ? "Implemente autenticação de usuários." : "Não precisa de login."} Crie todas as funcionalidades listadas acima com design responsivo premium, banco de dados estruturado e deploy pronto.`;
  }, [step, selectedType, customType, appName, selectedMonetization, selectedPlatform, needsAuth, designSystem]);

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
      <div className="flex-1 px-4 sm:px-6 max-w-2xl mx-auto w-full">
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Que tipo de app você quer?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Escolha o tipo de ferramenta que vai criar</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {appTypes.map((type, i) => (
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
                placeholder="Descreva o tipo de app que você precisa..."
                className="w-full min-h-[80px] sm:min-h-[100px] rounded-xl border border-border bg-card p-3 sm:p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none mt-4"
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Nome do app</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Como vai se chamar sua ferramenta?</p>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="Ex: Calculadora Financeira, Gerador de Leads..."
              className="w-full rounded-xl border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Como vai monetizar?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Escolha o modelo de receita</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {monetizations.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonetization(m)}
                  className={`rounded-xl p-4 sm:p-5 text-left border transition-all ${selectedMonetization === m ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
                >
                  <p className="font-semibold text-sm text-foreground">{m}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Plataforma</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Onde o app vai rodar?</p>
            <div className="grid grid-cols-1 gap-3">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`rounded-xl p-4 sm:p-5 text-left border transition-all ${selectedPlatform === p ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
                >
                  <p className="font-semibold text-sm text-foreground">{p}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Precisa de login?</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">O app precisa que os usuários criem conta?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setNeedsAuth(true)}
                className={`rounded-xl p-5 sm:p-6 text-center border transition-all ${needsAuth === true ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
              >
                <p className="font-semibold text-sm text-foreground mb-1">Sim, precisa de login</p>
                <p className="text-xs text-muted-foreground">Usuários criam conta e salvam dados</p>
              </button>
              <button
                onClick={() => setNeedsAuth(false)}
                className={`rounded-xl p-5 sm:p-6 text-center border transition-all ${needsAuth === false ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
              >
                <p className="font-semibold text-sm text-foreground mb-1">Não precisa</p>
                <p className="text-xs text-muted-foreground">App aberto, sem cadastro</p>
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Design System</h2>
            <p className="text-muted-foreground text-center text-sm mb-6">Escolha as cores, fontes e estilo visual</p>
            <DesignSystemPicker selected={designSystem} onChange={setDesignSystem} />
          </div>
        )}

        {step === 7 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold">PRD do App</h2>
                <p className="text-muted-foreground text-xs">Copie e use para criar seu app</p>
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
      {step < 7 && (
        <div className="px-4 sm:px-6 py-4 max-w-2xl mx-auto w-full">
          <button
            disabled={!canAdvance()}
            onClick={() => setStep(step + 1)}
            className="w-full py-3 sm:py-4 rounded-xl font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] text-primary-foreground flex items-center justify-center gap-2"
            style={{ background: canAdvance() ? "var(--gradient-cta)" : undefined }}
          >
            {step === 6 ? "Gerar PRD do App" : "Continuar"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AppWizard;

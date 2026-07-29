import { useState } from "react";
import { Check, Palette } from "lucide-react";

export interface DesignSystem {
  palette: string;
  typography: string;
  style: string;
  customPrimary?: string;
  customSecondary?: string;
}

interface DesignSystemPickerProps {
  selected: DesignSystem;
  onChange: (ds: DesignSystem) => void;
}

const palettes = [
  { name: "Clássico", colors: ["#1a1a2e", "#e2e8f0", "#f8fafc", "#0f172a", "#334155"], desc: "Preto, branco e cinza" },
  { name: "Dourado Luxury", colors: ["#1a1a1a", "#c9a84c", "#f5f0e8", "#2d2d2d", "#8b7332"], desc: "Preto com dourado" },
  { name: "Oceano", colors: ["#0ea5e9", "#0284c7", "#e0f2fe", "#0c4a6e", "#7dd3fc"], desc: "Azuis profundos" },
  { name: "Floresta", colors: ["#16a34a", "#15803d", "#f0fdf4", "#14532d", "#86efac"], desc: "Verdes naturais" },
  { name: "Sunset", colors: ["#f97316", "#ea580c", "#fff7ed", "#7c2d12", "#fdba74"], desc: "Laranjas quentes" },
  { name: "Rose", colors: ["#ec4899", "#db2777", "#fdf2f8", "#831843", "#f9a8d4"], desc: "Rosa elegante" },
  { name: "Lavanda", colors: ["#8b5cf6", "#7c3aed", "#f5f3ff", "#4c1d95", "#c4b5fd"], desc: "Roxos sofisticados" },
  { name: "Coca-Cola", colors: ["#d32f2f", "#b71c1c", "#ffebee", "#1a1a1a", "#ef9a9a"], desc: "Vermelho icônico" },
];

const typographies = [
  { name: "Moderna", heading: "Inter", body: "Inter", style: "sans-serif limpo", preview: "Aa" },
  { name: "Elegante", heading: "Playfair Display", body: "Lato", style: "serif + sans", preview: "Aa" },
  { name: "Técnica", heading: "Space Grotesk", body: "DM Sans", style: "geometrica", preview: "Aa" },
  { name: "Humanista", heading: "Fraunces", body: "Inter", style: "serif orgânico", preview: "Aa" },
  { name: "Minimalista", heading: "Outfit", body: "Outfit", style: "monofamília", preview: "Aa" },
  { name: "Editorial", heading: "Cormorant Garamond", body: "Raleway", style: "clássico refinado", preview: "Aa" },
];

const styles = [
  {
    name: "Apple",
    desc: "Minimalista, espaço negativo, tipografia grande, fundo limpo",
    tags: ["Clean", "Espaço", "Premium"],
    colors: ["#fafafa", "#1d1d1f", "#0071e3"],
  },
  {
    name: "Airbnb",
    desc: "Quente, acolhedor, fotos grandes, bordas arredondadas",
    tags: ["Quente", "Fotos", "Acolhedor"],
    colors: ["#ff5a5f", "#ffffff", "#484848"],
  },
  {
    name: "Stripe",
    desc: "Gradientes vibrantes, cards flutuantes, animações suaves",
    tags: ["Gradiente", "Moderno", "Tech"],
    colors: ["#635bff", "#0a2540", "#00d4aa"],
  },
  {
    name: "Notion",
    desc: "Tipografia como elemento visual, listas, blocos modulares",
    tags: ["Tipografia", "Modular", "Funcional"],
    colors: ["#ffffff", "#37352f", "#2eaadc"],
  },
  {
    name: "Coca-Cola",
    desc: "Cores fortes, alto contraste, energia e impacto visual",
    tags: ["Bold", "Contraste", "Energia"],
    colors: ["#d32f2f", "#ffffff", "#1a1a1a"],
  },
  {
    name: "Spotify",
    desc: "Escuro com cores vibrantes, cards arredondados, playlists",
    tags: ["Dark", "Vibrante", "Cards"],
    colors: ["#191414", "#1db954", "#ffffff"],
  },
];

const DesignSystemPicker = ({ selected, onChange }: DesignSystemPickerProps) => {
  const [showCustom, setShowCustom] = useState(false);

  const handleCustomColorChange = (type: "primary" | "secondary", color: string) => {
    if (type === "primary") {
      onChange({ ...selected, palette: "Personalizado", customPrimary: color });
    } else {
      onChange({ ...selected, palette: "Personalizado", customSecondary: color });
    }
  };

  const customPrimary = selected.customPrimary || "#c9a84c";
  const customSecondary = selected.customSecondary || "#1a1a1a";
  const isCustomSelected = selected.palette === "Personalizado";

  return (
    <div className="space-y-8">
      {/* Palettes */}
      <div>
        <h3 className="font-heading text-lg font-bold mb-1 text-foreground">Paleta de Cores</h3>
        <p className="text-xs text-muted-foreground mb-4">Escolha o esquema de cores do seu projeto</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {palettes.map((p) => (
            <button
              key={p.name}
              onClick={() => { onChange({ ...selected, palette: p.name }); setShowCustom(false); }}
              className={`rounded-xl p-3 border transition-all text-left ${selected.palette === p.name && !isCustomSelected ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
            >
              <div className="flex gap-1 mb-2">
                {p.colors.map((c, i) => (
                  <div key={i} className="w-5 h-5 rounded-full border border-black/10" style={{ background: c }} />
                ))}
              </div>
              <p className="font-semibold text-xs text-foreground">{p.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{p.desc}</p>
              {selected.palette === p.name && !isCustomSelected && (
                <div className="mt-1.5">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
            </button>
          ))}

          {/* Personalizado */}
          <button
            onClick={() => { setShowCustom(true); onChange({ ...selected, palette: "Personalizado" }); }}
            className={`rounded-xl p-3 border transition-all text-left ${isCustomSelected ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
          >
            <div className="flex gap-1 mb-2">
              <div className="w-5 h-5 rounded-full border border-black/10" style={{ background: customPrimary }} />
              <div className="w-5 h-5 rounded-full border border-black/10" style={{ background: customSecondary }} />
              <div className="w-5 h-5 rounded-full border border-black/10 bg-white" />
              <div className="w-5 h-5 rounded-full border border-black/10 bg-gray-900" />
              <div className="w-5 h-5 rounded-full border border-black/10 bg-gray-400" />
            </div>
            <p className="font-semibold text-xs text-foreground">Personalizado</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Escolha suas cores</p>
            {isCustomSelected && (
              <div className="mt-1.5">
                <Check className="w-3.5 h-3.5 text-primary" />
              </div>
            )}
          </button>
        </div>

        {/* Custom Color Picker */}
        {isCustomSelected && showCustom && (
          <div className="mt-4 rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-4 h-4 text-primary" />
              <p className="font-semibold text-sm text-foreground">Personalizar cores</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Cor Primária</label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={customPrimary}
                      onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-black/10"
                    />
                  </div>
                  <input
                    type="text"
                    value={customPrimary}
                    onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Cor Secundária</label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={customSecondary}
                      onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-black/10"
                    />
                  </div>
                  <input
                    type="text"
                    value={customSecondary}
                    onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Preview</p>
              <div className="rounded-lg border border-border p-4" style={{ background: customSecondary }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full" style={{ background: customPrimary }} />
                  <p className="font-semibold text-sm" style={{ color: customPrimary }}>Nome do App</p>
                </div>
                <p className="text-xs text-gray-400 mb-3">Descrição do seu projeto aparece aqui.</p>
                <button
                  className="px-4 py-2 rounded-lg text-xs font-semibold"
                  style={{ background: customPrimary, color: customSecondary }}
                >
                  CTA Button
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Typography */}
      <div>
        <h3 className="font-heading text-lg font-bold mb-1 text-foreground">Tipografia</h3>
        <p className="text-xs text-muted-foreground mb-4">Par de fontes para títulos e corpo</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {typographies.map((t) => (
            <button
              key={t.name}
              onClick={() => onChange({ ...selected, typography: t.name })}
              className={`rounded-xl p-4 border transition-all text-left ${selected.typography === t.name ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
            >
              <p className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: t.heading }}>
                {t.preview}
              </p>
              <p className="font-semibold text-xs text-foreground">{t.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{t.heading} + {t.body}</p>
              <p className="text-[10px] text-muted-foreground italic">{t.style}</p>
              {selected.typography === t.name && (
                <div className="mt-2">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Design Style */}
      <div>
        <h3 className="font-heading text-lg font-bold mb-1 text-foreground">Estilo Visual</h3>
        <p className="text-xs text-muted-foreground mb-4">Inspiração de grandes marcas</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {styles.map((s) => (
            <button
              key={s.name}
              onClick={() => onChange({ ...selected, style: s.name })}
              className={`rounded-xl p-4 border transition-all text-left ${selected.style === s.name ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/20"}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1">
                  {s.colors.map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-black/10" style={{ background: c }} />
                  ))}
                </div>
                <p className="font-bold text-sm text-foreground">{s.name}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              {selected.style === s.name && (
                <div className="mt-2">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignSystemPicker;

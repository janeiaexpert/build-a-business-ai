import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DesignThemes = {
  'cosmic-purple': {
    name: 'Cósmico Roxo',
    description: 'Místico e tecnológico',
    colors: {
      primary: '#8b5cf6',
      secondary: '#3b82f6',
      accent: '#ec4899',
      bgDark: '#0a0a2a',
      bgDarker: '#050510',
      border: 'rgba(139, 92, 246, 0.3)',
      card: 'rgba(20, 20, 60, 0.5)',
    },
    fonts: {
      heading: '"Space Grotesk", "Segoe UI", sans-serif',
      body: '"Inter", "system-ui", sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontImports: `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`
  },
  'ocean-blue': {
    name: 'Oceano Azul',
    description: 'Profundo e confiável',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#22d3ee',
      bgDark: '#0c1a2e',
      bgDarker: '#081422',
      border: 'rgba(14, 165, 233, 0.3)',
      card: 'rgba(12, 26, 46, 0.6)',
    },
    fonts: {
      heading: '"Plus Jakarta Sans", "system-ui", sans-serif',
      body: '"DM Sans", "system-ui", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontImports: `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`
  },
  'forest-green': {
    name: 'Floresta Verde',
    description: 'Natural e crescimento',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      bgDark: '#062018',
      bgDarker: '#041510',
      border: 'rgba(16, 185, 129, 0.3)',
      card: 'rgba(6, 32, 24, 0.6)',
    },
    fonts: {
      heading: '"Fraunces", "Georgia", serif',
      body: '"IBM Plex Sans", "system-ui", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontImports: `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,800;9..144,900&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`
  },
  'sunset-orange': {
    name: 'Pôr do Sol',
    description: 'Energético e criativo',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
      bgDark: '#2e1006',
      bgDarker: '#1a0803',
      border: 'rgba(249, 115, 22, 0.3)',
      card: 'rgba(46, 16, 6, 0.6)',
    },
    fonts: {
      heading: '"Outfit", "system-ui", sans-serif',
      body: '"DM Sans", "system-ui", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontImports: `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`
  },
  'rose-gold': {
    name: 'Rosa Dourado',
    description: 'Elegante e premium',
    colors: {
      primary: '#e11d48',
      secondary: '#be123c',
      accent: '#f43f5e',
      bgDark: '#2e0612',
      bgDarker: '#1a030a',
      border: 'rgba(225, 29, 72, 0.3)',
      card: 'rgba(46, 6, 18, 0.6)',
    },
    fonts: {
      heading: '"Playfair Display", "Georgia", serif',
      body: '"Source Sans 3", "system-ui", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontImports: `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Source+Sans+3:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');`
  },
  'slate-minimal': {
    name: 'Minimalista Cinza',
    description: 'Limpo e profissional',
    colors: {
      primary: '#475569',
      secondary: '#334155',
      accent: '#64748b',
      bgDark: '#0f172a',
      bgDarker: '#020617',
      border: 'rgba(71, 85, 105, 0.25)',
      card: 'rgba(15, 23, 42, 0.7)',
    },
    fonts: {
      heading: '"Inter Tight", "system-ui", sans-serif',
      body: '"Inter", "system-ui", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontImports: `@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`
  },
  'aurora-gradient': {
    name: 'Aurora Boreal',
    description: 'Vibrante e mágico',
    colors: {
      primary: '#a855f7',
      secondary: '#06b6d4',
      accent: '#ec4899',
      bgDark: '#0a0a1f',
      bgDarker: '#050510',
      border: 'rgba(168, 85, 247, 0.35)',
      card: 'rgba(10, 10, 31, 0.5)',
    },
    fonts: {
      heading: '"Syne", "system-ui", sans-serif',
      body: '"Space Grotesk", "system-ui", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontImports: `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`
  },
};

const FontPairs = [
  { name: 'Tecnológico', heading: '"Space Grotesk", sans-serif', body: '"Inter", sans-serif', mono: '"JetBrains Mono", monospace' },
  { name: 'Moderno', heading: '"Plus Jakarta Sans", sans-serif', body: '"DM Sans", sans-serif', mono: '"JetBrains Mono", monospace' },
  { name: 'Editorial', heading: '"Fraunces", serif', body: '"IBM Plex Sans", sans-serif', mono: '"JetBrains Mono", monospace' },
  { name: 'Criativo', heading: '"Outfit", sans-serif', body: '"DM Sans", sans-serif', mono: '"JetBrains Mono", monospace' },
  { name: 'Elegante', heading: '"Playfair Display", serif', body: '"Source Sans 3", sans-serif', mono: '"JetBrains Mono", monospace' },
  { name: 'Minimal', heading: '"Inter Tight", sans-serif', body: '"Inter", sans-serif', mono: '"JetBrains Mono", monospace' },
  { name: 'Expressivo', heading: '"Syne", sans-serif', body: '"Space Grotesk", sans-serif', mono: '"JetBrains Mono", monospace' },
];

const App = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('themes');
  const [currentTheme, setCurrentTheme] = useState('cosmic-purple');
  const [currentFontPair, setCurrentFontPair] = useState(0);
  const [customColors, setCustomColors] = useState({
    primary: '#8b5cf6',
    secondary: '#3b82f6',
    accent: '#ec4899',
    bgDark: '#0a0a2a',
  });

  // Apply theme to CSS variables
  useEffect(() => {
    const theme = DesignThemes[currentTheme];
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts.body);
    root.style.setProperty('--font-mono', theme.fonts.mono);
    
    // Load font imports
    const styleId = 'theme-font-imports';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = theme.fontImports;
  }, [currentTheme]);

  // Apply custom color overrides
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', customColors.primary);
    root.style.setProperty('--secondary-color', customColors.secondary);
    root.style.setProperty('--accent-color', customColors.accent);
    root.style.setProperty('--bg-dark', customColors.bgDark);
  }, [customColors]);

  // Apply font pair
  useEffect(() => {
    const pair = FontPairs[currentFontPair];
    const root = document.documentElement;
    root.style.setProperty('--font-heading', pair.heading);
    root.style.setProperty('--font-body', pair.body);
    root.style.setProperty('--font-mono', pair.mono);
  }, [currentFontPair]);

  const handleColorChange = (key, value) => {
    setCustomColors(prev => ({ ...prev, [key]: value }));
  };

  const toggleSettings = () => setSettingsOpen(!settingsOpen);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="cosmic-background" />
          <div className="nebula" />
          <div className="stars" />
          
          <button 
            className="settings-toggle"
            onClick={toggleSettings}
            aria-label="Abrir configurações"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          <div className={`settings-panel ${settingsOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleSettings}>&times;</button>
            
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>⚙️ Design System</h2>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Escolha tema completo (cor + fonte) ou personalize</p>

            <div className="settings-tabs">
              <button 
                className={`tab-button ${activeTab === 'themes' ? 'active' : ''}`}
                onClick={() => setActiveTab('themes')}
              >
                🎨 Temas Completos
              </button>
              <button 
                className={`tab-button ${activeTab === 'fonts' ? 'active' : ''}`}
                onClick={() => setActiveTab('fonts')}
              >
                🔤 Pares Tipográficos
              </button>
              <button 
                className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
                onClick={() => setActiveTab('custom')}
              >
                🎯 Ajuste Fino
              </button>
            </div>

            {activeTab === 'themes' && (
              <div className="tab-content active">
                <div className="theme-grid">
{Object.entries(DesignThemes).map(([key, theme]) => {
                      const themePreviews = {
                        'cosmic-purple': { title: 'Construa o Futuro', text: 'Tecnologia mística para visionários que criam o amanhã.' },
                        'ocean-blue': { title: 'Confiança Profunda', text: 'Soluções sólidas como o oceano, fluidas como a maré.' },
                        'forest-green': { title: 'Cresça Naturalmente', text: 'Sustentabilidade e inovação caminhando juntas.' },
                        'sunset-orange': { title: 'Energia Criativa', text: 'Onde a paixão encontra a execução brilhante.' },
                        'rose-gold': { title: 'Elegância Atemporal', text: 'Experiências premium que inspiram admiração.' },
                        'slate-minimal': { title: 'Essência Pura', text: 'Menos ruído, mais impacto. Design na essência.' },
                        'aurora-gradient': { title: 'Magia Digital', text: 'Onde a imaginação encontra a tecnologia.' },
                      };
                      const preview = themePreviews[key] || { title: theme.name, text: theme.description };
                      
                      return (
                        <button
                          key={key}
                          className={`theme-card ${currentTheme === key ? 'active' : ''}`}
                          onClick={() => setCurrentTheme(key)}
                          style={{
                            padding: '1.5rem',
                            background: 'var(--card-bg)',
                            border: `2px solid ${currentTheme === key ? 'var(--accent-color)' : 'var(--border-color)'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                          }}
                        >
                          <div style={{
                            width: '100%',
                            height: '60px',
                            borderRadius: '8px',
                            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`,
                            boxShadow: `0 4px 15px ${theme.colors.primary}40`,
                          }}></div>
                          <h4 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: theme.fonts.heading }}>{theme.name}</h4>
                          <p style={{ margin: 0, opacity: 0.6, fontSize: '0.85rem' }}>{theme.description}</p>
                          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', opacity: 0.5 }}>
                            <span>Título: {theme.fonts.heading.split(',')[0].replace(/"/g, '')}</span>
                            <span>Corpo: {theme.fonts.body.split(',')[0].replace(/"/g, '')}</span>
                          </div>
                          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                            <p style={{ margin: 0, fontFamily: theme.fonts.heading, fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary-color)' }}>{preview.title}</p>
                            <p style={{ margin: '0.25rem 0 0 0', fontFamily: theme.fonts.body, fontSize: '0.8rem', opacity: 0.7 }}>{preview.text}</p>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {activeTab === 'fonts' && (
              <div className="tab-content active">
                <div className="font-pair-grid">
{FontPairs.map((pair, index) => {
                      const pairPreviews = {
                        0: { title: 'Dashboard Analytics', text: 'Métricas em tempo real para decisões precisas' },
                        1: { title: 'Landing Page Moderna', text: 'Conversão otimizada com design responsivo' },
                        2: { title: 'Artigo Editorial', text: 'Leitura imersiva com tipografia refinada' },
                        3: { title: 'Portfolio Criativo', text: 'Expressão visual ousada e memorável' },
                        4: { title: 'Marca Premium', text: 'Experiência de luxo em cada detalhe' },
                        5: { title: 'Sistema Clean', text: 'Interface limpa para máxima produtividade' },
                        6: { title: 'Plataforma Expressiva', text: 'Identidade visual única e marcante' },
                      };
                      const preview = pairPreviews[index] || { title: pair.name, text: 'Preview do par tipográfico' };
                      
                      return (
                        <button
                          key={index}
                          className="font-pair-card"
                          onClick={() => setCurrentFontPair(index)}
                          style={{
                            padding: '1rem',
                            background: 'var(--card-bg)',
                            border: `2px solid ${currentFontPair === index ? 'var(--accent-color)' : 'var(--border-color)'}`,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textAlign: 'left',
                          }}
                        >
                          <h5 style={{ margin: '0 0 0.5rem 0', fontFamily: pair.heading, color: 'var(--primary-color)' }}>{pair.name}</h5>
                          <p style={{ margin: '0 0 0.5rem 0', fontFamily: pair.heading, fontSize: '1.1rem', fontWeight: 600 }}>{preview.title}</p>
                          <p style={{ margin: 0, fontFamily: pair.body, fontSize: '0.9rem', opacity: 0.7 }}>{preview.text}</p>
                          <p style={{ margin: '0.5rem 0 0 0', fontFamily: pair.mono, fontSize: '0.75rem', opacity: 0.5 }}>Mono: {pair.mono.split(',')[0].replace(/"/g, '')}</p>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="tab-content active">
                <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>🎯 Ajuste Fino de Cores</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Cor Primária</label>
                    <input type="color" value={customColors.primary} onChange={(e) => handleColorChange('primary', e.target.value)} style={{ width: '100%', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Cor Secundária</label>
                    <input type="color" value={customColors.secondary} onChange={(e) => handleColorChange('secondary', e.target.value)} style={{ width: '100%', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Cor de Acento</label>
                    <input type="color" value={customColors.accent} onChange={(e) => handleColorChange('accent', e.target.value)} style={{ width: '100%', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Background</label>
                    <input type="color" value={customColors.bgDark} onChange={(e) => handleColorChange('bgDark', e.target.value)} style={{ width: '100%', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
            )}

            <button className="save-btn" onClick={toggleSettings}>
              ✨ Aplicar e Fechar
            </button>
          </div>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
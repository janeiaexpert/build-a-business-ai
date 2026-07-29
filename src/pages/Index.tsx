import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProjectCards from "@/components/ProjectCards";
import WizardFlow from "@/components/WizardFlow";
import GalacticBackground from "@/components/GalacticBackground";
import { useAuth } from "@/AuthContext";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, LogOut, Menu, X } from "lucide-react";

const Index = () => {
  const [selectedType, setSelectedType] = useState<"site" | "app" | null>(null);
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (selectedType) {
    return <WizardFlow projectType={selectedType} onBack={() => setSelectedType(null)} />;
  }

  return (
    <div className="min-h-screen relative">
      <GalacticBackground />

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="font-heading font-bold text-base sm:text-lg text-foreground tracking-tight">
            AI Builder Pro
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Olá, <strong className="text-foreground">{user.name}</strong></span>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Entrar
                </Link>
                <Link
                  to="/registrar"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  <UserPlus className="w-4 h-4" />
                  Criar conta
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-border bg-card/95 backdrop-blur-md">
            <div className="px-4 py-3 space-y-2">
              {user ? (
                <>
                  <p className="text-sm text-muted-foreground px-3 py-1">Olá, <strong className="text-foreground">{user.name}</strong></p>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full text-left inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Entrar
                  </Link>
                  <Link
                    to="/registrar"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    Criar conta
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <HeroSection />
      <ProjectCards onSelectType={setSelectedType} />

      {/* Footer */}
      <footer className="text-center py-8 sm:py-10 text-xs text-muted-foreground px-4">
        © 2026 AI Builder Pro. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Index;

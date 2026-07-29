import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/AuthContext";
import { ArrowLeft, Check } from "lucide-react";

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Digite seu email.");
      return;
    }
    const success = forgotPassword(email);
    if (success) setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="uppercase tracking-wider text-xs font-medium">Voltar</span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Email enviado</h1>
              <p className="text-muted-foreground text-sm mb-6">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
              <Link
                to="/login"
                className="inline-block w-full py-3 rounded-xl font-semibold text-sm text-primary-foreground text-center transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: "var(--gradient-cta)" }}
              >
                Voltar ao login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2 text-center">Esqueceu a senha?</h1>
              <p className="text-muted-foreground text-sm text-center mb-8">
                Informe seu email e enviaremos um link para redefinir sua senha.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm text-primary-foreground transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  Enviar link de recuperação
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

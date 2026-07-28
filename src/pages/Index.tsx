import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProjectCards from "@/components/ProjectCards";
import WizardFlow from "@/components/WizardFlow";
import GalacticBackground from "@/components/GalacticBackground";

const Index = () => {
  const [selectedType, setSelectedType] = useState<"site" | "app" | null>(null);

  if (selectedType) {
    return <WizardFlow projectType={selectedType} onBack={() => setSelectedType(null)} />;
  }

  return (
    <div className="min-h-screen relative">
      <GalacticBackground />
      <HeroSection />
      <ProjectCards onSelectType={setSelectedType} />

      {/* Footer */}
      <footer className="text-center py-10 text-xs text-muted-foreground">
        © 2026 AI Builder Pro. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Index;

import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "@/pages/data";
import { HomeSection } from "@/pages/sections/HomeSections";
import { CountriesSection, TravelSection, CultureSection } from "@/pages/sections/ContentSections";
import { CommunitySection, ChatSection } from "@/pages/sections/SocialSections";

const Index = () => {
  const [section, setSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const renderSection = () => {
    switch (section) {
      case "home": return <HomeSection />;
      case "countries": return <CountriesSection />;
      case "travel": return <TravelSection />;
      case "community": return <CommunitySection />;
      case "chat": return <ChatSection />;
      case "culture": return <CultureSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
          <button onClick={() => setSection("home")} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-terracotta flex items-center justify-center">
              <Icon name="Globe" size={14} className="text-white" />
            </div>
            <span className="font-display text-lg font-medium tracking-tight">КультурМост</span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`nav-link font-body text-sm transition-colors duration-200 ${section === item.id ? "text-foreground active" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Войти</button>
            <button className="font-body text-sm font-medium px-5 py-2 rounded-full bg-terracotta text-white hover:bg-terracotta/90 transition-all hover:scale-105">
              Регистрация
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-foreground" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setSection(item.id); setMenuOpen(false); }}
                className={`w-full text-left px-6 py-3.5 font-body text-sm border-b border-border last:border-0 transition-colors ${section === item.id ? "text-terracotta font-medium" : "text-muted-foreground"}`}
              >
                {item.label}
              </button>
            ))}
            <div className="px-6 py-4 flex gap-3">
              <button className="flex-1 font-body text-sm py-2.5 rounded-full border border-border text-foreground">Войти</button>
              <button className="flex-1 font-body text-sm py-2.5 rounded-full bg-terracotta text-white font-medium">Регистрация</button>
            </div>
          </div>
        )}
      </header>

      <main key={section} className="animate-fade-in opacity-0" style={{ animationFillMode: "forwards" }}>
        {renderSection()}
      </main>

      <footer className="border-t border-border bg-muted/30 py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-6 h-6 rounded-full bg-terracotta flex items-center justify-center">
                  <Icon name="Globe" size={12} className="text-white" />
                </div>
                <span className="font-display text-base font-medium">КультурМост</span>
              </div>
              <p className="font-body text-xs text-muted-foreground max-w-xs">
                Платформа для межкультурного взаимодействия и туристического обмена
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { title: "Платформа", links: ["Страны", "Маршруты", "Культура"] },
                { title: "Сообщество", links: ["Участники", "Чат", "События"] },
              ].map(col => (
                <div key={col.title}>
                  <p className="font-body text-xs font-medium uppercase tracking-widest mb-3 text-foreground">{col.title}</p>
                  {col.links.map(l => (
                    <button key={l} className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">{l}</button>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-muted-foreground">© 2026 КультурМост. Все права защищены.</p>
            <div className="flex gap-4">
              {["Instagram", "Telegram", "VK"].map(s => (
                <button key={s} className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">{s}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

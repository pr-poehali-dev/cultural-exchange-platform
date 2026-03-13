import { useState } from "react";
import Icon from "@/components/ui/icon";
import { COUNTRIES, ROUTES, CULTURE_ITEMS, MAP_IMG } from "@/pages/data";

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      <Icon name="Star" size={12} className="fill-amber-400 text-amber-400" />
      <span className="text-xs font-body font-medium text-muted-foreground">{value}</span>
    </div>
  );
}

export function CountriesSection() {
  const [filter, setFilter] = useState("Все");
  const tags = ["Все", "Азия", "Европа", "Африка", "Латинская Америка", "Кавказ"];
  const filtered = filter === "Все" ? COUNTRIES : COUNTRIES.filter(c => c.tag === filter);

  return (
    <div className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Исследуйте</p>
        <h2 className="font-display text-5xl font-light mb-8">Страны</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`tag-pill border transition-all duration-200 ${filter === t ? "bg-foreground text-background border-foreground" : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <div key={c.name} className="group bg-card border border-border rounded-xl overflow-hidden hover-lift cursor-pointer animate-fade-up opacity-0" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}>
            <div className="h-1.5 bg-gradient-to-r from-terracotta to-sand" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{c.emoji}</span>
                <StarRating value={c.rating} />
              </div>
              <span className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-2 block">{c.tag}</span>
              <h3 className="font-display text-2xl font-medium mb-2">{c.name}</h3>
              <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">{c.desc}</p>
              <div className="flex flex-wrap gap-1">
                {c.tags.map(tag => (
                  <span key={tag} className="tag-pill bg-muted text-muted-foreground text-xs">{tag}</span>
                ))}
              </div>
            </div>
            <div className="px-6 pb-5">
              <button className="w-full font-body text-sm font-medium py-2.5 rounded-lg border border-border group-hover:border-terracotta group-hover:text-terracotta transition-all duration-200">
                Исследовать страну
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 rounded-2xl overflow-hidden relative">
        <img src={MAP_IMG} alt="Карта мира" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="font-body text-xs uppercase tracking-widest mb-2 opacity-70">Интерактивная карта</p>
            <h3 className="font-display text-3xl font-light">180 стран на карте мира</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TravelSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Маршруты</p>
        <h2 className="font-display text-5xl font-light">Путешествия</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {ROUTES.map((r, i) => (
          <div key={r.title} onClick={() => setActive(active === i ? null : i)} className={`bg-card border rounded-xl p-6 cursor-pointer transition-all duration-300 ${active === i ? "border-terracotta shadow-lg" : "border-border hover:border-foreground/30"}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <h3 className="font-display text-xl font-medium">{r.title}</h3>
                  <p className="font-body text-xs text-muted-foreground">{r.country}</p>
                </div>
              </div>
              <Icon name={active === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-muted-foreground mt-1" />
            </div>
            <div className="flex gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <Icon name="Clock" size={13} className="text-muted-foreground" />
                <span className="font-body text-xs text-muted-foreground">{r.days} дней</span>
              </div>
              <div className={`tag-pill text-xs ${r.difficulty === "Легко" ? "bg-green-50 text-green-700" : r.difficulty === "Сложно" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                {r.difficulty}
              </div>
            </div>
            {active === i && (
              <div className="mt-4 pt-4 border-t border-border animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
                <p className="font-body text-sm text-muted-foreground mb-4">{r.desc}</p>
                <button className="font-body text-sm font-medium px-5 py-2 rounded-lg bg-terracotta text-white hover:bg-terracotta/90 transition-colors">
                  Подробнее о маршруте
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-foreground text-background rounded-2xl p-10 md:p-14 text-center">
        <p className="font-body text-xs text-background/50 uppercase tracking-widest mb-4">Персонализация</p>
        <h3 className="font-display text-4xl font-light text-background mb-4">Маршрут под вас</h3>
        <p className="font-body text-sm text-background/60 mb-8 max-w-md mx-auto">
          Расскажите нам о своих интересах, и алгоритм составит идеальный маршрут с учётом бюджета и времени
        </p>
        <button className="font-body font-medium text-sm px-8 py-3 rounded-full bg-sand text-foreground hover:bg-sand/90 transition-all hover:scale-105">
          Создать маршрут
        </button>
      </div>
    </div>
  );
}

export function CultureSection() {
  const [active, setActive] = useState("Все");
  const categories = ["Все", "Традиции", "Музыка", "Ритуалы", "Праздники"];
  const filtered = active === "Все" ? CULTURE_ITEMS : CULTURE_ITEMS.filter(c => c.category === active);

  return (
    <div className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Знания</p>
        <h2 className="font-display text-5xl font-light mb-8">Культура</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} className={`tag-pill border transition-all duration-200 ${active === cat ? "bg-foreground text-background border-foreground" : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {filtered.map((item, i) => (
          <div key={i} className="group bg-card border border-border rounded-xl p-6 hover-lift cursor-pointer animate-fade-up opacity-0" style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "forwards" }}>
            <div className="text-3xl mb-4">{item.emoji}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="tag-pill bg-muted text-muted-foreground text-xs">{item.category}</span>
              <span className="font-body text-xs text-muted-foreground">· {item.country}</span>
            </div>
            <h3 className="font-display text-xl font-medium mb-2">{item.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
              <span className="font-body text-xs text-muted-foreground">Читать далее</span>
              <Icon name="ArrowRight" size={15} className="text-muted-foreground group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center py-12 px-6 md:px-20">
        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-6">Цитата</p>
        <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-light italic leading-tight text-foreground">
          «Путешествие — это единственная вещь, которую ты покупаешь, и она делает тебя богаче»
        </blockquote>
        <p className="font-body text-sm text-muted-foreground mt-6">— Народная мудрость</p>
      </div>
    </div>
  );
}

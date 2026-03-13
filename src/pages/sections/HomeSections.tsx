import { useState } from "react";
import Icon from "@/components/ui/icon";
import { HERO_IMG, COMMUNITY_IMG, COUNTRIES, QUIZ_STEPS } from "@/pages/data";

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      <Icon name="Star" size={12} className="fill-amber-400 text-amber-400" />
      <span className="text-xs font-body font-medium text-muted-foreground">{value}</span>
    </div>
  );
}

export function QuizSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const recommended = [COUNTRIES[0], COUNTRIES[3], COUNTRIES[1]];

  function pick(idx: number) {
    const next = [...answers, idx];
    if (step < QUIZ_STEPS.length - 1) {
      setAnswers(next);
      setStep(step + 1);
    } else {
      setAnswers(next);
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setDone(false);
  }

  if (done) {
    return (
      <div className="animate-scale-in">
        <div className="text-center mb-8">
          <p className="font-body text-sm text-muted-foreground uppercase tracking-widest mb-2">Ваши рекомендации</p>
          <h3 className="font-display text-3xl font-light text-foreground">Идеально для вас</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {recommended.map((c, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-5 hover-lift cursor-pointer">
              <div className="text-3xl mb-3">{c.emoji}</div>
              <h4 className="font-display text-xl font-medium mb-1">{c.name}</h4>
              <p className="font-body text-sm text-muted-foreground mb-3">{c.desc}</p>
              <div className="flex flex-wrap gap-1">
                {c.tags.map((t) => (
                  <span key={t} className="tag-pill bg-accent text-accent-foreground text-xs">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={reset} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
            Пройти заново
          </button>
        </div>
      </div>
    );
  }

  const current = QUIZ_STEPS[step];

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex gap-2 mb-8 justify-center">
        {QUIZ_STEPS.map((_, i) => (
          <div key={i} className={`h-1 rounded-full flex-1 transition-all duration-300 ${i <= step ? "bg-terracotta" : "bg-border"}`} />
        ))}
      </div>
      <p className="font-body text-xs text-muted-foreground uppercase tracking-widest text-center mb-4">
        Шаг {step + 1} из {QUIZ_STEPS.length}
      </p>
      <h3 className="font-display text-2xl md:text-3xl font-light text-center mb-8">{current.question}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className="font-body text-sm text-left p-4 rounded-lg border border-border bg-background hover:border-terracotta hover:bg-accent transition-all duration-200 group"
          >
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function HomeSection() {
  return (
    <div>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="relative z-10 max-w-3xl px-6 md:px-16 py-20">
          <p className="font-body text-xs text-sand uppercase tracking-[0.25em] mb-6 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            Платформа межкультурного обмена
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-6 animate-fade-up opacity-0 delay-100" style={{ animationFillMode: "forwards" }}>
            Мир без<br /><em>границ</em>
          </h1>
          <p className="font-body text-base md:text-lg text-white/80 max-w-md mb-10 animate-fade-up opacity-0 delay-200" style={{ animationFillMode: "forwards" }}>
            Изучайте культуры, стройте маршруты и находите единомышленников по всему миру
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-up opacity-0 delay-300" style={{ animationFillMode: "forwards" }}>
            <button className="font-body font-medium text-sm px-7 py-3 rounded-full bg-terracotta text-white hover:bg-terracotta/90 transition-all duration-200 hover:scale-105">
              Начать путешествие
            </button>
            <button className="font-body font-medium text-sm px-7 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition-all duration-200">
              Узнать больше
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 z-10">
          <div className="flex flex-wrap gap-8 animate-fade-up opacity-0 delay-400" style={{ animationFillMode: "forwards" }}>
            {[["180+", "Стран"], ["24k", "Участников"], ["5k+", "Маршрутов"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-display text-2xl font-light text-white">{num}</div>
                <div className="font-body text-xs text-white/60 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Персонально для вас</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">Система<br />рекомендаций</h2>
          </div>
          <p className="font-body text-sm text-muted-foreground max-w-xs mt-4 md:mt-0">
            Ответьте на несколько вопросов — и мы подберём страны и маршруты по вашим интересам
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <QuizSection />
        </div>
      </section>

      <section className="py-20 bg-foreground text-background">
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <p className="font-body text-xs text-background/50 uppercase tracking-widest mb-12">Наши возможности</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: "Globe", title: "180 культур", desc: "Глубокие материалы о традициях, языках и укладе жизни каждой страны" },
              { icon: "Users", title: "Живое сообщество", desc: "Студенты, исследователи и путешественники из 70 стран общаются в реальном времени" },
              { icon: "Map", title: "Умные маршруты", desc: "Алгоритм учитывает ваши интересы, бюджет и физическую подготовку" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="border-t border-white/10 pt-8">
                <Icon name={icon as "Globe"} size={24} className="mb-4 text-sand" />
                <h3 className="font-display text-2xl font-light mb-3 text-background">{title}</h3>
                <p className="font-body text-sm text-background/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-4">Сообщество</p>
            <h2 className="font-display text-4xl font-light mb-6">Люди,<br />которые открывают мир</h2>
            <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
              Тысячи единомышленников делятся опытом, ищут попутчиков и помогают открывать самые неожиданные места
            </p>
            <div className="flex flex-wrap gap-2">
              {["Студенты", "Исследователи", "Фотографы", "Волонтёры"].map(tag => (
                <span key={tag} className="tag-pill bg-accent text-accent-foreground">{tag}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={COMMUNITY_IMG} alt="Сообщество" className="w-full h-80 object-cover rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-body text-xs text-muted-foreground">Сейчас онлайн</span>
              </div>
              <span className="font-display text-2xl text-foreground">1 248</span>
              <span className="font-body text-xs text-muted-foreground ml-1">участников</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/dd1b3535-414e-45c4-abdc-f9b641503e2e/files/88d99270-77e1-48e2-b9a8-c3f2b003430d.jpg";
const MAP_IMG = "https://cdn.poehali.dev/projects/dd1b3535-414e-45c4-abdc-f9b641503e2e/files/8eaf489e-81a7-4b6f-b55f-4dc35eecf1e9.jpg";
const COMMUNITY_IMG = "https://cdn.poehali.dev/projects/dd1b3535-414e-45c4-abdc-f9b641503e2e/files/585cd0eb-6b59-475d-baa4-87e11f8d0624.jpg";

type Section = "home" | "countries" | "travel" | "community" | "chat" | "culture";

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "countries", label: "Страны" },
  { id: "travel", label: "Путешествия" },
  { id: "community", label: "Сообщество" },
  { id: "chat", label: "Чат" },
  { id: "culture", label: "Культура" },
];

const COUNTRIES = [
  { name: "Япония", emoji: "🇯🇵", tag: "Азия", desc: "Традиции и технологии, сакура и рамен", rating: 4.9, tags: ["Архитектура", "Кухня", "Природа"] },
  { name: "Марокко", emoji: "🇲🇦", tag: "Африка", desc: "Медины, специи и бесконечные пустыни", rating: 4.7, tags: ["История", "Кухня", "Культура"] },
  { name: "Перу", emoji: "🇵🇪", tag: "Латинская Америка", desc: "Мачу-Пикчу, амазония и цивилизация инков", rating: 4.8, tags: ["Природа", "История", "Треккинг"] },
  { name: "Грузия", emoji: "🇬🇪", tag: "Кавказ", desc: "Гостеприимство, вино и горные монастыри", rating: 4.9, tags: ["Кухня", "Природа", "Религия"] },
  { name: "Португалия", emoji: "🇵🇹", tag: "Европа", desc: "Фаду, азулежу и Атлантический океан", rating: 4.6, tags: ["Музыка", "Архитектура", "Кухня"] },
  { name: "Индия", emoji: "🇮🇳", tag: "Азия", desc: "Тысячи богов, красок и вкусов", rating: 4.7, tags: ["Духовность", "Кухня", "Архитектура"] },
];

const ROUTES = [
  { title: "Путь самурая", country: "Япония", days: 14, difficulty: "Средне", icon: "⛩️", desc: "Токио → Киото → Нара → Осака. Храмы, чайные церемонии и рынки" },
  { title: "Сахара и Атлас", country: "Марокко", days: 10, difficulty: "Легко", icon: "🏜️", desc: "Марракеш → Фес → пустыня Мерзуга. Кочевники и звёздное небо" },
  { title: "Тропа инков", country: "Перу", days: 12, difficulty: "Сложно", icon: "🏔️", desc: "Лима → Куско → Мачу-Пикчу. Высокогорный треккинг" },
  { title: "Военно-грузинская", country: "Грузия", days: 8, difficulty: "Средне", icon: "🏔️", desc: "Тбилиси → Казбеги → Сванети. Монастыри в облаках" },
];

const CULTURE_ITEMS = [
  { title: "Чайная церемония", country: "Япония", category: "Традиции", emoji: "🍵", desc: "Путь чая — медитация в действии. Каждое движение имеет смысл." },
  { title: "Хаммам", country: "Марокко", category: "Ритуалы", emoji: "♨️", desc: "Традиционная баня как социальный институт. Общение и очищение." },
  { title: "Полифония", country: "Грузия", category: "Музыка", emoji: "🎵", desc: "Трёхголосное пение, внесённое в список ЮНЕСКО в 2001 году." },
  { title: "Фаду", country: "Португалия", category: "Музыка", emoji: "🎸", desc: "Городской блюз Лиссабона. Saudade — печаль как красота." },
  { title: "Карнавал Инти Райми", country: "Перу", category: "Праздники", emoji: "🌞", desc: "Праздник Солнца — главный праздник империи инков." },
  { title: "Хинди-поп", country: "Индия", category: "Музыка", emoji: "🎶", desc: "Болливуд как зеркало общества: 1600 фильмов в год." },
];

const QUIZ_STEPS = [
  {
    question: "Что вас привлекает в путешествиях?",
    options: ["История и архитектура", "Природа и треккинг", "Еда и культура", "Духовность и медитация"],
  },
  {
    question: "Предпочитаемый климат?",
    options: ["Тропический жаркий", "Умеренный европейский", "Горный прохладный", "Пустынный контрастный"],
  },
  {
    question: "Стиль путешествия?",
    options: ["Самостоятельно с рюкзаком", "Комфортный тур", "Экспедиция", "Обмен с местными"],
  },
];

const MESSAGES = [
  { user: "Амира К.", country: "🇲🇦", text: "Привет! Кто планирует Марракеш в марте?", time: "10:24" },
  { user: "Такаши М.", country: "🇯🇵", text: "Могу рассказать про лучшие районы Киото — без туристов", time: "10:31" },
  { user: "Елена В.", country: "🇷🇺", text: "Ищу напарника для похода в Грузии, август", time: "10:45" },
  { user: "Карлос Р.", country: "🇵🇪", text: "Тропа инков — бронировать за 6 месяцев!", time: "11:02" },
  { user: "Сара Л.", country: "🇵🇹", text: "В Лиссабоне фаду каждый четверг в Alfama", time: "11:18" },
];

const COMMUNITY_POSTS = [
  { author: "Юлия М.", avatar: "🧳", country: "Побывала в 12 странах", text: "Грузия изменила моё отношение к гостеприимству. Когда хозяин тостует за тебя как за почётного гостя — это незабываемо.", likes: 47, comments: 12 },
  { author: "Антон К.", avatar: "📷", country: "Фотограф-путешественник", text: "Марокко — это взрыв всех чувств одновременно. Подготовьтесь к тому, что ни один фотоальбом не передаёт запах специй в медине.", likes: 83, comments: 24 },
  { author: "Мария Х.", avatar: "🌿", country: "Исследователь культур", text: "Провела 3 месяца в Японии по программе обмена. Главный урок: молчание — это тоже разговор.", likes: 61, comments: 18 },
];

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      <Icon name="Star" size={12} className="fill-amber-400 text-amber-400" />
      <span className="text-xs font-body font-medium text-muted-foreground">{value}</span>
    </div>
  );
}

function QuizSection() {
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

function HomeSection() {
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

function CountriesSection() {
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

function TravelSection() {
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

function CommunitySection() {
  return (
    <div className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Люди</p>
        <h2 className="font-display text-5xl font-light">Сообщество</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {COMMUNITY_POSTS.map((post, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg">{post.avatar}</div>
              <div>
                <p className="font-body font-medium text-sm">{post.author}</p>
                <p className="font-body text-xs text-muted-foreground">{post.country}</p>
              </div>
            </div>
            <p className="font-body text-sm text-foreground/80 leading-relaxed mb-5 italic">«{post.text}»</p>
            <div className="flex items-center gap-5 pt-4 border-t border-border">
              <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors">
                <Icon name="Heart" size={14} />
                <span className="font-body text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="MessageCircle" size={14} />
                <span className="font-body text-xs">{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors ml-auto">
                <Icon name="Share2" size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="relative rounded-2xl overflow-hidden">
        <img src={COMMUNITY_IMG} alt="Сообщество" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 bg-foreground/50 flex items-end p-8 md:p-12">
          <div className="text-white">
            <h3 className="font-display text-3xl font-light mb-2">Присоединяйтесь</h3>
            <p className="font-body text-sm opacity-70 mb-4">24 000 участников из 70 стран уже здесь</p>
            <button className="font-body font-medium text-sm px-6 py-2.5 rounded-full bg-white text-foreground hover:bg-white/90 transition-all">
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatSection() {
  const [msg, setMsg] = useState("");

  return (
    <div className="py-16 px-6 md:px-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Общение</p>
        <h2 className="font-display text-5xl font-light">Чат</h2>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="border-b border-border px-6 py-4 flex gap-2 flex-wrap">
          {["Общий", "Япония", "Марокко", "Грузия", "Путешественники"].map((ch, i) => (
            <button key={ch} className={`font-body text-xs px-4 py-1.5 rounded-full transition-all ${i === 0 ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
              # {ch}
            </button>
          ))}
        </div>
        <div className="p-6 space-y-5 min-h-[360px]">
          {MESSAGES.map((m, i) => (
            <div key={i} className="flex items-start gap-3 animate-slide-right opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}>
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-sm flex-shrink-0">
                {m.country}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-body font-medium text-sm">{m.user}</span>
                  <span className="font-body text-xs text-muted-foreground">{m.time}</span>
                </div>
                <p className="font-body text-sm text-foreground/80">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-4 flex gap-3">
          <input
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder="Написать сообщение..."
            className="flex-1 bg-muted border border-border rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground"
          />
          <button className="px-5 py-2.5 bg-terracotta text-white rounded-lg font-body text-sm font-medium hover:bg-terracotta/90 transition-colors flex items-center gap-2">
            <Icon name="Send" size={15} />
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

function CultureSection() {
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

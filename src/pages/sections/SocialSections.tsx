import { useState } from "react";
import Icon from "@/components/ui/icon";
import { COMMUNITY_IMG, COMMUNITY_POSTS, MESSAGES } from "@/pages/data";

export function CommunitySection() {
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

export function ChatSection() {
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

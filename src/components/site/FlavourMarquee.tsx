import { shishaSection } from "@/data/menu";

const flavourEmoji: Record<string, string> = {
  "Passion Ice": "🧡",
  "Pukka Punch": "🥭",
  "Cloud Burst": "☁️",
  "Moon Berry": "🫐",
  "Red Lychee": "🍒",
  Amazon: "🌴",
  "Dragon Bru": "🐉",
  "Berry Blast": "🍓",
  "Tropical Twister": "🍍",
  "Pink Lady": "🌸",
  "Paan Crush": "🍃",
  "Super Nova": "✨",
  "Designer Mix": "🌿",
  "Mona Shisha": "🍓",
  "Blue Angel": "🧊",
  "Mellow D": "🍯",
  Mambino: "🍫",
  "Swiss Made": "🍋",
  "Frozen Apple": "🍏",
  "Frozen Blueberry": "🫐",
  "Frozen Lemon": "🍋",
  "Frozen Raspberry": "💗",
  "Irn Bru": "🟠",
  "Blue Mist": "💙",
  "Cuban Mojito": "🌿",
  "Rubicon Guava": "🍈",
  "Gummy Bear": "🐻",
  Skittles: "🌈",
  "Moonlight Berry": "🌙",
  "Raspberry Peardrops": "🍬",
  "Dragon Mist": "🐉",
  "Mango Ice": "🥭",
  Paan: "🍃",
  Lemon: "🍋",
  Watermelon: "🍉",
  "Double Apple": "🍏",
  Grape: "🍇",
  Mint: "🌿",
  Orange: "🍊",
  Peach: "🍑",
  Kiwi: "🥝",
  Gum: "🫧",
  Pomegranate: "🍒",
  Raspberry: "💗",
  Passionova: "🧡",
  "Black Mamba": "🐍",
  "Frozen SMF": "❄️",
  "Magna Carta": "📜",
  "Purple Rain": "💜",
  Swizztastic: "⚡",
  "Mellow Haze": "🌫️",
  Picasso: "🎨",
};

const flavours = shishaSection.groups.flatMap((group) => group.items.map((item) => item.name));

export function FlavourMarquee() {
  const loop = [...flavours, ...flavours];

  return (
    <div className="marquee relative -mx-5 shrink-0 overflow-hidden py-4" aria-hidden>
      <div className="marquee-track items-center">
        {loop.map((name, i) => (
          <span key={`${name}-${i}`} className="flex items-center gap-2 px-4 sm:px-5">
            <span className="text-sm" aria-hidden>
              {flavourEmoji[name]}
            </span>
            <span className="font-display text-[11px] tracking-[0.28em] text-foreground/80 uppercase sm:text-xs">
              {name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

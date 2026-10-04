export type MenuItem = { name: string; price: string; emoji: string };

export type MenuGroup = {
  label: string;
  items: MenuItem[];
};

export type MenuSection = {
  title: string;
  emoji: string;
  groups: MenuGroup[];
};

export const shishaSection: MenuSection = {
  title: "Shisha",
  emoji: "💨",
  groups: [
    {
      label: "Standard — £10.00",
      items: [
        { name: "Double Apple", price: "£10.00", emoji: "🍎" },
        { name: "Grape", price: "£10.00", emoji: "🍇" },
        { name: "Mint", price: "£10.00", emoji: "🌿" },
        { name: "Orange", price: "£10.00", emoji: "🍊" },
        { name: "Kiwi", price: "£10.00", emoji: "🥝" },
        { name: "Pomengranate", price: "£10.00", emoji: "❤️" },
        { name: "Lemon", price: "£10.00", emoji: "🍋" },
        { name: "Peach", price: "£10.00", emoji: "🍑" },
        { name: "Blueberry", price: "£10.00", emoji: "🫐" },
        { name: "Vanilla", price: "£10.00", emoji: "🍦" },
        { name: "Coconut", price: "£10.00", emoji: "🥥" },
        { name: "Gum", price: "£10.00", emoji: "🫧" },
        { name: "Watermelon", price: "£10.00", emoji: "🍉" },
        { name: "Pann", price: "£10.00", emoji: "🍃" },
      ],
    },
    {
      label: "Frozen / premium — £13.00",
      items: [
        { name: "Frozen Apple", price: "£13.00", emoji: "❄️🍎" },
        { name: "Frozen Raspberry", price: "£13.00", emoji: "❄️🍓" },
        { name: "Frozen Blueberry", price: "£13.00", emoji: "❄️🫐" },
        { name: "IRN - Bru", price: "£13.00", emoji: "🟠" },
      ],
    },
  ],
};

export const drinksSections: MenuSection[] = [
  {
    title: "Hot drinks",
    emoji: "☕",
    groups: [
      {
        label: "£1.50 each",
        items: [
          { name: "Arabic Coffee", price: "£1.50", emoji: "☕" },
          { name: "Qazwan Coffee", price: "£1.50", emoji: "☕" },
          { name: "Kurdish Coffee", price: "£1.50", emoji: "☕" },
          { name: "Camomile Tea", price: "£1.50", emoji: "🌼" },
          { name: "Mint Tea", price: "£1.50", emoji: "🌿" },
          { name: "Cardamon Tea", price: "£1.50", emoji: "🍵" },
          { name: "Green Tea", price: "£1.50", emoji: "🍵" },
          { name: "Moroccan Tea", price: "£1.50", emoji: "🫖" },
        ],
      },
    ],
  },
  {
    title: "Cold drinks",
    emoji: "🧊",
    groups: [
      {
        label: "",
        items: [
          { name: "Water", price: "£1.00", emoji: "💧" },
          { name: "Coca-Cola", price: "£1.50", emoji: "🥤" },
          { name: "Fanta Orange", price: "£1.50", emoji: "🍊" },
          { name: "Tango Apple", price: "£1.50", emoji: "🍎" },
          { name: "Lipton Ice Tea Peach", price: "£1.50", emoji: "🍑" },
          { name: "Lipton Ice Tea Lemon", price: "£1.50", emoji: "🍋" },
          { name: "Red Bull", price: "£2.50", emoji: "⚡" },
        ],
      },
    ],
  },
  {
    title: "Milkshakes",
    emoji: "🥤",
    groups: [
      {
        label: "£4.00 each",
        items: [
          { name: "Kit Kat", price: "£4.00", emoji: "🍫" },
          { name: "Ferrero", price: "£4.00", emoji: "🌰" },
          { name: "Oreo", price: "£4.00", emoji: "🍪" },
          { name: "Snickers", price: "£4.00", emoji: "🥜" },
          { name: "Mars", price: "£4.00", emoji: "🍫" },
          { name: "Banana", price: "£4.00", emoji: "🍌" },
        ],
      },
    ],
  },
];

export function getAllMenuSections(): MenuSection[] {
  return [shishaSection, ...drinksSections];
}

/** Parse "£10.00" → 10 for schema.org offers. */
export function parsePriceGbp(price: string): number | undefined {
  const match = price.match(/[\d.]+/);
  if (!match) return undefined;
  const value = Number.parseFloat(match[0]);
  return Number.isFinite(value) ? value : undefined;
}

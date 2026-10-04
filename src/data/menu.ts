export type MenuItem = {
  name: string;
  price: string;
  note?: string;
};

export type MenuGroup = {
  label: string;
  note?: string;
  /** Described mixes and long lists sit across the full menu width. */
  wide?: boolean;
  items: MenuItem[];
};

export type MenuSection = {
  title: string;
  groups: MenuGroup[];
  notes?: string[];
};

const sauceFlavours = "Buffalo Bull, Smokey BBQ, Korean Kick or Hot Fighter.";

export const shishaSection: MenuSection = {
  title: "Shisha",
  groups: [
    {
      label: "Hookahs signature mix",
      wide: true,
      items: [
        {
          name: "Passion Ice",
          price: "£18.00",
          note: "Absolute crowd pleaser. A cool exhale with sweet passion fruit taste. Flavour for days!",
        },
        {
          name: "Pukka Punch",
          price: "£18.00",
          note: "Sweet and fruity flavour. A blackcurrant and mango tangy combo. An exquisite smoke.",
        },
        {
          name: "Cloud Burst",
          price: "£18.00",
          note: "Clean, classic and fresh. Our take on a childhood classic. Perfectly balanced in sweet and citrus flavour.",
        },
        {
          name: "Moon Berry",
          price: "£18.00",
          note: "A fruit lovers favourite. A twist on blueberry.",
        },
        {
          name: "Red Lychee",
          price: "£18.00",
          note: "Subtle and sweet. Smooth fruity smoke, sweet lychee with a twist!",
        },
        {
          name: "Amazon",
          price: "£18.00",
          note: "Fruity and flavourful, perfect marriage of tropical citrus with delicious sweet notes.",
        },
        {
          name: "Dragon Bru",
          price: "£18.00",
          note: "Smooth and smokey, Irn Bru hit with a tropical finish.",
        },
        {
          name: "Berry Blast",
          price: "£18.00",
          note: "Burst of berries, mouth watering sweet with a hint of cool mint and served with a vimto base.",
        },
        {
          name: "Tropical Twister",
          price: "£18.00",
          note: "Sweet and exotic taste of Africa, mind blowing!",
        },
        {
          name: "Pink Lady",
          price: "£18.00",
          note: "Sophisticate your taste buds! Our in house fave, sweet and fruity.",
        },
        {
          name: "Paan Crush",
          price: "£18.00",
          note: "Our take on a paan classic, but not as you know it. Paan explosion but with a tropical twist, slightly minty for that cool taste.",
        },
        {
          name: "Super Nova",
          price: "£18.00",
          note: "A gradual taste explosion of tropical fusion flavours.",
        },
      ],
    },
    {
      label: "Hookahs Savacco London mixes",
      wide: true,
      items: [
        {
          name: "Designer Mix",
          price: "£25.00",
          note: "Aromatic herbs and a hint of green mist.",
        },
        {
          name: "Mona Shisha",
          price: "£25.00",
          note: "Masterpiece of fruity sweetness and tantalising undertones.",
        },
        {
          name: "Blue Angel",
          price: "£25.00",
          note: "Transport your tastebuds to a realm of icy delight.",
        },
        {
          name: "Mellow D",
          price: "£25.00",
          note: "Mouthwatering sweetness with a refreshing aroma.",
        },
        {
          name: "Mambino",
          price: "£25.00",
          note: "Deep and robust flavour profile leaving a lasting impression.",
        },
        {
          name: "Swiss Made",
          price: "£25.00",
          note: "Sweet and tangy notes which dance on your tastebuds.",
        },
      ],
    },
    {
      label: "Premium flavours",
      items: [
        { name: "Frozen Apple", price: "£16.00" },
        { name: "Frozen Blueberry", price: "£16.00" },
        { name: "Frozen Lemon", price: "£16.00" },
        { name: "Frozen Raspberry", price: "£16.00" },
        { name: "Irn Bru", price: "£16.00" },
        { name: "Blue Mist", price: "£16.00" },
        { name: "Cuban Mojito", price: "£16.00" },
        { name: "Rubicon Guava", price: "£16.00" },
        { name: "Gummy Bear", price: "£16.00" },
        { name: "Skittles", price: "£16.00" },
        { name: "Moonlight Berry", price: "£16.00" },
        { name: "Raspberry Peardrops", price: "£16.00" },
        { name: "Dragon Mist", price: "£16.00" },
        { name: "Mango Ice", price: "£16.00" },
        { name: "Paan", price: "£16.00" },
      ],
    },
    {
      label: "Al Fakher",
      items: [
        { name: "Lemon", price: "£13.00" },
        { name: "Watermelon", price: "£13.00" },
        { name: "Double Apple", price: "£13.00" },
        { name: "Grape", price: "£13.00" },
        { name: "Mint", price: "£13.00" },
        { name: "Orange", price: "£13.00" },
        { name: "Peach", price: "£13.00" },
        { name: "Kiwi", price: "£13.00" },
        { name: "Gum", price: "£13.00" },
        { name: "Pomegranate", price: "£13.00" },
        { name: "Raspberry", price: "£13.00" },
      ],
    },
    {
      label: "Savacco London",
      items: [
        { name: "Passionova", price: "£23.00" },
        { name: "Black Mamba", price: "£23.00" },
        { name: "Frozen SMF", price: "£23.00" },
        { name: "Magna Carta", price: "£23.00" },
        { name: "Purple Rain", price: "£23.00" },
        { name: "Swizztastic", price: "£23.00" },
        { name: "Mellow Haze", price: "£23.00" },
        { name: "Picasso", price: "£23.00" },
      ],
    },
  ],
  notes: [
    "All flavours may not be displayed. Please ask a member of staff which flavours are available.",
    "Re-heads are available at £7, £10 and £13. Ask a member of staff for more information.",
    "One shisha pipe between two people. At busy times, maximum stay of 90 minutes. Disposable pipes are an extra £1.",
  ],
};

export const foodSection: MenuSection = {
  title: "Food & desserts",
  groups: [
    {
      label: "Starters",
      items: [
        { name: "Nachos (V)", price: "£4.50" },
        { name: "Loaded Fries / Loaded Nachos", price: "£5.95" },
        { name: "Rustic Chips (V)", price: "£2.45", note: "Add peri for 50p or cheese for £1." },
        { name: "Curly Fries (V)", price: "£2.95", note: "Add peri for 50p or cheese for £1." },
        { name: "Masala Chips", price: "£2.95" },
        { name: "Trio of Samosas", price: "£3.95", note: "Chicken, veg or meat." },
      ],
    },
    {
      label: "Paninis & wraps",
      items: [
        { name: "Chicken Fillet", price: "£5.95" },
        { name: "Kebabish", price: "£6.95", note: sauceFlavours },
        { name: "Veggie", price: "£5.95" },
        { name: "Grilled Chicken", price: "£6.95" },
        { name: "Sheek Kebab", price: "£6.95" },
      ],
    },
    {
      label: "Burgers",
      items: [
        { name: "Grilled Chicken Burger", price: "£6.95" },
        { name: "Smash Burger", price: "£6.95" },
        { name: "1/4 Pounder Cheese Burger", price: "£5.95" },
        { name: "Veggie Burger", price: "£5.95" },
        { name: "Mega Burger", price: "£8.95" },
        { name: "Fillet O Fish", price: "£5.95" },
        {
          name: "Chicken Fillet Burger",
          price: "£5.95",
          note: `Dip it for £1. ${sauceFlavours}`,
        },
        { name: "Kebabish Burger", price: "£5.95", note: sauceFlavours },
        { name: "Add fries", price: "£1.75", note: "Add to a burger." },
        { name: "Add fried egg", price: "£1.50", note: "Add to a burger." },
      ],
    },
    {
      label: "Wings, bites, strips",
      note: sauceFlavours,
      items: [
        { name: "Chicken Wings", price: "£6.95" },
        { name: "Chicken Bite", price: "£6.95" },
        { name: "Chicken Strips", price: "£6.95" },
      ],
    },
    {
      label: "Signature dishes",
      items: [
        { name: "Kebabish & Fries", price: "£7.95", note: sauceFlavours },
        { name: "Chicken & Rice", price: "£8.95" },
        { name: "Grilled Chicken Salad", price: "£6.95" },
      ],
    },
    {
      label: "Desserts",
      items: [
        { name: "Matilda Cake", price: "£7.95" },
        { name: "Chocolate Fudge", price: "£5.95" },
        { name: "Cheesecake", price: "£5.95", note: "Strawberry, Ferrero, Lotus or Oreo." },
        { name: "Cookie Dough", price: "£5.95" },
        { name: "Baklava", price: "£6.95" },
      ],
    },
    {
      label: "Back to school",
      note: "All served with custard or ice cream.",
      items: [
        { name: "Chocolate Crunch", price: "£4.95" },
        { name: "Jam & Coconut Sponge", price: "£4.95" },
        { name: "Sprinkle Cake", price: "£4.95" },
      ],
    },
  ],
  notes: [
    "Due to the nature of our busy kitchen we cannot guarantee any cross contamination whilst preparing food. If you have any tolerances, please make the waiter aware at the time of placing the order.",
  ],
};

export const drinksSection: MenuSection = {
  title: "Hot & cold drinks",
  groups: [
    {
      label: "Milkshakes",
      items: [
        { name: "Ferrero Rocher", price: "£4.95" },
        { name: "Oreo", price: "£4.95" },
        { name: "Snickers", price: "£4.95" },
        { name: "Kinder Bueno", price: "£4.95" },
        { name: "Lotus Biscoff", price: "£4.95" },
        { name: "Mango", price: "£4.95" },
        { name: "Strawberry", price: "£4.95" },
        { name: "Chocolate", price: "£4.95" },
        { name: "Vanilla", price: "£4.95" },
      ],
    },
    {
      label: "Mocktails",
      items: [
        { name: "Red Bull Special", price: "£5.95" },
        { name: "Bubblegum Special", price: "£5.95" },
        { name: "Passion Special", price: "£5.95" },
        { name: "Tropical Special", price: "£5.95" },
        { name: "Virgin Mojito", price: "£4.95" },
        { name: "Strawberry Mojito", price: "£4.95" },
        { name: "Lemon Mojito", price: "£4.95" },
        { name: "Caribbean Crush", price: "£4.95" },
        { name: "Pina Colada", price: "£4.95" },
        { name: "Red Devil", price: "£5.95" },
        { name: "Blue Angel", price: "£5.95" },
      ],
    },
    {
      label: "Hot drinks",
      wide: true,
      items: [
        { name: "English Tea", price: "£2.50" },
        { name: "Mint Tea", price: "£2.50" },
        { name: "Arabic Tea", price: "£2.50" },
        { name: "Green Tea", price: "£2.50" },
        { name: "Lemon Green Tea", price: "£2.50" },
        { name: "Karak Chai", price: "£2.95" },
        { name: "Special Tea", price: "£3.50" },
        { name: "Hot Chocolate", price: "£2.75" },
        { name: "White Coffee", price: "£2.50" },
        { name: "Chai Latte", price: "£2.95" },
        { name: "Latte", price: "£2.75" },
        { name: "Pistachio Latte", price: "£3.75" },
        { name: "Spanish Latte", price: "£3.75" },
        { name: "Cappuccino", price: "£2.75" },
        { name: "Americano", price: "£2.50" },
        { name: "Mocha", price: "£2.95" },
        { name: "Espresso Shot", price: "£1.25" },
      ],
    },
    {
      label: "Matchas",
      note: "Other flavours may be available. Ask a member of staff.",
      items: [
        { name: "Strawberry", price: "£5.50" },
        { name: "White Chocolate", price: "£5.50" },
        { name: "Blueberry", price: "£5.50" },
      ],
    },
    {
      label: "Drinks",
      items: [
        { name: "Red Bull", price: "£2.95" },
        { name: "Tropical Redbull", price: "£2.95" },
        { name: "J20", price: "£2.95" },
        { name: "Rubicon", price: "£2.50" },
        { name: "Rio", price: "£2.50" },
        { name: "Vimto", price: "£2.50" },
        { name: "Irn Bru", price: "£2.50" },
        { name: "Coke", price: "£2.00" },
        { name: "Diet Coke", price: "£2.00" },
        { name: "Sprite", price: "£2.00" },
        { name: "Fanta", price: "£2.00" },
        { name: "Mango Juice", price: "£2.00" },
        { name: "Apple Juice", price: "£2.00" },
        { name: "Pineapple Juice", price: "£2.00" },
        { name: "Bottled Water", price: "£1.50" },
      ],
    },
    {
      label: "Iced coffees",
      items: [
        {
          name: "Iced Coffee",
          price: "£4.95",
          note: "Hazelnut, caramel, cinnamon or vanilla.",
        },
        { name: "Pistachio Latte", price: "£4.95" },
        { name: "Spanish Latte", price: "£4.95" },
      ],
    },
    {
      label: "Fresh juices",
      note: "Add a shot of ginger for £1 extra.",
      items: [
        { name: "Carrot Sunrise", price: "£5.95" },
        { name: "Apple & Ginger", price: "£5.95" },
        { name: "Orange Immunity", price: "£5.95" },
        { name: "Apple Juice", price: "£5.95" },
        { name: "Orange Juice", price: "£4.95" },
        { name: "Carrot juice", price: "£4.95" },
      ],
    },
    {
      label: "Extras",
      items: [
        { name: "Cream", price: "£0.75" },
        {
          name: "Flavour Shots",
          price: "£0.75",
          note: "Hazelnut, caramel, cinnamon or vanilla.",
        },
        { name: "Marshmallows", price: "£0.75" },
        { name: "Extra Coffee Shot", price: "£1.00" },
      ],
    },
  ],
};

export const menuSections: MenuSection[] = [shishaSection, foodSection, drinksSection];

export function getAllMenuSections(): MenuSection[] {
  return menuSections;
}

/** Parse "£10.00" → 10 for schema.org offers. */
export function parsePriceGbp(price: string): number | undefined {
  const match = price.match(/[\d.]+/);
  if (!match) return undefined;
  const value = Number.parseFloat(match[0]);
  return Number.isFinite(value) ? value : undefined;
}

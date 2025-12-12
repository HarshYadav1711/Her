export const recipes = [
    // Classic Coffees
    {
        id: 'coffee',
        name: 'Classic Coffee',
        ingredients: ['coffee', 'milk', 'sugar'],
        price: 5,
        description: 'A warm, comforting cup of coffee.',
        category: 'coffee',
    },
    {
        id: 'espresso',
        name: 'Espresso',
        ingredients: ['coffee'],
        price: 4,
        description: 'Strong and bold espresso shot.',
        category: 'coffee',
    },
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        ingredients: ['coffee', 'milk', 'foam'],
        price: 6,
        description: 'Espresso with steamed milk and foam.',
        category: 'coffee',
    },
    {
        id: 'latte',
        name: 'Caffè Latte',
        ingredients: ['coffee', 'milk', 'vanilla'],
        price: 7,
        description: 'Smooth espresso with steamed milk.',
        category: 'coffee',
    },
    {
        id: 'mocha',
        name: 'Mocha',
        ingredients: ['coffee', 'milk', 'chocolate', 'whippedCream'],
        price: 8,
        description: 'Chocolate and coffee perfection.',
        category: 'coffee',
    },
    {
        id: 'americano',
        name: 'Americano',
        ingredients: ['coffee', 'water'],
        price: 4,
        description: 'Espresso with hot water.',
        category: 'coffee',
    },
    {
        id: 'macchiato',
        name: 'Macchiato',
        ingredients: ['coffee', 'foam'],
        price: 5,
        description: 'Espresso marked with foam.',
        category: 'coffee',
    },
    {
        id: 'frappe',
        name: 'Coffee Frappe',
        ingredients: ['coffee', 'ice', 'milk', 'sugar'],
        price: 7,
        description: 'Iced blended coffee delight.',
        category: 'coffee',
    },
    
    // Teas
    {
        id: 'green_tea',
        name: 'Green Tea',
        ingredients: ['greenTea', 'water', 'honey'],
        price: 4,
        description: 'Refreshing and healthy green tea.',
        category: 'tea',
    },
    {
        id: 'black_tea',
        name: 'Black Tea',
        ingredients: ['blackTea', 'water', 'sugar', 'milk'],
        price: 4,
        description: 'Classic strong black tea.',
        category: 'tea',
    },
    {
        id: 'chai',
        name: 'Masala Chai',
        ingredients: ['blackTea', 'milk', 'sugar', 'cardamom', 'cinnamon'],
        price: 5,
        description: 'Spiced Indian tea.',
        category: 'tea',
    },
    {
        id: 'pink_chai',
        name: 'Pink Kashmiri Chai',
        ingredients: ['milk', 'sugar', 'roseSyrup', 'cardamom'],
        price: 8,
        description: 'A special pink tea with nuts and spices.',
        category: 'tea',
        unlockCondition: 'special',
    },
    {
        id: 'matcha_latte',
        name: 'Matcha Latte',
        ingredients: ['matcha', 'milk', 'honey'],
        price: 9,
        description: 'Creamy matcha with steamed milk.',
        category: 'tea',
    },
    {
        id: 'earl_grey',
        name: 'Earl Grey',
        ingredients: ['blackTea', 'water', 'lemon', 'honey'],
        price: 5,
        description: 'Bergamot-infused black tea.',
        category: 'tea',
    },
    {
        id: 'jasmine_tea',
        name: 'Jasmine Tea',
        ingredients: ['greenTea', 'water', 'jasmine'],
        price: 5,
        description: 'Fragrant jasmine green tea.',
        category: 'tea',
    },
    
    // Cold Drinks
    {
        id: 'lemonade',
        name: 'Iced Lemonade',
        ingredients: ['lemon', 'sugar', 'ice', 'water'],
        price: 4,
        description: 'Refreshing and zesty.',
        category: 'cold',
    },
    {
        id: 'smoothie',
        name: 'Berry Smoothie',
        ingredients: ['berries', 'yogurt', 'ice', 'honey'],
        price: 7,
        description: 'Fresh mixed berry smoothie.',
        category: 'cold',
    },
    {
        id: 'iced_tea',
        name: 'Iced Tea',
        ingredients: ['blackTea', 'ice', 'lemon', 'sugar'],
        price: 4,
        description: 'Cool and refreshing iced tea.',
        category: 'cold',
    },
    {
        id: 'milkshake',
        name: 'Vanilla Milkshake',
        ingredients: ['milk', 'ice', 'vanilla', 'whippedCream'],
        price: 6,
        description: 'Creamy vanilla milkshake.',
        category: 'cold',
    },
    
    // Specialty Drinks
    {
        id: 'hot_chocolate',
        name: 'Hot Chocolate',
        ingredients: ['milk', 'chocolate', 'whippedCream', 'cinnamon'],
        price: 6,
        description: 'Rich and creamy hot chocolate.',
        category: 'specialty',
    },
    {
        id: 'turmeric_latte',
        name: 'Golden Turmeric Latte',
        ingredients: ['milk', 'turmeric', 'honey', 'cinnamon'],
        price: 7,
        description: 'Warming golden milk latte.',
        category: 'specialty',
    },
    {
        id: 'bubble_tea',
        name: 'Bubble Tea',
        ingredients: ['blackTea', 'milk', 'tapioca', 'ice', 'sugar'],
        price: 8,
        description: 'Chewy tapioca pearls in sweet tea.',
        category: 'specialty',
    },
    {
        id: 'affogato',
        name: 'Affogato',
        ingredients: ['espresso', 'vanilla', 'ice'],
        price: 7,
        description: 'Espresso poured over vanilla ice cream.',
        category: 'specialty',
    },
];

export const ingredientsList = [
    // Bases
    { id: 'coffee', name: 'Coffee', icon: '☕', category: 'base' },
    { id: 'blackTea', name: 'Black Tea', icon: '🫖', category: 'base' },
    { id: 'greenTea', name: 'Green Tea', icon: '🍵', category: 'base' },
    { id: 'matcha', name: 'Matcha', icon: '🟢', category: 'base' },
    { id: 'water', name: 'Water', icon: '💧', category: 'base' },
    
    // Dairy & Alternatives
    { id: 'milk', name: 'Milk', icon: '🥛', category: 'dairy' },
    { id: 'foam', name: 'Foam', icon: '☁️', category: 'dairy' },
    { id: 'yogurt', name: 'Yogurt', icon: '🥄', category: 'dairy' },
    { id: 'whippedCream', name: 'Whipped Cream', icon: '🍦', category: 'dairy' },
    
    // Sweeteners
    { id: 'sugar', name: 'Sugar', icon: '🍬', category: 'sweetener' },
    { id: 'honey', name: 'Honey', icon: '🍯', category: 'sweetener' },
    
    // Flavors & Syrups
    { id: 'vanilla', name: 'Vanilla', icon: '🌿', category: 'flavor' },
    { id: 'chocolate', name: 'Chocolate', icon: '🍫', category: 'flavor' },
    { id: 'roseSyrup', name: 'Rose Syrup', icon: '🌹', category: 'flavor' },
    { id: 'caramel', name: 'Caramel', icon: '🍮', category: 'flavor' },
    
    // Spices & Herbs
    { id: 'cardamom', name: 'Cardamom', icon: '🌿', category: 'spice' },
    { id: 'cinnamon', name: 'Cinnamon', icon: '🟤', category: 'spice' },
    { id: 'turmeric', name: 'Turmeric', icon: '🟡', category: 'spice' },
    { id: 'jasmine', name: 'Jasmine', icon: '🌸', category: 'spice' },
    
    // Fruits & Additions
    { id: 'lemon', name: 'Lemon', icon: '🍋', category: 'fruit' },
    { id: 'berries', name: 'Berries', icon: '🫐', category: 'fruit' },
    { id: 'ice', name: 'Ice', icon: '🧊', category: 'addon' },
    { id: 'tapioca', name: 'Tapioca Pearls', icon: '⚫', category: 'addon' },
];

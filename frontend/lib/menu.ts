const PHOTO_BASE = (typeof process !== "undefined" && process.env.EXPO_PUBLIC_BACKEND_URL ? process.env.EXPO_PUBLIC_BACKEND_URL : "") + "/api/static/menu";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // KZT
  image: string;
  category: string;
  spicy?: boolean;
};

export const categories = [
  { key: "salads", label: "Салаты" },
  { key: "soups", label: "Супы" },
  { key: "starters", label: "Закуски" },
  { key: "pasta", label: "Паста" },
  { key: "pizza", label: "Пицца · Бургеры" },
  { key: "meat", label: "Мясо · Птица" },
  { key: "fish", label: "Рыба · Осётр" },
  { key: "sets", label: "Сеты · Банкеты" },
  { key: "sides", label: "Гарниры" },
  { key: "sauces", label: "Соусы" },
  { key: "desserts", label: "Десерты" },
  { key: "nonalc", label: "Безалк. напитки" },
  { key: "coffee", label: "Кофе" },
  { key: "tea", label: "Чай" },
  { key: "beer", label: "Пиво" },
  { key: "spirits", label: "Крепкое" },
  { key: "cocktails", label: "Коктейли" },
  { key: "wine", label: "Вино" },
];

// Shared image library
const IMG = {
  // Salads
  horiatiki: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=75",
  caesarChicken: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop&q=75",
  caesarShrimp: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&auto=format&fit=crop&q=75",
  warmHorse: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=75",
  seafoodSalad: "https://images.unsplash.com/photo-1623428454614-abaf00244e52?w=800&auto=format&fit=crop&q=75",
  achuchuk: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&auto=format&fit=crop&q=75",
  arugulaSalmon: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=75",

  // Soups
  solyanka: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=75",
  uha: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&auto=format&fit=crop&q=75",
  mushroomCream: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=75",
  tomyam: "https://images.unsplash.com/photo-1527603815363-e79385e6d099?w=800&auto=format&fit=crop&q=75",
  meatballSoup: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=75",
  chickenNoodle: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=75",
  hangover: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=75",

  // Starters
  veggieCut: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=75",
  russianStarter: "https://images.unsplash.com/photo-1601001815894-4bb6c81416d7?w=800&auto=format&fit=crop&q=75",
  wineSnack: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&auto=format&fit=crop&q=75",
  pepperTonnato: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=75",
  fishStrips: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=800&auto=format&fit=crop&q=75",
  nuggets: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=75",
  garlicToast: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=800&auto=format&fit=crop&q=75",
  onionRings: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&auto=format&fit=crop&q=75",
  chechilCheese: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=800&auto=format&fit=crop&q=75",
  cheeseSticks: "https://images.unsplash.com/photo-1548340748-6d98e4c5bb1e?w=800&auto=format&fit=crop&q=75",
  beerShrimp: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=75",
  tempuraShrimp: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&auto=format&fit=crop&q=75",
  sausagePlate: "https://images.unsplash.com/photo-1601001815894-4bb6c81416d7?w=800&auto=format&fit=crop&q=75",

  // Pasta
  bolognese: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&auto=format&fit=crop&q=75",
  fettuccine: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=75",
  salmonPesto: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&auto=format&fit=crop&q=75",
  pastaMeatballs: "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=800&auto=format&fit=crop&q=75",
  pappardelle: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&auto=format&fit=crop&q=75",
  pastaSeafood: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=75",

  // Pizza
  pepperoni: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=75",
  pizzaBolognese: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=75",
  pizzaHunter: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=800&auto=format&fit=crop&q=75",
  pizzaChicken: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=75",
  pizzaBlueCheese: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=75",
  margherita: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=75",
  burgerPulled: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=75",
  burgerFish: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&auto=format&fit=crop&q=75",

  // Meat
  stroganoff: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=75",
  beefRibs: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=800&auto=format&fit=crop&q=75",
  horseChimichurri: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&auto=format&fit=crop&q=75",
  ribeye: "https://images.unsplash.com/photo-1763186711083-406cf3ea5665?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc3RlYWslMjBmaW5lJTIwZGluaW5nfGVufDB8fHx8MTc3Nzk4MjQ2NXww&ixlib=rb-4.1.0&q=85&w=800",
  tbone: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=75",
  chateauSteak: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=75",
  horseSteak: "https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?w=800&auto=format&fit=crop&q=75",

  // Poultry
  grillChicken: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=75",
  milanese: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=75",
  quail: "https://images.unsplash.com/photo-1606851094290-c5d3d6ce4ef0?w=800&auto=format&fit=crop&q=75",
  fricassee: "https://images.unsplash.com/photo-1618040996337-17c8f7d92c8b?w=800&auto=format&fit=crop&q=75",
  chickenMeatballs: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=75",
  buffalo: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&auto=format&fit=crop&q=75",

  // Sets
  setPoultry: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=75",
  setMeat: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=75",
  bigFishSet: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=75",
  smallFishSet: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=75",

  // Fish
  sazan: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&auto=format&fit=crop&q=75",
  kefal: "https://images.unsplash.com/photo-1535400875775-0fa7400903ea?w=800&auto=format&fit=crop&q=75",
  sudak: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&auto=format&fit=crop&q=75",
  salmonSteak: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=75",
  dorado: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=75",
  seabass: "https://images.unsplash.com/photo-1559847844-d721426a4a3c?w=800&auto=format&fit=crop&q=75",
  sturgeonAsparagus: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=75",
  sturgeonGrechotto: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&auto=format&fit=crop&q=75",
  sturgeonGyoza: "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=800&auto=format&fit=crop&q=75",
  sturgeonTelnoe: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&auto=format&fit=crop&q=75",
  fishbarmak: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=75",

  // Banquet
  banquetSturgeon: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=75",
  lambLeg: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=800&auto=format&fit=crop&q=75",
  beshbarmak: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=75",
  kuyrdak: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=75",

  // Sides
  broccoli: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=800&auto=format&fit=crop&q=75",
  potatoBalls: "https://images.unsplash.com/photo-1548340748-6d98e4c5bb1e?w=800&auto=format&fit=crop&q=75",
  dippers: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=75",
  rice: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=75",
  mashed: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=75",
  grillVeg: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=75",
  youngPotato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=75",
  asparagus: "https://images.unsplash.com/photo-1515872474884-c6e1e85e3a3a?w=800&auto=format&fit=crop&q=75",
  bread: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=75",

  // Sauces
  sauces: "https://images.unsplash.com/photo-1607362956002-ddbd96f6b9c3?w=800&auto=format&fit=crop&q=75",

  // Desserts
  dessertDay: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop&q=75",
  iceCream: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=75",
  fruits: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&auto=format&fit=crop&q=75",

  // Lemonades / smoothies
  lemonadeGreen: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop&q=75",
  lemonadeBerry: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&auto=format&fit=crop&q=75",
  lemonadeYellow: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=800&auto=format&fit=crop&q=75",
  lemonadeRed: "https://images.unsplash.com/photo-1556881124-1d6da5b1b842?w=800&auto=format&fit=crop&q=75",
  smoothiePineapple: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=800&auto=format&fit=crop&q=75",
  smoothieStrawberry: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=75",
  smoothieTropical: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=800&auto=format&fit=crop&q=75",
  smoothieCherry: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&auto=format&fit=crop&q=75",
  milkshake: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=75",
  milkshakeStraw: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=75",
  pinaColadaMock: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop&q=75",
  mojitoMock: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=75",
  signature: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=75",

  // Coffee
  espresso: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&auto=format&fit=crop&q=75",
  americano: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=75",
  cappuccino: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=75",
  latte: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=800&auto=format&fit=crop&q=75",
  raf: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=75",
  frappuccino: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&auto=format&fit=crop&q=75",
  iceCoffee: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=800&auto=format&fit=crop&q=75",
  hotChocolate: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=800&auto=format&fit=crop&q=75",
  gluhwein: "https://images.unsplash.com/photo-1542825-4ce8c3d6b30c?w=800&auto=format&fit=crop&q=75",

  // Tea
  teaBlack: "https://images.unsplash.com/photo-1597318236316-1c47ab47a4a3?w=800&auto=format&fit=crop&q=75",
  teaGreen: "https://images.unsplash.com/photo-1597318236316-1c47ab47a4a3?w=800&auto=format&fit=crop&q=75",
  teaHerbal: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=75",
  teaFruit: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=75",
  teaPuer: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=75",
  teaTashkent: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&auto=format&fit=crop&q=75",

  // Beer
  beerLager: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop&q=75",
  beerPint: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&auto=format&fit=crop&q=75",
  beerKozel: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=800&auto=format&fit=crop&q=75",
  beerCorona: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=800&auto=format&fit=crop&q=75",
  beerDraft: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=800&auto=format&fit=crop&q=75",

  // Spirits
  vodka: "https://images.unsplash.com/photo-1582718411967-fb38c91fd8a8?w=800&auto=format&fit=crop&q=75",
  whisky: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop&q=75",
  whiskyIrish: "https://images.unsplash.com/photo-1574970144940-7720d83a3c34?w=800&auto=format&fit=crop&q=75",
  whiskyTenn: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop&q=75",
  tequila: "https://images.unsplash.com/photo-1614187884220-e4d1cd24f6f6?w=800&auto=format&fit=crop&q=75",
  gin: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop&q=75",
  rum: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=800&auto=format&fit=crop&q=75",
  brandy: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&auto=format&fit=crop&q=75",

  // Cocktails
  maitai: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=75",
  mojito: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=75",
  pinaColada: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop&q=75",
  tequilaSunrise: "https://images.unsplash.com/photo-1604790275663-39c6e8c41f3a?w=800&auto=format&fit=crop&q=75",
  negroni: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=800&auto=format&fit=crop&q=75",
  screwdriver: "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=800&auto=format&fit=crop&q=75",
  margarita: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop&q=75",
  authorCocktail: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&auto=format&fit=crop&q=75",
  aperol: "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=800&auto=format&fit=crop&q=75",
  spritz: "https://images.unsplash.com/photo-1604790275663-39c6e8c41f3a?w=800&auto=format&fit=crop&q=75",
  hugo: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=75",

  // Wine
  wineRed: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=800&auto=format&fit=crop&q=75",
  wineWhite: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=75",
};

export const menu: MenuItem[] = [
  // ============ САЛАТЫ ============
  { id: "sa1", category: "salads", name: "Хориатики с соусом сальса верде", description: "Греческий салат с фетой и соусом сальса верде", price: 2900, image: `${PHOTO_BASE}/extras/001.jpg` },
  { id: "sa2", category: "salads", name: "Цезарь с курицей", description: "Нежная курица, пармезан, чиабатта, соус цезарь", price: 3100, image: `${PHOTO_BASE}/extras/002.jpg` },
  { id: "sa3", category: "salads", name: "Цезарь с креветками", description: "Тигровые креветки, пармезан, чиабатта, соус цезарь", price: 3400, image: `${PHOTO_BASE}/salads/05.jpg` },
  { id: "sa4", category: "salads", name: "Тёплый салат с кониной", description: "Сочная конина, обжаренные овощи, тёплая заправка", price: 3300, image: `${PHOTO_BASE}/salads/04.jpg` },
  { id: "sa5", category: "salads", name: "Салат с морепродуктами", description: "Кальмары, креветки, мидии, микс салатов", price: 3890, image: `${PHOTO_BASE}/salads/03.jpg` },
  { id: "sa6", category: "salads", name: "Ачучук", description: "Классический узбекский салат — томаты, лук, зелень", price: 1890, image: `${PHOTO_BASE}/salads/01.jpg` },
  { id: "sa7", category: "salads", name: "Салат с руколой и лососем", description: "Слабосолёный лосось, рукола, черри, цитрусовая заправка", price: 3790, image: `${PHOTO_BASE}/salads/02.jpg` },

  // ============ СУПЫ ============
  { id: "su1", category: "soups", name: "Рыбная солянка", description: "Наваристая солянка с ассорти рыбы и оливками", price: 3200, image: `${PHOTO_BASE}/soups/04.jpg` },
  { id: "su2", category: "soups", name: "Уха по-царски", description: "Три вида рыбы, шафран, водка, зелень", price: 2900, image: `${PHOTO_BASE}/extras/003.jpg` },
  { id: "su3", category: "soups", name: "Грибной крем-суп", description: "Шампиньоны и лесные грибы со сливками", price: 2900, image: `${PHOTO_BASE}/soups/02.jpg` },
  { id: "su4", category: "soups", name: "Том-ям с рисом", description: "Острый тайский суп с креветками и рисом", price: 4390, image: `${PHOTO_BASE}/soups/01.jpg`, spicy: true },
  { id: "su5", category: "soups", name: "Суп с фрикадельками", description: "Домашние фрикадельки, овощи, зелень", price: 2200, image: `${PHOTO_BASE}/extras/004.jpg` },
  { id: "su6", category: "soups", name: "Куриный суп-лапша", description: "Прозрачный бульон, домашняя лапша, курица", price: 2200, image: `${PHOTO_BASE}/soups/06.jpg` },
  { id: "su7", category: "soups", name: "Похмельный супчик", description: "Острый, наваристый — идеален для бодрого утра", price: 2500, image: `${PHOTO_BASE}/soups/03.jpg`, spicy: true },

  // ============ ЗАКУСКИ ============
  { id: "st1", category: "starters", name: "Овощная нарезка", description: "Огурец, томат, болгарский перец, зелень, редис", price: 2790, image: `${PHOTO_BASE}/starters/01.jpg` },
  { id: "st2", category: "starters", name: "Русская закуска", description: "Сало, селёдка под лучком, малосольный огурец", price: 3890, image: `${PHOTO_BASE}/starters/02.jpg` },
  { id: "st3", category: "starters", name: "Закуска к вину", description: "Ассорти сыров, виноград, мёд, орехи", price: 7590, image: `${PHOTO_BASE}/starters/03.jpg` },
  { id: "st4", category: "starters", name: "Перчики тонато", description: "Сладкие перцы с соусом тоннато из тунца", price: 4100, image: `${PHOTO_BASE}/starters/04.jpg` },
  { id: "st5", category: "starters", name: "Рыбные стрипсы", description: "Хрустящие полоски белой рыбы, соус тартар", price: 2500, image: `${PHOTO_BASE}/hot/10.jpg` },
  { id: "st6", category: "starters", name: "Куриные наггетсы", description: "В пряной панировке, соусы на выбор", price: 1600, image: `${PHOTO_BASE}/hot/01.jpg` },
  { id: "st7", category: "starters", name: "Хрустящие гренки", description: "Ржаной хлеб с чесноком и сырным соусом", price: 1190, image: `${PHOTO_BASE}/hot/02.jpg` },
  { id: "st8", category: "starters", name: "Луковые кольца", description: "В золотистом кляре, соус ранч", price: 1590, image: `${PHOTO_BASE}/hot/03.jpg` },
  { id: "st9", category: "starters", name: "Жареный чечил", description: "Копчёный сыр чечил во фритюре", price: 1390, image: `${PHOTO_BASE}/hot/04.jpg` },
  { id: "st10", category: "starters", name: "Сырные палочки", description: "Моцарелла во фритюре, клюквенный соус", price: 2300, image: `${PHOTO_BASE}/hot/05.jpg` },
  { id: "st11", category: "starters", name: "Пивные креветки", description: "Отваренные креветки с лимоном и специями", price: 5890, image: `${PHOTO_BASE}/hot/06.jpg` },
  { id: "st12", category: "starters", name: "Креветки темпура", description: "Тигровые креветки в темпуре, соус sweet chili", price: 3900, image: `${PHOTO_BASE}/hot/09.jpg` },
  { id: "st13", category: "starters", name: "Ассорти колбасок", description: "Микс жареных колбасок с горчицей и квашеной капустой", price: 5500, image: `${PHOTO_BASE}/hot/08.jpg` },

  // ============ ПАСТА ============
  { id: "pa1", category: "pasta", name: "Спагетти болоньезе", description: "Мраморная говядина, томлёный соус 6 часов", price: 2600, image: `${PHOTO_BASE}/pasta/01.jpg` },
  { id: "pa2", category: "pasta", name: "Феттучини с курицей и грибами", description: "Нежная курица, шампиньоны, сливочный соус", price: 3190, image: `${PHOTO_BASE}/pasta/06.jpg` },
  { id: "pa3", category: "pasta", name: "Паста с лососем и соусом песто", description: "Норвежский лосось, базилик, кедровый орех", price: 3790, image: `${PHOTO_BASE}/pasta/05.jpg` },
  { id: "pa4", category: "pasta", name: "Паста с фрикадельками", description: "Домашние фрикадельки в томатном соусе", price: 2100, image: `${PHOTO_BASE}/pasta/02.jpg` },
  { id: "pa5", category: "pasta", name: "Паппарделле с кониной", description: "Широкая лапша с томлёной кониной", price: 2900, image: `${PHOTO_BASE}/pasta/03.jpg` },
  { id: "pa6", category: "pasta", name: "Паста с морепродуктами", description: "Кальмар, креветки, мидии, томатно-сливочный соус", price: 3890, image: `${PHOTO_BASE}/pasta/04.jpg` },

  // ============ ПИЦЦА И БУРГЕРЫ ============
  { id: "pz1", category: "pizza", name: "Пицца «Пепперони» 30 см", description: "Острая пепперони, томатный соус, моцарелла", price: 3590, image: `${PHOTO_BASE}/pizza/01.jpg` },
  { id: "pz2", category: "pizza", name: "Пицца «Болоньезе» 30 см", description: "Мясной соус болоньезе, моцарелла, базилик", price: 3200, image: `${PHOTO_BASE}/pizza/06.jpg` },
  { id: "pz3", category: "pizza", name: "Пицца «Охотничья» 30 см", description: "Охотничьи колбаски, маринованные огурцы, моцарелла", price: 4100, image: `${PHOTO_BASE}/pizza/07.jpg` },
  { id: "pz4", category: "pizza", name: "Пицца «Курица с грибами» 30 см", description: "Курица, шампиньоны, моцарелла, сливочный соус", price: 3790, image: `${PHOTO_BASE}/pizza/02.jpg` },
  { id: "pz5", category: "pizza", name: "Пицца с голубым сыром и медовой грушей 30 см", description: "Дор блю, груша в мёду, моцарелла, тимьян", price: 4290, image: `${PHOTO_BASE}/pizza/08.jpg` },
  { id: "pz6", category: "pizza", name: "Пицца «Маргарита» 30 см", description: "Моцарелла фьор ди латте, томаты, базилик", price: 3100, image: `${PHOTO_BASE}/pizza/03.jpg` },
  { id: "pz7", category: "pizza", name: "Бургер с рваной говядиной", description: "Томлёная говядина, BBQ, карамелизированный лук", price: 4090, image: `${PHOTO_BASE}/pizza/04.jpg` },
  { id: "pz8", category: "pizza", name: "Бургер Sollmarine Fish", description: "Котлета из белой рыбы, тартар, огурец, салат", price: 3990, image: `${PHOTO_BASE}/pizza/05.jpg` },

  // ============ МЯСО · ПТИЦА ============
  { id: "me1", category: "meat", name: "Мясо по-строгановски с пюре", description: "Бефстроганов в сливочно-горчичном соусе с пюре", price: 3900, image: `${PHOTO_BASE}/meat/01.jpg` },
  { id: "me2", category: "meat", name: "Говяжьи рёбра с молодым картофелем", description: "Томлёные 6 часов, BBQ соус, молодой картофель", price: 6990, image: `${PHOTO_BASE}/meat/05.jpg` },
  { id: "me3", category: "meat", name: "Томлёная конина в соусе чимичури", description: "Нежная конина с пряным аргентинским соусом", price: 6900, image: `${PHOTO_BASE}/meat/02.jpg` },
  { id: "me4", category: "meat", name: "Стейк Рибай", description: "Мраморная говядина, выдержка, средняя прожарка", price: 9700, image: `${PHOTO_BASE}/meat/06.jpg` },
  { id: "me5", category: "meat", name: "Стейк Т-бон", description: "Говядина на кости, соус на выбор", price: 9700, image: `${PHOTO_BASE}/meat/07.jpg` },
  { id: "me6", category: "meat", name: "Стейк Шато", description: "Премиальный отруб филе-миньон", price: 6990, image: `${PHOTO_BASE}/meat/03.jpg` },
  { id: "me7", category: "meat", name: "Шеф-стейк конины", description: "Авторский стейк из выдержанной конины", price: 7900, image: `${PHOTO_BASE}/meat/04.jpg` },
  { id: "me8", category: "meat", name: "Цыплёнок гриль с овощами", description: "Сочный цыплёнок с овощами гриль", price: 3270, image: `${PHOTO_BASE}/poultry/01.jpg` },
  { id: "me9", category: "meat", name: "Курица по-милански", description: "Куриное филе в панировке, томаты, моцарелла", price: 3270, image: `${PHOTO_BASE}/poultry/02.jpg` },
  { id: "me10", category: "meat", name: "Перепёлка со сливочным портобелло", description: "Запечённая перепёлка с соусом из портобелло", price: 2890, image: `${PHOTO_BASE}/poultry/03.jpg` },
  { id: "me11", category: "meat", name: "Фрикасе с блинчиками", description: "Куриное фрикасе в сливочном соусе с блинами", price: 2500, image: `${PHOTO_BASE}/poultry/05.jpg` },
  { id: "me12", category: "meat", name: "Куриные фрикадельки с пюре", description: "Нежные фрикадельки и картофельное пюре", price: 2000, image: `${PHOTO_BASE}/poultry/04.jpg` },
  { id: "me13", category: "meat", name: "Крылышки «Баффало»", description: "В остром соусе баффало, соус блю чиз", price: 3270, image: `${PHOTO_BASE}/extras/005.jpg`, spicy: true },

  // ============ РЫБА · ОСЁТР ============
  { id: "fi1", category: "fish", name: "Сазан жареный / запечённый", description: "Каспийский сазан с овощами и лимоном", price: 6000, image: `${PHOTO_BASE}/fish/03.jpg` },
  { id: "fi2", category: "fish", name: "Кефаль жареная / запечённая", description: "Свежая кефаль с лимоном и травами", price: 3300, image: `${PHOTO_BASE}/fish/02.jpg` },
  { id: "fi3", category: "fish", name: "Судак жареный / запечённый", description: "Нежное филе судака с лимонным соусом", price: 4190, image: `${PHOTO_BASE}/extras/006.jpg` },
  { id: "fi4", category: "fish", name: "Стейк из сёмги", description: "Норвежская сёмга, овощи гриль, цитрусовый соус", price: 6590, image: `${PHOTO_BASE}/extras/007.jpg` },
  { id: "fi5", category: "fish", name: "Дорадо запечённая", description: "Дорадо на соли с травами Прованса", price: 7390, image: `${PHOTO_BASE}/fish/01.jpg` },
  { id: "fi6", category: "fish", name: "Сибас запечённый", description: "Сибас в соляной корке с лимоном", price: 6290, image: `${PHOTO_BASE}/fish/04.jpg` },
  { id: "fi7", category: "fish", name: "Стейк осетра со спаржей", description: "Сочный стейк осетра с гриль-спаржей", price: 6900, image: `${PHOTO_BASE}/sturgeon/03.jpg` },
  { id: "fi8", category: "fish", name: "Осётр гречотто", description: "Филе осетра на гречневом ризотто со сливками", price: 6490, image: `${PHOTO_BASE}/sturgeon/02.jpg` },
  { id: "fi9", category: "fish", name: "Гёдза с осетром", description: "Японские пельмени гёдза с начинкой из осетра", price: 4100, image: `${PHOTO_BASE}/sturgeon/01.jpg` },
  { id: "fi10", category: "fish", name: "Тельное из осетра", description: "Русское фирменное блюдо — фарш из осетра в тесте", price: 4200, image: `${PHOTO_BASE}/sturgeon/04.jpg` },
  { id: "fi11", category: "fish", name: "Фишбармак из осетра", description: "Авторский фишбармак на основе осетрины", price: 4500, image: `${PHOTO_BASE}/sturgeon/05.jpg` },

  // ============ СЕТЫ · БАНКЕТЫ ============
  { id: "se1", category: "sets", name: "Малый рыбный сет", description: "На 2–3 гостей: ассорти рыбных блюд", price: 11490, image: `${PHOTO_BASE}/sets/02.jpg` },
  { id: "se2", category: "sets", name: "Сет из птицы", description: "На 4–5 гостей: микс блюд из птицы", price: 16900, image: `${PHOTO_BASE}/extras/008.jpg` },
  { id: "se3", category: "sets", name: "Большой рыбный сет", description: "На 4–5 гостей: разнообразие рыбных деликатесов", price: 36000, image: `${PHOTO_BASE}/sets/01.jpg` },
  { id: "se4", category: "sets", name: "Сет из мяса", description: "На 5–6 гостей: премиальные мясные блюда", price: 37900, image: `${PHOTO_BASE}/extras/009.jpg` },
  { id: "se5", category: "sets", name: "Осетрина с рисом и овощами (1,5 кг)", description: "Банкетное блюдо на 5–6 гостей", price: 39900, image: `${PHOTO_BASE}/extras/010.jpg` },
  { id: "se6", category: "sets", name: "Запечённая баранья нога с овощами (4 кг)", description: "Банкетное блюдо на 5–6 гостей", price: 44500, image: `${PHOTO_BASE}/extras/011.jpg` },
  { id: "se7", category: "sets", name: "Бешбармак", description: "Традиционный казахский бешбармак", price: 33500, image: `${PHOTO_BASE}/extras/012.jpg` },
  { id: "se8", category: "sets", name: "Фишбармак", description: "Авторский рыбный бешбармак", price: 39000, image: `${PHOTO_BASE}/extras/013.jpg` },
  { id: "se9", category: "sets", name: "Куырдак из баранины", description: "Традиционное казахское блюдо из баранины", price: 36900, image: `${PHOTO_BASE}/extras/014.jpg` },

  // ============ ГАРНИРЫ ============
  { id: "sd1", category: "sides", name: "Брокколи в соусе", description: "Хрустящая брокколи в фирменном соусе", price: 1900, image: `${PHOTO_BASE}/sides/01.jpg` },
  { id: "sd2", category: "sides", name: "Картофельные шарики", description: "Хрустящие шарики с сыром", price: 1290, image: `${PHOTO_BASE}/sides/02.jpg` },
  { id: "sd3", category: "sides", name: "Картофельные дипперы", description: "Хрустящие картофельные дольки", price: 1490, image: `${PHOTO_BASE}/extras/015.jpg` },
  { id: "sd4", category: "sides", name: "Рис припущенный", description: "Длиннозерный рис с маслом", price: 790, image: `${PHOTO_BASE}/extras/016.jpg` },
  { id: "sd5", category: "sides", name: "Картофельное пюре", description: "Нежное пюре со сливками", price: 790, image: `${PHOTO_BASE}/extras/017.jpg` },
  { id: "sd6", category: "sides", name: "Овощи гриль", description: "Баклажан, цукини, перец, томат", price: 1790, image: `${PHOTO_BASE}/sides/03.jpg` },
  { id: "sd7", category: "sides", name: "Молодой картофель", description: "С укропом и сливочным маслом", price: 990, image: `${PHOTO_BASE}/extras/018.jpg` },
  { id: "sd8", category: "sides", name: "Спаржа", description: "Зелёная спаржа на гриле", price: 2490, image: `${PHOTO_BASE}/extras/019.jpg` },
  { id: "sd9", category: "sides", name: "Свежевыпеченный хлеб", description: "Домашний хлеб из печи", price: 450, image: `${PHOTO_BASE}/extras/020.jpg` },

  // ============ СОУСЫ ============
  { id: "sc1", category: "sauces", name: "Чесночный", description: "Сливочный соус с чесноком", price: 400, image: IMG.sauces },
  { id: "sc2", category: "sauces", name: "Шрирача-микс", description: "Острый шрирача с томатом", price: 400, image: IMG.sauces, spicy: true },
  { id: "sc3", category: "sauces", name: "Кетчуп", description: "Томатный кетчуп", price: 400, image: IMG.sauces },
  { id: "sc4", category: "sauces", name: "Табаско", description: "Острый табаско", price: 400, image: IMG.sauces, spicy: true },
  { id: "sc5", category: "sauces", name: "Тар-тар", description: "Классический тар-тар", price: 400, image: IMG.sauces },
  { id: "sc6", category: "sauces", name: "Сырный", description: "Соус на основе сыра чеддер", price: 400, image: IMG.sauces },
  { id: "sc7", category: "sauces", name: "BBQ", description: "Барбекю с дымным ароматом", price: 400, image: IMG.sauces },

  // ============ ДЕСЕРТЫ ============
  { id: "ds1", category: "desserts", name: "Десерт дня", description: "Уточняйте у официанта", price: 1900, image: `${PHOTO_BASE}/extras/021.jpg` },
  { id: "ds2", category: "desserts", name: "Мороженое", description: "Ассорти шариков мороженого", price: 1680, image: `${PHOTO_BASE}/extras/022.jpg` },
  { id: "ds3", category: "desserts", name: "Фруктовое ассорти", description: "Сезонные фрукты на льду", price: 4900, image: `${PHOTO_BASE}/extras/023.jpg` },

  // ============ БЕЗАЛКОГОЛЬНЫЕ НАПИТКИ ============
  // Лимонады 1000 мл
  { id: "lm1", category: "nonalc", name: "Лимонад «Груша-бузина» 1 л", description: "Освежающий лимонад с грушей и бузиной", price: 2800, image: IMG.lemonadeYellow },
  { id: "lm2", category: "nonalc", name: "Лимонад «Киви-яблоко» 1 л", description: "Зелёный микс киви и яблока", price: 2800, image: IMG.lemonadeGreen },
  { id: "lm3", category: "nonalc", name: "Лимонад «Смородина-маракуйя» 1 л", description: "Тропическая смородина с маракуйей", price: 2800, image: IMG.lemonadeRed },
  { id: "lm4", category: "nonalc", name: "Лимонад ягодный 1 л", description: "Микс свежих ягод", price: 2800, image: IMG.lemonadeBerry },
  // Смузи
  { id: "sm1", category: "nonalc", name: "Смузи «Ананас-щавель»", description: "Свежий ананас с щавелем", price: 2500, image: IMG.smoothiePineapple },
  { id: "sm2", category: "nonalc", name: "Смузи «Клубника-банан»", description: "Сладкий и сливочный микс", price: 2300, image: IMG.smoothieStrawberry },
  { id: "sm3", category: "nonalc", name: "Смузи «Тропический»", description: "Манго, маракуйя, ананас", price: 2300, image: IMG.smoothieTropical },
  { id: "sm4", category: "nonalc", name: "Смузи «Вишня-пряник»", description: "Вишня с пряничными нотами", price: 2200, image: IMG.smoothieCherry },
  // Молочные коктейли
  { id: "mk1", category: "nonalc", name: "Молочный «Орео-шоколад»", description: "Шоколад и печенье Орео", price: 2200, image: IMG.milkshake },
  { id: "mk2", category: "nonalc", name: "Молочный «Арахис-печенье»", description: "Арахисовая паста с печеньем", price: 2000, image: IMG.milkshake },
  { id: "mk3", category: "nonalc", name: "Молочный «Попкорн-ваниль»", description: "Сладкий попкорн и ваниль", price: 1900, image: IMG.milkshake },
  { id: "mk4", category: "nonalc", name: "Молочный «Банан-карамель»", description: "Спелый банан и солёная карамель", price: 2100, image: IMG.milkshake },
  { id: "mk5", category: "nonalc", name: "Молочный ягодный", description: "Микс свежих ягод и пломбира", price: 1900, image: IMG.milkshakeStraw },
  // Безалкогольные коктейли
  { id: "nc1", category: "nonalc", name: "Пина Колада (б/а)", description: "Кокос и ананас без алкоголя", price: 1900, image: IMG.pinaColadaMock },
  { id: "nc2", category: "nonalc", name: "Мохито (б/а)", description: "Мята, лайм, содовая", price: 2200, image: IMG.mojitoMock },
  { id: "nc3", category: "nonalc", name: "Фирменный (б/а)", description: "Авторский безалкогольный микс", price: 2300, image: IMG.signature },

  // ============ КОФЕ ============
  { id: "co1", category: "coffee", name: "Эспрессо", description: "Классический эспрессо", price: 700, image: IMG.espresso },
  { id: "co2", category: "coffee", name: "Американо", description: "Эспрессо с горячей водой", price: 1000, image: IMG.americano },
  { id: "co3", category: "coffee", name: "Капучино", description: "Эспрессо с молочной пенкой", price: 1200, image: IMG.cappuccino },
  { id: "co4", category: "coffee", name: "Латте", description: "Молочный кофе на эспрессо", price: 1200, image: IMG.latte },
  { id: "co5", category: "coffee", name: "Раф", description: "Сливочный кофе с ванилью", price: 1600, image: IMG.raf },
  { id: "co6", category: "coffee", name: "Фраппучино", description: "Холодный кофе со льдом и сливками", price: 1200, image: IMG.frappuccino },
  { id: "co7", category: "coffee", name: "Айс-кофе", description: "Кофе со льдом", price: 1300, image: IMG.iceCoffee },
  { id: "co8", category: "coffee", name: "Горячий шоколад", description: "Густой шоколад со сливками", price: 1800, image: IMG.hotChocolate },
  { id: "co9", category: "coffee", name: "Глинтвейн на белом вине", description: "С пряностями и цитрусами", price: 2700, image: IMG.gluhwein },
  { id: "co10", category: "coffee", name: "Глинтвейн на красном вине", description: "Классический рождественский напиток", price: 2700, image: IMG.gluhwein },

  // ============ ЧАЙ ============
  { id: "te1", category: "tea", name: "Чёрный чай Кения", description: "Крепкий чёрный чай высокого сорта", price: 2200, image: IMG.teaBlack },
  { id: "te2", category: "tea", name: "Эрл Грей", description: "Чёрный чай с бергамотом", price: 2200, image: IMG.teaBlack },
  { id: "te3", category: "tea", name: "Зелёный Мао Фен Луй Ча", description: "Премиальный зелёный чай", price: 2200, image: IMG.teaGreen },
  { id: "te4", category: "tea", name: "Ромашковый", description: "Успокаивающий чай с ромашкой", price: 2200, image: IMG.teaHerbal },
  { id: "te5", category: "tea", name: "Ройбуш вишня", description: "Африканский ройбуш с вишней", price: 2200, image: IMG.teaFruit },
  { id: "te6", category: "tea", name: "Ягодный дайкири", description: "Чай с ягодным букетом", price: 2200, image: IMG.teaFruit },
  { id: "te7", category: "tea", name: "Манговый улун", description: "Улун с тропическим манго", price: 2200, image: IMG.teaGreen },
  { id: "te8", category: "tea", name: "Жасмин", description: "Зелёный чай с жасмином", price: 2200, image: IMG.teaGreen },
  { id: "te9", category: "tea", name: "Relax", description: "Травяной успокаивающий сбор", price: 2200, image: IMG.teaHerbal },
  { id: "te10", category: "tea", name: "Генмайча", description: "Японский чай с обжаренным рисом", price: 2200, image: IMG.teaGreen },
  // Китайская чайная церемония
  { id: "te11", category: "tea", name: "Пуэр (церемония)", description: "Китайская церемония с выдержанным пуэром", price: 2500, image: IMG.teaPuer },
  { id: "te12", category: "tea", name: "Габа (церемония)", description: "Тайваньский улун с высоким содержанием габа", price: 2500, image: IMG.teaPuer },
  { id: "te13", category: "tea", name: "Да Хун Пао (церемония)", description: "Знаменитый утёсный чай", price: 2500, image: IMG.teaPuer },
  // Фирменные чаи
  { id: "te14", category: "tea", name: "Ташкентский", description: "Чёрный чай со специями и лимоном", price: 2000, image: IMG.teaTashkent },
  { id: "te15", category: "tea", name: "Марокканский", description: "Зелёный чай с мятой и сахаром", price: 2000, image: IMG.teaTashkent },
  { id: "te16", category: "tea", name: "Ягодный (фирменный)", description: "Чай с ягодным миксом", price: 2200, image: IMG.teaFruit },
  { id: "te17", category: "tea", name: "Фруктовый", description: "Чай с фруктовым ассорти", price: 2000, image: IMG.teaFruit },
  { id: "te18", category: "tea", name: "Масала", description: "Индийский чай со специями", price: 2200, image: IMG.teaTashkent },
  { id: "te19", category: "tea", name: "Чабрец-вишня", description: "Чабрец с вишней", price: 2400, image: IMG.teaFruit },
  { id: "te20", category: "tea", name: "Чай по-казахски", description: "Чёрный чай с молоком и солью", price: 2000, image: IMG.teaTashkent },

  // ============ ПИВО ============
  { id: "be1", category: "beer", name: "Carlsberg (бут.)", description: "Датский лагер", price: 1200, image: IMG.beerLager },
  { id: "be2", category: "beer", name: "Kronenbourg 1664 (бут.)", description: "Французский лагер", price: 1400, image: IMG.beerPint },
  { id: "be3", category: "beer", name: "Asahi (бут.)", description: "Японский премиум-лагер", price: 2700, image: IMG.beerLager },
  { id: "be4", category: "beer", name: "Kozel (бут.)", description: "Чешский тёмный лагер", price: 1800, image: IMG.beerKozel },
  { id: "be5", category: "beer", name: "Tsingtao (бут.)", description: "Китайский премиум-лагер", price: 2900, image: IMG.beerLager },
  { id: "be6", category: "beer", name: "Corona Extra (бут.)", description: "Мексиканское пиво", price: 3000, image: IMG.beerCorona },
  { id: "be7", category: "beer", name: "Zatecky Gus (разливное)", description: "Чешский лагер из крана", price: 1100, image: IMG.beerDraft },

  // ============ КРЕПКОЕ ============
  // Водка
  { id: "sp1", category: "spirits", name: "Водка Absolut", description: "Шведская премиум-водка", price: 1500, image: IMG.vodka },
  { id: "sp2", category: "spirits", name: "Absolut Wild Berri", description: "Со вкусом дикой ягоды", price: 1700, image: IMG.vodka },
  { id: "sp3", category: "spirits", name: "Русский Стандарт", description: "Премиальная русская водка", price: 1800, image: IMG.vodka },
  { id: "sp4", category: "spirits", name: "Reyka", description: "Исландская премиум-водка", price: 2800, image: IMG.vodka },
  { id: "sp5", category: "spirits", name: "Nemiroff Delicate", description: "Украинская водка деликатная", price: 1300, image: IMG.vodka },
  // Виски шотландский
  { id: "sp6", category: "spirits", name: "Ballantine's Finest", description: "Шотландский купажированный виски", price: 1700, image: IMG.whisky },
  { id: "sp7", category: "spirits", name: "Chivas Regal 12 y.o.", description: "Премиум-купаж выдержки 12 лет", price: 3700, image: IMG.whisky },
  { id: "sp8", category: "spirits", name: "The Glenlivet Founder's Reserve", description: "Односолодовый Спейсайд", price: 5100, image: IMG.whisky },
  { id: "sp9", category: "spirits", name: "Monkey Shoulder", description: "Тройной купаж односолодовых", price: 4400, image: IMG.whisky },
  // Виски ирландский
  { id: "sp10", category: "spirits", name: "Jameson", description: "Классический ирландский виски", price: 2400, image: IMG.whiskyIrish },
  { id: "sp11", category: "spirits", name: "Jameson Black Barrel", description: "Двойная выдержка в чёрной бочке", price: 3600, image: IMG.whiskyIrish },
  // Теннесси
  { id: "sp12", category: "spirits", name: "Jack Daniel's Old No.7", description: "Классика Tennessee", price: 3279, image: IMG.whiskyTenn },
  { id: "sp13", category: "spirits", name: "Jack Daniel's Apple", description: "С яблочным вкусом", price: 3279, image: IMG.whiskyTenn },
  { id: "sp14", category: "spirits", name: "Jack Daniel's Honey", description: "С медовой ноткой", price: 3279, image: IMG.whiskyTenn },
  // Текила
  { id: "sp15", category: "spirits", name: "Olmeca Silver", description: "Серебряная текила blanco", price: 1850, image: IMG.tequila },
  { id: "sp16", category: "spirits", name: "Olmeca Gold", description: "Золотая текила reposado", price: 1900, image: IMG.tequila },
  // Джин
  { id: "sp17", category: "spirits", name: "Beefeater", description: "Лондонский сухой джин", price: 1750, image: IMG.gin },
  { id: "sp18", category: "spirits", name: "Beefeater Pink Strawberry", description: "С нотами клубники", price: 1750, image: IMG.gin },
  { id: "sp19", category: "spirits", name: "Hendrick's", description: "Шотландский премиум-джин с огурцом", price: 4800, image: IMG.gin },
  // Ром
  { id: "sp20", category: "spirits", name: "Lamb's Spiced", description: "Карибский пряный ром", price: 1450, image: IMG.rum },
  // Бренди
  { id: "sp21", category: "spirits", name: "Ararat 5 y.o.", description: "Армянский бренди выдержки 5 лет", price: 1900, image: IMG.brandy },
  { id: "sp22", category: "spirits", name: "Ararat Apricot", description: "Бренди с абрикосовой ноткой", price: 2200, image: IMG.brandy },

  // ============ КОКТЕЙЛИ ============
  // Классические
  { id: "ck1", category: "cocktails", name: "Mai Tai", description: "Ром, ликёр, миндальный сироп, цитрус", price: 2100, image: IMG.maitai },
  { id: "ck2", category: "cocktails", name: "Mojito", description: "Ром, мята, лайм, содовая", price: 2600, image: IMG.mojito },
  { id: "ck3", category: "cocktails", name: "Pina Colada", description: "Ром, кокосовый крем, ананас", price: 1800, image: IMG.pinaColada },
  { id: "ck4", category: "cocktails", name: "Tequila Sunrise", description: "Текила, апельсиновый сок, гренадин", price: 2400, image: IMG.tequilaSunrise },
  { id: "ck5", category: "cocktails", name: "Negroni", description: "Джин, Кампари, красный вермут", price: 2700, image: IMG.negroni },
  { id: "ck6", category: "cocktails", name: "Screwdriver", description: "Водка и апельсиновый сок", price: 2200, image: IMG.screwdriver },
  { id: "ck7", category: "cocktails", name: "Margarita", description: "Текила, трипл-сек, лайм, солёный край", price: 2800, image: IMG.margarita },
  // Авторские
  { id: "ck8", category: "cocktails", name: "Астрономия", description: "Авторский коктейль с цитрусами", price: 3200, image: IMG.authorCocktail },
  { id: "ck9", category: "cocktails", name: "Японский пирог", description: "Фирменный микс с японскими нотами", price: 3800, image: IMG.authorCocktail },
  { id: "ck10", category: "cocktails", name: "Sollmarine", description: "Фирменный коктейль ресторана", price: 3600, image: IMG.authorCocktail },
  // На игристом
  { id: "ck11", category: "cocktails", name: "Aperol Spritz", description: "Aperol, просекко, содовая", price: 2800, image: IMG.aperol },
  { id: "ck12", category: "cocktails", name: "Sarti Spritz", description: "Sarti, просекко, содовая", price: 2600, image: IMG.spritz },
  { id: "ck13", category: "cocktails", name: "Hugo", description: "Просекко, бузина, мята, содовая", price: 2100, image: IMG.hugo },

  // ============ ВИНО ПО БОКАЛАМ ============
  { id: "wn1", category: "wine", name: "Canti Merlot (полусладкое)", description: "Итальянское полусладкое красное", price: 2100, image: IMG.wineRed },
  { id: "wn2", category: "wine", name: "San Valentin (сухое)", description: "Испанское сухое красное", price: 2870, image: IMG.wineRed },
  { id: "wn3", category: "wine", name: "Canti Chardonnay (полусладкое)", description: "Итальянское полусладкое белое", price: 2100, image: IMG.wineWhite },
  { id: "wn4", category: "wine", name: "San Valentin (сухое белое)", description: "Испанское сухое белое", price: 2870, image: IMG.wineWhite },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1571936979636-c6c5e345fb73?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMG95c3RlcnMlMjBsdXh1cnklMjBwbGF0aW5nfGVufDB8fHx8MTc3Nzk4MjQ2MHww&ixlib=rb-4.1.0&q=85&w=1000",
];

export const reviews = [
  { id: 1, name: "Алия Б.", rating: 5, text: "Были семьёй — невероятный осётр с гречотто и гостеприимный сервис. Детская зона спасла вечер, родители спокойно поели.", date: "12 января" },
  { id: 2, name: "Даурен К.", rating: 5, text: "Лучшие стейки в Актау! Рибай идеально прожарен, живая музыка создаёт атмосферу. Спасибо Sollmarine!", date: "28 января" },
  { id: 3, name: "Айгуль М.", rating: 5, text: "Рыба всегда свежайшая, суп Том Ям восхитительный. Бронирую каждый раз заранее.", date: "5 февраля" },
  { id: 4, name: "Ержан С.", rating: 5, text: "Были на дне рождения в VIP-зале. Всё на высоте — еда, обслуживание, атмосфера. Рекомендую всем!", date: "10 февраля" },
];

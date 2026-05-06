export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // in Kazakhstani Tenge (KZT)
  image: string;
  category: string;
  spicy?: boolean;
};

export const categories = [
  { key: "salads", label: "Салаты" },
  { key: "starters", label: "Закуски" },
  { key: "beer", label: "К пиву" },
  { key: "soups", label: "Супы" },
  { key: "sets", label: "Сеты" },
  { key: "steaks", label: "Стейки" },
  { key: "hot", label: "Горячее" },
  { key: "burgers", label: "Бургеры" },
  { key: "pasta", label: "Паста" },
  { key: "pizza", label: "Пицца" },
  { key: "kids", label: "Детское" },
  { key: "sides", label: "Гарниры" },
];

const IMG = {
  // Salads
  seafoodSalad: "https://images.unsplash.com/photo-1623428454614-abaf00244e52?w=800&auto=format&fit=crop&q=75",
  arugulaSalmon: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=75",
  eggplantSalad: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=75",
  greek: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=75",
  achuchuk: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&auto=format&fit=crop&q=75",
  caesarChicken: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop&q=75",
  caesarShrimp: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&auto=format&fit=crop&q=75",

  // Starters
  veggieCut: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=75",
  russianStarter: "https://images.unsplash.com/photo-1601001815894-4bb6c81416d7?w=800&auto=format&fit=crop&q=75",
  brusketta: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&auto=format&fit=crop&q=75",
  wineSnack: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&auto=format&fit=crop&q=75",
  meatCut: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=75",

  // Beer snacks
  beerSet: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&auto=format&fit=crop&q=75",
  fishStrips: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=800&auto=format&fit=crop&q=75",
  chickenStrips: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=75",
  onionRings: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&auto=format&fit=crop&q=75",
  garlicBread: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=800&auto=format&fit=crop&q=75",
  shrimpFried: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&auto=format&fit=crop&q=75",
  shrimpBeer: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=75",
  chechelCheese: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=800&auto=format&fit=crop&q=75",

  // Soups
  ramenChicken: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=800&auto=format&fit=crop&q=75",
  ramenBeef: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=75",
  lentilSoup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=75",
  tomyam: "https://images.unsplash.com/photo-1527603815363-e79385e6d099?w=800&auto=format&fit=crop&q=75",
  seafoodCream: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&auto=format&fit=crop&q=75",
  uha: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&auto=format&fit=crop&q=75",

  // Sets
  smallSet: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=75",
  mediumSet: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=75",
  bigSet: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=75",

  // Steaks
  ribeye: "https://images.unsplash.com/photo-1763186711083-406cf3ea5665?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc3RlYWslMjBmaW5lJTIwZGluaW5nfGVufDB8fHx8MTc3Nzk4MjQ2NXww&ixlib=rb-4.1.0&q=85&w=800",
  tbone: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=75",

  // Hot fish / meat
  osetrGrechotto: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&auto=format&fit=crop&q=75",
  kefal: "https://images.unsplash.com/photo-1535400875775-0fa7400903ea?w=800&auto=format&fit=crop&q=75",
  sazan: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=75",
  sudak: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&auto=format&fit=crop&q=75",
  karas: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&auto=format&fit=crop&q=75",
  osetrSteak: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=75",
  salmonSteak: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=75",
  beefRibs: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=800&auto=format&fit=crop&q=75",
  beefCheeks: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&auto=format&fit=crop&q=75",
  vealMedallions: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=75",
  pancakesFricassee: "https://images.unsplash.com/photo-1618040996337-17c8f7d92c8b?w=800&auto=format&fit=crop&q=75",
  boneMarrow: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=75",

  // Burgers
  burgerChicken: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=75",
  burgerFish: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&auto=format&fit=crop&q=75",
  burgerPulled: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=75",

  // Pasta
  pastaMeatPesto: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&auto=format&fit=crop&q=75",
  pastaSeafood: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&auto=format&fit=crop&q=75",
  pastaSalmon: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop&q=75",
  pastaChickenMushroom: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=75",

  // Pizza
  pizzaMargarita: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=75",
  pizzaChicken: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=75",
  pizza4cheese: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=75",
  pepperoni: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=75",
  pizzaSeafood: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=75",

  // Kids
  spaghettiKid: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop&q=75",
  nuggets: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=75",
  meatballSoup: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=75",
  meatballsPure: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=75",

  // Sides
  potatoDipper: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=75",
  grillVeg: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=75",
  rice: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=75",
  youngPotato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=75",
  flatbread: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=75",
  pure: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=75",
  potatoBalls: "https://images.unsplash.com/photo-1548340748-6d98e4c5bb1e?w=800&auto=format&fit=crop&q=75",
};

export const menu: MenuItem[] = [
  // --- Салаты ---
  { id: "sal1", category: "salads", name: "Салат с морепродуктами", description: "Кальмары, креветки, мидии, микс салатов, соус на основе морепродуктов", price: 3800, image: IMG.seafoodSalad },
  { id: "sal2", category: "salads", name: "Салат с рукколой и лососем", description: "Слабосоленый лосось, руккола, черри, кедровые орехи, заправка цитрусовая", price: 3500, image: IMG.arugulaSalmon },
  { id: "sal3", category: "salads", name: "Салат с хрустящими баклажанами", description: "Хрустящие баклажаны, томаты, кинза, острый соус", price: 2800, image: IMG.eggplantSalad },
  { id: "sal4", category: "salads", name: "Греческий", description: "Фета, маслины, огурец, томаты, красный лук, оливковое масло", price: 2600, image: IMG.greek },
  { id: "sal5", category: "salads", name: "Ачучук", description: "Классический узбекский салат — тонко нарезанные томаты и лук", price: 1900, image: IMG.achuchuk },
  { id: "sal6", category: "salads", name: "Цезарь с курицей", description: "Нежная курица, пармезан, чиабатта, соус цезарь", price: 3200, image: IMG.caesarChicken },
  { id: "sal7", category: "salads", name: "Цезарь с креветками", description: "Тигровые креветки, пармезан, чиабатта, соус цезарь", price: 3800, image: IMG.caesarShrimp },

  // --- Закуски ---
  { id: "st1", category: "starters", name: "Овощная нарезка", description: "Огурец, томат, болгарский перец, зелень, редис", price: 2200, image: IMG.veggieCut },
  { id: "st2", category: "starters", name: "Русская закуска", description: "Сало, селёдка под лучком, малосольный огурец, чеснок, хлеб", price: 3800, image: IMG.russianStarter },
  { id: "st3", category: "starters", name: "Брускетты с сёмгой гравлакс", description: "Тост, крем-сыр, сёмга гравлакс, руккола, лимон", price: 3500, image: IMG.brusketta },
  { id: "st4", category: "starters", name: "Закуска к вину", description: "Ассорти сыров, виноград, мёд, орехи", price: 4500, image: IMG.wineSnack },
  { id: "st5", category: "starters", name: "Мясная нарезка", description: "Хамон, салями, бастурма, пармская ветчина", price: 4800, image: IMG.meatCut },

  // --- Закуски к пиву ---
  { id: "be1", category: "beer", name: "Пивной сет", description: "Ассорти закусок к пиву: стрипсы, кольца, сухарики, сыр", price: 4900, image: IMG.beerSet },
  { id: "be2", category: "beer", name: "Рыбные стрипсы", description: "Хрустящие полоски белой рыбы, соус тартар", price: 2500, image: IMG.fishStrips },
  { id: "be3", category: "beer", name: "Куриные стрипсы", description: "В пряной панировке, с соусами на выбор", price: 2200, image: IMG.chickenStrips },
  { id: "be4", category: "beer", name: "Луковые кольца", description: "В золотистом кляре, соус ранч", price: 1800, image: IMG.onionRings },
  { id: "be5", category: "beer", name: "Чесночные гренки", description: "Ржаной хлеб, сырный соус", price: 1500, image: IMG.garlicBread },
  { id: "be6", category: "beer", name: "Креветки в панировке", description: "Тигровые креветки во фритюре, соус sweet chili", price: 3500, image: IMG.shrimpFried },
  { id: "be7", category: "beer", name: "Пивные креветки", description: "Отваренные креветки с лимоном и специями", price: 3200, image: IMG.shrimpBeer },
  { id: "be8", category: "beer", name: "Жареный чечел", description: "Копчёный сыр чечил во фритюре", price: 2400, image: IMG.chechelCheese },

  // --- Супы ---
  { id: "so1", category: "soups", name: "Рамен с курицей", description: "Пряный бульон, лапша, курица, яйцо, нори", price: 2800, image: IMG.ramenChicken, spicy: true },
  { id: "so2", category: "soups", name: "Рамен с телятиной", description: "Наваристый бульон, лапша, телятина, ростки сои", price: 3200, image: IMG.ramenBeef, spicy: true },
  { id: "so3", category: "soups", name: "Чечевичный крем-суп", description: "Красная чечевица, копчёная паприка, гренки", price: 2200, image: IMG.lentilSoup, spicy: true },
  { id: "so4", category: "soups", name: "Том Ям", description: "Королевские креветки, кокосовое молоко, лайм, чили", price: 3800, image: IMG.tomyam, spicy: true },
  { id: "so5", category: "soups", name: "Сливочный суп с морепродуктами", description: "Кремовый бульон, мидии, кальмары, креветки, лосось", price: 3600, image: IMG.seafoodCream, spicy: true },
  { id: "so6", category: "soups", name: "Уха Царская", description: "Три вида рыбы, шафран, водка, зелень", price: 3200, image: IMG.uha },

  // --- Сеты на компанию ---
  { id: "set1", category: "sets", name: "Малый сет", description: "На 2–3 гостя: микс закусок и горячего", price: 14900, image: IMG.smallSet },
  { id: "set2", category: "sets", name: "Средний сет", description: "На 4–5 гостей: закуски + рыба + мясо + гарниры", price: 22900, image: IMG.mediumSet },
  { id: "set3", category: "sets", name: "Большой сет", description: "На 6+ гостей: полный стол с рыбой, мясом и сетом напитков", price: 34900, image: IMG.bigSet },

  // --- Стейки ---
  { id: "stk1", category: "steaks", name: "Рибай", description: "Мраморная говядина, 350 г, средняя прожарка", price: 13900, image: IMG.ribeye },
  { id: "stk2", category: "steaks", name: "Тибон", description: "350 г, говядина на кости, соус на выбор", price: 14900, image: IMG.tbone },

  // --- Горячие блюда ---
  { id: "ht1", category: "hot", name: "Осётр с гречотто", description: "Филе осетра на гречневом ризотто со сливками", price: 7900, image: IMG.osetrGrechotto },
  { id: "ht2", category: "hot", name: "Кефаль (жареная / запечённая)", description: "Свежая кефаль с лимоном и травами", price: 5600, image: IMG.kefal },
  { id: "ht3", category: "hot", name: "Сазан (жареный / запечённый)", description: "Каспийский сазан с овощами гриль", price: 6200, image: IMG.sazan },
  { id: "ht4", category: "hot", name: "Судак (жареный / запечённый)", description: "Нежное филе судака с лимонным соусом", price: 5900, image: IMG.sudak },
  { id: "ht5", category: "hot", name: "Карась (жареный / запечённый)", description: "По-домашнему, со сметаной и луком", price: 4900, image: IMG.karas },
  { id: "ht6", category: "hot", name: "Стейк из осетра", description: "Сочное филе осетра на гриле, соус на выбор", price: 8900, image: IMG.osetrSteak },
  { id: "ht7", category: "hot", name: "Стейк из сёмги", description: "Норвежская сёмга, овощи гриль, цитрусовый соус", price: 7900, image: IMG.salmonSteak },
  { id: "ht8", category: "hot", name: "Говяжьи рёбра", description: "Томлёные 6 часов, BBQ соус", price: 7200, image: IMG.beefRibs },
  { id: "ht9", category: "hot", name: "Говяжьи щёчки", description: "Нежные томлёные щёчки в красном вине", price: 6900, image: IMG.beefCheeks },
  { id: "ht10", category: "hot", name: "Медальоны из телятины", description: "Телятина на гриле, сливочно-грибной соус", price: 7400, image: IMG.vealMedallions },
  { id: "ht11", category: "hot", name: "Блинчики с фрикасе", description: "Тонкие блины, куриное фрикасе со сливками", price: 3200, image: IMG.pancakesFricassee },
  { id: "ht12", category: "hot", name: "Запечённый костный мозг", description: "С жареным хлебом, петрушкой и морской солью", price: 4200, image: IMG.boneMarrow },

  // --- Бургеры ---
  { id: "br1", category: "burgers", name: "Куриный бургер", description: "Сочная куриная котлета, салат, сыр чеддер, соус бургер", price: 2900, image: IMG.burgerChicken },
  { id: "br2", category: "burgers", name: "Рыбный бургер", description: "Котлета из белой рыбы, тартар, огурец, салат", price: 3200, image: IMG.burgerFish },
  { id: "br3", category: "burgers", name: "С рваной телятиной", description: "Томлёная телятина, BBQ, карамелизированный лук", price: 3800, image: IMG.burgerPulled },

  // --- Паста ---
  { id: "pa1", category: "pasta", name: "Спагетти с мясом и песто", description: "Рубленная говядина, соус песто, пармезан", price: 3600, image: IMG.pastaMeatPesto },
  { id: "pa2", category: "pasta", name: "Паста с морепродуктами", description: "Кальмар, креветки, мидии, томатно-сливочный соус", price: 4900, image: IMG.pastaSeafood },
  { id: "pa3", category: "pasta", name: "Лингвини с лососем", description: "Норвежский лосось, сливочный соус, укроп", price: 4500, image: IMG.pastaSalmon },
  { id: "pa4", category: "pasta", name: "Фетучини с курицей и грибами", description: "Нежная курица, шампиньоны, сливочный соус", price: 3800, image: IMG.pastaChickenMushroom },

  // --- Пицца ---
  { id: "pz1", category: "pizza", name: "Маргарита", description: "Моцарелла, томаты, базилик", price: 2800, image: IMG.pizzaMargarita },
  { id: "pz2", category: "pizza", name: "С курицей и грибами", description: "Курица, шампиньоны, моцарелла, сливочный соус", price: 3400, image: IMG.pizzaChicken },
  { id: "pz3", category: "pizza", name: "4 сыра", description: "Моцарелла, пармезан, горгонзола, дор блю", price: 3800, image: IMG.pizza4cheese },
  { id: "pz4", category: "pizza", name: "Пепперони", description: "Острая пепперони, томатный соус, орегано", price: 3500, image: IMG.pepperoni },
  { id: "pz5", category: "pizza", name: "С морепродуктами", description: "Креветки, мидии, кальмар, руккола", price: 4500, image: IMG.pizzaSeafood },

  // --- Детское меню ---
  { id: "k1", category: "kids", name: "Спагетти (томатный / сливочный)", description: "Классический детский вариант — нежная паста", price: 1800, image: IMG.spaghettiKid },
  { id: "k2", category: "kids", name: "Наггетсы", description: "Куриные наггетсы, соус кетчуп", price: 1900, image: IMG.nuggets },
  { id: "k3", category: "kids", name: "Суп с фрикадельками", description: "Домашние фрикадельки, овощи, зелень", price: 1600, image: IMG.meatballSoup },
  { id: "k4", category: "kids", name: "Фрикадельки с пюре", description: "Нежные фрикадельки и картофельное пюре", price: 2100, image: IMG.meatballsPure },

  // --- Гарниры ---
  { id: "g1", category: "sides", name: "Картофель дипперы", description: "Хрустящие картофельные дольки", price: 1200, image: IMG.potatoDipper },
  { id: "g2", category: "sides", name: "Овощи гриль", description: "Баклажан, цукини, перец, томат", price: 1600, image: IMG.grillVeg },
  { id: "g3", category: "sides", name: "Рис", description: "Пропаренный длиннозерный рис", price: 900, image: IMG.rice },
  { id: "g4", category: "sides", name: "Молодой картофель", description: "С укропом и сливочным маслом", price: 1400, image: IMG.youngPotato },
  { id: "g5", category: "sides", name: "Лепёшка", description: "Тандырная лепёшка свежей выпечки", price: 600, image: IMG.flatbread },
  { id: "g6", category: "sides", name: "Пюре", description: "Нежное картофельное пюре со сливками", price: 1100, image: IMG.pure },
  { id: "g7", category: "sides", name: "Картофельные шарики", description: "Хрустящие шарики с сыром", price: 1500, image: IMG.potatoBalls },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1571936979636-c6c5e345fb73?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMG95c3RlcnMlMjBsdXh1cnklMjBwbGF0aW5nfGVufDB8fHx8MTc3Nzk4MjQ2MHww&ixlib=rb-4.1.0&q=85&w=1000",
  "https://images.pexels.com/photos/19343364/pexels-photo-19343364.jpeg?auto=compress&cs=tinysrgb&w=1000",
  "https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwc2VhZm9vZCUyMGRpc2glMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3Nzc5ODI0NjB8MA&ixlib=rb-4.1.0&q=85&w=1000",
  "https://images.unsplash.com/photo-1680946496238-5272d3c407fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkYXJrJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fHx8MTc3Nzk4MjQ2NXww&ixlib=rb-4.1.0&q=85&w=1000",
  "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwyfHxmaW5lJTIwZGluaW5nJTIwc2FsbW9uJTIwdGFydGFyZXxlbnwwfHx8fDE3Nzc5ODI0NjB8MA&ixlib=rb-4.1.0&q=85&w=1000",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&auto=format&fit=crop&q=75",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&auto=format&fit=crop&q=75",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1000&auto=format&fit=crop&q=75",
];

export const reviews = [
  { id: 1, name: "Алия Б.", rating: 5, text: "Были семьёй — невероятный осётр с гречотто и гостеприимный сервис. Детская зона спасла вечер, родители спокойно поели.", date: "12 января" },
  { id: 2, name: "Даурен К.", rating: 5, text: "Лучшие стейки в Актау! Рибай идеально прожарен, живая музыка создаёт атмосферу. Спасибо Sollmarine!", date: "28 января" },
  { id: 3, name: "Айгуль М.", rating: 5, text: "Рыба всегда свежайшая, суп Том Ям восхитительный. Бронирую каждый раз заранее.", date: "5 февраля" },
  { id: 4, name: "Ержан С.", rating: 5, text: "Были на дне рождения в VIP-зале. Всё на высоте — еда, обслуживание, атмосфера. Рекомендую всем!", date: "10 февраля" },
];

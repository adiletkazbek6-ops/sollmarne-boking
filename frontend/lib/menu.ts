export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export const categories = [
  { key: "seafood", label: "Рыба и морепродукты", featured: true },
  { key: "steaks", label: "Стейки" },
  { key: "pizza", label: "Пицца" },
  { key: "pasta", label: "Паста" },
  { key: "ramen", label: "Рамен" },
  { key: "tomyam", label: "Том-ям" },
  { key: "salads", label: "Салаты и супы" },
  { key: "snacks", label: "Закуски" },
];

export const menu: MenuItem[] = [
  // Seafood
  { id: "s1", name: "Устрицы Fin de Claire", description: "6 шт. с лимоном и соусом миньонет", price: 2490, image: "https://images.unsplash.com/photo-1775481132664-53ce2276d0ee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG95c3RlcnMlMjBsdXh1cnklMjBwbGF0aW5nfGVufDB8fHx8MTc3Nzk4MjQ2MHww&ixlib=rb-4.1.0&q=85&w=800", category: "seafood" },
  { id: "s2", name: "Тартар из лосося", description: "С авокадо, чёрной икрой и тостами", price: 1290, image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwyfHxmaW5lJTIwZGluaW5nJTIwc2FsbW9uJTIwdGFydGFyZXxlbnwwfHx8fDE3Nzc5ODI0NjB8MA&ixlib=rb-4.1.0&q=85&w=800", category: "seafood" },
  { id: "s3", name: "Севиче из тунца", description: "Перуанский стиль, чили, кинза, лайм", price: 1390, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=75", category: "seafood" },
  { id: "s4", name: "Чёрная треска мисо", description: "24 часа маринования, ферментированное мисо", price: 2890, image: "https://images.unsplash.com/photo-1535400875775-0fa7400903ea?w=800&auto=format&fit=crop&q=75", category: "seafood" },
  { id: "s5", name: "Лобстер термидор", description: "Запечённый с соусом шампань и трюфелем", price: 4990, image: "https://images.unsplash.com/photo-1625943913038-9dd832e45f70?w=800&auto=format&fit=crop&q=75", category: "seafood" },
  { id: "s6", name: "Краб камчатский", description: "На пару с топлёным маслом и лимоном", price: 3890, image: "https://images.unsplash.com/photo-1559847844-d721426a4a3c?w=800&auto=format&fit=crop&q=75", category: "seafood" },
  { id: "s7", name: "Осьминог гриль", description: "С печёным картофелем и каперсами", price: 1990, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=75", category: "seafood" },
  { id: "s8", name: "Дорадо целиком", description: "Запечённая на соли с травами Прованса", price: 1890, image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&auto=format&fit=crop&q=75", category: "seafood" },

  // Steaks
  { id: "st1", name: "Рибай Прайм", description: "400 г, выдержка 30 дней, зерновой откорм", price: 3490, image: "https://images.unsplash.com/photo-1763186711083-406cf3ea5665?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc3RlYWslMjBmaW5lJTIwZGluaW5nfGVufDB8fHx8MTc3Nzk4MjQ2NXww&ixlib=rb-4.1.0&q=85&w=800", category: "steaks" },
  { id: "st2", name: "Нью-Йорк", description: "350 г, сливочное масло с травами", price: 2990, image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=75", category: "steaks" },
  { id: "st3", name: "Филе Миньон", description: "220 г, соус перечный или беарнез", price: 2790, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=75", category: "steaks" },
  { id: "st4", name: "Томагавк", description: "1,2 кг на двоих, 45 дней выдержки", price: 7990, image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&auto=format&fit=crop&q=75", category: "steaks" },

  // Pizza
  { id: "p1", name: "Маргарита", description: "Моцарелла фьор ди латте, томаты, базилик", price: 890, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=75", category: "pizza" },
  { id: "p2", name: "4 сыра", description: "Горгонзола, пармезан, моцарелла, дор блю", price: 1190, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=75", category: "pizza" },
  { id: "p3", name: "Пепперони", description: "Острая пепперони, томатный соус, орегано", price: 1090, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=75", category: "pizza" },
  { id: "p4", name: "С морепродуктами", description: "Креветки, мидии, кальмар, руккола", price: 1490, image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=75", category: "pizza" },

  // Pasta
  { id: "pa1", name: "Карбонара", description: "Гуанчиале, пекорино, яйцо, перец", price: 990, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=75", category: "pasta" },
  { id: "pa2", name: "Паста с лобстером", description: "Тальолини, сливочно-томатный соус", price: 2490, image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&auto=format&fit=crop&q=75", category: "pasta" },
  { id: "pa3", name: "Песто Генуэзе", description: "Базилик, кедровый орех, пармезан", price: 890, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&auto=format&fit=crop&q=75", category: "pasta" },
  { id: "pa4", name: "Болоньезе", description: "Мраморная говядина, томлёный соус 6 часов", price: 990, image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&auto=format&fit=crop&q=75", category: "pasta" },

  // Ramen
  { id: "r1", name: "Тонкоцу рамен", description: "Наваристый свиной бульон, чашу", price: 790, image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=800&auto=format&fit=crop&q=75", category: "ramen" },
  { id: "r2", name: "Мисо рамен", description: "Ферментированная мисо-паста, кукуруза", price: 790, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=75", category: "ramen" },
  { id: "r3", name: "Шою рамен", description: "Соевый бульон, курица, нори", price: 750, image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&auto=format&fit=crop&q=75", category: "ramen" },

  // Tom Yam
  { id: "t1", name: "Том-ям с креветками", description: "Тигровые креветки, грибы шиитаке", price: 990, image: "https://images.unsplash.com/photo-1527603815363-e79385e6d099?w=800&auto=format&fit=crop&q=75", category: "tomyam" },
  { id: "t2", name: "Том-ям с морепродуктами", description: "Микс морепродуктов, лайм, чили", price: 1290, image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=800&auto=format&fit=crop&q=75", category: "tomyam" },
  { id: "t3", name: "Том-ям с курицей", description: "Цыплёнок, кокосовое молоко", price: 790, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=75", category: "tomyam" },

  // Salads & soups
  { id: "sa1", name: "Цезарь с креветками", description: "Тигровые креветки, пармезан, чиабатта", price: 790, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop&q=75", category: "salads" },
  { id: "sa2", name: "Греческий", description: "Фета, маслины, томаты Черри", price: 690, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=75", category: "salads" },
  { id: "sa3", name: "Уха царская", description: "Три вида рыбы, шафран, водка", price: 890, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=75", category: "salads" },
  { id: "sa4", name: "Крем-суп из тыквы", description: "Трюфельное масло, тыквенные семечки", price: 590, image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&auto=format&fit=crop&q=75", category: "salads" },

  // Snacks
  { id: "sn1", name: "Сырные палочки", description: "Моцарелла во фритюре, клюквенный соус", price: 490, image: "https://images.unsplash.com/photo-1548340748-6d98e4c5bb1e?w=800&auto=format&fit=crop&q=75", category: "snacks" },
  { id: "sn2", name: "Куриные наггетсы", description: "10 шт., три соуса на выбор", price: 450, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=75", category: "snacks" },
  { id: "sn3", name: "Картофель фри", description: "С морской солью и розмарином", price: 290, image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=75", category: "snacks" },
  { id: "sn4", name: "Крылышки BBQ", description: "В соусе барбекю, свежий огурец", price: 590, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&auto=format&fit=crop&q=75", category: "snacks" },
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
  { id: 1, name: "Анна К.", rating: 5, text: "Потрясающее место! Свежайшие устрицы, идеальное обслуживание и невероятный вид. Обязательно вернусь.", date: "12 января" },
  { id: 2, name: "Дмитрий В.", rating: 5, text: "Томагавк прожарен идеально, лобстер термидор — просто сказка. Атмосфера премиум-уровня.", date: "28 января" },
  { id: 3, name: "Елена М.", rating: 5, text: "Были с детьми — детская комната и аниматоры выше всех похвал. Родителям дали спокойно поужинать.", date: "5 февраля" },
  { id: 4, name: "Сергей Л.", rating: 5, text: "Живая музыка по вечерам создаёт неповторимую атмосферу. Уха царская — это что-то волшебное.", date: "10 февраля" },
];

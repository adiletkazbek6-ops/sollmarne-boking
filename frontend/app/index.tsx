import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Platform,
  useWindowDimensions,
  Modal,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors, fonts, injectWebFonts } from "../lib/theme";
import { menu, categories, galleryImages, reviews, MenuItem } from "../lib/menu";

const API = (process.env.EXPO_PUBLIC_BACKEND_URL || "") + "/api";
const PHONE = "+7 708 180 68 25";
const PHONE_RAW = "+77081806825";
const WHATSAPP = "77081806825";
const INSTAGRAM = "https://instagram.com/sollmarine";
const ADDRESS = "Казахстан, Актау, ЖК Twin Towers, мкр 5А, дом 4";
const LANDMARK = "Ориентир: остановка «Сказка» — 1 мин / 70 м";

// ------ Small helpers ------
const fmt = (n: number) => `${n.toLocaleString("ru-RU")} ₸`;

type CartItem = MenuItem & { quantity: number };

// -------------- Header --------------
function Header({
  onBook,
  onOpenCart,
  cartCount,
  scrollTo,
  isMobile,
}: any) {
  const [open, setOpen] = useState(false);
  const links = [
    { k: "about", label: "О нас" },
    { k: "menu", label: "Меню" },
    { k: "delivery", label: "Доставка" },
    { k: "gallery", label: "Галерея" },
    { k: "contacts", label: "Контакты" },
  ];
  return (
    <View style={styles.header} testID="site-header">
      <View style={styles.headerInner}>
        <TouchableOpacity onPress={() => scrollTo("top")} testID="logo">
          <Text style={styles.logo}>
            SOLL<Text style={{ color: colors.gold }}>MARINE</Text>
          </Text>
        </TouchableOpacity>
        {!isMobile ? (
          <View style={styles.navRow}>
            {links.map((l) => (
              <TouchableOpacity key={l.k} onPress={() => scrollTo(l.k)} testID={`nav-${l.k}`}>
                <Text style={styles.navLink}>{l.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.cartBtn} onPress={onOpenCart} testID="open-cart">
            <Text style={styles.cartIcon}>◈</Text>
            {!isMobile && <Text style={styles.cartLabel}>Корзина</Text>}
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          {!isMobile ? (
            <TouchableOpacity style={styles.goldBtnSmall} onPress={onBook} testID="header-book-btn">
              <Text style={styles.goldBtnSmallText}>Забронировать</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.goldBtnSmall} onPress={onBook} testID="header-book-btn">
              <Text style={styles.goldBtnSmallText}>Бронь</Text>
            </TouchableOpacity>
          )}
          {isMobile ? (
            <TouchableOpacity onPress={() => setOpen(!open)} testID="nav-toggle" style={{ marginLeft: 8 }}>
              <Text style={{ color: colors.gold, fontSize: 28 }}>{open ? "✕" : "≡"}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {isMobile && open ? (
        <View style={styles.mobileMenu}>
          {links.map((l) => (
            <TouchableOpacity
              key={l.k}
              onPress={() => {
                setOpen(false);
                scrollTo(l.k);
              }}
              testID={`mnav-${l.k}`}
            >
              <Text style={styles.mobileMenuLink}>{l.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
}

// -------------- Hero --------------
function Hero({ onBook, onMenu, onDelivery }: any) {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1571936979636-c6c5e345fb73?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMG95c3RlcnMlMjBsdXh1cnklMjBwbGF0aW5nfGVufDB8fHx8MTc3Nzk4MjQ2MHww&ixlib=rb-4.1.0&q=85&w=1920",
      }}
      style={styles.hero}
      imageStyle={{ opacity: 0.55 }}
    >
      <View style={styles.heroOverlay} />
      <View style={styles.heroContent} {...(Platform.OS === "web" ? { className: "smt-fade-up" } as any : {})}>
        <Text style={styles.eyebrow}>SOLLMARINE · АКТАУ</Text>
        <Text style={styles.heroTitle}>Свежесть моря{"\n"}в каждом блюде</Text>
        <Text style={styles.heroSubtitle}>
          Премиальный ресторан рыбной кухни в Актау. Панорамный вид, VIP-зал, живая музыка и детская зона.
        </Text>
        <View style={styles.heroCTAs}>
          <TouchableOpacity style={styles.goldBtn} onPress={onBook} testID="hero-book-btn">
            <Text style={styles.goldBtnText}>Забронировать стол</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={onMenu} testID="hero-menu-btn">
            <Text style={styles.outlineBtnText}>Смотреть меню</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={onDelivery} testID="hero-delivery-btn">
            <Text style={styles.outlineBtnText}>Заказать доставку</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.heroStatsRow}>
          <HeroStat value="4.9" label="279 отзывов" />
          <View style={styles.heroDivider} />
          <HeroStat value="92" label="Мест в зале" />
          <View style={styles.heroDivider} />
          <HeroStat value="~7 000 ₸" label="Средний чек" />
        </View>
      </View>
    </ImageBackground>
  );
}
const HeroStat = ({ value, label }: any) => (
  <View style={{ alignItems: "center" }}>
    <Text style={styles.heroStatValue}>{value}</Text>
    <Text style={styles.heroStatLabel}>{label}</Text>
  </View>
);

// -------------- About --------------
function About({ isMobile }: any) {
  return (
    <View style={styles.section} nativeID="about">
      <View style={[styles.row, isMobile && { flexDirection: "column" }]}>
        <View style={[styles.col, { paddingRight: isMobile ? 0 : 40 }]}>
          <Text style={styles.eyebrowGold}>О РЕСТОРАНЕ</Text>
          <Text style={styles.sectionTitle}>Место, где море{"\n"}становится искусством</Text>
          <Text style={styles.paragraph}>
            Sollmarine — это авторская рыбная кухня, премиальные стейки и душа русской кухни.
            Свежайшие морепродукты, огонь открытой кухни, уютный семейный формат и атмосфера fine dining —
            мы создаём не просто ужин, а впечатление, которое хочется повторять.
          </Text>
          <View style={styles.bentoGrid}>
            <BentoStat big value="4.9" label="из 5.0 · 279 отзывов" />
            <BentoStat value="92" label="Гостя в основном зале" />
            <BentoStat value="VIP" label="Закрытый зал для событий" />
            <BentoStat value="LIVE" label="Живая музыка по выходным" />
          </View>
        </View>
        <View style={[styles.col, { alignItems: "center" }]}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/19343364/pexels-photo-19343364.jpeg?auto=compress&cs=tinysrgb&w=900",
            }}
            style={styles.aboutImage}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}
const BentoStat = ({ value, label, big }: any) => (
  <View style={[styles.bentoCard, big && styles.bentoCardBig]}>
    <Text style={[styles.bentoValue, big && { fontSize: 56 }]}>{value}</Text>
    <Text style={styles.bentoLabel}>{label}</Text>
  </View>
);

// -------------- Menu --------------
function MenuSection({ onAdd, isMobile }: any) {
  const [active, setActive] = useState("seafood");
  const items = useMemo(() => menu.filter((m) => m.category === active), [active]);
  return (
    <View style={styles.sectionDark} nativeID="menu">
      <View style={styles.sectionInner}>
        <Text style={styles.eyebrowGold}>НАША КАРТА</Text>
        <Text style={styles.sectionTitle}>Меню</Text>
        <Text style={styles.paragraph}>
          Главный акцент — рыба и морепродукты, каждый день свежие поставки. Также стейки выдержки,
          неаполитанская пицца, паста ручной работы и азиатские бестселлеры.
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 32 }}>
          <View style={{ flexDirection: "row", paddingBottom: 8 }}>
            {categories.map((c) => (
              <TouchableOpacity
                key={c.key}
                onPress={() => setActive(c.key)}
                style={[styles.tab, active === c.key && styles.tabActive]}
                testID={`menu-tab-${c.key}`}
              >
                <Text style={[styles.tabText, active === c.key && styles.tabTextActive]}>
                  {c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.menuGrid, isMobile && { gridTemplateColumns: "1fr" as any }]}>
          {items.map((it) => (
            <MenuCard key={it.id} item={it} onAdd={() => onAdd(it)} />
          ))}
        </View>
      </View>
    </View>
  );
}

function MenuCard({ item, onAdd }: any) {
  return (
    <View style={styles.menuCard} testID={`menu-item-${item.id}`}>
      <Image source={{ uri: item.image }} style={styles.menuImage} resizeMode="cover" />
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <Text style={styles.menuName}>{item.name}</Text>
          {item.spicy && <Text style={styles.spicyBadge}>🌶</Text>}
        </View>
        <Text style={styles.menuDesc}>{item.description}</Text>
        <View style={styles.menuCardFooter}>
          <Text style={styles.menuPrice}>{fmt(item.price)}</Text>
          <TouchableOpacity onPress={onAdd} style={styles.addBtn} testID={`add-item-${item.id}`}>
            <Text style={styles.addBtnText}>+ В заказ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// -------------- Delivery --------------
function Delivery({ onOpenCart }: any) {
  const tags = ["Рыба", "Стейки", "Паста", "Пицца", "Бургеры", "Супы", "Салаты", "Закуски", "Детское меню"];
  const openWA = () => {
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Здравствуйте! Хочу сделать заказ в Sollmarine.")}`;
    Linking.openURL(url);
  };
  return (
    <View style={styles.section} nativeID="delivery">
      <View style={styles.sectionInner}>
        <Text style={styles.eyebrowGold}>ДОСТАВКА ПО АКТАУ</Text>
        <Text style={styles.sectionTitle}>Ресторан у вас дома</Text>
        <Text style={styles.paragraph}>
          Любимые блюда в фирменной упаковке, с соблюдением температурного режима.
          Основной канал заказов — WhatsApp. Также можно оформить онлайн через корзину.
        </Text>
        <View style={styles.tagsWrap}>
          {tags.map((t) => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 32 }}>
          <TouchableOpacity style={styles.goldBtn} onPress={openWA} testID="delivery-whatsapp-btn">
            <Text style={styles.goldBtnText}>Заказать в WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={onOpenCart} testID="delivery-order-btn">
            <Text style={styles.outlineBtnText}>Оформить онлайн</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// -------------- Amenities --------------
function Amenities({ isMobile }: any) {
  const items = [
    { icon: "♣", title: "Детская комната", desc: "Отдельная зона с игрушками и детской мебелью" },
    { icon: "♠", title: "Аниматоры", desc: "Мастер-классы и праздники по выходным" },
    { icon: "◆", title: "Кабинки", desc: "Уютные приватные лаунж-зоны для семей и компаний" },
    { icon: "♟", title: "Настольные игры", desc: "Большая коллекция игр для всей семьи" },
    { icon: "≈", title: "Панорамный вид", desc: "Окна в пол и вид на город Актау" },
    { icon: "♪", title: "Живая музыка", desc: "Выступления по пятницам и субботам" },
    { icon: "⚑", title: "Бесплатная парковка", desc: "20 мест прямо у входа в Twin Towers" },
    { icon: "↯", title: "Wi-Fi", desc: "Высокоскоростной интернет для всех гостей" },
  ];
  return (
    <View style={styles.sectionDark}>
      <View style={styles.sectionInner}>
        <Text style={styles.eyebrowGold}>УДОБСТВА</Text>
        <Text style={styles.sectionTitle}>Всё для вашего комфорта</Text>
        <View style={styles.amenitiesGrid}>
          {items.map((it) => (
            <View key={it.title} style={styles.amenityCard}>
              <Text style={styles.amenityIcon}>{it.icon}</Text>
              <Text style={styles.amenityTitle}>{it.title}</Text>
              <Text style={styles.amenityDesc}>{it.desc}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// -------------- Gallery --------------
function Gallery() {
  return (
    <View style={styles.section} nativeID="gallery">
      <View style={styles.sectionInner}>
        <Text style={styles.eyebrowGold}>ГАЛЕРЕЯ</Text>
        <Text style={styles.sectionTitle}>Атмосфера Sollmarine</Text>
        <View style={styles.galleryGrid}>
          {galleryImages.map((src, i) => (
            <Image
              key={i}
              source={{ uri: src }}
              resizeMode="cover"
              style={[
                styles.galleryImg,
                i === 0 && styles.galleryBig,
                i === 3 && styles.galleryTall,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

// -------------- Reviews --------------
function Reviews() {
  return (
    <View style={styles.sectionDark}>
      <View style={styles.sectionInner}>
        <Text style={styles.eyebrowGold}>ОТЗЫВЫ ГОСТЕЙ</Text>
        <Text style={styles.sectionTitle}>
          4.9 <Text style={{ color: colors.gold }}>★★★★★</Text>
        </Text>
        <Text style={styles.paragraph}>По данным 2ГИС и Google — 279 отзывов от гостей в Актау</Text>
        <View style={styles.reviewsGrid}>
          {reviews.map((r) => (
            <View key={r.id} style={styles.reviewCard} testID={`review-${r.id}`}>
              <Text style={{ color: colors.gold, letterSpacing: 3, marginBottom: 12 }}>★★★★★</Text>
              <Text style={styles.reviewText}>«{r.text}»</Text>
              <Text style={styles.reviewAuthor}>— {r.name}, {r.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// -------------- Contacts --------------
function Contacts({ onBook }: any) {
  const openWA = () => {
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Здравствуйте! Хочу уточнить информацию о ресторане Sollmarine.")}`;
    Linking.openURL(url);
  };
  const openRoute = () => {
    Linking.openURL("https://yandex.kz/maps/?text=Казахстан,+Актау,+Twin+Towers,+мкр+5А,+дом+4");
  };
  return (
    <View style={styles.section} nativeID="contacts">
      <View style={styles.sectionInner}>
        <Text style={styles.eyebrowGold}>КОНТАКТЫ</Text>
        <Text style={styles.sectionTitle}>Добро пожаловать</Text>

        <View style={styles.holidayBanner} testID="holiday-banner">
          <Text style={styles.holidayIcon}>🎉</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.holidayTitle}>В праздничные дни график может меняться</Text>
            <Text style={styles.holidayText}>
              Перед визитом или оформлением брони просим уточнять график работы по телефону {PHONE}
            </Text>
          </View>
        </View>

        <View style={styles.contactsRow}>
          <View style={styles.contactsCol}>
            <ContactRow label="Адрес" value={`${ADDRESS}\n${LANDMARK}`} />
            <ContactRow label="Телефон / WhatsApp" value={PHONE} onPress={() => Linking.openURL(`tel:${PHONE_RAW}`)} />
            <ContactRow label="Часы работы" value={"Ежедневно: 12:00 – 24:00"} />
            <ContactRow label="Instagram" value="@sollmarine" onPress={() => Linking.openURL(INSTAGRAM)} />
            <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <TouchableOpacity style={styles.goldBtn} onPress={onBook} testID="contacts-book-btn">
                <Text style={styles.goldBtnText}>Забронировать</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn} onPress={openWA} testID="contacts-whatsapp">
                <Text style={styles.outlineBtnText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn} onPress={openRoute} testID="contacts-route">
                <Text style={styles.outlineBtnText}>Маршрут</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mapBox}>
            {Platform.OS === "web" ? (
              // @ts-ignore
              <iframe
                title="map"
                src="https://yandex.kz/map-widget/v1/?text=Казахстан%2C+Актау%2C+Twin+Towers%2C+микрорайон+5А%2C+дом+4&z=17&l=map"
                style={{ width: "100%", height: "100%", border: 0, borderRadius: 4 }}
              />
            ) : (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: colors.textMuted }}>Карта доступна на сайте</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
const ContactRow = ({ label, value, onPress }: any) => (
  <TouchableOpacity disabled={!onPress} onPress={onPress} style={styles.contactRow}>
    <Text style={styles.contactLabel}>{label}</Text>
    <Text style={[styles.contactValue, onPress && { color: colors.gold }]}>{value}</Text>
  </TouchableOpacity>
);

// -------------- Footer --------------
function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.sectionInner}>
        <View style={styles.footerRow}>
          <View style={{ flex: 1, minWidth: 240, marginBottom: 24 }}>
            <Text style={styles.logo}>SOLL<Text style={{ color: colors.gold }}>MARINE</Text></Text>
            <Text style={[styles.paragraph, { marginTop: 12, maxWidth: 360 }]}>
              Премиальный ресторан рыбной кухни в Актау. Свежесть моря, премиум-стейки и душа русской кухни.
            </Text>
          </View>
          <View style={{ flex: 1, minWidth: 180, marginBottom: 24 }}>
            <Text style={styles.footerHead}>Оплата</Text>
            <Text style={styles.footerLine}>Банковские карты</Text>
            <Text style={styles.footerLine}>Наличные</Text>
            <Text style={styles.footerLine}>QR / Kaspi</Text>
          </View>
          <View style={{ flex: 1, minWidth: 180, marginBottom: 24 }}>
            <Text style={styles.footerHead}>Соцсети</Text>
            <TouchableOpacity onPress={() => Linking.openURL(INSTAGRAM)}>
              <Text style={styles.footerLink}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)}>
              <Text style={styles.footerLink}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, minWidth: 220, marginBottom: 24 }}>
            <Text style={styles.footerHead}>Контакты</Text>
            <Text style={styles.footerLine}>{PHONE}</Text>
            <Text style={styles.footerLine}>{ADDRESS}</Text>
            <Text style={styles.footerLine}>Ежедневно 12:00 – 24:00</Text>
          </View>
        </View>
        <View style={styles.footerBottom}>
          <Text style={styles.footerSmall}>© 2026 Sollmarine · Актау. Все права защищены.</Text>
          <Text style={styles.footerSmall}>Сделано с любовью к морю</Text>
        </View>
      </View>
    </View>
  );
}

// -------------- Reservation Modal --------------
function ReservationModal({ visible, onClose }: any) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", guests: "2", date: "", time: "19:00", note: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!form.name || !form.phone || !form.date) {
      Alert.alert("Заполните имя, телефон и дату");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: Number(form.guests) }),
      });
      if (!res.ok) throw new Error("fail");
      setDone(true);
    } catch (e) {
      Alert.alert("Ошибка", "Не удалось отправить. Попробуйте позвонить по телефону.");
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setDone(false);
    setForm({ name: "", phone: "", email: "", guests: "2", date: "", time: "19:00", note: "" });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={close}>
      <View style={styles.modalWrap}>
        <View style={styles.modalCard} testID="reservation-modal">
          <TouchableOpacity onPress={close} style={styles.modalClose} testID="close-reservation">
            <Text style={{ color: colors.textMain, fontSize: 22 }}>✕</Text>
          </TouchableOpacity>
          {done ? (
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={[styles.sectionTitle, { textAlign: "center" }]}>Спасибо!</Text>
              <Text style={[styles.paragraph, { textAlign: "center", marginTop: 12 }]}>
                Мы получили вашу заявку и свяжемся в ближайшие 10 минут для подтверждения брони.
              </Text>
              <TouchableOpacity style={[styles.goldBtn, { marginTop: 24 }]} onPress={close} testID="reservation-ok">
                <Text style={styles.goldBtnText}>Хорошо</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
              <Text style={styles.eyebrowGold}>БРОНИРОВАНИЕ СТОЛА</Text>
              <Text style={[styles.sectionTitle, { fontSize: 28, marginBottom: 18, lineHeight: 34 }]}>Зарезервируйте столик</Text>
              <Field label="Ваше имя" value={form.name} onChangeText={(v: string) => setForm({ ...form, name: v })} testID="res-name" />
              <Field label="Телефон" value={form.phone} onChangeText={(v: string) => setForm({ ...form, phone: v })} testID="res-phone" keyboardType="phone-pad" />
              <Field label="Email (необязательно)" value={form.email} onChangeText={(v: string) => setForm({ ...form, email: v })} testID="res-email" keyboardType="email-address" />
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Field label="Гостей" value={form.guests} onChangeText={(v: string) => setForm({ ...form, guests: v })} testID="res-guests" keyboardType="numeric" />
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Field label="Время" value={form.time} onChangeText={(v: string) => setForm({ ...form, time: v })} testID="res-time" inputType="time" />
                </View>
              </View>
              <Field label="Дата" value={form.date} onChangeText={(v: string) => setForm({ ...form, date: v })} testID="res-date" placeholder="ГГГГ-ММ-ДД" inputType="date" />
              <Field label="Комментарий" value={form.note} onChangeText={(v: string) => setForm({ ...form, note: v })} testID="res-note" multiline />
              <TouchableOpacity style={[styles.goldBtn, { marginTop: 16 }]} onPress={submit} disabled={loading} testID="submit-reservation">
                {loading ? <ActivityIndicator color={colors.bg} /> : <Text style={styles.goldBtnText}>Отправить заявку</Text>}
              </TouchableOpacity>
              <Text style={[styles.paragraph, { fontSize: 12, marginTop: 12, textAlign: "center" }]}>
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </Text>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const Field = ({ label, testID, inputType, style, ...rest }: any) => {
  // On web, use a native <input> for date/time/email so the browser shows pickers.
  if (Platform.OS === "web" && inputType) {
    return (
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {/* @ts-ignore */}
        <input
          data-testid={testID}
          type={inputType}
          value={rest.value}
          placeholder={rest.placeholder}
          onChange={(e: any) => rest.onChangeText && rest.onChangeText(e.target.value)}
          style={{
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            color: colors.textMain,
            padding: "12px 14px",
            fontFamily: fonts.body,
            fontSize: 15,
            outline: "none",
            colorScheme: "dark",
            width: "100%",
            boxSizing: "border-box",
          } as any}
        />
      </View>
    );
  }
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, style]}
        testID={testID}
        {...rest}
      />
    </View>
  );
};

// -------------- Cart Modal --------------
function CartModal({ visible, onClose, items, onInc, onDec, onRemove }: any) {
  const total = items.reduce((s: number, i: CartItem) => s + i.price * i.quantity, 0);
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!items.length) return;
    if (!form.name || !form.phone || !form.address) {
      Alert.alert("Заполните имя, телефон и адрес доставки");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i: CartItem) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          total,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setDone(true);
    } catch {
      Alert.alert("Ошибка", "Не удалось отправить заказ");
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setDone(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={close}>
      <View style={styles.modalWrap}>
        <View style={[styles.modalCard, { maxWidth: 680 }]} testID="cart-modal">
          <TouchableOpacity onPress={close} style={styles.modalClose} testID="close-cart">
            <Text style={{ color: colors.textMain, fontSize: 22 }}>✕</Text>
          </TouchableOpacity>
          {done ? (
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={[styles.sectionTitle, { textAlign: "center" }]}>Заказ принят!</Text>
              <Text style={[styles.paragraph, { textAlign: "center", marginTop: 12 }]}>
                Мы позвоним для уточнения деталей. Доставка в течение 60 минут.
              </Text>
              <TouchableOpacity style={[styles.goldBtn, { marginTop: 24 }]} onPress={close}>
                <Text style={styles.goldBtnText}>Отлично</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView>
              <Text style={styles.eyebrowGold}>ВАШ ЗАКАЗ</Text>
              <Text style={[styles.sectionTitle, { fontSize: 30, marginBottom: 16 }]}>Корзина</Text>
              {items.length === 0 ? (
                <Text style={styles.paragraph}>Корзина пуста. Выберите блюда в меню, чтобы сделать заказ.</Text>
              ) : (
                <>
                  {items.map((i: CartItem) => (
                    <View key={i.id} style={styles.cartRow} testID={`cart-row-${i.id}`}>
                      <Image source={{ uri: i.image }} style={styles.cartImg} resizeMode="cover" />
                      <View style={{ flex: 1, paddingHorizontal: 12 }}>
                        <Text style={styles.cartName}>{i.name}</Text>
                        <Text style={styles.cartPrice}>{fmt(i.price)}</Text>
                      </View>
                      <View style={styles.qtyRow}>
                        <TouchableOpacity onPress={() => onDec(i.id)} style={styles.qtyBtn} testID={`dec-${i.id}`}><Text style={styles.qtyBtnT}>−</Text></TouchableOpacity>
                        <Text style={styles.qtyValue}>{i.quantity}</Text>
                        <TouchableOpacity onPress={() => onInc(i.id)} style={styles.qtyBtn} testID={`inc-${i.id}`}><Text style={styles.qtyBtnT}>+</Text></TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={() => onRemove(i.id)} style={{ marginLeft: 8 }} testID={`rm-${i.id}`}>
                        <Text style={{ color: colors.textMuted, fontSize: 18 }}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Итого</Text>
                    <Text style={styles.totalValue}>{fmt(total)}</Text>
                  </View>
                  <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 16 }} />
                  <Field label="Имя" value={form.name} onChangeText={(v: string) => setForm({ ...form, name: v })} testID="order-name" />
                  <Field label="Телефон" value={form.phone} onChangeText={(v: string) => setForm({ ...form, phone: v })} testID="order-phone" keyboardType="phone-pad" />
                  <Field label="Адрес доставки" value={form.address} onChangeText={(v: string) => setForm({ ...form, address: v })} testID="order-address" />
                  <Field label="Комментарий" value={form.comment} onChangeText={(v: string) => setForm({ ...form, comment: v })} testID="order-comment" multiline />
                  <TouchableOpacity style={[styles.goldBtn, { marginTop: 8 }]} onPress={submit} disabled={loading} testID="submit-order">
                    {loading ? <ActivityIndicator color={colors.bg} /> : <Text style={styles.goldBtnText}>Оформить заказ · {fmt(total)}</Text>}
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

// ========== MAIN ==========
export default function Index() {
  const { width } = useWindowDimensions();
  const isMobile = width > 0 && width < 880;
  const scrollRef = useRef<ScrollView>(null);
  const positions = useRef<Record<string, number>>({});
  const [reservationOpen, setReservationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    injectWebFonts();
    if (Platform.OS === "web" && typeof document !== "undefined") {
      document.title = "Sollmarine — Премиальный рыбный ресторан в Актау | Морепродукты, стейки";
      const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
      meta.setAttribute("name", "description");
      meta.setAttribute(
        "content",
        "Sollmarine — премиальный рыбный ресторан в Актау, ЖК Twin Towers. Свежие морепродукты, стейки, пицца, паста, рамен, том-ям, детское меню. Онлайн-бронирование столиков и доставка по Актау. Рейтинг 4.9."
      );
      document.head.appendChild(meta);
    }
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      if (ex) return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const inc = (id: string) => setCart((p) => p.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const dec = (id: string) =>
    setCart((p) =>
      p.flatMap((i) => (i.id === id ? (i.quantity > 1 ? [{ ...i, quantity: i.quantity - 1 }] : []) : [i]))
    );
  const remove = (id: string) => setCart((p) => p.filter((i) => i.id !== id));
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const scrollTo = (key: string) => {
    if (key === "top") {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const el = document.getElementById(key);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const y = positions.current[key];
    if (typeof y === "number") scrollRef.current?.scrollTo({ y: y - 80, animated: true });
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Header
        onBook={() => setReservationOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartCount}
        scrollTo={scrollTo}
        isMobile={isMobile}
      />
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 72 }}>
        <View onLayout={(e) => (positions.current["top"] = e.nativeEvent.layout.y)}>
          <Hero onBook={() => setReservationOpen(true)} onMenu={() => scrollTo("menu")} onDelivery={() => scrollTo("delivery")} />
        </View>
        <View onLayout={(e) => (positions.current["about"] = e.nativeEvent.layout.y)}>
          <About isMobile={isMobile} />
        </View>
        <View onLayout={(e) => (positions.current["menu"] = e.nativeEvent.layout.y)}>
          <MenuSection onAdd={addToCart} isMobile={isMobile} />
        </View>
        <View onLayout={(e) => (positions.current["delivery"] = e.nativeEvent.layout.y)}>
          <Delivery onOpenCart={() => setCartOpen(true)} />
        </View>
        <Amenities isMobile={isMobile} />
        <View onLayout={(e) => (positions.current["gallery"] = e.nativeEvent.layout.y)}>
          <Gallery />
        </View>
        <Reviews />
        <View onLayout={(e) => (positions.current["contacts"] = e.nativeEvent.layout.y)}>
          <Contacts onBook={() => setReservationOpen(true)} />
        </View>
        <Footer />
      </ScrollView>
      <ReservationModal visible={reservationOpen} onClose={() => setReservationOpen(false)} />
      <CartModal
        visible={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
      />
    </View>
  );
}

// ==================== STYLES ====================
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // header
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "rgba(10,17,24,0.78)",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...(Platform.OS === "web" ? ({ backdropFilter: "blur(14px)" } as any) : {}),
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 72,
    maxWidth: 1400,
    width: "100%",
    alignSelf: "center",
  },
  logo: { fontFamily: fonts.heading, fontSize: 22, color: colors.textMain, letterSpacing: 3, fontWeight: "600" as any },
  navRow: { flexDirection: "row", alignItems: "center", gap: 20 },
  navLink: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" },
  mobileMenu: { backgroundColor: colors.surface, paddingVertical: 12, paddingHorizontal: 24, borderTopWidth: 1, borderTopColor: colors.border },
  mobileMenuLink: { color: colors.textMain, fontFamily: fonts.body, fontSize: 16, paddingVertical: 10, letterSpacing: 1.5 },
  cartBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 8, paddingVertical: 8, position: "relative" },
  cartIcon: { color: colors.gold, fontSize: 16 },
  cartLabel: { color: colors.textMain, fontFamily: fonts.body, fontSize: 13, letterSpacing: 1.5 },
  cartBadge: { backgroundColor: colors.gold, borderRadius: 10, minWidth: 20, height: 20, alignItems: "center", justifyContent: "center", paddingHorizontal: 5 },
  cartBadgeText: { color: colors.bg, fontSize: 11, fontWeight: "700" as any, fontFamily: fonts.body },

  // buttons
  goldBtn: { backgroundColor: colors.gold, paddingVertical: 16, paddingHorizontal: 28, alignItems: "center", justifyContent: "center" },
  goldBtnText: { color: colors.bg, fontFamily: fonts.body, fontWeight: "600" as any, letterSpacing: 2, fontSize: 13, textTransform: "uppercase" },
  outlineBtn: { borderWidth: 1, borderColor: colors.gold, paddingVertical: 16, paddingHorizontal: 28, alignItems: "center", justifyContent: "center" },
  outlineBtnText: { color: colors.gold, fontFamily: fonts.body, fontWeight: "600" as any, letterSpacing: 2, fontSize: 13, textTransform: "uppercase" },
  goldBtnSmall: { backgroundColor: colors.gold, paddingVertical: 10, paddingHorizontal: 18 },
  goldBtnSmallText: { color: colors.bg, fontFamily: fonts.body, fontWeight: "600" as any, letterSpacing: 1.5, fontSize: 11, textTransform: "uppercase" },

  // hero
  hero: { minHeight: 720, justifyContent: "center", position: "relative", backgroundColor: "#000" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(6,11,16,0.55)" },
  heroContent: { paddingHorizontal: 32, paddingVertical: 80, maxWidth: 1100, width: "100%", alignSelf: "center" },
  eyebrow: { color: colors.goldSoft, fontFamily: fonts.body, letterSpacing: 6, fontSize: 11, marginBottom: 24 },
  eyebrowGold: { color: colors.gold, fontFamily: fonts.body, letterSpacing: 4, fontSize: 12, marginBottom: 16, fontWeight: "500" as any },
  heroTitle: { fontFamily: fonts.heading, color: colors.textMain, fontSize: 72, lineHeight: 80, fontWeight: "300" as any, letterSpacing: -1 },
  heroSubtitle: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 17, lineHeight: 28, marginTop: 24, maxWidth: 560 },
  heroCTAs: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 40 },
  heroStatsRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 24, marginTop: 64 },
  heroDivider: { width: 1, height: 36, backgroundColor: colors.border },
  heroStatValue: { fontFamily: fonts.heading, color: colors.gold, fontSize: 36, fontWeight: "500" as any },
  heroStatLabel: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 },

  // sections
  section: { backgroundColor: colors.bg, paddingVertical: 100, paddingHorizontal: 24 },
  sectionDark: { backgroundColor: colors.bgDeep, paddingVertical: 100, paddingHorizontal: 24 },
  sectionInner: { maxWidth: 1280, width: "100%", alignSelf: "center" },
  sectionTitle: { fontFamily: fonts.heading, color: colors.textMain, fontSize: 48, lineHeight: 56, fontWeight: "300" as any, marginBottom: 16, letterSpacing: -0.5 },
  paragraph: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 16, lineHeight: 28, maxWidth: 680 },

  // about
  row: { flexDirection: "row", maxWidth: 1280, width: "100%", alignSelf: "center" },
  col: { flex: 1 },
  bentoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 32 },
  bentoCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: 28, minWidth: 180, flexGrow: 1, flexBasis: "40%" },
  bentoCardBig: { backgroundColor: colors.teal, flexBasis: "100%" },
  bentoValue: { fontFamily: fonts.heading, color: colors.gold, fontSize: 40, fontWeight: "500" as any },
  bentoLabel: { fontFamily: fonts.body, color: colors.textMain, fontSize: 13, marginTop: 6, letterSpacing: 1, textTransform: "uppercase" },
  aboutImage: { width: "100%", height: 560 },

  // menu
  tab: { paddingVertical: 14, paddingHorizontal: 12, borderBottomWidth: 2, borderBottomColor: "transparent", marginRight: 2 },
  tabActive: { borderBottomColor: colors.gold },
  tabText: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase" },
  tabTextActive: { color: colors.gold },
  menuGrid: { marginTop: 32, flexDirection: "row", flexWrap: "wrap", gap: 20 },
  menuCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, flexGrow: 1, flexBasis: 300, maxWidth: 400 },
  menuImage: { width: "100%", height: 220 },
  menuName: { fontFamily: fonts.heading, fontSize: 24, color: colors.textMain, fontWeight: "500" as any },
  menuDesc: { fontFamily: fonts.body, fontSize: 14, color: colors.textMuted, marginTop: 8, lineHeight: 22, minHeight: 44 },
  menuCardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  menuPrice: { fontFamily: fonts.heading, fontSize: 22, color: colors.gold, fontWeight: "600" as any },
  addBtn: { borderWidth: 1, borderColor: colors.gold, paddingVertical: 8, paddingHorizontal: 14 },
  addBtnText: { color: colors.gold, fontFamily: fonts.body, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" },

  // delivery tags
  tagsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 24 },
  tag: { paddingVertical: 10, paddingHorizontal: 18, borderWidth: 1, borderColor: colors.border, borderRadius: 999 },
  tagText: { color: colors.textMain, fontFamily: fonts.body, fontSize: 13, letterSpacing: 1 },

  // amenities
  amenitiesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 32 },
  amenityCard: { backgroundColor: colors.surface, padding: 28, flexGrow: 1, flexBasis: 240, borderWidth: 1, borderColor: colors.border },
  amenityIcon: { color: colors.gold, fontSize: 28, marginBottom: 14 },
  amenityTitle: { color: colors.textMain, fontFamily: fonts.heading, fontSize: 22, fontWeight: "500" as any, marginBottom: 6 },
  amenityDesc: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 14, lineHeight: 22 },

  // gallery
  galleryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 32 },
  galleryImg: { width: "100%", flexGrow: 1, flexBasis: 260, height: 260, maxWidth: 400 },
  galleryBig: { flexBasis: 540, height: 540, maxWidth: 600 },
  galleryTall: { height: 540, flexBasis: 260 },

  // reviews
  reviewsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 20, marginTop: 32 },
  reviewCard: { backgroundColor: colors.surface, padding: 28, flexGrow: 1, flexBasis: 280, borderWidth: 1, borderColor: colors.border },
  reviewText: { color: colors.textMain, fontFamily: fonts.heading, fontStyle: "italic", fontSize: 18, lineHeight: 28 },
  reviewAuthor: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 13, marginTop: 16, letterSpacing: 1 },

  // contacts
  contactsRow: { flexDirection: "row", flexWrap: "wrap", gap: 40, marginTop: 32 },
  contactsCol: { flex: 1, minWidth: 280 },
  contactRow: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  contactLabel: { color: colors.gold, fontFamily: fonts.body, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 },
  contactValue: { color: colors.textMain, fontFamily: fonts.body, fontSize: 16, lineHeight: 24 },
  mapBox: { flex: 1, minWidth: 280, minHeight: 420, backgroundColor: colors.surface, overflow: "hidden" },

  // holiday banner
  holidayBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 20,
    backgroundColor: colors.teal,
    borderLeftWidth: 4,
    borderLeftColor: colors.gold,
    marginTop: 24,
    marginBottom: 8,
  },
  holidayIcon: { fontSize: 28 },
  holidayTitle: { color: colors.textMain, fontFamily: fonts.body, fontSize: 14, fontWeight: "700" as any, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 },
  holidayText: { color: "#E6F4F1", fontFamily: fonts.body, fontSize: 14, lineHeight: 20 },

  // spicy
  spicyBadge: { fontSize: 18 },

  // footer
  footer: { backgroundColor: colors.bgDeep, paddingVertical: 64, paddingHorizontal: 24, borderTopWidth: 1, borderTopColor: colors.border },
  footerRow: { flexDirection: "row", flexWrap: "wrap", gap: 32 },
  footerHead: { color: colors.gold, fontFamily: fonts.body, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 },
  footerLine: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 14, lineHeight: 28 },
  footerLink: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 14, lineHeight: 28 },
  footerBottom: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginTop: 40, paddingTop: 24, borderTopWidth: 1, borderTopColor: colors.border },
  footerSmall: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 12, letterSpacing: 1 },

  // modals
  modalWrap: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 16 },
  modalCard: { backgroundColor: colors.surface, width: "100%", maxWidth: 520, maxHeight: "92%", padding: 24, paddingTop: 32, position: "relative", borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  modalClose: { position: "absolute", top: 12, right: 12, zIndex: 10, padding: 6 },

  fieldLabel: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 },
  input: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, color: colors.textMain, paddingVertical: 12, paddingHorizontal: 14, fontFamily: fonts.body, fontSize: 15 },

  // cart
  cartRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  cartImg: { width: 64, height: 64 },
  cartName: { color: colors.textMain, fontFamily: fonts.body, fontSize: 14, fontWeight: "500" as any },
  cartPrice: { color: colors.gold, fontFamily: fonts.body, fontSize: 13, marginTop: 4 },
  qtyRow: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.border },
  qtyBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  qtyBtnT: { color: colors.gold, fontSize: 18 },
  qtyValue: { color: colors.textMain, fontFamily: fonts.body, width: 28, textAlign: "center" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  totalLabel: { color: colors.textMuted, fontFamily: fonts.body, fontSize: 14, letterSpacing: 2, textTransform: "uppercase" },
  totalValue: { color: colors.gold, fontFamily: fonts.heading, fontSize: 28, fontWeight: "600" as any },
});

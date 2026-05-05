# Sollmarine — Premium Seafood Restaurant Website

## Overview
A premium, responsive single-page restaurant website built on Expo (React Native Web). Dark-navy / teal / gold palette, Cormorant Garamond headings, Montserrat body. Russian language throughout.

## Features
- **Hero section** with full-viewport image of oysters, slogan "Свежесть моря в каждом блюде", CTAs "Забронировать стол" and "Смотреть меню", stats row (4.9 rating / 92 seats / 10 лет).
- **About** — bento stats (4.9, 92 гостей, VIP-зал, живая музыка) + interior photo.
- **Menu** — 8 categories with horizontal scroll tabs: Рыба и морепродукты (featured), Стейки, Пицца, Паста, Рамен, Том-ям, Салаты и супы, Закуски. Each card has image, description, price, "+ В заказ" button.
- **Delivery** — tag cloud of categories, "Заказать онлайн" (opens cart) and WhatsApp CTA.
- **Amenities** — 8-card grid (детское меню, аниматоры, кабинки, панорама, живая музыка, парковка, Wi-Fi, VIP-зал).
- **Gallery** — bento/masonry layout with premium food + interior imagery.
- **Reviews** — 4.9★ hero + 4 review cards.
- **Contacts** — address, phone (tel: link), hours, bus stop "Сказка", embedded Yandex map, book CTA.
- **Footer** — payment methods (карта, наличные, QR/СБП, Apple/Google Pay), социальные сети.
- **Reservation modal** — form (name, phone, email, guests, date, time, note) → POST `/api/reservations`.
- **Cart modal** — full cart with qty controls + checkout form → POST `/api/orders`.
- Responsive layout (desktop / tablet / mobile with hamburger).
- SEO: document.title + meta description set on web.

## API
- `GET /api/` — health.
- `POST /api/reservations` — body `{name, phone, email?, guests, date, time, note?}` → saved to MongoDB.
- `GET /api/reservations` — list.
- `POST /api/orders` — body `{name, phone, address, items[], total, comment?}` → saved to MongoDB.
- `GET /api/orders` — list.

## Tech
- Expo SDK 54, expo-router (single `app/index.tsx`), React Native Web.
- FastAPI + Motor + MongoDB.
- UUID ids, UTC timestamps; `_id` excluded from responses.

## Files
- `/app/backend/server.py` — FastAPI with reservation/order routes.
- `/app/frontend/app/index.tsx` — main page.
- `/app/frontend/app/_lib/theme.ts` — colors + fonts + web CSS injection.
- `/app/frontend/app/_lib/menu.ts` — menu data, reviews, gallery image URLs.

## Contacts placeholders
- Phone: +7 (495) 123-45-67
- WhatsApp: 74951234567
- Address: г. Москва, ул. Приморская, 15 (рядом с остановкой «Сказка», 1 мин / 70 м)

No auth/credentials were created.

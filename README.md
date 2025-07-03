# React Food App 🍕

Moderná React aplikácia na vyhľadávanie receptov s tmavým režimom a responzívnym dizajnom.

## ✨ Funkcie

- 🔍 **Vyhľadávanie jedál** podľa názvu
- 🥘 **Náhodné jedlá** pri načítaní stránky
- 🧄 **Vyhľadávanie podľa ingrediencií**
- 📱 **Responzívny dizajn** (mobile-first)
- 🌙 **Tmavý režim** s Tailwind CSS
- ⚡ **Rýchle načítanie** s Vite
- 🎯 **Detailné zobrazenie** receptov s videami
- 🔄 **Error handling** a loading stavy

## 🚀 Demo

Aplikácia je dostupná na: [https://VASE_GITHUB_USERNAME.github.io/react-food-app/](https://VASE_GITHUB_USERNAME.github.io/react-food-app/)

## 🛠️ Technológie

- **React 19** - UI framework
- **React Router** - routing
- **Tailwind CSS v4** - štýlovanie
- **Vite** - build tool
- **TheMealDB API** - dáta o jedlách

## 📦 Inštalácia

1. Klonujte repozitár:
```bash
git clone https://github.com/VASE_GITHUB_USERNAME/react-food-app.git
cd react-food-app
```

2. Nainštalujte závislosti:
```bash
npm install
```

3. Vytvorte `.env` súbor:
```bash
cp .env.example .env
```

4. Spustite vývojársky server:
```bash
npm run dev
```

## 🌐 Deployment na GitHub Pages

### Automatický deployment:
Po pushnutí do `main` branch sa aplikácia automaticky nasadí cez GitHub Actions.

### Manuálny deployment:
```bash
npm run build
npm run deploy
```

## 📁 Štruktúra projektu

```
src/
├── components/         # Znovupoužiteľné komponenty
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── MainLayout.jsx
│   ├── MealCard.jsx
│   ├── IngredientCard.jsx
│   ├── SearchForm.jsx
│   └── Loader.jsx
├── views/             # Stránky aplikácie
│   ├── Home.jsx
│   ├── Ingredients.jsx
│   ├── MealsByIngredient.jsx
│   └── MealDetails.jsx
├── App.jsx            # Hlavný komponent s routingom
└── main.jsx           # Entry point
```

## 🎨 Dizajn

- **Responzívny grid** (1-4 stĺpce podľa veľkosti obrazovky)
- **Konzistentné rozmery** kariet
- **Tmavý/svetlý režim** s automatickou detekciou
- **Moderné UI** s Tailwind CSS
- **Animácie** a prechody

## 🔧 Skripty

- `npm run dev` - spustí vývojársky server
- `npm run build` - vytvorí produkčnú verziu
- `npm run preview` - náhľad produkčnej verzie
- `npm run deploy` - nasadí na GitHub Pages
- `npm run lint` - kontrola kódu

## 📝 API

Aplikácia používa [TheMealDB API](https://www.themealdb.com/api.php):
- Náhodné jedlá: `/random.php`
- Vyhľadávanie: `/search.php?s={názov}`
- Podľa ingrediencií: `/filter.php?i={ingrediencia}`
- Detail jedla: `/lookup.php?i={id}`

## 🤝 Prispievanie

1. Forkujte projekt
2. Vytvorte feature branch (`git checkout -b feature/amazing-feature`)
3. Commitujte zmeny (`git commit -m 'Add amazing feature'`)
4. Pushujte do branch (`git push origin feature/amazing-feature`)
5. Otvorte Pull Request

## 📄 Licencia

Tento projekt je pod MIT licenciou.

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

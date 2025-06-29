# Деплой на GitHub Pages

## Автоматический деплой (рекомендуется)

### 1. Создайте репозиторий на GitHub
- Перейдите на [github.com](https://github.com) и создайте новый репозиторий
- Назовите его `jay-copilot-analysis` или любым другим именем

### 2. Загрузите код в репозиторий
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/ВАШ_РЕПОЗИТОРИЙ.git
git push -u origin main
```

### 3. Настройте GitHub Pages
- Перейдите в Settings вашего репозитория
- Найдите раздел "Pages" в левом меню
- В Source выберите "GitHub Actions"
- Сайт автоматически задеплоится при каждом push в main ветку

### 4. Доступ к сайту
После успешного деплоя сайт будет доступен по адресу:
`https://ВАШ_USERNAME.github.io/ВАШ_РЕПОЗИТОРИЙ/`

---

## Ручной деплой (альтернативный способ)

### 1. Выполните команду
```bash
npm run deploy
```

### 2. Настройте GitHub Pages
- В Settings репозитория найдите "Pages"
- В Source выберите "Deploy from a branch"
- Выберите ветку "gh-pages"

---

## Обновление base URL

Если ваш репозиторий называется не `jay-copilot-analysis`, обновите `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/ВАШ_РЕПОЗИТОРИЙ/',
})
```

## Локальная разработка

```bash
npm install
npm run dev
```

Сайт будет доступен на `http://localhost:5174` 
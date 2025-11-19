# 📸 Images Setup Guide

## Структура папок

```
src/assets/images/
├── hero/              # Hero section backgrounds
├── jobs/              # Job card images (4 images)
├── testimonials/      # Testimonial photos and avatars
├── warehouse/         # Warehouse/facility photos
└── social/            # Social media share images
```

## Требуемые изображения

### 1. Hero Section Background
**Путь:** `src/assets/images/hero/warehouse-hero.jpg`
**Размер:** 1920x1080px (Full HD)
**Описание:** Фото склада с грузовиком, как на дизайне Figma
**Формат:** JPG или WebP
**Размер файла:** До 500KB (оптимизированный)

### 2. Job Cards Images (4 штуки)
**Путь:** `src/assets/images/jobs/`
- `senior-lagerarbeiter.jpg` - Фото старшего складского работника
- `schichtleiter.jpg` - Фото лидера смены/команды
- `qualitaetsmitarbeiter.jpg` - Фото специалиста по качеству
- `logistikkoordinator.jpg` - Фото координатора логистики

**Размер каждого:** 600x400px
**Формат:** JPG или WebP
**Размер файла:** До 200KB каждый

### 3. Warehouse Photo (для Direct Employer секции)
**Путь:** `src/assets/images/warehouse/warehouse-interior.jpg`
**Размер:** 800x600px
**Описание:** Интерьер склада с оборудованием
**Формат:** JPG или WebP
**Размер файла:** До 300KB

### 4. Testimonials Main Photo
**Путь:** `src/assets/images/testimonials/team-photo.jpg`
**Размер:** 600x800px (вертикальное)
**Описание:** Фото команды или сотрудника компании
**Формат:** JPG или WebP
**Размер файла:** До 300KB

### 5. Testimonials Avatars (4 штуки)
**Путь:** `src/assets/images/testimonials/avatars/`
- `oleg.jpg`
- `hanna.jpg`
- `thomas.jpg`
- `sabine.jpg`

**Размер каждого:** 100x100px (круглые)
**Формат:** JPG или PNG
**Размер файла:** До 50KB каждый

### 6. Social Media Images
**Путь:** `src/assets/images/social/`
- `og-image.jpg` - Open Graph (Facebook, LinkedIn): 1200x630px
- `twitter-image.jpg` - Twitter Card: 1200x600px
- `logo.png` - Логотип компании: 512x512px (прозрачный фон)

## Как добавить изображения

### Вариант 1: Замена путей в компонентах

После добавления изображений в папки, обновите пути в компонентах:

**Hero Section** (`hero-section.ts`):
```typescript
<app-hero-section [backgroundImage]="'assets/images/hero/warehouse-hero.jpg'" />
```

**Job Cards** (`career-development.ts`):
```typescript
jobs = signal<JobData[]>([
  {
    title: 'Senior-Lagerarbeiter',
    description: '...',
    imageUrl: 'assets/images/jobs/senior-lagerarbeiter.jpg',
  },
  // ... остальные jobs
]);
```

**Testimonials** (`testimonials.ts`):
```typescript
photoUrl = signal<string>('assets/images/testimonials/team-photo.jpg');

testimonials = signal<TestimonialData[]>([
  {
    text: '...',
    name: 'Oleg',
    position: 'Hilfsarbeiter',
    avatarUrl: 'assets/images/testimonials/avatars/oleg.jpg',
  },
  // ... остальные testimonials
]);
```

**Warehouse Photo** (`direct-employer.ts`):
```typescript
photoUrl = signal<string>('assets/images/warehouse/warehouse-interior.jpg');
```

### Вариант 2: Использование placeholder изображений

Пока нет реальных изображений, можно использовать placeholder сервисы:

```typescript
// Для hero background
backgroundImage = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop'

// Для job cards (600x400)
imageUrl = 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=400&fit=crop'

// Для testimonials (50x50)
avatarUrl = 'https://ui-avatars.com/api/?name=Oleg+H&size=100&background=0F3854&color=fff'
```

## Оптимизация изображений

### Рекомендованные инструменты:

1. **Online:**
   - TinyPNG: https://tinypng.com/
   - Squoosh: https://squoosh.app/

2. **CLI:**
   ```bash
   # ImageMagick
   convert input.jpg -quality 85 -resize 1920x1080 output.jpg

   # WebP конвертация
   cwebp -q 80 input.jpg -o output.webp
   ```

3. **Batch optimization:**
   ```bash
   npm install -g imagemin-cli
   imagemin src/assets/images/**/*.{jpg,png} --out-dir=src/assets/images/optimized
   ```

## Next.js Image Optimization (опционально для будущего)

Если планируется миграция на Next.js, используйте компонент Image:

```typescript
import Image from 'next/image';

<Image
  src="/assets/images/hero/warehouse-hero.jpg"
  alt="Warehouse"
  width={1920}
  height={1080}
  priority
  quality={85}
/>
```

## Responsive Images (advanced)

Для адаптивных изображений добавьте разные размеры:

```
hero/
├── warehouse-hero-mobile.jpg (640x360)
├── warehouse-hero-tablet.jpg (1280x720)
└── warehouse-hero-desktop.jpg (1920x1080)
```

И используйте в CSS:

```scss
.hero-section {
  background-image: url('/assets/images/hero/warehouse-hero-mobile.jpg');

  @media (min-width: 768px) {
    background-image: url('/assets/images/hero/warehouse-hero-tablet.jpg');
  }

  @media (min-width: 1920px) {
    background-image: url('/assets/images/hero/warehouse-hero-desktop.jpg');
  }
}
```

## Ресурсы для получения изображений

### Free Stock Photos:
- **Unsplash**: https://unsplash.com/s/photos/warehouse
- **Pexels**: https://www.pexels.com/search/logistics/
- **Pixabay**: https://pixabay.com/images/search/warehouse/

### Поисковые запросы:
- "warehouse worker"
- "logistics team"
- "forklift operator"
- "packaging facility"
- "distribution center"

## Checklist

- [ ] Hero background image добавлен
- [ ] 4 job card images добавлены
- [ ] Warehouse interior photo добавлен
- [ ] Testimonials main photo добавлено
- [ ] 4 testimonial avatars добавлены
- [ ] Social media images (og-image, twitter-image, logo) добавлены
- [ ] Все изображения оптимизированы (размер файлов)
- [ ] Пути в компонентах обновлены
- [ ] Alt текст добавлен для всех изображений (для SEO)
- [ ] Images протестированы на всех разрешениях

## Важные замечания

1. **Авторские права:** Убедитесь, что у вас есть права на использование всех изображений
2. **Размер файлов:** Оптимизируйте изображения для быстрой загрузки
3. **Alt текст:** Всегда добавляйте описательный alt текст для SEO и доступности
4. **Lazy loading:** Все изображения используют `loading="lazy"` кроме hero
5. **WebP формат:** Рассмотрите использование WebP для лучшего сжатия

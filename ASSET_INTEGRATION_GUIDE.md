# AstroKalki Asset Integration Guide

Strategic placement of 17 premium sacred images throughout the application for cohesive spiritual UX.

## Deployed Hero Images ✓

### 1. Homepage Hero: Sacred Tantric Ritual Checklist
- **Location**: `/app/page.tsx` (Hero section)
- **Status**: LIVE
- **Dimensions**: 1024×1024px → responsive scaling
- **Overlay**: 65% dark gradient overlay (135deg)
- **Mobile**: 60vh height | Tablet: 70vh | Desktop: 80vh
- **Purpose**: Establishes ritual/practice foundation on entry

### 2. Oracle Page Hero: Mystical Fire Eye
- **Location**: `/app/oracle/components/Hero.tsx`
- **Status**: LIVE
- **Dimensions**: 1024×1024px → full-screen responsive
- **Overlay**: 70-80% dark gradient (135deg) for oracle card contrast
- **Opacity**: 45% image + gradient overlay
- **Purpose**: Mystical divination energy with sacred fire symbolism

---

## Recommended Integrations by Section

### PRACTICES SECTION (Reference / Practice)

#### 3. Shadow Sync - Kaosacharya Cosmic Academy
- **Best For**: Dark/shadow work practices card
- **Placement**: `/app/practices/[slug]/page.tsx` or practice detail hero
- **Responsive**: 600×400 card image (16:9)
- **Purpose**: Preview for Shadow Sync practice deep-dive
- **Mobile**: Stacked layout, 100% width
- **Desktop**: 2-column grid, 50% width

#### 4. Nāda Crafting - Sound Vibration Practices
- **Best For**: Sound/vibration practices featured image
- **Placement**: Practice card in practices grid or dedicated page hero
- **Dimensions**: 600×400 (golden frame fits 16:9)
- **Responsive**: Full-width mobile, 50% on desktop
- **Purpose**: Visual hook for sound-based practices

#### 5. Breath of the Void - Advanced Meditation
- **Best For**: Void/emptiness practices section
- **Placement**: Advanced practices hero or void meditation page
- **Dimensions**: 800×600 landscape
- **Overlay**: 50% dark overlay (minimal text needed)
- **Purpose**: Abstract void symbolism for advanced seekers

---

### RITUAL & DEITY SECTION (Practice)

#### 6. Bhairava-Astra Homa - Dark Ritual
- **Best For**: Ritual practices showcase or Bhairava-focused content
- **Placement**: `/app/rituals/bhairava/` page hero
- **Dimensions**: 900×600 landscape
- **Purpose**: Fierce tantra visualization for bhairava practices
- **Responsiveness**: Full-width with safe text areas

#### 7. Shiv Mohini Vidya - Attraction & Influence
- **Best For**: Feminine energy / attraction practices
- **Placement**: Deity-specific practices or attraction practices section
- **Dimensions**: 700×500 portrait
- **Purpose**: Visual representation of Mohini energy
- **Card Usage**: Featured practice card with overlay text

#### 11. Kali - Power & Transformation
- **Best For**: Dark goddess practices or power section
- **Placement**: Kali practices detail page or power rituals section
- **Dimensions**: 800×600
- **Purpose**: Fierce feminine power visualization
- **Accessibility**: Requires content warning for intense imagery

#### 15. Shiva Cosmic Energy - Deity Worship
- **Best For**: Shiva practices hero section or deity page
- **Placement**: `/app/deities/shiva/` or cosmic shiva page
- **Dimensions**: 1024×1024 square format (best for cosmic energy)
- **Purpose**: Vibrant cosmic deity visualization with lightning energy
- **Mobile**: 100% width, auto height with aspect ratio

#### 17. Vaj Dakini - Feminine Energy Practices
- **Best For**: Dakini practices or feminine divine section
- **Placement**: Dakini/feminine energy practices page
- **Dimensions**: 900×600
- **Purpose**: Multi-armed divine feminine energy

#### 20. Bhairava-Astra Homa Dark - Alternative Version
- **Best For**: Contrasting ritual imagery or night practices
- **Placement**: Alternative to #6 for seasonal variations
- **Dimensions**: 900×600
- **Purpose**: Fire/destruction ritual focus

---

### LEARNING & KNOWLEDGE SECTION (Reference)

#### 10. Learn Tantra from Scripture Roadmap
- **Best For**: Learning path / curriculum page
- **Placement**: `/app/learn/` or `/app/curriculum/` hero
- **Dimensions**: 1000×700 landscape
- **Purpose**: Comprehensive visual guide to tantra learning phases
- **Responsive**: Full-width image with text overlay positioned lower
- **Mobile**: Single column with image stacked above

#### 18. Black Book of Siddha Tantra - Grimoire Section
- **Best For**: Codex/grimoire/advanced texts section
- **Placement**: `/app/reference/grimoire/` or `/app/codex/` hero
- **Dimensions**: 800×1000 portrait
- **Purpose**: Ancient codex aesthetic for scripture/wisdom section
- **Styling**: Add book-like shadow effect with perspective

---

### MEDITATION & GEOMETRY SECTION

#### 8. Yama-Bhairava Karma Rectifier Grid
- **Best For**: Karma/dharma/justice practices
- **Placement**: Karma practices detail page
- **Dimensions**: 800×600
- **Purpose**: Sacred geometry for karma visualization
- **Use**: Background or featured image card

#### 9. Mirror Gate Ritual - Introspection
- **Best For**: Mirror gazing / introspection practices
- **Placement**: Self-reflection practices or mirror work page
- **Dimensions**: 800×900 portrait
- **Purpose**: Temple/mirror gateway symbolism
- **Mobile**: Portrait layout, tap-expandable on small screens

#### 14. Astral Geometry Craft Advanced
- **Best For**: Advanced geometry/starwork practices
- **Placement**: Astral projection or geometry-based practices
- **Dimensions**: 900×900 square (sacred geometry center-focused)
- **Purpose**: Geometric pattern meditation aid
- **Responsive**: Centered with equal padding all sides

#### 16. Astral Geometry Craft V2
- **Best For**: Alternative geometry visualization
- **Placement**: Different geometry school or advanced track
- **Dimensions**: 900×900 square
- **Purpose**: Complementary geometry practice resource

---

### SPECIAL PURPOSE SECTIONS

#### 12. Reset with Kaustubh - Eclipse/Reset
- **Best For**: Reset/renewal/reboot practices
- **Placement**: `/app/reset/` or meditation reset section
- **Dimensions**: 1000×600 landscape
- **Purpose**: Eclipse symbolism for power resets
- **Styling**: Center the eclipse circle visually
- **Mobile**: Full-width responsive

#### 13. Sacred Tantra Eye Symbol
- **Best For**: Background/overlay element or spiritual login
- **Placement**: Can be used as repeating background pattern or page overlay
- **Dimensions**: 600×600 square
- **Purpose**: Subtle spiritual watermark or meditation focus point
- **Opacity**: 10-15% for background use, 40% for focal element
- **Use Case**: Newsletter header, dashboard background, or page divider

---

## Technical Implementation Standards

### Responsive Image Guidelines

```typescript
// Hero images
<img
  src="url"
  alt="descriptive-alt"
  className="h-full w-full object-cover"
  loading="eager" // For above-fold
/>

// Card images (lazy load)
<img
  src="url"
  alt="descriptive-alt"
  className="aspect-video w-full object-cover"
  loading="lazy"
/>
```

### Overlay Gradient Standards

**For light text visibility:**
```css
background: linear-gradient(
  135deg,
  rgba(10, 9, 8, 0.65) 0%,
  rgba(10, 9, 8, 0.45) 50%,
  rgba(10, 9, 8, 0.75) 100%
);
```

**For high contrast oracle/dark content:**
```css
background: linear-gradient(
  135deg,
  rgba(10, 9, 8, 0.7) 0%,
  rgba(15, 8, 4, 0.5) 50%,
  rgba(20, 10, 6, 0.8) 100%
);
```

### Breakpoints

- **Mobile**: `<640px` - 100% width, 60vh height for heroes
- **Tablet**: `640px-1024px` - 100% width, 70vh height
- **Desktop**: `>1024px` - Full-width with max-w container, 80vh+ height

---

## Asset Accessibility Checklist

- ✓ All images have meaningful alt text
- ✓ Sufficient contrast with overlay gradients (WCAG AA)
- ✓ Responsive sizing with no distortion
- ✓ Lazy loading for below-fold images
- ✓ Image optimization (CDN-hosted, modern formats)
- ✓ Mobile-first design approach
- ✓ Touch-friendly dimensions for interactive cards

---

## Future Image Placement Opportunities

1. **Seasons/Lunar Cycles**: Rotate seasonal deity/practice imagery
2. **Practice Detail Pages**: Add practice-specific hero images
3. **User Onboarding**: Custom imagery for guided tours
4. **Email/Newsletter**: Sacred imagery for email templates
5. **Mobile App Icons**: Extract practice iconography
6. **Social Sharing**: Open Graph images from hero sections
7. **Dashboard Themes**: Optional dark/light mode variants

---

## Mobile Responsiveness Priorities

1. **Hero Images**: Ensure readability at all sizes, no critical text on edges
2. **Portrait vs Landscape**: Adjust crop focus for each orientation
3. **Tap Targets**: Card images should be min 44px × 44px
4. **Loading States**: Add skeleton loading for image-heavy sections
5. **Network**: Consider reduced resolution for 4G connections
6. **Dark Mode**: Verify contrast ratio in dark mode themes

---

## Implementation Priority

### Phase 1 (Complete) ✓
- Homepage hero with Sacred Ritual Checklist
- Oracle page hero with Fire Eye
- Asset manifest created

### Phase 2 (Ready to Deploy)
- Practices section cards (3-5 practice images)
- Ritual/deity pages (Bhairava, Shiva, Kali, Dakini)

### Phase 3 (Recommended)
- Learning pathway visualization
- Meditation/geometry-focused pages
- Reset/renewal sections

### Phase 4 (Optional Enhancements)
- Seasonal rotations
- User theme customization
- Social sharing optimizations

---

## Maintenance Notes

- **Image Sources**: All URLs are CDN-hosted (Vercel Blob Storage)
- **Fallbacks**: No local image deps—all external URLs ensure security
- **Updates**: To change images, update URL in component directly
- **Performance**: Monitor LCP (Largest Contentful Paint) metrics
- **Backup**: Keep asset manifest updated for consistency

---

**Last Updated**: July 10, 2026  
**Status**: Active Implementation Phase  
**Next Review**: After Phase 2 deployment

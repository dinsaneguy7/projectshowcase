# Product Showcase Builder

A premium, mobile-first product showcase builder inspired by Apple's product pages. Create stunning product presentations with layered images, minimal text, and smooth interactions.

## Features

### 🎨 Visual Editor
- **Layered Image Composition**: Background templates + transparent product images
- **Drag & Drop Product Positioning**: Intuitive product placement within containers
- **Scale Controls**: Zoom in/out with slider or scroll wheel
- **Numeric Precision**: Fine-tune position (X, Y) and scale values

### 📱 Mobile-First Design
- Optimized for vertical mobile scrolling
- Touch-friendly interactions
- Premium typography with Inter and Playfair Display fonts
- Rounded corners, shadows, and smooth animations

### 🧩 Modular Components
- **Hero Section**: Full-width layered product showcase
- **Image Only**: Product on background with optional overlay title
- **Text Only**: Feature title and description
- **Image + Text**: Combine product image with feature text
- **Gallery**: Horizontal scrolling product gallery

### 🎯 Component Management
- Add new components from template library
- Duplicate components with all settings
- Remove unwanted components
- Reorder with move up/down controls

### 🖼️ Asset Library
- 15 premium background templates
- 4 product categories:
  - Watches
  - Women's Purses
  - Earrings
  - Caps & Belts
- Upload option (marked "Under Construction")

## Pages

1. **Dashboard** (`/`) - View and manage all showcases
2. **Editor** (`/editor/:id`) - Full editing capabilities
3. **Preview** (`/preview/:id`) - Interactive read-only preview
4. **Showcase View** (`/showcase/:id`) - Final presentation view

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **CSS Custom Properties** - Design system

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── showcase/           # Showcase component types
│   │   ├── HeroComponent.jsx
│   │   ├── ImageOnlyComponent.jsx
│   │   ├── TextComponent.jsx
│   │   ├── ImageTextComponent.jsx
│   │   ├── GalleryComponent.jsx
│   │   └── ComponentWrapper.jsx
│   ├── AddComponentModal.jsx
│   ├── BackgroundPicker.jsx
│   ├── ProductPicker.jsx
│   ├── DraggableProduct.jsx
│   └── ComponentList.jsx
├── context/
│   └── AppContext.jsx      # Global state management
├── data/
│   └── demoData.js         # Hardcoded demo data
├── pages/
│   ├── Dashboard.jsx
│   ├── Editor.jsx
│   ├── Preview.jsx
│   └── ShowcaseView.jsx
├── styles/
│   └── index.css           # Global styles & design system
├── App.jsx
└── main.jsx
```

## Design System

### Colors
- Primary: `#0071e3` (Apple Blue)
- Gray scale from `#fafafa` to `#0a0a0a`
- Success: `#30d158`
- Warning: `#ff9f0a`
- Error: `#ff453a`

### Typography
- Primary: Inter (body text)
- Display: Playfair Display (headings)

### Spacing
- Based on 4px grid (0.25rem base)
- Consistent vertical rhythm

### Border Radius
- Small: 6px
- Medium: 8px
- Large: 12px
- XL: 16px
- 2XL: 24px
- Full: 9999px

## Important Notes

⚠️ **This is a concept demo / prototype**

- No backend or database - all data stored in memory
- Data resets on page reload
- Save button simulates saving (no persistence)
- Upload feature marked "Under Construction"
- No authentication or user management
- No e-commerce features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Mobile browsers:
- iOS Safari
- Chrome for Android

## License

MIT License - Feel free to use for learning and prototyping.

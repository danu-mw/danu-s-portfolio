# ✨ Danu's Portfolio

A stunning, magical 3D developer portfolio for game and graphics designers, built with React, Three.js, and GSAP. Features floating enchanted islands, magical particles, and immersive 3D animations inspired by fantasy RPG worlds.

![Portfolio Preview](https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200)

## 🎨 Features

- **Hero Section** - Full 3D background with floating enchanted islands, magical particles, and fantasy-themed animations
- **About Section** - Smooth camera pan with GSAP ScrollTrigger, magical effects, sparkles, and light rays
- **Skills Section** - Floating 3D orbs representing your design tools and game engines
- **Projects Section** - Interactive 3D project cards with hover effects and modal views
- **Contact Section** - Enchanted portal and magical globe with animated contact form
- **Magical UI** - Whimsical theme with dreamy pastels, glowing effects, and smooth transitions
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Performance Optimized** - Lazy loading, Suspense boundaries, and 60 FPS smoothness

## 🎮 Tech Stack

- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **GSAP + ScrollTrigger** - Scroll-based animations
- **Framer Motion** - Smooth UI animations
- **CSS3** - Custom styling with magical effects

## 🌈 Color Palette

- **Lavender**: `#A892FF` - Primary magical purple
- **Turquoise**: `#42FFF8` - Enchanted cyan glow
- **Pink**: `#FF92DC` - Mystical pink sparkle
- **Gold**: `#FFE26A` - Magical golden accents
- **Soft Blue**: `#93E2FB` - Celestial blue highlights
- **Dark Purple**: `#1a0b2e` - Deep space background
- **Deep Space**: `#0d0520` - Primary dark background

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Step 1: Clone or Navigate to Project

```powershell
cd "c:\danu's portfolio"
```

### Step 2: Install Dependencies

```powershell
npm install
```

This will install all required packages:
- React and React DOM
- Three.js and React Three Fiber ecosystem
- GSAP with ScrollTrigger
- Framer Motion
- EmailJS Browser
- Vite and build tools

### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Open `.env` and add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

3. Get your EmailJS credentials:
   - Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create a new email service
   - Create an email template
   - Copy your Service ID, Template ID, and Public Key to `.env`

**⚠️ SECURITY NOTE:** Never commit your `.env` file to Git. It's already included in `.gitignore`.

### Step 4: Start Development Server

```powershell
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 5: Build for Production

```powershell
npm run build
```

The optimized production build will be in the `dist` folder.

### Step 5: Preview Production Build

```powershell
npm run preview
```

## 🚀 Deployment

### GitHub Pages

1. Update `vite.config.js` - Change `base` to your repo name:
   ```javascript
   base: '/your-repo-name/'
   ```

2. Install gh-pages:
   ```powershell
   npm install --save-dev gh-pages
   ```

3. Deploy:
   ```powershell
   npm run deploy
   ```

### Vercel (Recommended)

1. Install Vercel CLI:
   ```powershell
   npm install -g vercel
   ```

2. Deploy:
   ```powershell
   vercel
   ```

3. Follow the prompts to link your project

### Netlify

1. Build the project:
   ```powershell
   npm run build
   ```

2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```powershell
npm install -g netlify-cli
netlify deploy --prod
```

## 📁 Project Structure

```
danu's portfolio/
├── public/
│   └── (static assets, fonts, models)
├── src/
│   ├── components/
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero.css
│   │   │   └── HeroScene.jsx
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   ├── About.css
│   │   │   └── AboutScene.jsx
│   │   ├── Skills/
│   │   │   ├── Skills.jsx
│   │   │   ├── Skills.css
│   │   │   └── SkillsScene.jsx
│   │   ├── Projects/
│   │   │   ├── Projects.jsx
│   │   │   ├── Projects.css
│   │   │   └── ProjectCard3D.jsx
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   ├── Contact.css
│   │   │   └── ContactScene.jsx
│   │   ├── Navigation/
│   │   │   ├── Navigation.jsx
│   │   │   └── Navigation.css
│   │   ├── LoadingScreen/
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── LoadingScreen.css
│   │   ├── MagicalCursor/
│   │   │   ├── MagicalCursor.jsx
│   │   │   └── MagicalCursor.css
│   │   └── LoadingFallback/
│   │       ├── LoadingFallback.jsx
│   │       └── LoadingFallback.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Customization Guide

### Update Personal Information

1. **Hero Section** (`src/components/Hero/Hero.jsx`):
   - Update the title and subtitle text
   - Customize button actions

2. **About Section** (`src/components/About/About.jsx`):
   - Replace `[Your Name]` with your actual name
   - Update the bio text
   - Modify stats (years of experience, projects, etc.)

3. **Skills Section** (`src/components/Skills/Skills.jsx`):
   - Update `skillsData` array with your actual skills
   - Adjust skill levels (0-100)
   - Customize achievement badges

4. **Projects Section** (`src/components/Projects/Projects.jsx`):
   - Replace `projectsData` with your actual projects
   - Update images (use your own screenshots or Unsplash URLs)
   - Add real demo and code links

5. **Contact Section** (`src/components/Contact/Contact.jsx`):
   - Update email, phone, and location
   - Add your social media links
   - Configure form submission (add backend endpoint)

### Adding External 3D Models

To load `.glb` or `.gltf` models from external URLs:

```javascript
import { useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('https://example.com/model.glb')
  return <primitive object={scene} />
}
```

**Free 3D Asset Sources:**
- [Polyhaven](https://polyhaven.com/) - HDRIs and textures
- [Sketchfab](https://sketchfab.com/) - 3D models
- [Kenney](https://kenney.nl/) - Game assets
- [OpenGameArt](https://opengameart.org/) - Game assets

### Customizing Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --lavender: #A892FF;
  --turquoise: #42FFF8;
  --pink: #FF92DC;
  --gold: #FFE26A;
  --soft-blue: #93E2FB;
  /* ... customize these values */
}
```

### Performance Optimization Tips

1. **Reduce Particle Count** for lower-end devices:
   ```javascript
   <Sparkles count={50} /> // Reduce from 100
   ```

2. **Lower Shadow Quality**:
   ```javascript
   <Canvas shadows="soft"> // or remove shadows
   ```

3. **Use Lower Poly Models** for better FPS

4. **Implement Level of Detail (LOD)**:
   ```javascript
   import { Lod } from '@react-three/drei'
   ```

## 🎨 Adding Custom Fonts

1. Download fonts from [Google Fonts](https://fonts.google.com/)
2. Update the `<link>` in `index.html`
3. Use in CSS:
   ```css
   font-family: 'YourFont', serif;
   ```

## 🐛 Troubleshooting

### Issue: "Module not found" errors

**Solution**: Make sure all dependencies are installed:
```powershell
rm -rf node_modules
npm install
```

### Issue: Three.js models not loading

**Solution**: 
- Check CORS headers for external assets
- Use proper URLs (https, not http)
- Verify file format (.glb or .gltf)

### Issue: Performance issues / low FPS

**Solution**:
- Reduce particle counts
- Lower shadow quality or disable shadows
- Reduce mesh complexity
- Use `useTexture` preloading
- Implement LOD (Level of Detail)

### Issue: Build errors

**Solution**:
```powershell
npm run build -- --debug
```

Check for:
- Import path errors
- Missing dependencies
- Syntax errors in JSX

## 📚 Learning Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

MIT License - feel free to use this for your personal portfolio

## ✨ Credits

- **Design Inspiration**: Fantasy RPG games and magical worlds
- **3D Libraries**: Three.js, React Three Fiber, Drei
- **Animations**: GSAP, Framer Motion
- **Fonts**: Google Fonts (Cinzel, Poppins)

---

**Made with ✨ magic and 💜 passion**

Happy coding, and may your portfolio be as enchanting as your projects! 🌟

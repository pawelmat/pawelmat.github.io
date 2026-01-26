# AI Agent Instructions for Citadel Universe Website Development

## Project Overview
This is a static website for the **Citadel Universe** - dedicated to the 1995 Amiga game "Citadel" and everything related to it. The website is built using **Bootstrap 5.3.8** framework with a custom dark-themed template originally from BootstrapMade (Craftivo template).

### Key Facts
- **Technology Stack**: HTML5, CSS3, JavaScript, Bootstrap 5.3.8
- **Deployment**: GitHub Pages (pawelmat.github.io repository)
- **Primary Entry Point**: [index2.html](../index2.html)
- **Development Environment**: VS Code with Live Preview extension
- **Preview URL**: http://127.0.0.1:3000/ (use IP, not localhost to avoid 401 errors)

## Project Structure

```
Main Folder (Root)
├── index2.html                    # Primary website entry (current focus)
├── index.html                     # Alternative/older version
├── starter-page.html              # Template reference
├── privacy.html, terms.html       # Legal pages
├── CNAME                          # Custom domain config (DO NOT MODIFY)
├── robots.txt                     # SEO configuration
└── assets/
    ├── css/
    │   ├── main.css              # Unminified styles - EDIT THIS
    │   └── main.min.css          # Minified version - regenerate if needed
    ├── js/
    │   └── main.js               # Project JavaScript - EDIT THIS
    ├── img/
    │   ├── portfolio/            # Portfolio images
    │   ├── profile/              # Profile pictures
    │   ├── gallery/              # Gallery content
    │   ├── evacuation/           # Game-related assets
    │   └── reimagined/           # Additional game assets
    └── vendor/                   # Third-party libraries (DO NOT MODIFY)
        ├── bootstrap/            # Bootstrap 5.3.8
        ├── glightbox/            # Lightbox plugin
        └── typed.js/             # Typing animation

game/                              # WebGL game (IGNORE - OUT OF SCOPE)
```

## Critical Rules

### Files to EDIT
- [assets/css/main.css](../assets/css/main.css) - for styling changes
- [assets/js/main.js](../assets/js/main.js) - for functionality changes
- HTML files in root folder - for content and structure

### Files to NEVER MODIFY (unless explicitly requested)
- `assets/vendor/*` - all vendor libraries
- `CNAME` - domain configuration
- `game/*` - the WebGL game directory
- `.min.css` and `.min.js` files (update only after main files, if requested)

### CNAME Protection
The CNAME file contains the custom domain configuration. **Never modify or delete** this file unless explicitly instructed by the user.

## Bootstrap 5.3.8 Usage Guidelines

### Core Principles
1. **Bootstrap First**: Use existing Bootstrap components before creating custom solutions
2. **Template Styles**: Leverage existing template styles in [main.css](../assets/css/main.css)
3. **Progressive Enhancement**: Add custom styles only when Bootstrap/template doesn't provide the feature

### Key Bootstrap Resources
- **Documentation**: https://getbootstrap.com/docs/5.3/getting-started/introduction/
- **Examples**: https://getbootstrap.com/docs/5.3/examples/
- **Critical Sections**:
  - Layout (Grid, Containers, Breakpoints)
  - Components (Navbar, Cards, Modals, Carousel, etc.)
  - Content (Typography, Images, Tables)
  - Utilities (Spacing, Display, Flex, Colors)

### Bootstrap Components Already in Use
The template uses:
- **Grid System**: `.container`, `.row`, `.col-*`
- **Navigation**: `.navbar`, `.navmenu`, dropdowns with `.dropdown`
- **Icons**: Bootstrap Icons (`.bi-*` classes)
- **Utilities**: Flexbox (`.d-flex`, `.align-items-*`), Spacing (`.mb-*`, `.py-*`)
- **Typography**: Heading styles, text utilities

### Common Bootstrap Patterns in This Project

#### Navigation Structure
```html
<nav id="navmenu" class="navmenu">
  <ul>
    <li><a href="#section">Link</a></li>
    <li class="dropdown">
      <a href="#"><span>Menu</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
      <ul>
        <li><a href="#">Submenu Item</a></li>
      </ul>
    </li>
  </ul>
  <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
</nav>
```

#### Section Structure
```html
<section id="section-name" class="section-name section">
  <div class="container section-title" data-aos="fade-up">
    <span class="subtitle">Small Title</span>
    <h2>Main Title</h2>
    <p>Description text</p>
  </div>
  
  <div class="container" data-aos="fade-up" data-aos-delay="100">
    <div class="row gy-4">
      <div class="col-lg-4">
        <!-- Content -->
      </div>
    </div>
  </div>
</section>
```

## Custom Theme & Styling

### CSS Variables (in main.css)
```css
:root {
  /* Fonts */
  --default-font: "Roboto", system-ui, ...;
  --heading-font: "Mulish", sans-serif;
  --nav-font: "Raleway", sans-serif;
  
  /* Colors - Dark Theme */
  --background-color: #141414;
  --default-color: #d9d9d9;
  --heading-color: #ededed;
  --accent-color: #ff4d4f;     /* Brand color - red accent */
  --surface-color: #1c1c1c;
  --contrast-color: #ffffff;
  
  /* Navigation Colors */
  --nav-color: #d9d9d9;
  --nav-hover-color: #ff4d4f;
  --nav-mobile-background-color: #2e2e2e;
  --nav-dropdown-background-color: #2e2e2e;
}
```

### Background Modifiers
- `.light-background` - slightly lighter dark background
- `.dark-background` - very dark background (used for hero section)

### Custom Classes to Know
- `.sitename` - Site logo text
- `.subtitle` - Small text above section titles
- `.section-title` - Container for section headers
- `.hero` - Hero/banner section styling
- `.profile-card` - Custom styled card for profiles
- `.social-links` - Social media icon container

## Development Workflow

### Local Preview Process
1. Open HTML file in VS Code editor
2. Click "Show Preview" icon (top right corner) or use Live Preview extension
3. Navigate external browser to http://127.0.0.1:3000/
4. **Important**: Use `127.0.0.1`, NOT `localhost` (prevents 401 errors with fonts/icons)

### Making Changes
1. **Analyze First**: Check existing HTML files ([index2.html](../index2.html), [starter-page.html](../starter-page.html)) for component examples
2. **Check Bootstrap**: See if Bootstrap provides the component/utility needed
3. **Check Template**: Look in [main.css](../assets/css/main.css) for existing custom styles
4. **Edit Unminified**: Always edit `main.css` and `main.js`, not `.min` versions
5. **Test in Preview**: Verify changes in Live Preview before committing

### Deployment
- **Auto-deploy**: Changes pushed to `main` branch are automatically published to GitHub Pages
- **No build process**: This is a static site with no compilation step
- **Keep commits focused**: One feature/fix per commit

## Content Guidelines for Citadel Universe

### Website Purpose
Showcase the Citadel game universe including:
- Game history and information
- Multiple game versions (Original, OpenGL, Remonstered, Evercade, Evacuation, WebGL)
- Story, lore, and extras (Gallery, Maps)
- Community links (Discord, Twitch, PayPal donations)

### Current Navigation Structure ([index2.html](../index2.html))
- **About** - Game information
- **News** - Latest updates
- **Play** - Link to browser game (`game/index.html`)
- **Versions** - Dropdown with different game releases
- **Extras** - Story, Gallery, Maps
- **Misc** - Privacy, T&Cs, Contact

### Brand Elements
- **Logo**: `assets/img/citadel64x64.png` / `citadel32x32.png`
- **Site Name**: "Citadel Universe"
- **Hero Tagline**: "It's only you... and the Citadel"
- **Typed Animation**: Emptiness..., Silence..., Solitude..., Hope...
- **Social Links**: Discord, Twitch, PayPal

## Common Tasks & Solutions

### Adding a New Section
```html
<section id="new-section" class="new-section section">
  <div class="container section-title" data-aos="fade-up">
    <span class="subtitle">Subtitle</span>
    <h2>Section Title</h2>
    <p>Description</p>
  </div>
  
  <div class="container">
    <!-- Use Bootstrap grid and components -->
    <div class="row">
      <div class="col-md-6">Content</div>
      <div class="col-md-6">Content</div>
    </div>
  </div>
</section>
```

### Adding to Navigation
```html
<li><a href="#new-section">New Section</a></li>
<!-- OR for dropdown -->
<li class="dropdown">
  <a href="#"><span>Label</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
  <ul>
    <li><a href="#">Item</a></li>
  </ul>
</li>
```

### Adding Images
- Place in appropriate `assets/img/` subfolder
- Use relative paths: `assets/img/portfolio/image.jpg`
- Consider responsive images with Bootstrap's `.img-fluid` class

### Using Bootstrap Icons
- Already included via `bootstrap-icons.css`
- Use format: `<i class="bi bi-icon-name"></i>`
- Examples: `bi-discord`, `bi-twitch`, `bi-paypal`, `bi-chevron-down`

### Responsive Design
- Use Bootstrap breakpoints: `-sm`, `-md`, `-lg`, `-xl`, `-xxl`
- Example: `class="col-12 col-md-6 col-lg-4"`
- Mobile-first approach: defaults for mobile, enhance for desktop

## Troubleshooting

### 401 Errors on Vendor Assets
- **Symptom**: Fonts or Bootstrap icons not loading
- **Solution**: Restart VS Code, use `127.0.0.1` instead of `localhost`

### Styles Not Applying
1. Check specificity - template may have existing styles
2. Use browser DevTools to inspect computed styles
3. Check if editing `main.css` (not `main.min.css`)
4. Verify CSS variable usage matches theme

### JavaScript Not Working
1. Check browser console for errors
2. Verify Bootstrap bundle is loaded before custom JS
3. Ensure vendor libraries (Typed.js, GLightbox) are properly initialized

## Best Practices

### Code Organization
- Keep HTML semantic and accessible
- Use Bootstrap utilities before custom CSS
- Comment complex custom CSS sections
- Group related styles in [main.css](../assets/css/main.css)

### Performance
- Optimize images before adding (WebP preferred)
- Leverage Bootstrap's built-in lazy loading where applicable
- Minimize custom JavaScript - use Bootstrap's built-in features

### Accessibility
- Include proper ARIA attributes on interactive elements
- Ensure color contrast meets WCAG standards (dark theme!)
- Test keyboard navigation
- Provide alt text for all images

### Git Workflow
- Descriptive commit messages: "Add gallery section to About page"
- Test locally before committing
- Keep related changes together in single commit
- Don't commit minified files unless specifically regenerated

## Additional Notes

### Template Origin
Based on **Craftivo** template from BootstrapMade.com
- License: https://bootstrapmade.com/license/
- Credit comments maintained in HTML files

### Copyright
Copyright (C) 2023-2026 Pawel Matusz, Artur Bardowski.  
All rights reserved.

### External Libraries in Use
- **Bootstrap 5.3.8**: Core framework
- **Bootstrap Icons**: Icon font
- **GLightbox**: Lightbox/modal images
- **Typed.js**: Typing animation effect

## When Helping Users

1. **Understand Intent**: Clarify what they want to achieve
2. **Check Existing Code**: Look at current implementations first
3. **Bootstrap-First Approach**: Suggest Bootstrap solutions before custom code
4. **Show Examples**: Reference existing patterns in [index2.html](../index2.html) or [starter-page.html](../starter-page.html)
5. **Explain Changes**: Briefly describe what you're changing and why
6. **Test Guidance**: Remind them to check in Live Preview
7. **Minimal Edits**: Make focused changes, don't rewrite working code

## Quick Reference

### File Paths (Absolute from Root)
- Main HTML: `c:\Projects\PC\pawelmat.github.io\index2.html`
- Main CSS: `c:\Projects\PC\pawelmat.github.io\assets\css\main.css`
- Main JS: `c:\Projects\PC\pawelmat.github.io\assets\js\main.js`

### External Links
- Bootstrap 5.3 Docs: https://getbootstrap.com/docs/5.3/
- Bootstrap Examples: https://getbootstrap.com/docs/5.3/examples/
- Bootstrap Icons: https://icons.getbootstrap.com/

### Key Concepts
- **Mobile-first responsive design** with Bootstrap grid
- **Dark theme** with custom CSS variables
- **Component-based** structure using Bootstrap
- **Progressive enhancement** over custom solutions
- **Accessibility** and semantic HTML

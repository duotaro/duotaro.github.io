# CLAUDE.md
必ず日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev           # Start Next.js development server

# Build and deployment
npm run build         # Build, export static files, and generate sitemap
npm run export        # Export static files only
npm run start         # Start production server
npm run lint          # Run Next.js linting
npm run deploy        # Git add, commit with 'release', and push to master
```

The `build` command combines Next.js build, static export, and sitemap generation in one step.

## Architecture Overview

This is a **Next.js 13 static site** with the following key characteristics:

### Core Architecture
- **Static Export**: Uses `next export` to generate static files for GitHub Pages deployment
- **Pages Router**: Uses traditional pages directory structure (not App Router)
- **Context-based State Management**: React Context providers for projects, blog, and about sections
- **TailwindCSS**: Styling with custom dark/light theme support
- **Framer Motion**: Page transitions and animations

### Key Integrations
- **Notion API**: Blog content is fetched from Notion databases using `@notionhq/client`
- **Firebase**: Analytics setup (currently commented out)
- **GitHub Pages**: Deployed via Firebase hosting with `out/` directory

### Project Structure
```
pages/           # Next.js pages (main app in index.js)
components/      # Reusable UI components organized by feature
  - blog/        # Blog-related components
  - projects/    # Project showcase components
  - parts/       # Page-specific sections
  - reusable/    # Generic UI components
context/         # React Context providers for state management
data/            # Static data files and configurations
lib/             # External service integrations (Notion, etc.)
hooks/           # Custom React hooks
styles/          # Global CSS
public/          # Static assets and generated files
```

### Context Architecture
The app uses multiple React Context providers:
- `ProjectsContext`: Project filtering and search
- `BlogContext`: Blog post management
- `AboutMeContext`: Personal information and stats
- `SingleProjectContext`: Individual project details
- `SingleBlogContext`: Individual blog post details

### Styling System
- **TailwindCSS** with custom theme extensions
- **Dark Mode**: Implemented via `class` strategy
- **Custom Colors**: Primary/secondary/ternary variants for light/dark themes
- **Responsive Design**: Mobile-first approach with container padding utilities

### Content Management
- **Blog Posts**: Fetched from Notion API with block-based rendering
- **Projects**: Static data with image imports
- **Dynamic Routing**: Uses static generation for blog and project pages

### Deployment Setup
- **GitHub Pages**: Hosted on `duotaro.github.io`
- **Firebase Hosting**: Alternative hosting configured with `out/` directory
- **Static Generation**: All pages pre-rendered at build time
- **Sitemap**: Auto-generated via `next-sitemap`

## Important Notes

### Environment Variables Required
- `NEXT_PUBLIC_NOTION_TOKEN`: For Notion API integration
- `URL_PREFIX`: For deployment path configuration (optional)

### Build Process
The site uses a multi-step build process:
1. `next build` - Compile and optimize
2. `next export` - Generate static files in `out/`
3. `next-sitemap` - Generate sitemap files

### URL Structure
- Base URL: `https://duotaro.github.io/`
- Uses trailing slashes for static hosting compatibility
- Asset prefix and base path configurable via `URL_PREFIX`

### Custom Features
- **Habit Tracking App**: The main page (`pages/index.js`) is a comprehensive habit tracking application with:
  - Task management with point system
  - Goal tracking with progress visualization
  - Self-talk/motivation system
  - Authentication with password protection
  - Local storage persistence
  - SNS sharing functionality

  ### Development Guidelines
- 必ず修正後にbuildして、テストをしてくださいね。
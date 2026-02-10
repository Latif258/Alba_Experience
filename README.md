# Alba Experience Studios

This is the official website for Alba Experience Studios, built with Next.js and Tailwind CSS.

## Features

- **Next.js 15+**: Leveraging the latest features of Next.js for a performant web experience.
- **Tailwind CSS**: Modern styling with utility-first CSS.
- **Static Export**: Configured for static site generation (SSG) for fast loading and easy hosting.
- **GitHub Pages Deployment**: Automated deployment via GitHub Actions.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Latif258/alba-experience.git
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Development

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the production-ready static files:
```bash
npm run build
```
The output will be in the `out/` directory.

## Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions whenever changes are pushed to the `main` branch.

To ensure proper deployment:
1. Go to your GitHub repository **Settings**.
2. Navigate to **Pages** in the sidebar.
3. Under **Build and deployment > Source**, select **GitHub Actions**.

## Project Structure

- `src/app/`: Next.js App Router components and pages.
- `src/components/`: Reusable UI components.
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Utility functions and shared logic.
- `public/`: Static assets like images and fonts.

# SureStrat Insurance Brokers Website

A modern, responsive website for SureStrat Insurance Brokers with an integrated quote request form that allows users to request insurance quotes for various types of coverage.

## Project Overview

This project consists of two main parts:

1. A React-based frontend built with Vite
2. A PHP API backend for processing quote requests

### Features

- Modern UI with Tailwind CSS and Framer Motion animations
- Multi-step interactive quote form
- Secure form validation with Zod
- Backend integration with PostgreSQL database
- Mobile-responsive design
- Development and production configurations

## Development Setup

### Prerequisites

- Node.js 16.x or higher
- Bun (recommended) or npm
- PostgreSQL database (local or remote)
- PHP 7.4+ for API development

### Local Development

1. Clone this repository

   ```bash
   git clone https://github.com/yourusername/surestrat-website.git
   cd surestrat-website
   ```

2. Install dependencies

   ```bash
   bun install
   # or
   npm install
   ```

3. Set up configuration

   ```bash
   cp secrets.example.php secrets.php
   ```

4. Edit `secrets.php` with your database credentials

5. Start the development server

   ```bash
   bun run dev
   # or
   npm run dev
   ```

6. The site will be available at http://localhost:5173

### Development Notes

- By default, the development environment uses a simulation mode for API requests
- Make all frontend changes in the `src` directory
- API changes should be made in the `public/api` directory

## Production Deployment

### Building the Frontend

1. Create an optimized production build

   ```bash
   bun run build
   # or
   npm run build
   ```

2. The build output will be in the `dist` directory

### Server Setup

#### Hosting Requirements

- Web server (Apache or Nginx)
- PHP 7.4 or higher
- PostgreSQL database
- SSL certificate (recommended for production)

#### Frontend Deployment

1. Upload the contents of the `dist` directory to your web host's document root
   ```
   /home/username/public_html/
   ```

#### API Deployment with Security

For secure API deployment, follow these critical steps:

1. Create a secure configuration directory **outside** your web root:

   ```
   /home/username/config/
   ```

2. Place `secrets.php` in this secure location:

   ```
   /home/username/config/secrets.php
   ```

3. Create a secure logs directory outside the web root:

   ```
   /home/username/logs/
   ```

4. **IMPORTANT**: Upload the PHP API files to your web server's document root:
   ```
   /home/username/public_html/submit-quote.php  (main API file)
   /home/username/public_html/config.php
   /home/username/public_html/env.php
   ```

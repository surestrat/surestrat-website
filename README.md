# SureStrat Website

This repository contains the SureStrat website and API backend.

## Development Setup

1. Clone this repository
2. Run `npm install` or `bun install` to install dependencies
3. Copy `secrets.example.php` to `secrets.php` and fill in your local database details
4. Run `npm run dev` or `bun run dev` to start the development server

## Production Deployment

### Frontend Deployment

1. Run `bun run build` or `npm run build`
2. Upload the contents of the `dist` directory to your web host

### API Deployment

For security, follow these important steps:

1. Create a `config` directory **outside** of your web root. For example, if your web root is at:

   ```
   /home/username/public_html/
   ```

   Create the config directory at:

   ```
   /home/username/config/
   ```

2. Place the `secrets.php` file in this config directory:

   ```
   /home/username/config/secrets.php
   ```

3. Create a logs directory outside web root:

   ```
   /home/username/logs/
   ```

4. Upload the contents of `public/api` to your web root's API directory

   ```
   /home/username/public_html/api/
   ```

5. Ensure the PHP files in the API directory have appropriate permissions (typically 644)

### Database Setup

Run the SQL commands in `db-setup.sql` to create the necessary database structure.

## Security Notes

- **Never** commit `secrets.php` to version control
- Keep all sensitive credentials outside the web root
- In production, disable PHP error display by setting `display_errors` to `0` in `submit-quote.php`
- Set appropriate CORS headers in production by replacing `*` with your domain in `Access-Control-Allow-Origin`

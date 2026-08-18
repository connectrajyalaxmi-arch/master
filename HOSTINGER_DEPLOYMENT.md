# Hostinger Business Web Hosting deployment

This production target uses the React build, the PHP API in `public/api`, and
Hostinger MySQL. The Node server remains available for local development but is
not required on Hostinger Business Web Hosting.

## 1. Build the application

```bash
npm ci
npm run build
```

Upload the **contents** of `dist` to the website's `public_html` directory. Do
not upload the `dist` directory as an extra nested folder. Hidden files must be
included so `public_html/.htaccess` and `public_html/api/.htaccess` are present.

## 2. Create the production database

In hPanel, open **Websites → Dashboard → Databases → Management** and create a
database plus a database user with a unique password. Record the generated
database name and username. Do not use the Hostinger account password.

Open phpMyAdmin for the new database and import `server/schema.sql`.

## 3. Configure the PHP API

In `public_html/api`, copy `config.example.php` to `config.php`. Replace every
placeholder with the production database credentials and a unique website
admin password. Keep these origins after the final domain is connected:

```php
'allowed_origins' => [
    'https://nsfi.org.in',
    'https://www.nsfi.org.in',
],
```

For temporary-domain testing, add the exact `https://...hostingersite.com`
origin temporarily, then remove it after `nsfi.org.in` is live.

`config.php` is ignored by Git and protected from direct HTTP access. Never
commit it or place the Hostinger account login inside it.

## 4. Test before connecting the domain

Using the Hostinger temporary domain, verify:

- the home page and client-side routes load;
- an enrollment creates an enrollment and notification row;
- an inquiry creates an inquiry and notification row;
- `/admin` accepts the configured production admin credentials;
- status updates, deletion, tracking, and certificate downloads work.

## 5. Connect the domain and SSL

Only after temporary-domain testing passes, connect `nsfi.org.in` to this
website in hPanel. Preserve all existing MX, SPF, DKIM, and DMARC records used
for email. Enable Hostinger SSL for both `nsfi.org.in` and `www.nsfi.org.in`,
force HTTPS, then remove the temporary domain from `allowed_origins`.

## 6. Confirm backups

Open **Websites → Dashboard → Backups → Database backups**. Confirm the new
database is included, download one backup after launch, and verify that a
restore point is available before each future release.

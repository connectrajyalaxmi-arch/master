<?php

declare(strict_types=1);

// Copy this file to config.php on Hostinger and replace every placeholder.
// public/api/config.php is ignored by Git and must never be committed.
return [
    'app_env' => 'production',
    'admin_email' => 'partnerships@nsfi.org.in',
    'admin_password' => 'replace-with-a-unique-production-admin-password',
    'db_host' => 'localhost',
    'db_port' => 3306,
    'db_name' => 'replace-with-hostinger-database-name',
    'db_user' => 'replace-with-hostinger-database-user',
    'db_password' => 'replace-with-hostinger-database-password',
    'allowed_origins' => [
        'https://nsfi.org.in',
        'https://www.nsfi.org.in',
    ],
];

<?php

declare(strict_types=1);

const VALID_STATUSES = ['received', 'under-review', 'processing', 'completed'];
const ADMIN_SESSION_SECONDS = 28800;

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function load_config(): array
{
    $configPath = __DIR__ . '/config.php';
    if (!is_file($configPath)) {
        json_response(['error' => 'Production API configuration is missing.'], 503);
    }

    $config = require $configPath;
    if (!is_array($config)) {
        json_response(['error' => 'Production API configuration is invalid.'], 503);
    }

    $required = [
        'app_env', 'admin_email', 'admin_password', 'db_host', 'db_name',
        'db_user', 'db_password', 'allowed_origins',
    ];
    foreach ($required as $key) {
        if (!array_key_exists($key, $config) || $config[$key] === '') {
            json_response(['error' => 'Production API configuration is incomplete.'], 503);
        }
    }

    if ($config['app_env'] !== 'production') {
        json_response(['error' => 'The hosted PHP API must run in production mode.'], 503);
    }

    return $config;
}

function apply_http_security(array $config): void
{
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Cache-Control: no-store');

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '') {
        if (!in_array($origin, $config['allowed_origins'], true)) {
            json_response(['error' => 'Origin is not allowed.'], 403);
        }
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    }

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function connect_database(array $config): PDO
{
    $port = (int) ($config['db_port'] ?? 3306);
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
        $config['db_host'],
        $port,
        $config['db_name'],
    );

    $pdo = new PDO($dsn, $config['db_user'], $config['db_password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $pdo->exec("SET time_zone = '+00:00'");
    return $pdo;
}

function request_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $body = json_decode($raw, true);
    if (!is_array($body)) {
        json_response(['error' => 'Request body must contain valid JSON.'], 400);
    }
    return $body;
}

function input_string(array $body, string $key, int $maxLength = 10000): string
{
    $value = trim((string) ($body[$key] ?? ''));
    if (strlen($value) > $maxLength) {
        json_response(['error' => sprintf('%s is too long.', $key)], 400);
    }
    return $value;
}

function iso_date(string $value): string
{
    $date = DateTimeImmutable::createFromFormat('Y-m-d H:i:s.v', $value, new DateTimeZone('UTC'));
    if (!$date) {
        $date = new DateTimeImmutable($value, new DateTimeZone('UTC'));
    }
    return $date->setTimezone(new DateTimeZone('UTC'))->format('Y-m-d\TH:i:s.v\Z');
}

function map_enrollment(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'name' => $row['name'],
        'email' => $row['email'],
        'phone' => $row['phone'] ?? '',
        'message' => $row['message'] ?? '',
        'program' => $row['program'],
        'status' => $row['status'] ?? 'received',
        'createdAt' => iso_date($row['created_at']),
    ];
}

function map_inquiry(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'companyName' => $row['company_name'] ?? '',
        'contactName' => $row['contact_name'],
        'email' => $row['email'],
        'phone' => $row['phone'] ?? '',
        'industry' => $row['industry'] ?? '',
        'message' => $row['message'] ?? '',
        'category' => $row['category'] ?? 'Partnership',
        'status' => $row['status'] ?? 'received',
        'createdAt' => iso_date($row['created_at']),
    ];
}

function map_notification(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'type' => $row['type'],
        'title' => $row['title'],
        'message' => $row['message'],
        'createdAt' => iso_date($row['created_at']),
        'read' => (bool) $row['is_read'],
    ];
}

function bearer_token(): string
{
    $header = $_SERVER['HTTP_AUTHORIZATION']
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
        ?? '';
    if (!preg_match('/^Bearer\s+(.+)$/i', trim($header), $matches)) {
        return '';
    }
    return trim($matches[1]);
}

function require_admin(PDO $pdo): void
{
    $token = bearer_token();
    if ($token === '') {
        json_response(['error' => 'Administrator access is required.'], 403);
    }

    $pdo->prepare('DELETE FROM admin_sessions WHERE expires_at <= UTC_TIMESTAMP()')->execute();
    $statement = $pdo->prepare(
        'SELECT token_hash FROM admin_sessions WHERE token_hash = ? AND expires_at > UTC_TIMESTAMP() LIMIT 1',
    );
    $statement->execute([hash('sha256', $token)]);
    if (!$statement->fetch()) {
        json_response(['error' => 'Administrator access is required.'], 403);
    }
}

function fetch_enrollments(PDO $pdo, ?string $email = null): array
{
    $sql = 'SELECT id, name, email, phone, message, program, status, created_at FROM enrollments';
    $params = [];
    if ($email !== null) {
        $sql .= ' WHERE email = ?';
        $params[] = $email;
    }
    $sql .= ' ORDER BY created_at DESC';
    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    return array_map('map_enrollment', $statement->fetchAll());
}

function fetch_inquiries(PDO $pdo, ?string $email = null): array
{
    $sql = 'SELECT id, company_name, contact_name, email, phone, industry, message, category, status, created_at FROM inquiries';
    $params = [];
    if ($email !== null) {
        $sql .= ' WHERE email = ?';
        $params[] = $email;
    }
    $sql .= ' ORDER BY created_at DESC';
    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    return array_map('map_inquiry', $statement->fetchAll());
}

$config = load_config();
apply_http_security($config);

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/api', PHP_URL_PATH) ?: '/api';
$route = trim((string) preg_replace('#^/api(?:/index\.php)?#', '', $path), '/');

try {
    $pdo = connect_database($config);

    if ($method === 'POST' && $route === 'admin/login') {
        $body = request_body();
        $email = strtolower(input_string($body, 'email', 320));
        $password = (string) ($body['password'] ?? '');
        $emailMatches = hash_equals(strtolower($config['admin_email']), $email);
        $passwordMatches = hash_equals((string) $config['admin_password'], $password);
        if (!$emailMatches || !$passwordMatches) {
            json_response(['error' => 'Invalid admin email or password.'], 401);
        }

        $token = bin2hex(random_bytes(32));
        $expiresAt = gmdate('Y-m-d H:i:s', time() + ADMIN_SESSION_SECONDS);
        $statement = $pdo->prepare(
            'INSERT INTO admin_sessions (token_hash, expires_at) VALUES (?, ?)',
        );
        $statement->execute([hash('sha256', $token), $expiresAt]);
        json_response(['success' => true, 'token' => $token]);
    }

    if ($method === 'POST' && $route === 'enroll') {
        $body = request_body();
        $name = input_string($body, 'name', 255);
        $email = strtolower(input_string($body, 'email', 320));
        $phone = input_string($body, 'phone', 30);
        $message = input_string($body, 'message');
        $program = input_string($body, 'program', 255);
        if ($name === '' || $email === '' || $program === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            json_response(['error' => 'A valid name, email, and program are required.'], 400);
        }

        $createdAt = gmdate('Y-m-d H:i:s.v');
        $pdo->beginTransaction();
        try {
            $statement = $pdo->prepare(
                "INSERT INTO enrollments (name, email, phone, message, program, status, created_at) VALUES (?, ?, ?, ?, ?, 'received', ?)",
            );
            $statement->execute([$name, $email, $phone, $message, $program, $createdAt]);
            $id = (int) $pdo->lastInsertId();
            $statement = $pdo->prepare(
                "INSERT INTO notifications (type, title, message, created_at, is_read) VALUES ('enrollment', 'New enrollment received', ?, ?, FALSE)",
            );
            $statement->execute([sprintf('%s requested enrollment for %s.', $name, $program), $createdAt]);
            $pdo->commit();
        } catch (Throwable $error) {
            $pdo->rollBack();
            throw $error;
        }

        json_response(['success' => true, 'enrollment' => [
            'id' => $id, 'name' => $name, 'email' => $email, 'phone' => $phone,
            'message' => $message, 'program' => $program, 'status' => 'received',
            'createdAt' => iso_date($createdAt),
        ]], 201);
    }

    if ($method === 'POST' && $route === 'inquiry') {
        $body = request_body();
        $companyName = input_string($body, 'companyName', 255);
        $contactName = input_string($body, 'contactName', 255);
        $email = strtolower(input_string($body, 'email', 320));
        $phone = input_string($body, 'phone', 30);
        $industry = input_string($body, 'industry', 255);
        $message = input_string($body, 'message');
        $category = input_string($body, 'category', 255) ?: 'Partnership';
        if ($contactName === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            json_response(['error' => 'A valid contact name and email are required.'], 400);
        }

        $createdAt = gmdate('Y-m-d H:i:s.v');
        $pdo->beginTransaction();
        try {
            $statement = $pdo->prepare(
                "INSERT INTO inquiries (company_name, contact_name, email, phone, industry, message, category, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'received', ?)",
            );
            $statement->execute([$companyName, $contactName, $email, $phone, $industry, $message, $category, $createdAt]);
            $id = (int) $pdo->lastInsertId();
            $statement = $pdo->prepare(
                "INSERT INTO notifications (type, title, message, created_at, is_read) VALUES ('inquiry', 'New inquiry received', ?, ?, FALSE)",
            );
            $statement->execute([sprintf('%s submitted a new inquiry for %s.', $contactName, $category), $createdAt]);
            $pdo->commit();
        } catch (Throwable $error) {
            $pdo->rollBack();
            throw $error;
        }

        json_response(['success' => true, 'inquiry' => [
            'id' => $id, 'companyName' => $companyName, 'contactName' => $contactName,
            'email' => $email, 'phone' => $phone, 'industry' => $industry,
            'message' => $message, 'category' => $category, 'status' => 'received',
            'createdAt' => iso_date($createdAt),
        ]], 201);
    }

    if ($method === 'GET' && $route === 'enrollments') {
        require_admin($pdo);
        json_response(fetch_enrollments($pdo));
    }

    if ($method === 'PUT' && preg_match('#^(enrollment|inquiry)/(\d+)/status$#', $route, $matches)) {
        require_admin($pdo);
        $type = $matches[1];
        $id = (int) $matches[2];
        $status = input_string(request_body(), 'status', 30);
        if (!in_array($status, VALID_STATUSES, true)) {
            json_response(['error' => 'Invalid status.'], 400);
        }

        $table = $type === 'enrollment' ? 'enrollments' : 'inquiries';
        $statement = $pdo->prepare("UPDATE {$table} SET status = ? WHERE id = ?");
        $statement->execute([$status, $id]);
        if ($statement->rowCount() === 0) {
            $check = $pdo->prepare("SELECT id FROM {$table} WHERE id = ?");
            $check->execute([$id]);
            if (!$check->fetch()) {
                json_response(['error' => ucfirst($type) . ' not found.'], 404);
            }
        }

        $items = $type === 'enrollment' ? fetch_enrollments($pdo) : fetch_inquiries($pdo);
        $record = null;
        foreach ($items as $item) {
            if ($item['id'] === $id) {
                $record = $item;
                break;
            }
        }
        json_response(['success' => true, $type => $record]);
    }

    if ($method === 'DELETE' && $route === 'admin/delete') {
        require_admin($pdo);
        $body = request_body();
        $type = input_string($body, 'type', 20);
        $id = filter_var($body['id'] ?? null, FILTER_VALIDATE_INT);
        if ($id === false || !in_array($type, ['enrollment', 'inquiry'], true)) {
            json_response(['error' => 'Invalid record.'], 400);
        }
        $table = $type === 'enrollment' ? 'enrollments' : 'inquiries';
        $statement = $pdo->prepare("DELETE FROM {$table} WHERE id = ?");
        $statement->execute([$id]);
        if ($statement->rowCount() === 0) {
            json_response(['error' => 'Record not found.'], 404);
        }
        json_response(['success' => true]);
    }

    if ($method === 'GET' && $route === 'notifications') {
        require_admin($pdo);
        $statement = $pdo->query(
            'SELECT id, type, title, message, created_at, is_read FROM notifications ORDER BY created_at DESC LIMIT 50',
        );
        json_response(['notifications' => array_map('map_notification', $statement->fetchAll())]);
    }

    if ($method === 'GET' && $route === 'track') {
        $isAdmin = ($_GET['admin'] ?? '') === 'true';
        if ($isAdmin) {
            require_admin($pdo);
            json_response([
                'enrollments' => fetch_enrollments($pdo),
                'inquiries' => fetch_inquiries($pdo),
                'isAdmin' => true,
            ]);
        }

        $email = strtolower(trim((string) ($_GET['email'] ?? '')));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            json_response(['error' => 'A valid email is required to track.'], 400);
        }
        json_response([
            'enrollments' => fetch_enrollments($pdo, $email),
            'inquiries' => fetch_inquiries($pdo, $email),
            'isAdmin' => false,
        ]);
    }

    json_response(['error' => 'API route not found.'], 404);
} catch (Throwable $error) {
    error_log('NSFI API failure: ' . $error->getMessage());
    json_response(['error' => 'An unexpected server error occurred.'], 500);
}

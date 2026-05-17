<?php
// ── Veritabanı Bağlantısı (PDO) ──────────────────────
// Bu dosyayı doğrudan açmayın; sadece require ile dahil edin.

define('DB_HOST', 'localhost');
define('DB_NAME', 'portfolyo_db');
define('DB_USER', 'root');       // MySQL kullanıcı adınızı girin
define('DB_PASS', '');           // MySQL şifrenizi girin
define('DB_CHAR', 'utf8mb4');

function getDB(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s',
                   DB_HOST, DB_NAME, DB_CHAR);

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Veritabanı bağlantı hatası.']);
        exit;
    }
    return $pdo;
}

// JSON yanıt yardımcısı
function jsonResponse(array $data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

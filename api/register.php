<?php
// api/register.php — Kullanıcı Kayıt
session_start();
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Sadece POST isteği kabul edilir.'], 405);
}

// JSON body oku
$body = json_decode(file_get_contents('php://input'), true) ?? [];

$name     = trim($body['name']  ?? '');
$email    = trim($body['email'] ?? '');
$password = $body['password']   ?? '';

// ── Doğrulama ──────────────────────────────────────────
$errors = [];

if (mb_strlen($name) < 2) {
    $errors[] = 'Ad soyad en az 2 karakter olmalıdır.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Geçerli bir e-posta adresi giriniz.';
}
if (strlen($password) < 6) {
    $errors[] = 'Şifre en az 6 karakter olmalıdır.';
}

if (!empty($errors)) {
    jsonResponse(['success' => false, 'errors' => $errors], 422);
}

// ── Kayıt ──────────────────────────────────────────────
$db = getDB();

// E-posta tekrar kontrolü
$stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    jsonResponse(['success' => false, 'error' => 'Bu e-posta adresi zaten kayıtlı.'], 409);
}

$hash = password_hash($password, PASSWORD_BCRYPT);

$stmt = $db->prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
);
$stmt->execute([$name, $email, $hash]);
$newId = $db->lastInsertId();

// Oturumu başlat
$_SESSION['user_id']   = $newId;
$_SESSION['user_name'] = $name;
$_SESSION['user_role'] = 'user';

jsonResponse([
    'success' => true,
    'message' => 'Kayıt başarılı! Hoş geldiniz, ' . $name . '.',
    'user'    => ['id' => $newId, 'name' => $name, 'email' => $email]
]);

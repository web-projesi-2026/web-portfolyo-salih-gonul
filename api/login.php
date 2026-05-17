<?php
// api/login.php — Kullanıcı Giriş
session_start();
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Sadece POST isteği kabul edilir.'], 405);
}

$body     = json_decode(file_get_contents('php://input'), true) ?? [];
$email    = trim($body['email']    ?? '');
$password = $body['password']      ?? '';

if (!$email || !$password) {
    jsonResponse(['success' => false, 'error' => 'E-posta ve şifre zorunludur.'], 422);
}

$db   = getDB();
$stmt = $db->prepare('SELECT id, name, email, password, role FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    jsonResponse(['success' => false, 'error' => 'E-posta veya şifre hatalı.'], 401);
}

// Oturum başlat
session_regenerate_id(true);
$_SESSION['user_id']   = $user['id'];
$_SESSION['user_name'] = $user['name'];
$_SESSION['user_role'] = $user['role'];

jsonResponse([
    'success' => true,
    'message' => 'Giriş başarılı! Hoş geldiniz, ' . $user['name'] . '.',
    'user'    => [
        'id'    => $user['id'],
        'name'  => $user['name'],
        'email' => $user['email'],
        'role'  => $user['role']
    ]
]);

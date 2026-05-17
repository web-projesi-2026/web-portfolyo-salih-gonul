<?php
// api/contact.php — Mesaj Kaydet (Veritabanına)
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Sadece POST isteği kabul edilir.'], 405);
}

$body    = json_decode(file_get_contents('php://input'), true) ?? [];
$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$subject = trim($body['subject'] ?? '');
$message = trim($body['message'] ?? '');

// ── Doğrulama ──────────────────────────────────────────
$errors = [];
if (mb_strlen($name) < 2)                         $errors[] = 'Ad soyad çok kısa.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))    $errors[] = 'Geçersiz e-posta.';
if (empty($subject))                               $errors[] = 'Konu boş olamaz.';
if (mb_strlen($message) < 10)                      $errors[] = 'Mesaj çok kısa (en az 10 karakter).';

if (!empty($errors)) {
    jsonResponse(['success' => false, 'errors' => $errors], 422);
}

// ── Veritabanına Kaydet ────────────────────────────────
$db   = getDB();
$stmt = $db->prepare(
    'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)'
);
$stmt->execute([$name, $email, $subject, $message]);

jsonResponse([
    'success' => true,
    'message' => 'Mesajınız alındı! En kısa sürede dönüş yapacağım.'
]);

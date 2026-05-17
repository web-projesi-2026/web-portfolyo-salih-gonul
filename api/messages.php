<?php
// api/messages.php — Mesajları Listele / Sil / Okundu İşaretle
session_start();
require_once __DIR__ . '/db.php';

// Sadece admin görebilir
if (($_SESSION['user_role'] ?? '') !== 'admin') {
    jsonResponse(['success' => false, 'error' => 'Yetkisiz erişim.'], 403);
}

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET — Listele ──────────────────────────────────────
if ($method === 'GET') {
    $stmt = $db->query(
        'SELECT id, name, email, subject, message, is_read,
                DATE_FORMAT(created_at, "%d.%m.%Y %H:%i") AS tarih
         FROM messages ORDER BY created_at DESC'
    );
    $rows = $stmt->fetchAll();
    jsonResponse(['success' => true, 'data' => $rows]);
}

// ── DELETE — Sil ───────────────────────────────────────
if ($method === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $id   = (int)($body['id'] ?? 0);
    if (!$id) jsonResponse(['success' => false, 'error' => 'Geçersiz ID.'], 422);

    $db->prepare('DELETE FROM messages WHERE id = ?')->execute([$id]);
    jsonResponse(['success' => true, 'message' => 'Mesaj silindi.']);
}

// ── PATCH — Okundu İşaretle ────────────────────────────
if ($method === 'PATCH') {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $id   = (int)($body['id'] ?? 0);
    if (!$id) jsonResponse(['success' => false, 'error' => 'Geçersiz ID.'], 422);

    $db->prepare('UPDATE messages SET is_read = 1 WHERE id = ?')->execute([$id]);
    jsonResponse(['success' => true, 'message' => 'Okundu olarak işaretlendi.']);
}

jsonResponse(['success' => false, 'error' => 'Desteklenmeyen method.'], 405);

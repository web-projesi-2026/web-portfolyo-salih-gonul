<?php
// api/logout.php — Oturum Sonlandır
session_start();
session_destroy();

require_once __DIR__ . '/db.php';
jsonResponse(['success' => true, 'message' => 'Çıkış yapıldı.']);

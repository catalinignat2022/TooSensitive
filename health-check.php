<?php
/**
 * TooSensitive Railway Health Check
 * Pagină minimă pentru verificarea rapidă a health check-ului
 */

// Setează header-ele rapid
http_response_code(200);
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache');

echo '<!DOCTYPE html>
<html>
<head>
    <title>TooSensitive Health Check</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>✅ TooSensitive Health Check OK</h1>
    <p><strong>Status:</strong> Apache și PHP funcționează</p>
    <p><strong>Timestamp:</strong> ' . date('Y-m-d H:i:s T') . '</p>
    <p><strong>PHP Version:</strong> ' . PHP_VERSION . '</p>
    <p><strong>Server:</strong> ' . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . '</p>
    <hr>
    <p>🚀 Railway deployment successful!</p>
</body>
</html>';

// Flush output pentru răspuns rapid
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
}
?>
<?php

// กำหนด root ของ project
define('LARAVEL_START', microtime(true));

if (php_sapi_name() !== 'cli') {
    // รันเฉพาะตอน web request ไม่รันตอน artisan CLI
    if (!is_dir('/tmp/storage/framework/sessions')) {
        @mkdir('/tmp/storage/framework/sessions', 0777, true);
        @mkdir('/tmp/storage/framework/views', 0777, true);
        @mkdir('/tmp/storage/framework/cache', 0777, true);
        @mkdir('/tmp/storage/framework/cache/data', 0777, true);
        @mkdir('/tmp/storage/logs', 0777, true);
    }
}

// Force HTTPS บน Vercel
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

// Vercel เก็บ vendor ที่ /var/task
require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

// Vercel ไม่มี storage จริง → ชี้ไปที่ /tmp
$app->useStoragePath('/tmp/storage');

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
)->send();

$kernel->terminate($request, $response);

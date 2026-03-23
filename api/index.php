<?php

// กำหนด root ของ project
define('LARAVEL_START', microtime(true));

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
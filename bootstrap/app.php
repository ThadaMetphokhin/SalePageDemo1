<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

// if (php_sapi_name() !== 'cli') {
//     // รันเฉพาะตอน web request ไม่รันตอน artisan CLI
//     if (!is_dir('/tmp/storage/framework/sessions')) {
//         @mkdir('/tmp/storage/framework/sessions', 0777, true);
//         @mkdir('/tmp/storage/framework/views', 0777, true);
//         @mkdir('/tmp/storage/framework/cache', 0777, true);
//         @mkdir('/tmp/storage/framework/cache/data', 0777, true);
//         @mkdir('/tmp/storage/logs', 0777, true);
//     }
// }

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

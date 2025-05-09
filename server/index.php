<?php

require __DIR__ . '/vendor/autoload.php';

use Slim\Factory\AppFactory;
use Middlewares\CORS;
use Dotenv\Dotenv;

$app = AppFactory::create();
$app->addRoutingMiddleware();
$app->add(new CORS());

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

require __DIR__ . '/src/configs/database.php';
require __DIR__ . '/src/routes/BaseRoute.php';
require __DIR__ . '/src/routes/AuthRoute.php';

$errorMiddleware = $app->addErrorMiddleware(true, true, true);
$app->run();

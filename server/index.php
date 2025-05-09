<?php

require __DIR__ . '/vendor/autoload.php';

use Slim\Factory\AppFactory;
use Middlewares\CORS;

$app = AppFactory::create();
$app->addRoutingMiddleware();
$app->add(new CORS());

$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

require __DIR__ . '/src/configs/database.php';
require __DIR__ . '/src/routes/BaseRoute.php';
require __DIR__ . '/src/routes/AuthRoute.php';

$errorMiddleware = $app->addErrorMiddleware(true, true, true);
$app->run();

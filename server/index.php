<?php
require __DIR__ . '/vendor/autoload.php';

use Slim\Factory\AppFactory;
use Middlewares\CORS;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$app->addRoutingMiddleware();

$app->add(new CORS());

$app->addErrorMiddleware(true, true, true);

$app->options('/{routes:.+}', function ($req, $resp) {
    return $resp;
});

require __DIR__ . '/src/configs/database.php';
require __DIR__ . '/src/routes/BaseRoute.php';
require __DIR__ . '/src/routes/AuthRoute.php';
require __DIR__ . '/src/routes/UserRoute.php';

$app->run();

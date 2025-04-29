<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Middlewares\CORS;

$app = AppFactory::create();

$app->add(new CORS());

$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

require '../src/configs/database.php';
require '../src/routes/AuthRoutes.php';
require '../src/routes/DefaultPath.php';

$app->run();

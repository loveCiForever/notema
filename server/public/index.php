<?php

require '../vendor/autoload.php';

use Slim\Factory\AppFactory;

$app = AppFactory::create();

require '../src/routes/routes.php';

$app->run();
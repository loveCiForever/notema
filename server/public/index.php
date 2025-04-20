<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Middlewares\CORS;

$app = AppFactory::create();

$app -> add(new CORS());


require '../src/routes/helloworld.php';

$app -> run();
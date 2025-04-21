<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Middlewares\CORS;

$app = AppFactory::create();

$app -> add(new CORS());

require '../src/routes/users.php';
require '../src/routes/defaultpath.php';
require '../src/configs/database.php';

$app -> run();
<?php

$app->get('/', function ($request, $response, $args) {
    $data = ['message' => 'Welcome to API server using Slim framework!'];
    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
});
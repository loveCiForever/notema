<?php

$app->get('/api/hello', function ($request, $response, $args) {
    $data = ['message' => 'Hello World!'];
    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
});
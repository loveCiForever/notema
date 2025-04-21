<?php

$app->get('/api/hello', function ($request, $response, $args) {
    $data = ['message' => 'Hi!'];
    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
});
<?php

require '../src/configs/database.php';

$app->get('/users', function ($request, $response, $args) use ($pdo) {
    $stmt = $pdo->query('SELECT * FROM users'); 
    $users = $stmt->fetchAll();
    $response->getBody()->write(json_encode($users));
    return $response->withHeader('Content-Type', 'application/json');
});
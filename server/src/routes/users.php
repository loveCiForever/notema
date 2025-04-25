<?php

require '../src/configs/database.php';

$app->post('/users', function ($request, $response, $args) use ($pdo) {
    $body = $request->getBody();
    $data = json_decode($body, true);
    $username = $data["username"];

    $stmt = $pdo->prepare('SELECT * FROM users where username = ?');
    $stmt->execute([$username]);

    $users = $stmt->fetchAll();
    $response->getBody()->write(json_encode($users));

    return $response->withHeader('Content-Type', 'application/json');
});

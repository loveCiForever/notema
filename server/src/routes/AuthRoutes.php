<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;

$app->post('/api/login', function (Request $request, Response $response) use ($pdo) {
    $body = $request->getBody();
    $data = json_decode($body, true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $header = $request->getHeaders();

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($password)) {
        $response->getBody()->write(json_encode(['message' => 'Invalid credentials', 'status' => 401]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        $response->getBody()->write(json_encode(['message' => 'Incorrect email', 'status' => 401]));
        return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
    }

    if (!password_verify($password, $user['password'])) {
        $response->getBody()->write(json_encode(['message' => 'Incorrect password', 'status' => 401]));
        return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
    }
    unset($user['password']);

    $payload = [
        'id' => $user['id'],
        'email' => $user['email'],
        'exp' => time() + (60 * 60 * 24)
    ];
    $jwt = JWT::encode($payload, 'HeheheThisIsAPrivateKey', 'HS256');


    $response->getBody()->write(json_encode([
        // 'header' => $header
        'user' => $user,
        'token' => $jwt,
    ]));

    return $response->withHeader('Content-Type', 'application/json');
});

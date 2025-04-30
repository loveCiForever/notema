<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;

$app->post('/api/login', function (Request $request, Response $response) use ($pdo) {
    $body = $request->getBody();
    $data = json_decode($body, true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    // $header = $request->getHeaders();

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

$app->post('/api/register', function (Request $request, Response $response) use ($pdo) {
    $body = $request->getBody();
    $data = json_decode($body, true);
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($username)) {
        $response->getBody()->write(json_encode(['message' => 'Username field is null']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response->getBody()->write(json_encode(['message' => 'Invalid email']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    if (empty($password)) {
        $response->getBody()->write(json_encode(['message' => 'Password field is null']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        $response->getBody()->write(json_encode(['message' => 'Email already registered']));
        return $response->withStatus(409)->withHeader('Content-Type', 'application/json');
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

    $stmt = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    $success = $stmt->execute([$username, $email, $hashedPassword]);

    if ($success) {
        $response->getBody()->write(json_encode(['message' => 'User registered successfully']));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    } else {
        $response->getBody()->write(json_encode(['message' => 'Registration failed']));
        return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
    }
});

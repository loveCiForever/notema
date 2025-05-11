<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as Handler;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Psr7\Response as SlimResponse;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

return function (Request $request, Handler $handler): Response {
    $secret = $_ENV['JWT_PRIVATE_KEY'];

    $authHeader = $request->getHeaderLine('Authorization');
    if (!preg_match('/Bearer\s+(.+)$/i', $authHeader, $matches)) {
        $resp = new SlimResponse();
        $resp->getBody()->write(json_encode([
            'success' => false,
            'message' => 'Missing or malformed Authorization header'
        ]));
        return $resp
            ->withStatus(401)
            ->withHeader('Content-Type', 'application/json');
    }
    $token = $matches[1];


    try {
        $decoded = JWT::decode($token, new Key($secret, 'HS256'));
    } catch (\Exception $e) {
        $resp = new SlimResponse();
        $resp->getBody()->write(json_encode([
            'success' => false,
            'message' => 'Invalid or expired token'
        ]));
        return $resp
            ->withStatus(401)
            ->withHeader('Content-Type', 'application/json');
    }

    $request = $request->withAttribute('jwt', $decoded);
    return $handler->handle($request);
};

<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->post('/users/{id}/profile', function (Request $request, Response $response, $args) use ($pdo) {
    $id = (int)$args['id'];
    $post  = $request->getParsedBody();
    $files = $request->getUploadedFiles();

    $fullname = $post['fullname'] ?? '';
    $email    = $post['email']    ?? '';
    $gender   = $post['gender']   ?? '';

    $avatarPath = null;
    if (isset($files['avatar'])) {
        $avatar = $files['avatar'];
        if ($avatar->getError() === UPLOAD_ERR_OK) {
            $ext       = pathinfo($avatar->getClientFilename(), PATHINFO_EXTENSION);
            $basename  = bin2hex(random_bytes(8));
            $filename  = sprintf('%s.%s', $basename, $ext);
            $directory = __DIR__ . '/../../../client/public/uploads/avatars';


            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }
            $avatar->moveTo($directory . DIRECTORY_SEPARATOR . $filename);
            $avatarPath = "/uploads/avatars/{$filename}";
        }
    }

    $fields = ['fullname = ?', 'email = ?', 'gender = ?'];
    $params = [$fullname, $email, $gender];

    if ($avatarPath) {
        $fields[] = 'avatar = ?';
        $params[] = $avatarPath;
    }
    $params[] = $id;

    $sql = 'UPDATE users SET ' . implode(', ', $fields) . ' WHERE id = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    $payload = [
        'success' => true,
        'message' => 'Profile updated successfully',
        'data'    => ['avatar' => $avatarPath]
    ];

    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json');
});

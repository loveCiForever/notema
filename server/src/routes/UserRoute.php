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
            $directory = __DIR__ . '/../../public/uploads/avatars';



            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }
            $avatar->moveTo($directory . DIRECTORY_SEPARATOR . $filename);
            $avatarPath = "/uploads/avatars/{$filename}";
        }
    }

    $validGenders = ['male', 'female', 'other'];
    $genderField  = [];
    $params       = [$fullname, $email];

    if (in_array($post['gender'] ?? '', $validGenders, true)) {
        $genderField = ['gender = ?'];
        $params[]    = $post['gender'];
    }

    if ($avatarPath) {
        $genderField[] = 'avatar = ?';
        $params[]      = $avatarPath;
    }

    $params[] = $id;
    $fields  = array_merge(
        ['fullname = ?', 'email = ?'],
        $genderField
    );

    $sql  = 'UPDATE users SET ' . implode(', ', $fields) . ' WHERE id = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    $select = $pdo->prepare('SELECT * FROM users WHERE id = ?');
    $select->execute([$id]);
    $updatedUser = $select->fetch();

    $payload = [
        'success' => true,
        'message' => 'Profile updated successfully',
        'data'    => ['user' => $updatedUser]
    ];


    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/users/{id}/password', function (Request $request, Response $response, $args) use ($pdo) {
    $id   = (int)$args['id'];
    $data = json_decode((string)$request->getBody(), true);

    $old = $data['oldPassword'] ?? '';
    $new = $data['newPassword'] ?? '';


    if (!$old || !$new) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'message' => 'Both old and new passwords are required.'
        ]));
        return $response
            ->withStatus(400)
            ->withHeader('Content-Type', 'application/json');
    }

    $stmt = $pdo->prepare('SELECT password FROM users WHERE id = ?');
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    if (!$user) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'message' => 'User not found.'
        ]));
        return $response
            ->withStatus(404)
            ->withHeader('Content-Type', 'application/json');
    }

    if (!password_verify($old, $user['password'])) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'message' => 'Old password is incorrect'
        ]));
        return $response
            ->withStatus(401)
            ->withHeader('Content-Type', 'application/json');
    }

    $newHash = password_hash($new, PASSWORD_BCRYPT, ['cost' => 10]);
    $upd     = $pdo->prepare('UPDATE users SET password = ? WHERE id = ?');
    $upd->execute([$newHash, $id]);

    $response->getBody()->write(json_encode([
        'success' => true,
        'message' => 'Password updated successfully.'
    ]));
    return $response
        ->withHeader('Content-Type', 'application/json');
});

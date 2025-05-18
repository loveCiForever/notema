
<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

$app->post('/note/new_note', function (Request $request, Response $response) use ($pdo) {
    $data = $request->getParsedBody();
    $title = $data['title'] ?? '';
    $blocks = $data['content'] ?? [];
    $author = $data['author'] ?? '';
    $createdAt = $data['createdAt'] ?? date('c');
    $updatedAt = $data['updatedAt'] ?? date('c');

    $stmt = $pdo->prepare(
        'INSERT INTO notes (title, content, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $title,
        json_encode(['blocks' => $blocks]),
        $author,
        date('Y-m-d H:i:s', strtotime($createdAt)),
        date('Y-m-d H:i:s', strtotime($updatedAt))
    ]);

    $newId = $pdo->lastInsertId();
    $payload = ['success' => true, 'id' => $newId];
    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
});


$app->get('/note/get_note/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    $userId = (int)$args['id'];
    // echo $userId;

    try {
        $stmt = $pdo->prepare('SELECT * FROM notes WHERE author = ? ORDER BY updated_at DESC');
        $stmt->execute([$userId]);
        $notes = $stmt->fetchAll();

        // echo $notes;

        foreach ($notes as &$note) {
            $note['content'] = json_decode($note['content'], true);
        }

        $payload = [
            'success' => true,
            'data' => $notes
        ];
        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    } catch (PDOException $e) {
        $payload = [
            'success' => false,
            'message' => 'Failed to fetch notes: ' . $e->getMessage()
        ];
        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
    }
});

$app->put('/note/update_note/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    $id = (int)$args['id'];
    $data = $request->getParsedBody();

    $title = $data['title'] ?? '';
    $blocks = $data['content'] ?? [];
    $updatedAt = $data['updatedAt'] ?? date('c');

    try {
        $stmt = $pdo->prepare('UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?');
        $stmt->execute([
            $title,
            json_encode(['blocks' => $blocks]),
            date('Y-m-d H:i:s', strtotime($updatedAt)),
            $id
        ]);

        $payload = ['success' => true, 'message' => 'Note updated'];
        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    } catch (PDOException $e) {
        $payload = ['success' => false, 'message' => 'Update failed: ' . $e->getMessage()];
        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
    }
});


$app->get('/note/get_single/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    $noteId = (int)$args['id'];

    $stmt = $pdo->prepare('SELECT * FROM notes WHERE id = ?');
    $stmt->execute([$noteId]);
    $note = $stmt->fetch();

    if (!$note) {
        $response->getBody()->write(json_encode(['success' => false, 'message' => 'Note not found']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
    }

    $note['content'] = json_decode($note['content'], true);

    $response->getBody()->write(json_encode(['success' => true, 'data' => $note]));
    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
});

$app->put('/note/set_visibility/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    $noteId = (int)$args['id'];
    $data = $request->getParsedBody();
    $newVisibility = $data['visibility'] ?? null;

    if (!in_array($newVisibility, ['public', 'private'])) {
        $payload = ['success' => false, 'message' => 'Invalid visibility value'];
        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
    }

    $stmt = $pdo->prepare('SELECT visibility FROM notes WHERE id = ?');
    $stmt->execute([$noteId]);
    $note = $stmt->fetch();

    if (!$note) {
        $payload = ['success' => false, 'message' => 'Note not found'];
        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
    }

    if ($note['visibility'] === $newVisibility) {
        $payload = ['success' => false, 'message' => "Note already is {$newVisibility}"];
        $response->getBody()->write(json_encode($payload));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    $stmt = $pdo->prepare('UPDATE notes SET visibility = ? WHERE id = ?');
    $stmt->execute([$newVisibility, $noteId]);

    $payload = ['success' => true, 'message' => "Visibility updated to {$newVisibility}"];
    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
});


$app->put('/note/toggle_favourite/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    return toggleBooleanColumn($pdo, $request, $response, $args, 'isFavourite');
});

$app->put('/note/toggle_locked/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    return toggleBooleanColumn($pdo, $request, $response, $args, 'isLocked');
});

$app->put('/note/toggle_pinned/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    return toggleBooleanColumn($pdo, $request, $response, $args, 'isPinned');
});


function toggleBooleanColumn($pdo, $request, $response, $args, $column)
{
    $noteId = (int)$args['id'];

    // Validate column name
    $allowedColumns = ['isFavourite', 'isLocked', 'isPinned'];
    if (!in_array($column, $allowedColumns)) {
        $response->getBody()->write(json_encode(['success' => false, 'message' => 'Invalid column']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
    }

    // Get current value
    $stmt = $pdo->prepare("SELECT $column FROM notes WHERE id = ?");
    $stmt->execute([$noteId]);
    $note = $stmt->fetch();

    if (!$note) {
        $response->getBody()->write(json_encode(['success' => false, 'message' => 'Note not found']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
    }

    $currentValue = $note[$column] ?? 0;
    $newValue = (int)!((int)$currentValue);

    // Update
    $stmt = $pdo->prepare("UPDATE notes SET $column = ? WHERE id = ?");
    $stmt->execute([$newValue, $noteId]);

    $response->getBody()->write(json_encode([
        'success' => true,
        'message' => ucfirst($column) . ' updated',
        'newValue' => $newValue,
    ]));
    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
}


$app->put('/note/move_to_trash/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    $noteId = (int)$args['id'];

    $stmt = $pdo->prepare('UPDATE notes SET isTrashed = 1 WHERE id = ?');
    $stmt->execute([$noteId]);

    $response->getBody()->write(json_encode([
        'success' => true,
        'message' => 'Note moved to trash',
    ]));

    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
});

$app->put('/note/restore_from_trash/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    $noteId = (int)$args['id'];


    $stmt = $pdo->prepare('SELECT id FROM notes WHERE id = ?');
    $stmt->execute([$noteId]);
    $note = $stmt->fetch();

    if (!$note) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'message' => 'Note not found',
        ]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
    }

    $stmt = $pdo->prepare('UPDATE notes SET isTrashed = 0 WHERE id = ?');
    $stmt->execute([$noteId]);

    $response->getBody()->write(json_encode([
        'success' => true,
        'message' => 'Note restored from trash',
    ]));

    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
});


$app->delete('/note/delete_forever/{id}', function (Request $request, Response $response, array $args) use ($pdo) {
    $noteId = (int)$args['id'];

    // Optional: only allow delete if isTrashed = 1
    $stmt = $pdo->prepare('SELECT isTrashed FROM notes WHERE id = ?');
    $stmt->execute([$noteId]);
    $note = $stmt->fetch();

    if (!$note) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'message' => 'Note not found',
        ]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
    }

    if ((int)$note['isTrashed'] !== 1) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'message' => 'Note must be moved to trash before deletion',
        ]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
    }

    // Permanently delete
    $stmt = $pdo->prepare('DELETE FROM notes WHERE id = ?');
    $stmt->execute([$noteId]);

    $response->getBody()->write(json_encode([
        'success' => true,
        'message' => 'Note permanently deleted',
    ]));

    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
});

// await axios.put(`${BASE_URL}/note/set_visibility/${noteId}`, {
//   visibility: "public", // or "private"
// });
// await axios.put(`${BASE_URL}/note/toggle_favourite/${noteId}`);
// await axios.put(`${BASE_URL}/note/toggle_locked/${noteId}`);
// await axios.put(`${BASE_URL}/note/toggle_pinned/${noteId}`);
// await axios.put(`${BASE_URL}/note/move_to_trash/${noteId}`); // move to trash
// await axios.delete(`${BASE_URL}/note/delete_forever/${noteId}`); // delete forever

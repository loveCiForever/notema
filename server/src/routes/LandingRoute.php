<?php

$app->get('/', function ($request, $response, $args) {
    $html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Notema API Server</title>
    <style>
        body {
            background: #f5f7fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 0.5rem;
        }
        p {
            color: #666;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>👋 Welcome to Notema's API Server</h1>
        <p>Glad you're here. Read our <a href="https://github.com/loveCiForever/notema">docs</a> and Let's build something great! 🚀</p>
    </div>
</body>
</html>
HTML;

    $response->getBody()->write($html);
    return $response->withHeader('Content-Type', 'text/html');
});

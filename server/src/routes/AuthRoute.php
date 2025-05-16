<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpInternalServerErrorException;
use Firebase\JWT\JWT;
use GrahamCampbell\ResultType\Success;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

$jwtMiddleware = require __DIR__ . '../../middlewares/JWT.php';

$app->post('/auth/login', function (Request $request, Response $response) use ($pdo) {
    try {
        $body = $request->getBody();
        $data = json_decode($body, true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($password)) {
            $payload = ['success' => false, 'message' => 'Invalid credentials'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();


        if (!$user) {
            $payload = ['success' => false, 'message' => 'Incorrect email'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        if (!password_verify($password, $user['password'])) {
            $payload = ['success' => false, 'message' => 'Incorrect password'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        if ($user['is_logged_in'] == 1) {
            $payload = ['success' => false, 'message' => 'Account is logged in another place'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt  = $pdo->prepare("UPDATE users SET is_logged_in = 1 WHERE email = ?");
        $stmt->execute([$email]);

        unset($user['password']);


        $payload = [
            'id' => $user['id'],
            'email' => $user['email'],
            'exp' => time() + (60 * 60 * 24)
        ];
        $jwt = JWT::encode($payload, $_ENV['JWT_PRIVATE_KEY'], 'HS256');


        $responseData = [
            'success' => true,
            'message' => 'Login Successfully',
            'data' => [
                'user' => $user,
                'access_token' => $jwt,
            ],
        ];

        $response->getBody()->write(json_encode($responseData));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    } catch (Exception $e) {
        error_log("Login API error: " . $e->getMessage());

        $errorPayload = ['success' => false, 'message' => 'Internal server error', 'error' => $e->getMessage()];
        $response->getBody()->write(json_encode($errorPayload));
        return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
    }
});

$app->post('/auth/register', function (Request $request, Response $response) use ($pdo) {
    try {
        $body = $request->getBody();
        $data = json_decode($body, true);
        $fullname = $data['fullname'] ?? '';
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        // input validation
        if (empty($fullname)) {
            $payload = ['success' => false, 'message' => 'Fullname is null'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $payload = ['success' => false, 'message' => 'Invalid Email'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        if (empty($password)) {
            $payload = ['success' => false, 'message' => 'Password is null'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // check mail is exist or not
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $payload = ['success' => false, 'message' => 'Email is already used'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(409)->withHeader('Content-Type', 'application/json');
        }

        // create users
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

        $stmt = $pdo->prepare('INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)');
        $stmt->execute([$fullname, $email, $hashedPassword]);

        $token = bin2hex(random_bytes(16));
        $stmt = $pdo->prepare("UPDATE users SET verification_token = ? WHERE email = ?");
        $success = $stmt->execute([$token, $email]);

        $sent = sendVerificationEmail($email, $token);

        if ($success && $sent === true) {
            $payload = ['success' => true, 'message' => 'Registration Successfully. Check mail to verify account'];
        } else {
            $payload = [
                'success' => false,
                'message' => ($sent !== true) ? $sent : 'Registration failed'
            ];
        }

        $response->getBody()->write(json_encode($payload));
        return $response->withStatus($payload['success'] ? 201 : 500)->withHeader('Content-Type', 'application/json');
    } catch (Exception $e) {
        $errorMessage = "Register API error: " . $e->getMessage();
        error_log($errorMessage);

        echo $errorMessage;

        $errorPayload = [
            'success' => false,
            'message' => 'Internal server error',
            'error' => $e->getMessage()
        ];
        $response->getBody()->write(json_encode($errorPayload));
        return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
    }
});


function sendVerificationEmail($toEmail, $token)
{
    $mail = new PHPMailer(true);
    $host = $_ENV['SMTP_HOST'];
    $username = $_ENV['SMTP_USERNAME'];
    $password = $_ENV['SMTP_PASSWORD'];
    $port = $_ENV['SMTP_PORT'];

    try {
        $mail->isSMTP();
        $mail->Host       = $host;
        $mail->SMTPAuth   = true;
        $mail->Username   = $username;
        $mail->Password   = $password;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = $port;

        // $mail->SMTPDebug  = SMTP::DEBUG_SERVER;
        // $mail->Debugoutput = 'html';

        // var_dump($_ENV['SMTP_USERNAME'], $_ENV['SMTP_PASSWORD'], $_ENV['SMTP_HOST'], $_ENV['SMTP_PORT']);

        $mail->setFrom($username, 'Notema');
        $mail->addAddress($toEmail);

        $mail->isHTML(true);
        $mail->Subject = 'Verify your account';

        $verification_link = "http://localhost:5173/verify?token=$token";

        $mail->Body = '
            <table align="center" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
                <tr>
                <td align="center">
                    <table width="630" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; max-width: 630px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); font-family: Roboto, sans-serif;">
                    <tr>
                        <td style="padding: 30px;">
                        <h2 style="color: #333;">Thank you for registering with <strong>Notema</strong>!</h2>
                        <p style="font-size: 16px; color: #555;">Please verify your email address by clicking the button below:</p>
            
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="' . $verification_link . '" 
                            style="background-color: #000000; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                            Verify Email
                            </a>
                        </div>

                        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />
            
                        <table cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: #444;">
                            <tr><td colspan="2" height="0" style="line-height: 0px;">&nbsp;</td></tr>

                            <tr>
                            <td style="padding-right: 15px;" width="100">
                                <img src="https://notema.io.vn/logo_1_1.png" alt="Notema Logo" style="width: 80px; height: auto;" />
                            </td>
                            <td>
                                <strong style="font-size: 16px; color: #222;">Notema Support Team</strong><br />
                                <a href="mailto:support@notema.io.vn" style="color: #5a5a5a; text-decoration: none;">support@notema.io.vn</a><br />
                                <a href="https://notema.io.vn" target="_blank" style="color: #5a5a5a;  text-decoration: none;">www.notema.io.vn</a><br />
                                <span>Hotline: +84 963040805</span><br />
                            </td>
                            </tr>
                            
                        </table>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
        ';


        $mail->send();
        return true;
    } catch (Exception $e) {
        $errorMessage = "Mailer Error: " . $mail->ErrorInfo . " | Exception: " . $e->getMessage();
        error_log($errorMessage);
        echo $errorMessage;
        return $errorMessage;
    }
}

$app->get('/auth/verify', function (Request $request, Response $response) use ($pdo) {
    $params = $request->getQueryParams();
    $token  = $params['token'] ?? '';

    if (empty($token)) {
        $payload = ['success' => false, 'message' => 'Verification token is missing.'];
        $response->getBody()->write(json_encode($payload));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    try {
        $stmt = $pdo->prepare('SELECT id, is_verified FROM users WHERE verification_token = ? LIMIT 1');
        $stmt->execute([$token]);
        $user = $stmt->fetch();

        if (!$user) {
            $payload = ['success' => false, 'message' => 'Invalid or expired token.'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        if ($user['is_verified']) {
            $payload = ['success' => true, 'message' => 'Your email is already verified.'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $update = $pdo->prepare('
            UPDATE users
               SET is_verified = 1,
                   verified_at = NOW()
             WHERE id = ?
        ');
        $update->execute([$user['id']]);

        $payload = ['success' => true, 'message' => 'Email successfully verified!'];
        $response->getBody()->write(json_encode($payload));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    } catch (Exception $e) {
        error_log('Verify API error: ' . $e->getMessage());
        $payload = ['success' => false, 'message' => 'Server error during verification.'];
        $response->getBody()->write(json_encode($payload));
        return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
    }
});

$app->get('/auth/logout', function (Request $request, Response $response) use ($pdo) {
    $decoded = $request->getAttribute('jwt');
    $email   = $decoded->email ?? '';

    try {
        $stmt = $pdo->prepare('SELECT is_logged_in FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user) {
            $payload = ['success' => false, 'message' => 'Invalid email'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        if ($user['is_logged_in'] == 0) {
            $payload = ['success' => false, 'message' => 'Account is already logout'];
            $response->getBody()->write(json_encode($payload));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $pdo->prepare('UPDATE users SET is_logged_in = 0 WHERE email = ?');
        $stmt->execute([$email]);

        $payload = ['success' => true, 'message' => 'Logout successfully'];
        $response->getBody()->write(json_encode($payload));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    } catch (Exception $e) {
        $payload = ['success' => false, 'message' => 'Server error during logout.'];
        $response->getBody()->write(json_encode($payload));
        return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
    }
})->add($jwtMiddleware);;

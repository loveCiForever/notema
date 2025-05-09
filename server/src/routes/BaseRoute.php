<?php

$app->get('/', function ($request, $response, $args) {
    $html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>api.notema.io.vn - Private API Service</title>
    <style>
        /* Basic Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Base Styles */
        html {
            font-size: 16px;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        /* Header */
        header {
            text-align: center;
            padding: 40px 20px;
            background-color: #154c79;
            color: white;
            border-radius: 8px;
            margin-bottom: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 3.5rem;
            margin-bottom: 15px;
            letter-spacing: -0.5px;
        }

        .tagline {
            font-size: 1.4rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Main Content */
        main {
            background-color: white;
            border-radius: 8px;
            padding: 50px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 40px;
        }

        section {
            margin-bottom: 50px;
        }

        section:last-child {
            margin-bottom: 0;
        }

        h2 {
            color: #154c79;
            margin-bottom: 25px;
            font-size: 2rem;
            position: relative;
            padding-bottom: 10px;
        }

        h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 3px;
            background-color: #154c79;
        }

        p {
            margin-bottom: 20px;
            font-size: 1.1rem;
            line-height: 1.7;
        }

        /* Contact Section */
        .contact-info {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 8px;
            border-left: 4px solid #154c79;
            transition: all 0.3s ease;
        }

        .contact-info:hover {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .contact-info p {
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
 
        .contact-info p:last-child {
            margin-bottom: 0;
        }

        .contact-info a {
            color: #154c79;
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .contact-info a:hover {
            color: #1a6eb8;
            text-decoration: underline;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 30px 0;
            color: #666;
            font-size: 1rem;
        }

        /* Responsive Design - Tablet */
        @media (max-width: 992px) {
            html {
                font-size: 15px;
            }
            
            .container {
                max-width: 90%;
            }
            
            header {
                padding: 60px 20px;
            }
            
            h1 {
                font-size: 3rem;
            }
            
            .tagline {
                font-size: 1.3rem;
            }
            
            main {
                padding: 40px;
            }
            
            h2 {
                font-size: 1.8rem;
            }
        }

        /* Responsive Design - Large Mobile */
        @media (max-width: 768px) {
            html {
                font-size: 14px;
            }
            
            .container {
                max-width: 95%;
                padding: 15px;
            }
            
            header {
                padding: 50px 15px;
                margin-bottom: 30px;
            }
            
            h1 {
                font-size: 2.5rem;
            }
            
            .tagline {
                font-size: 1.2rem;
            }
            
            main {
                padding: 30px;
            }
            
            h2 {
                font-size: 1.6rem;
                margin-bottom: 20px;
            }
            
            p {
                font-size: 1rem;
                margin-bottom: 15px;
            }
            
            .contact-info {
                padding: 25px;
            }
        }

        /* Responsive Design - Small Mobile */
        @media (max-width: 480px) {
            html {
                font-size: 13px;
            }
            
            .container {
                padding: 10px;
            }
            
            header {
                padding: 20px 15px;
                margin-bottom: 25px;
            }
            
            h1 {
                font-size: 2rem;
                margin-bottom: 10px;
            }
            
            .tagline {
                font-size: 1rem;
            }
            
            main {
                padding: 20px;
            }
            
            h2 {
                font-size: 1.4rem;
                margin-bottom: 15px;
            }
            
            h2::after {
                width: 40px;
                height: 2px;
            }
            
            p {
                font-size: 0.95rem;
                line-height: 1.6;
                margin-bottom: 12px;
            }
            
            .contact-info {
                padding: 20px;
            }
            
            .contact-info p {
                font-size: 0.95rem;
            }
            
            footer {
                padding: 20px 0;
                font-size: 0.9rem;
            }
        }

        /* Extra Small Devices */
        @media (max-width: 320px) {
            header {
                padding: 30px 10px;
            }
            
            h1 {
                font-size: 1.8rem;
            }
            
            main {
                padding: 15px;
            }
            
            .contact-info {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>api.notema.io.vn</h1>
            <p class="tagline">Private API Service for Stock and Blog Data</p>
        </header>

        <main>
        <section class="description">
            <h2>About Our API</h2>
            <p>This is a private API server that powers the React-based note management website at <a href="https://notema.io.vn" target="_blank"><strong>notema.io.vn</strong></a>. The API provides core functionality for managing user accounts, creating and organizing notes, and enabling seamless synchronization across devices.</p>
            <p>To maintain security and protect user data, this API server is restricted to accept requests only from <a href="https://notema.io.vn" target="_blank"><strong>notema.io.vn</strong></a>. This ensures secure data handling and reliable service performance.</p>
        </section>


            <section class="contact">
                <h2>Contact Us</h2>
                <div class="contact-info">
                    <p><strong>Email:</strong> <a href="mailto:quanghuy71847@gmail.com">quanghuy71847@gmail.com</a></p>
                    <p><strong>Hotline:</strong> <a href="tel:+84963040805">+84 963040805</a></p>
                </div>
            </section>
        </main>

        <footer>
            <h3>&copy; 2025 api.notema.io.vn. All rights reserved.</h3>
        </footer>
    </div>
</body>
</html>
HTML;

    $response->getBody()->write($html);
    return $response->withHeader('Content-Type', 'text/html');
});

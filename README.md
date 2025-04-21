# Notema

Notema is a web application that allows users to manage their notes efficiently. This project consists of a Slim Framework backend and a React frontend styled with Tailwind CSS.

## Table of Contents

- [Notema](#notema)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Backend (Slim Framework)](#backend-slim-framework)
    - [Frontend (React)](#frontend-react)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Navigate to the Project Directory](#navigate-to-the-project-directory)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Access the Application](#access-the-application)
  - [Technologies Used](#technologies-used)

## Requirements

To run this project locally, you need to have the following installed on your machine:

### Backend (Slim Framework)

1. **PHP** (version 7.2 or higher)
   - You can download PHP from [php.net](https://www.php.net/downloads).

2. **Composer**
   - Composer is a dependency manager for PHP. You can download it from [getcomposer.org](https://getcomposer.org/download/).

### Frontend (React)

1. **Node.js** (version 14 or higher)
   - You can download Node.js from [nodejs.org](https://nodejs.org/).

2. **npm** (comes with Node.js)
   - npm is the package manager for JavaScript.

## Installation

Follow these steps to set up and run the project locally:

### Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/loveCiForever/note-mana.git
```

### Navigate to the Project Directory

```bash
cd note-mana
```

### Backend Setup

1. **Navigate to the Backend Directory**

   ```bash
   cd server
   ```

2. **Install Backend Dependencies**

   Run the following command to install the required PHP packages using Composer:

   ```bash
   composer install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the backend directory. You can copy the `.env.example` file if it exists:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your database credentials and other environment-specific settings.

4. **Run Database Migrations** (if applicable)

   If your project uses a database and has migrations, run the following command to set up the database schema:

   ```bash
   php artisan migrate
   ```

5. **Run the Development Server**
   Start the Slim development server:

   ```bash
   php -s localhost:8000
   ```


### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Frontend Dependencies**

   Run the following command to install the required JavaScript packages using npm:

   ```bash
   npm install
   ```

3. **Run the Development Server**

   Start the Vite development server:

   ```bash
   npm run dev
   ```

### Access the Application

- Open your web browser and navigate to `http://localhost:3000` to see the React frontend.
- The backend API will be accessible at `http://localhost:8000`.


## Technologies Used

- **Backend**: Slim Framework, PHP, MySQL 
- **Frontend**: React, Tailwind CSS, Axios

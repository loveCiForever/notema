-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 18, 2025 at 11:27 PM
-- Server version: 10.11.11-MariaDB-log
-- PHP Version: 8.3.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notemaio_main_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `author` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `isPinned` tinyint(1) DEFAULT NULL,
  `isFavourite` tinyint(1) DEFAULT NULL,
  `visibility` varchar(20) DEFAULT 'private',
  `isLocked` tinyint(1) DEFAULT NULL,
  `isTrashed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `author`, `created_at`, `updated_at`, `isPinned`, `isFavourite`, `visibility`, `isLocked`, `isTrashed`) VALUES
(10, 'This is the first Note', '{\"blocks\":[{\"id\":\"OqRhaAcsGh\",\"type\":\"paragraph\",\"data\":{\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis hendrerit ex, eget lacinia lectus placerat non. Nullam vel neque at elit laoreet tincidunt. Maecenas vitae convallis risus. Ut quis arcu accumsan, bibendum elit sed, rutrum lorem. Donec nunc ante, eleifend ut risus in, consectetur lobortis nisi. Proin mauris sem, porta id velit nec, cursus dictum sapien. Integer id est nec libero dapibus sodales in dapibus dolor. Cras suscipit nisi a sem eleifend, eget pulvinar libero tincidunt. Nullam sit amet fringilla felis, sed dignissim sem. Fusce fermentum euismod pulvinar. Donec ullamcorper sapien non nibh viverra, nec scelerisque urna vulputate. Sed feugiat, nisl vel commodo consectetur, nulla est dapibus nunc, vitae placerat tellus orci et leo. Phasellus dui est, finibus a diam a, congue pharetra neque. Aliquam tincidunt malesuada sem et efficitur. Sed in massa mi.\"}},{\"id\":\"3kwp0F0Eud\",\"type\":\"paragraph\",\"data\":{\"text\":\"Sed semper consequat tellus, sit amet laoreet urna lacinia ut. Suspendisse at malesuada justo, id blandit metus. Nunc quis sagittis libero, sit amet porta ex. Vestibulum nec eros quis massa sodales fermentum ut ac purus. Quisque aliquam vitae tortor faucibus fringilla. Cras vulputate ac nisi sit amet pulvinar. Vivamus a tristique lorem, eget mollis tortor. Phasellus vel elit viverra, cursus tortor quis, convallis eros.\"}},{\"id\":\"0HdYzyXfNm\",\"type\":\"paragraph\",\"data\":{\"text\":\"Fusce tincidunt efficitur accumsan. Phasellus vel augue convallis, dapibus metus at, blandit leo. Donec sit amet consectetur nisi. Vivamus tempus sapien in dui elementum pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam sagittis, ex nec porttitor placerat, tellus quam commodo diam, eu pretium ex sapien sed nisl. Integer ut gravida elit. Phasellus eu erat quis justo volutpat euismod. Praesent gravida orci pulvinar nibh viverra aliquet. Proin eu erat pretium, vestibulum lacus eget, aliquet ante. Donec turpis nisi, condimentum a aliquam vitae, sodales at augue. Aliquam dignissim dictum dui, sit amet vehicula nunc luctus eget. Pellentesque in lacus tortor. Aenean tortor ligula, gravida faucibus mollis id, egestas id enim.\"}},{\"id\":\"pZmb7dgoa6\",\"type\":\"paragraph\",\"data\":{\"text\":\"Fusce non sapien enim. Integer at euismod quam. Curabitur odio ex, venenatis et finibus sed, mollis malesuada erat. Donec ut varius lacus. In sodales leo facilisis finibus ultricies. Fusce molestie efficitur dui quis pharetra. Integer suscipit dui in urna egestas molestie. Ut eu accumsan leo, eget dapibus urna. Maecenas a nisl leo. Fusce facilisis purus accumsan, pharetra nulla vitae, varius diam. Proin sit amet varius massa. Aenean eget quam non ex pellentesque interdum.\"}},{\"id\":\"AAyp99RFLZ\",\"type\":\"paragraph\",\"data\":{\"text\":\"Sed vitae nulla ligula. Vestibulum iaculis elit ut aliquam vestibulum. Donec lobortis sapien eget malesuada faucibus. Phasellus magna quam, viverra vel metus vel, placerat aliquet massa. Ut interdum molestie libero, ut rhoncus neque feugiat eu. Pellentesque varius imperdiet nunc, eget dictum elit porta laoreet. Suspendisse vulputate sem ac massa faucibus, ut tincidunt dui vestibulum. Maecenas dignissim placerat pharetra. Vivamus consectetur, ipsum a vestibulum lobortis, ante tellus pulvinar ante, at ultricies odio justo eu lectus. Donec sagittis viverra quam at faucibus. Nullam tincidunt augue et quam interdum, convallis euismod ante cursus. Maecenas at laoreet ligula. Maecenas tortor ligula, porta quis lacus eu, cursus vulputate tortor. Aliquam erat volutpat.\"}}]}', 10, '2025-05-18 20:42:40', '2025-05-18 20:46:58', 0, NULL, NULL, NULL, 0),
(11, 'Mandatory Compliance with Red-Highlighted Content', '{\"blocks\":[{\"id\":\"05knJK9qt_\",\"type\":\"paragraph\",\"data\":{\"text\":\"For content highlighted in red, students must adhere strictly to the descriptions provided. Any deviation, modification, or addition of&nbsp;features will result in the submission being disqualified from evaluation.\"}},{\"id\":\"GKIJy03_CQ\",\"type\":\"paragraph\",\"data\":{\"text\":\"Develop a note management application that enables users to create and organize their notes. The notes can encompass diverse content&nbsp;formats, including text, images, and attached files. Students must strictly adhere to the functionalities outlined in this assignment. Introducing unrelated features that deviate from the specified requirements may indicate that the student did not independently complete&nbsp;the project. While students are permitted to utilize libraries and frameworks to aid in development\\u2014such as Bootstrap or React for the&nbsp;front end and Laravel for the back end - no additional features beyond those described should be implemented.\"}}]}', 11, '2025-05-18 20:48:26', '2025-05-18 22:12:43', 1, 1, 'public', NULL, 0),
(12, 'Quote', '{\"blocks\":[{\"id\":\"D9XEaXPjUo\",\"type\":\"paragraph\",\"data\":{\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus neque in hendrerit faucibus. Morbi in vehicula lorem. Praesent orci sem, pharetra ac nisl in, sagittis rhoncus nunc. Donec posuere leo vitae mi sagittis, quis hendrerit diam viverra. Quisque dictum lectus vitae eros ullamcorper, eget porttitor quam elementum. Nam viverra, massa vel aliquam faucibus, nunc dolor vehicula dui, et accumsan magna urna suscipit dolor. Cras consequat gravida nisi, a feugiat massa tempus sit amet. Nunc dapibus erat in elit scelerisque congue quis sit amet dui. Praesent sed blandit lorem. Nullam sed dui condimentum, malesuada neque id, tempor risus. Curabitur sagittis hendrerit quam a facilisis. Nullam quis turpis faucibus risus gravida varius ac ac dui. Donec dignissim, sapien sed vestibulum blandit, diam mauris mattis odio, id tempus arcu libero quis ex. Ut vestibulum sapien sem, sit amet bibendum diam vestibulum vitae. Morbi tristique odio lectus, sed tempor diam faucibus vel.\"}}]}', 10, '2025-05-18 21:46:17', '2025-05-18 22:47:03', 0, NULL, NULL, NULL, 0),
(14, 'Lorem Ipsum asdddassds sddsa  dasdsad', '{\"blocks\":[{\"id\":\"k2Dwrf3z7b\",\"type\":\"paragraph\",\"data\":{\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"}}]}', 11, '2025-05-18 22:07:51', '2025-05-18 22:12:12', 0, NULL, 'private', NULL, 0),
(16, 'test', '{\"blocks\":[{\"id\":\"Zwxyf0z92T\",\"type\":\"paragraph\",\"data\":{\"text\":\"test\"}},{\"id\":\"9mCyMjDsfi\",\"type\":\"paragraph\",\"data\":{\"text\":\"test line\"}}]}', 11, '2025-05-18 22:40:27', '2025-05-18 23:21:42', 1, NULL, 'private', NULL, 0),
(17, 'CSS Layout - The position Property', '{\"blocks\":[]}', 10, '2025-05-18 22:48:16', '2025-05-18 22:48:24', NULL, NULL, 'private', NULL, 0),
(18, '', '{\"blocks\":[]}', 10, '2025-05-18 22:48:31', '2025-05-18 22:48:31', NULL, NULL, 'private', NULL, 0),
(19, 'abc', '{\"blocks\":[]}', 10, '2025-05-18 22:56:48', '2025-05-18 22:58:03', NULL, NULL, 'private', NULL, 0),
(20, 'testing title', '{\"blocks\":[{\"id\":\"9ixVwH0zEg\",\"type\":\"paragraph\",\"data\":{\"text\":\"line 1\"}},{\"id\":\"zrscAx7oT2\",\"type\":\"paragraph\",\"data\":{\"text\":\"line 2\"}},{\"id\":\"qwUWqXsOi7\",\"type\":\"paragraph\",\"data\":{\"text\":\"line 3\"}},{\"id\":\"TDPduyH7Xi\",\"type\":\"paragraph\",\"data\":{\"text\":\"line 4\"}}]}', 11, '2025-05-18 23:20:43', '2025-05-18 23:21:29', 1, NULL, 'private', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `verification_token` varchar(32) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `verified_at` datetime DEFAULT NULL,
  `is_logged_in` tinyint(1) NOT NULL DEFAULT 0,
  `gender` enum('male','female','other') NOT NULL DEFAULT 'other',
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `created_at`, `verification_token`, `is_verified`, `verified_at`, `is_logged_in`, `gender`, `avatar`) VALUES
(10, 'Truong', 'nguyenquangtruong08112005@gmail.com', '$2y$10$tGf1NR6JnLzyUyobCP7GW.RBQYB3LsZmnXilVVYvivjkw2jkEDkXO', '2025-05-18 20:42:01', '78e9eb9d95ec704b192e601f313c6127', 0, NULL, 1, 'male', '/uploads/avatars/0bbce75e6a3c06bc.gif'),
(11, 'Quang Huy', 'quanghuy71847@gmail.com', '$2y$10$8qUBtEOtmt0YBj7auElh4eoAXbxoJ.dLlypIFS36aSIZZONDBIzXe', '2025-05-18 20:43:45', 'ab4c3c6fe216955522731fc3c100485c', 1, '2025-05-18 22:33:54', 1, 'other', NULL),
(13, 'Huynh Tan Tai', '523H0090@student.tdtu.edu.vn', '$2y$10$oJY9FHfrJuWYamuTbDX8Ge2YZsz.OwxBnUn0pVoARzR6espMaA0pG', '2025-05-18 22:55:38', 'b7a57a367ca5a05f814359e612373ca7', 0, NULL, 0, 'other', '/uploads/avatars/179599c4f8d30653.png'),
(14, 'Huynh Tan Tai ', 'nguyenquanghuy.hoas.ctl.dl2@gmail.com', '$2y$10$SRwwF5sETwPMM9eH9q8rB.PV71R1wB8TX8SOgrMzuspvuGRrnMO2W', '2025-05-18 23:13:19', 'f573427dbb4fc1040a0e6dabccc518c4', 0, NULL, 0, 'other', '/uploads/avatars/fb5f8f416d4fb44f.JPG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

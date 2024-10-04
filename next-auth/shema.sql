-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 04, 2024 at 04:14 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `next-auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `quantity` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `image`, `name`, `quantity`, `created_at`) VALUES
(1, 'https://cdn.pixabay.com/photo/2021/02/18/09/26/coca-cola-6026672_1280.jpg', 'Coca-Cola', 10, '2024-10-04 10:02:26'),
(2, 'https://cdn.pixabay.com/photo/2022/09/23/15/33/banana-7474703_1280.jpg', 'Banana ', 3, '2024-10-04 11:11:35'),
(3, 'https://cdn.pixabay.com/photo/2017/08/20/10/28/leather-shoes-2661198_1280.jpg', 'Leather Shoes', 7, '2024-10-04 12:52:25'),
(4, 'https://cdn.pixabay.com/photo/2014/08/26/19/19/glass-428315_1280.jpg', 'glass Wine', 13, '2024-10-04 13:35:19'),
(5, 'https://cdn.pixabay.com/photo/2023/08/11/10/15/watch-8183268_1280.jpg', 'Watch', 6, '2024-10-04 13:35:58'),
(6, 'https://cdn.pixabay.com/photo/2024/05/20/14/28/dhanno-8775410_1280.jpg', 'Dhanno Bag', 8, '2024-10-04 13:37:13'),
(7, 'https://cdn.pixabay.com/photo/2023/10/10/06/41/perfume-8305508_1280.jpg', 'Perfume Brand', 11, '2024-10-04 13:38:20'),
(8, 'https://cdn.pixabay.com/photo/2023/12/08/02/12/microphone-8436595_1280.jpg', 'Microphone product', 1, '2024-10-04 13:40:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `isAdmin`) VALUES
(2, 'Shashvat Tiwari', 'shashwat.monphy@gmail.com', '$2b$10$KtI8Wyprhw9wR3QJZ3PATuokEPzuLB1d9s//RxoAN0xLOrLZqvy66', '2024-10-04 12:51:04', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
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
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

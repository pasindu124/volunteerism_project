-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2018 at 06:52 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vnd`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `com_id` int(11) NOT NULL,
  `com_eid` int(11) NOT NULL,
  `com_uid` int(11) NOT NULL,
  `com_oid` int(11) DEFAULT NULL,
  `comment` text NOT NULL,
  `c_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`com_id`, `com_eid`, `com_uid`, `com_oid`, `comment`, `c_status`) VALUES
(1, 19, 14, NULL, 'lkjlkjlskdada', 1),
(2, 17, 16, NULL, 'nice event', 1),
(3, 17, 16, NULL, 'nice event', 1),
(4, 17, 16, NULL, 'nice event', 1),
(5, 17, 16, NULL, 'nice event', 1),
(6, 17, 16, NULL, 'nice event', 1),
(7, 12, 16, NULL, 'laksjda', 1),
(8, 15, 16, NULL, 'pasindu', 1),
(9, 12, 16, NULL, 'pasindu', 1),
(10, 12, 16, NULL, 'pasindu rohana', 1),
(11, 15, 16, NULL, 'kjsdasda', 1),
(12, 12, 16, NULL, 'sadad', 1),
(13, 12, 1, NULL, 'Wow!!', 1),
(14, 12, 1, NULL, 'sdads', 1),
(15, 12, 1, NULL, 'dasda', 1),
(16, 12, 1, NULL, 'woww', 1),
(17, 19, 1, NULL, 'sdad', 1),
(18, 17, 1, NULL, 'sda', 1),
(19, 19, 1, NULL, 'fff', 1),
(20, 17, 1, NULL, 'fucn', 1),
(21, 19, 1, NULL, 'lsdakl', 1),
(22, 12, 1, NULL, 'sdf', 1),
(23, 12, 1, NULL, 'dds', 1),
(24, 19, 1, NULL, 'df', 1),
(25, 17, 1, NULL, 'lk', 1),
(26, 18, 1, NULL, 'nice mnc', 1),
(27, 17, 1, NULL, 'mmh', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contribute`
--

CREATE TABLE `contribute` (
  `c_id` int(11) NOT NULL,
  `c_uid` int(11) NOT NULL,
  `c_oid` int(11) DEFAULT NULL,
  `c_eid` int(11) NOT NULL,
  `feedback` varchar(1000) DEFAULT NULL,
  `value` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contribute`
--

INSERT INTO `contribute` (`c_id`, `c_uid`, `c_oid`, `c_eid`, `feedback`, `value`) VALUES
(40, 1, NULL, 12, '', 0),
(41, 16, NULL, 17, '', 0),
(42, 4, NULL, 17, '', 0),
(43, 5, NULL, 17, '', 0),
(44, 1, NULL, 15, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `e_id` int(100) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `city` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `event_cat_id` int(3) NOT NULL,
  `caption` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `district` varchar(20) NOT NULL,
  `u_id` int(11) NOT NULL,
  `o_id` int(11) DEFAULT NULL,
  `contributers` int(11) NOT NULL,
  `status` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`e_id`, `lat`, `lng`, `city`, `description`, `event_cat_id`, `caption`, `date`, `address`, `district`, `u_id`, `o_id`, `contributers`, `status`) VALUES
(12, 6.809642999999999, 80.4993882, 'kariyamaditta.', '<p>afjhajfa</p>\r\n\r\n<p>adfjaljfa</p>\r\n\r\n<p>adlkfjalfjafad</p>\r\n', 2, 'Siripade Bothal', '2018-06-26', '107,kudagoda,, kariyamaditta,', 'Hambanthota', 16, NULL, 1, 1),
(15, 6.381190502701803, 81.33846239227614, 'Kariyamaditta', '<p>saokda;fmasas</p>\r\n', 4, 'Test project', '2018-06-29', '107 Kudagoda', 'Hambanthota', 16, NULL, 1, 1),
(16, 6.921407714668251, 81.1360364650451, 'Kariyamaditta', '<p>alsjdlasmdlakmdlaksdmaxalkasxaxa</p>\r\n', 4, 'Test project 2', '2018-06-30', '107,Kudagoda,, Kariyamaditta', 'Hambanthota', 16, NULL, 0, 0),
(17, 6.590282725476017, 80.57788569184913, 'Kariyamaditta', '<p>;aslmd;amas;das</p>\r\n\r\n<p>sdlkasjdkasda</p>\r\n\r\n<p>sakdaslkda</p>\r\n', 4, 'Test Project 3', '2018-07-04', '107 Kudagoda', 'Hambanthota', 1, NULL, 3, 1),
(18, 7.253367936767053, 80.62268046270935, 'Kariyamaditta', '<p>asjdladjalkdjasda</p>\r\n\r\n<p>aldsjalsjdalskd</p>\r\n\r\n<p>asdajdsla&nbsp;</p>\r\n\r\n<p>alsdjaldas</p>\r\n', 4, 'Test project 4', '2018-06-28', '107,Kudagoda,, Kariyamaditta', 'Galle', 1, NULL, 0, 1),
(19, 8.0407913, 79.83938599999999, 'Kariyamaditta', '<p>jshdjsfsfd</p>\r\n\r\n<p>;lskfas</p>\r\n', 3, 'Beach clening programme', '2018-06-18', '107,Kudagoda,, Kariyamaditta', 'Hambanthota', 16, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `event_cat`
--

CREATE TABLE `event_cat` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `color` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event_cat`
--

INSERT INTO `event_cat` (`id`, `title`, `color`) VALUES
(1, 'No Poverty', ''),
(2, 'Zero Hunger', ''),
(3, 'Good Health and Well-being', ''),
(4, 'Quality Education', ''),
(5, 'Gender Equality', '');

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `o_id` int(11) NOT NULL,
  `o_name` varchar(300) NOT NULL,
  `o_email` varchar(300) NOT NULL,
  `o_about` text NOT NULL,
  `o_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`o_id`, `o_name`, `o_email`, `o_about`, `o_user`) VALUES
(4, 'BBERRY', 'pasindurohana@gmail.com', 'sdasfaslfkjlsakfaksmflamfsa', 1),
(5, 'CCGGroup', 'pasindu@gmail.com', 'sdmkfslasfa', 1),
(6, 'ATI', 'pas@gmail.com', 'dfksldkfjsldfndsf', 1),
(7, 'MINAUDI', 'hjsdh@gmail.com', 'hjsdh@gmail.comhjsdh@gmail.comhjsdh@gmail.com', 1),
(8, 'VCafe', 'url@ymail.com', 'url@ymail.comurl@ymail.comurl@ymail.com', 1),
(9, 'Commorcial Bank', 'commsmdj@gmail.com', 'asdkjhasjdhaj\r\nasdakshdkahdkja', 16),
(10, 'Bank BOC', 'bjsdah@gmail.com', 'ajsdlajksdladjlncaljlsdhaj', 1),
(11, 'Bank BOC', 'bjsdah@gmail.com', 'ajsdlajksdladjlncaljlsdhaj', 1),
(12, 'LOLC', 'lolc@gmail.com', 'kjhbnmmnbmnbkjh', 1),
(13, 'Shakya Holdings', 'shakya@gmail.com', 'kasjdkasjdasd', 16);

-- --------------------------------------------------------

--
-- Table structure for table `org_admin`
--

CREATE TABLE `org_admin` (
  `u_id` int(11) NOT NULL,
  `o_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `org_admin`
--

INSERT INTO `org_admin` (`u_id`, `o_id`) VALUES
(1, 4),
(1, 5),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(3, 4),
(4, 4),
(4, 5),
(4, 7),
(5, 4),
(5, 5),
(16, 9),
(16, 13),
(17, 4),
(17, 10),
(18, 12);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('IbL2gddiyyI_-ZhbDOSxp4x-Kf8pNFo5', 1534264979, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"user_id\":1,\"log\":0,\"role\":\"admin\"}}}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `fname` varchar(300) DEFAULT NULL,
  `lname` varchar(300) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dob` varchar(12) DEFAULT '0000-00-00',
  `nic` varchar(15) DEFAULT NULL,
  `mobile` varchar(12) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `city` varchar(300) DEFAULT NULL,
  `province` varchar(300) DEFAULT NULL,
  `district` varchar(300) DEFAULT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user',
  `image` varchar(100) NOT NULL DEFAULT '/uploads/profile_pic.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `fname`, `lname`, `gender`, `dob`, `nic`, `mobile`, `address`, `city`, `province`, `district`, `role`, `image`) VALUES
(1, 'pasindu124', 'pasindurohana11@gmail.com', '$2a$10$lXCyZAUvLENrDXsm2E8YeugjHJ9OiBrvuZSXCuZX16gtNpI4NTUje', 'Pasindu', 'Weerasinghe', NULL, '1995-3-4', '', '', '107,Godakawela', '', 'Western', 'Galle', 'admin', '/uploads/1/profile_pic.jpg'),
(3, 'pasindu127', 'p5@gmail.com', '$2a$10$4EvKtddqTYqeU/6LJDkHmO3UtlhKqmHSUvDmVrWmRNas8o..WlM6y', '', '', '', '0000-00-00', '', NULL, '', '', '', '', 'user', '/uploads/profile_pic.jpg'),
(4, 'user1', 'pasindurohana@gmail.com', '$2a$10$h2zBI0kvxNHEWz.CVYE9b.FQjP/bB.EX9zVtScBbj6UZgaN.A6ThG', 'krishan', 'w', 'female', '1917-5-2', '953502399V', '0744554452', '4455', 'mkmkm', 'Western', 'Hambanthota', 'admin', '/uploads/4/profile_pic.jpg'),
(5, 'user2', 'user2@gmail.com', '$2a$10$xZSCChEhzKQ/l89y7KBW0uqM6A4uqD2atbQJCj2ExCQeJ3vfyhiOa', 'Vilash', 'Sandaruwan', 'female', '2018-3-6', 'dsds', '712840598', '107,Kudagoda', 'Kariyamaditta', 'Southern', 'Hambanthota', 'user', '/uploads/profile_pic.jpg'),
(11, 'pasindun', 'pasindun@gmail.com', '$2a$10$MrGA1sMS2e4cwoU9hGCyReBD7M38zr/bW4SGEOGIwikZ4qZDdF52m', 'pasindu', 'navod', NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, 'user', '/uploads/profile_pic.jpg'),
(13, 'gushanh', 'gushan@gmail.com', '$2a$10$TtY2WUwp72Fnwea1oDKxIeX26/6JaXnxyEb0PeEZ8jQIkEcZKihQG', 'Gushan', 'Hasitha', NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, 'user', '/uploads/profile_pic.jpg'),
(14, 'asithaj', 'asitha@gmail.com', '$2a$10$wSsGWHukcjT9F0ZafJ/kKeMkqpcJa4coxFPEefYpbHi7Ra3SpDzfa', 'Asitha', 'Imala', NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, 'user', '/uploads/profile_pic.jpg'),
(15, 'pasindu1234', 'pasindu@gmail.com', '$2a$10$i7j5yGF12p8PV7DgjCPgq.rzlvjKFCtNE5kKm3oS3M3DS/qcNPxL6', 'pasindu', 'weer', NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, 'user', '/uploads/profile_pic.jpg'),
(16, 'eranga', 'eranga@gmail.com', '$2a$10$BqBsRHn8j2fHMdhLHLbKM.jfFIja1dmHi.9jEefIOn.NBvPskSYg2', 'Eranga', 'Jayasekara', NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, 'admin', '/uploads/profile_pic.jpg'),
(17, 'thasun', 'thasun@gmail.com', '$2a$10$Qn78ggKRArkw8twcwOSKwOLjIkNCRLpnJ5poiIQf68bVrdhvExIH2', 'Thasun', 'Damiru', NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, 'user', '/uploads/profile_pic.jpg'),
(18, 'pasindu', 'pa@gmail.com', '$2a$10$mE4gfQJDb1HHKUBhT/jlS.teht47GgHdsIMpFuOMVdzCyDCW6p7YW', 'Pasindu', 'Weerasinghe', NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, 'user', '/uploads/profile_pic.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`com_id`),
  ADD KEY `com_eid` (`com_eid`),
  ADD KEY `com_uid` (`com_uid`),
  ADD KEY `com_oid` (`com_oid`);

--
-- Indexes for table `contribute`
--
ALTER TABLE `contribute`
  ADD PRIMARY KEY (`c_id`),
  ADD KEY `c_uid` (`c_uid`),
  ADD KEY `c_oid` (`c_oid`),
  ADD KEY `c_eid` (`c_eid`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`e_id`),
  ADD KEY `event_cat_id` (`event_cat_id`),
  ADD KEY `o_id` (`o_id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indexes for table `event_cat`
--
ALTER TABLE `event_cat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`o_id`),
  ADD KEY `o_user` (`o_user`);

--
-- Indexes for table `org_admin`
--
ALTER TABLE `org_admin`
  ADD PRIMARY KEY (`u_id`,`o_id`),
  ADD KEY `o_id` (`o_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `contribute`
--
ALTER TABLE `contribute`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `e_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`com_eid`) REFERENCES `event` (`e_id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`com_uid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`com_oid`) REFERENCES `organization` (`o_id`);

--
-- Constraints for table `contribute`
--
ALTER TABLE `contribute`
  ADD CONSTRAINT `contribute_ibfk_1` FOREIGN KEY (`c_uid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `contribute_ibfk_2` FOREIGN KEY (`c_oid`) REFERENCES `organization` (`o_id`),
  ADD CONSTRAINT `contribute_ibfk_3` FOREIGN KEY (`c_eid`) REFERENCES `event` (`e_id`);

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`event_cat_id`) REFERENCES `event_cat` (`id`),
  ADD CONSTRAINT `event_ibfk_2` FOREIGN KEY (`o_id`) REFERENCES `organization` (`o_id`),
  ADD CONSTRAINT `event_ibfk_3` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `organization`
--
ALTER TABLE `organization`
  ADD CONSTRAINT `organization_ibfk_1` FOREIGN KEY (`o_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `org_admin`
--
ALTER TABLE `org_admin`
  ADD CONSTRAINT `org_admin_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `org_admin_ibfk_2` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `org_admin_ibfk_3` FOREIGN KEY (`o_id`) REFERENCES `organization` (`o_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

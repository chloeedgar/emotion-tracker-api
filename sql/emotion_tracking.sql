-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2024 at 09:29 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emotion_tracking`
--

-- --------------------------------------------------------

--
-- Table structure for table `contextual_trigger`
--

CREATE TABLE `contextual_trigger` (
  `trigger_id` int(11) NOT NULL,
  `trigger_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contextual_trigger`
--

INSERT INTO `contextual_trigger` (`trigger_id`, `trigger_name`) VALUES
(1, 'family'),
(2, 'friends'),
(3, 'date'),
(4, 'exercise'),
(5, 'sport'),
(6, 'relax'),
(7, 'movies'),
(8, 'gaming'),
(9, 'reading'),
(10, 'cleaning'),
(11, 'sleep early'),
(12, 'eat healthy'),
(13, 'shopping'),
(14, 'worked late'),
(15, 'ate unhealthy'),
(16, 'bad nights sleep');

-- --------------------------------------------------------

--
-- Table structure for table `emotion_snapshot`
--

CREATE TABLE `emotion_snapshot` (
  `snapshot_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `enjoyment_level` int(11) NOT NULL,
  `sadness_level` int(11) NOT NULL,
  `anger_level` int(11) NOT NULL,
  `contempt_level` int(11) NOT NULL,
  `disgust_level` int(11) NOT NULL,
  `fear_level` int(11) NOT NULL,
  `surprise_level` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `notes` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `emotion_snapshot`
--

INSERT INTO `emotion_snapshot` (`snapshot_id`, `user_id`, `enjoyment_level`, `sadness_level`, `anger_level`, `contempt_level`, `disgust_level`, `fear_level`, `surprise_level`, `timestamp`, `notes`) VALUES
(18, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-08 23:55:13', 'Feeling good today'),
(22, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-09 00:05:43', 'Feeling good today'),
(23, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-09 00:07:23', 'Feeling good today'),
(24, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-09 00:07:39', 'Feeling good today'),
(25, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-09 00:07:44', 'Feeling good today'),
(26, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-09 00:08:23', 'Feeling good today'),
(27, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-09 00:08:55', 'Feeling good today'),
(29, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-09 12:08:26', 'Feeling good today'),
(30, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-09 14:34:46', 'Feeling good today'),
(31, 31, 5, 5, 5, 5, 5, 5, 5, '2024-03-09 20:34:49', NULL),
(32, 31, 5, 5, 5, 5, 5, 5, 5, '2024-03-09 20:39:21', 'feeling lazy '),
(33, 31, 5, 5, 5, 5, 5, 5, 5, '2024-03-09 20:42:28', 'Date went well'),
(34, 31, 5, 5, 5, 5, 5, 5, 5, '2024-03-09 21:13:33', 'h'),
(35, 31, 5, 5, 5, 5, 5, 5, 5, '2024-03-09 21:18:43', 'fghghf'),
(37, 31, 5, 5, 5, 5, 5, 5, 5, '2024-03-09 21:21:45', ''),
(38, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-10 12:48:12', 'Feeling good today'),
(39, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-10 13:23:12', 'Feeling good today'),
(40, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-10 13:23:41', 'Feeling good today'),
(41, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-10 13:23:43', 'Feeling good today'),
(42, 45, 7, 3, 5, 7, 3, 3, 1, '2024-03-11 20:25:11', ''),
(43, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-12 21:20:28', 'Feeling productive'),
(44, 45, 7, 6, 5, 5, 5, 5, 5, '2024-03-12 22:39:29', 'tryhetyaety'),
(45, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-12 22:41:19', 'ikyjk'),
(46, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-12 22:43:00', 'ikyjk'),
(47, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-12 22:49:42', 'fghgfhfgh'),
(48, 45, 4, 6, 5, 3, 6, 2, 2, '2024-03-12 22:50:56', 'cgvbncvbvcb'),
(49, 45, 6, 1, 2, 2, 1, 1, 1, '2024-03-12 22:55:01', 'jkljl'),
(50, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-12 22:56:20', 'fhjk'),
(51, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-12 22:56:58', 'Feeling good today'),
(52, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-12 22:57:01', 'Feeling good today'),
(53, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-12 22:57:01', 'Feeling good today'),
(54, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-12 22:58:28', 'fghn'),
(55, 45, 75, 20, 30, 10, 5, 15, 40, '2024-03-12 23:02:07', 'Feeling good today'),
(56, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 09:12:11', 'mjnkljhl'),
(57, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 09:12:40', 'mjnkljhl'),
(58, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 09:13:03', 'mjnkljhl'),
(59, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 12:50:03', ''),
(60, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 12:55:40', ''),
(61, 45, 6, 5, 2, 2, 5, 1, 1, '2024-03-13 12:56:32', ''),
(62, 45, 8, 3, 5, 5, 5, 5, 5, '2024-03-13 12:58:10', ''),
(63, 45, 7, 3, 5, 5, 5, 5, 5, '2024-03-13 12:59:04', ''),
(64, 45, 1, 6, 4, 3, 2, 5, 5, '2024-03-13 13:08:12', ''),
(65, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:09:25', ''),
(66, 45, 5, 1, 2, 5, 5, 5, 5, '2024-03-13 13:10:02', ''),
(67, 45, 5, 1, 2, 5, 5, 5, 5, '2024-03-13 13:18:46', ''),
(68, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:18:54', ''),
(69, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:19:15', ''),
(70, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:21:14', ''),
(71, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:22:17', ''),
(72, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:31:24', ''),
(73, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:32:14', ''),
(74, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:51:09', 'gfhjhgj'),
(75, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:54:18', ''),
(76, 45, 5, 5, 5, 5, 5, 5, 5, '2024-03-13 13:55:02', 'ujkujk');

-- --------------------------------------------------------

--
-- Table structure for table `emotion_snapshot_trigger`
--

CREATE TABLE `emotion_snapshot_trigger` (
  `emotion_snapshot_trigger_id` int(11) NOT NULL,
  `snapshot_id` int(11) NOT NULL,
  `trigger_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `emotion_snapshot_trigger`
--

INSERT INTO `emotion_snapshot_trigger` (`emotion_snapshot_trigger_id`, `snapshot_id`, `trigger_id`) VALUES
(62, 23, 12),
(63, 23, 2),
(64, 23, 1),
(65, 23, 4),
(70, 30, 12),
(71, 30, 2),
(72, 30, 1),
(73, 30, 4),
(94, 37, 13),
(95, 37, 12),
(103, 38, 12),
(104, 38, 2),
(105, 38, 1),
(106, 38, 4),
(107, 39, 12),
(108, 39, 2),
(109, 39, 1),
(110, 39, 4),
(111, 40, 12),
(112, 40, 2),
(113, 40, 1),
(114, 40, 4),
(115, 41, 12),
(116, 41, 2),
(117, 41, 1),
(118, 41, 4),
(184, 25, 14),
(185, 25, 9),
(186, 43, 3),
(187, 43, 9),
(188, 43, 4),
(189, 43, 11),
(190, 43, 16),
(191, 44, 5),
(192, 45, 7),
(193, 46, 7),
(194, 46, 8),
(195, 47, 5),
(196, 47, 2),
(197, 47, 7),
(198, 47, 8),
(199, 48, 2),
(200, 48, 6),
(201, 48, 9),
(202, 48, 10),
(203, 49, 3),
(204, 49, 6),
(205, 49, 8),
(206, 50, 3),
(207, 51, 12),
(208, 51, 2),
(209, 51, 1),
(210, 51, 4),
(211, 52, 12),
(212, 52, 2),
(213, 52, 1),
(214, 52, 4),
(215, 53, 12),
(216, 53, 2),
(217, 53, 1),
(218, 53, 4),
(219, 54, 3),
(220, 55, 12),
(221, 55, 2),
(222, 55, 1),
(223, 55, 4),
(232, 22, 4),
(233, 22, 7),
(234, 22, 2),
(239, 18, 2),
(240, 18, 3),
(241, 56, 5),
(242, 56, 11),
(243, 56, 15),
(244, 57, 5),
(245, 57, 11),
(246, 57, 15),
(247, 58, 5),
(248, 58, 11),
(249, 58, 15),
(259, 71, 9),
(260, 71, 10),
(261, 72, 6),
(262, 72, 10),
(263, 72, 5),
(264, 74, 9),
(265, 74, 10),
(266, 74, 12),
(267, 76, 8),
(268, 76, 11);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `first_name`, `last_name`, `email_address`, `password`, `user_role_id`) VALUES
(13, 'tansmegarry5k', 'Tanya', 'Megarry', 'tansedgar@gmail.com', '$2b$10$2rGzq63tJUvJr8N27BKvUu0AMEd2u0m39UflMQZ5kCzEiPQuOaDqO', NULL),
(14, 'chloeedgar96', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$caHTL82UPWGFCV9yuMlcAu7GNRc5Vd9vOwSGOgY2hjg4r7C0Ol3nC', NULL),
(15, 'chloe1', 'Chloe', 'Edgar', 'chloe@email.com', '$2b$10$g1gtsrzWGp2qjvv7urY8muEOEJnWI97IkkSmVvTCMmQesBkkWMfgm', NULL),
(16, 'chloeedgar4', 'Hi', 'Edgar', 'chloeedgar1996@hotmailcouk', '$2b$10$U0vXrkont6nV0vL1UYRWwuOQdHmqh6ymBPXhbIMgc428nWP3igVvC', NULL),
(17, 'chgjghj', 'ghdhdgh', 'dgfdg', 'chloeedgar1996@hotmail.co.uk', '$2b$10$LEA98uTucyrdP5vzZT7EJ..ZZhcSBN3ibmxFDcn6y4TqWff0y2pRm', NULL),
(18, 'Terry', 'Terry', 'Megarry', 'tmegarry@gmail.com', '$2b$10$YRPhr.VBs3dxa/wo1xpkuuWDkt.91RL1KDp1xiSNndPwNYgKEqUR.', NULL),
(19, '23', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$Yn58YRYpl/3L4uEcB4yIT.CKaTTpyGmVKGVoIqT9v650t8/wdtroS', NULL),
(20, 'dfgfdgfdg##', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$GDgKb7.VgxRBjtQTMm/9ge01UIoEx3VieUHHA2zs0IUJNBc8Op7I.', NULL),
(22, 'JohnDoe', 'John', 'Doe', 'john@example.com', '$2b$10$QXvM.GB49CNgz5WTcKQ86uVyCC3HuJ.w/3/Y7.8SaHV0lD14R5V6O', NULL),
(23, 'JohnDoe2', 'John', 'Doe', 'john@example.com', '$2b$10$yjwxSFhwGXOfxz/qe/zh8uvGbj.TqNc4DBVpVA95/A53.42IkDQCy', NULL),
(24, 'JohnDoe32', 'John', 'Doe', 'john@example.com', '$2b$10$9mBVV00VEfM.ixDz4qEvDO9Obj6capYYecq2jBuYiVXCWJSSc7GV2', NULL),
(25, 'JohnDoe33', 'John', 'Doe', 'john@example.com', '$2b$10$Gm9gqDZfQB2jYF29lwKMxOMEPBhwjQG310DuaIqCNMqiR6ZGaLaRK', NULL),
(26, 'JohnDoe36', 'John', 'Doe', 'john@example.com', '$2b$10$aEkYDzmxUhKDZYQ34/5vBuu/ki.0BnvN/KorL.sK6JGx.dhBJ2ub.', NULL),
(27, 'JohnDoe38', 'John', 'Doe', 'john@example.com', '$2b$10$mgLf9BMtd1kNAe6cF8bOyeX3FKPHYrscWdDbNy33UO2gOi9m.VdC2', NULL),
(28, 'JohnDoe30', 'John', 'Doe', 'john@example.com', '$2b$10$9E7XRgTQUdXmmtQ.wZ8v3eftX5qj0tW3qx92ApANBfx6yhzI7Nkv2', NULL),
(29, 'username', 'John', 'Doe', 'john@example.com', '$2b$10$M9FGnq9vJYmWoWPcacetDuUWR2Ahmhhrr7KGNsXNggH1MDY8xD8Ye', NULL),
(30, 'test4', 'John', 'Doe', 'john@example.com', '$2b$10$/8CP/9JgbWDOS4awo88H/.iztG5yx74Em4ysIvO8QCWuI862v/d9m', NULL),
(31, 'tester1', 'John', 'Doe', 'john@example.com', '$2b$10$1TOe7WFkTlkuPq2GUfnT3.aJFbCRePbdAZQ.Wv0cgnPJdvqJ9FO4m', NULL),
(32, 'example6', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$trfmcuIQO77JLAC6UhJ64uhkBLvQyO95W2oTDPj2y.GDRl/L.TdTy', NULL),
(33, 'chloeedgar6663', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$MYXt2MYMnm8njITkS1OhkOfsVF.mTRK.tENT9vM7gLg3hgPufnIW6', NULL),
(34, 'ce355823', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$vmuoyM5LzbT7J2GV.D4.Auq2LV0ccg2KTwY0tAvx6ie158uS1s0E6', NULL),
(35, 'ce3558238', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$WrU6/K0cHz68FW4CUz1kiumEOCUtLKmTdjBe4ZgpvduRc92KwzW5.', NULL),
(36, 'ce35582384', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$BazST2CMQZPb.l2JbV1wzOZuP7g/j1XXeWE/FcgaKpIxhnKFZwgkG', NULL),
(37, 'ce35582384d', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$ypCVL.xIB1JXd0ABSPqOv.ImSV.OUkCP7pbU.b4dlpoBdnBYtZ3hS', NULL),
(38, 'ce355833', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$iQieplsx6amDItKB2I86Ee.pXNSzupSnlCaVGa.xsWPqppeJFabEO', NULL),
(39, 'ce35583333', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$NGb9dWeUQ/YEVAQftLWFOeAhxktC9tOeePwVrOiVQE3tUs/iHFM1e', NULL),
(40, 'ce35583333r', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$VO8WsZGNUAEoLJ94h/VDXO9wzZ2BU.jVHgp4CSbxT.fjb0UHJWLDW', NULL),
(41, 'ce35583333rg', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$9.RS1jARD.zOA/9HO52CCeJ3M9a.3PM2A4c8gUhKvOM/xuyhTpizO', NULL),
(42, 'chloeedgarddddd', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$IT4KIbpgyBEHYksEsF7pk.huBR0X/HexY4YXc4vcXTkQw1S4Lg626', NULL),
(43, 'chloeedgarddddd6', 'Chloe', 'Edgar', 'chloeedgar1996@hotmail.co.uk', '$2b$10$YQYpv.DnL22aN7sVxO3VDu3TdYapbWh/85MhgOMAGUW.0.XVd6/YW', NULL),
(44, 'tester18', 'John', 'Doe', 'john@example.com', '$2b$10$mERjUkV1ezTIy3RK390z.Oeut7TOUT4.Vlq8C0MAL4hG1XHOn7oY2', NULL),
(45, 'tester10', 'John', 'Doe', 'john@example.com', '$2b$10$AE98ehKwtVaJwb42HjpLK.NDZudBvNZhN7wfuDg.yOofEGD60RJla', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `user_role_id` int(11) NOT NULL,
  `user_role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`user_role_id`, `user_role`) VALUES
(1, 'administrator'),
(2, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contextual_trigger`
--
ALTER TABLE `contextual_trigger`
  ADD PRIMARY KEY (`trigger_id`);

--
-- Indexes for table `emotion_snapshot`
--
ALTER TABLE `emotion_snapshot`
  ADD PRIMARY KEY (`snapshot_id`),
  ADD KEY `FK_user_user_id` (`user_id`);

--
-- Indexes for table `emotion_snapshot_trigger`
--
ALTER TABLE `emotion_snapshot_trigger`
  ADD PRIMARY KEY (`emotion_snapshot_trigger_id`),
  ADD KEY `FK_snapshot_snapshot_id` (`snapshot_id`),
  ADD KEY `FK_contextual_trigger_trigger_id` (`trigger_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_user_role_user_role_id` (`user_role_id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`user_role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contextual_trigger`
--
ALTER TABLE `contextual_trigger`
  MODIFY `trigger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `emotion_snapshot`
--
ALTER TABLE `emotion_snapshot`
  MODIFY `snapshot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `emotion_snapshot_trigger`
--
ALTER TABLE `emotion_snapshot_trigger`
  MODIFY `emotion_snapshot_trigger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=272;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emotion_snapshot`
--
ALTER TABLE `emotion_snapshot`
  ADD CONSTRAINT `FK_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `emotion_snapshot_trigger`
--
ALTER TABLE `emotion_snapshot_trigger`
  ADD CONSTRAINT `FK_contextual_trigger_trigger_id` FOREIGN KEY (`trigger_id`) REFERENCES `contextual_trigger` (`trigger_id`),
  ADD CONSTRAINT `FK_snapshot_snapshot_id` FOREIGN KEY (`snapshot_id`) REFERENCES `emotion_snapshot` (`snapshot_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_user_role_user_role_id` FOREIGN KEY (`user_role_id`) REFERENCES `user_role` (`user_role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

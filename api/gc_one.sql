-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2021 at 05:43 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gc_one`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_archive`
--

CREATE TABLE `tbl_archive` (
  `archive_id` int(11) NOT NULL,
  `crew_id` int(11) NOT NULL,
  `ship_id` int(11) NOT NULL,
  `archive_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `archive_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_crew`
--

CREATE TABLE `tbl_crew` (
  `crew_id` int(11) NOT NULL,
  `ship_id` int(11) NOT NULL DEFAULT 0,
  `rank_id` int(11) NOT NULL,
  `crew_fname` varchar(100) NOT NULL,
  `crew_mname` varchar(100) NOT NULL,
  `crew_lname` varchar(100) NOT NULL,
  `crew_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `crew_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rank`
--

CREATE TABLE `tbl_rank` (
  `rank_id` int(11) NOT NULL,
  `rank_name` varchar(100) NOT NULL,
  `rank_qty` int(11) NOT NULL,
  `rank_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `rank_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ship`
--

CREATE TABLE `tbl_ship` (
  `ship_id` int(11) NOT NULL,
  `ship_speed_id` int(11) NOT NULL,
  `ship_name` varchar(200) NOT NULL,
  `ship_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `ship_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ship_speed`
--

CREATE TABLE `tbl_ship_speed` (
  `ship_speed_id` int(11) NOT NULL,
  `ship_speed_class` varchar(200) NOT NULL,
  `ship_speed_knots` float NOT NULL,
  `ship_speed_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `ship_speed_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_archive`
--
ALTER TABLE `tbl_archive`
  ADD PRIMARY KEY (`archive_id`);

--
-- Indexes for table `tbl_crew`
--
ALTER TABLE `tbl_crew`
  ADD PRIMARY KEY (`crew_id`);

--
-- Indexes for table `tbl_rank`
--
ALTER TABLE `tbl_rank`
  ADD PRIMARY KEY (`rank_id`);

--
-- Indexes for table `tbl_ship`
--
ALTER TABLE `tbl_ship`
  ADD PRIMARY KEY (`ship_id`);

--
-- Indexes for table `tbl_ship_speed`
--
ALTER TABLE `tbl_ship_speed`
  ADD PRIMARY KEY (`ship_speed_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_archive`
--
ALTER TABLE `tbl_archive`
  MODIFY `archive_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_crew`
--
ALTER TABLE `tbl_crew`
  MODIFY `crew_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_rank`
--
ALTER TABLE `tbl_rank`
  MODIFY `rank_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_ship`
--
ALTER TABLE `tbl_ship`
  MODIFY `ship_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_ship_speed`
--
ALTER TABLE `tbl_ship_speed`
  MODIFY `ship_speed_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

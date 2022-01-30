-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2022 at 05:44 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ip_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `obj_property`
--

CREATE TABLE `obj_property` (
  `OBJ_PROPERTY_ID` int(10) UNSIGNED NOT NULL,
  `OBJ_PROPERTY_NAME` varchar(255) DEFAULT NULL,
  `RULE_ID` int(10) UNSIGNED DEFAULT NULL,
  `MUST_HAVE` binary(1) DEFAULT NULL,
  `CREATED_AT` datetime DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `obj_type`
--

CREATE TABLE `obj_type` (
  `OBJ_TYPE_ID` int(10) UNSIGNED NOT NULL,
  `OBJ_TYPE_NAME` varchar(255) DEFAULT NULL,
  `OBJ_TYPE_DESC` varchar(255) DEFAULT NULL,
  `CREATED_AT` datetime DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `obj_type_property`
--

CREATE TABLE `obj_type_property` (
  `OBJ_PROPERTY_ID` int(11) UNSIGNED NOT NULL,
  `OBJ_TYPE_ID` int(11) UNSIGNED NOT NULL,
  `OBJ_TYPE_PROPERTY_VALUE` varchar(255) NOT NULL,
  `CREATED_AT` datetime DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rule`
--

CREATE TABLE `rule` (
  `RULE_ID` int(11) UNSIGNED NOT NULL,
  `RULE_NAME` varchar(255) DEFAULT NULL,
  `RULE_DESC` varchar(255) DEFAULT NULL,
  `CREATED_AT` datetime DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `obj_property`
--
ALTER TABLE `obj_property`
  ADD PRIMARY KEY (`OBJ_PROPERTY_ID`),
  ADD KEY `rule_id_fk` (`RULE_ID`);

--
-- Indexes for table `obj_type`
--
ALTER TABLE `obj_type`
  ADD PRIMARY KEY (`OBJ_TYPE_ID`);

--
-- Indexes for table `obj_type_property`
--
ALTER TABLE `obj_type_property`
  ADD UNIQUE KEY `OBJ_PROPERTY_ID_2` (`OBJ_PROPERTY_ID`,`OBJ_TYPE_ID`);

--
-- Indexes for table `rule`
--
ALTER TABLE `rule`
  ADD PRIMARY KEY (`RULE_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `obj_property`
--
ALTER TABLE `obj_property`
  MODIFY `OBJ_PROPERTY_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `obj_type`
--
ALTER TABLE `obj_type`
  MODIFY `OBJ_TYPE_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rule`
--
ALTER TABLE `rule`
  MODIFY `RULE_ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `obj_property`
--
ALTER TABLE `obj_property`
  ADD CONSTRAINT `rule_id_fk` FOREIGN KEY (`RULE_ID`) REFERENCES `rule` (`RULE_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `obj_type_property`
--
ALTER TABLE `obj_type_property`
  ADD CONSTRAINT `obj_type_property_ibfk_1` FOREIGN KEY (`OBJ_PROPERTY_ID`) REFERENCES `obj_property` (`OBJ_PROPERTY_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `obj_type_property_ibfk_2` FOREIGN KEY (`OBJ_TYPE_ID`) REFERENCES `obj_type` (`OBJ_TYPE_ID`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

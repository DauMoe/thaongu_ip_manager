-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2022 at 07:44 PM
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
CREATE DATABASE IF NOT EXISTS `ip_manager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ip_manager`;

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `insert_property_obj` (`in_obj_id` INT(10), `in_pro_id` INT(10), `in_pro_value` VARCHAR(255)) RETURNS TINYINT(1) BEGIN
  DECLARE r INT(2) DEFAULT 0;
	SELECT COUNT(OBJ_ID) INTO r FROM obj_pro WHERE OBJ_ID = in_obj_id AND PRO_ID = in_pro_id;
	IF (r>0) THEN 
		RETURN FALSE;
	ELSE 
		INSERT INTO obj_pro (OBJ_ID, PRO_ID, PRO_VALUE) VALUES (in_obj_id, in_pro_id, in_pro_value);
		RETURN TRUE;
	END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `object`
--

CREATE TABLE IF NOT EXISTS `object` (
  `OBJ_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `OBJ_NAME` varchar(255) NOT NULL,
  `OBJ_DESC` varchar(255) DEFAULT NULL,
  `OBJ_TYPE_ID` int(10) UNSIGNED NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`OBJ_ID`),
  UNIQUE KEY `OBJ_NAME` (`OBJ_NAME`,`OBJ_TYPE_ID`) USING BTREE,
  KEY `OBJ_TYPE_ID` (`OBJ_TYPE_ID`),
  KEY `OBJ_ID` (`OBJ_ID`,`OBJ_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `object_type`
--

CREATE TABLE IF NOT EXISTS `object_type` (
  `OBJ_TYPE_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `OBJ_TYPE_NAME` varchar(255) NOT NULL,
  `OBJ_TYPE_DESC` varchar(255) DEFAULT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ICON` varchar(255) DEFAULT '',
  PRIMARY KEY (`OBJ_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `obj_pro`
--

CREATE TABLE IF NOT EXISTS `obj_pro` (
  `OBJ_ID` int(10) UNSIGNED NOT NULL,
  `OBJ_TYPE_ID` int(10) UNSIGNED DEFAULT NULL,
  `PRO_ID` int(10) UNSIGNED NOT NULL,
  `PRO_VALUE` varchar(255) DEFAULT '' COMMENT 'property value',
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  UNIQUE KEY `OBJ_ID` (`OBJ_ID`,`PRO_ID`) USING BTREE,
  KEY `OBJ_TYPE_ID` (`OBJ_TYPE_ID`),
  KEY `obj_pro_ibfk_1` (`OBJ_ID`,`OBJ_TYPE_ID`),
  KEY `obj_pro_ibfk_3` (`PRO_ID`,`OBJ_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `obj_type_property`
--

CREATE TABLE IF NOT EXISTS `obj_type_property` (
  `OBJ_TYPE_ID` int(10) UNSIGNED NOT NULL,
  `PRO_ID` int(10) UNSIGNED NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IS_REQUIRED` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  UNIQUE KEY `OBJ_TYPE_ID` (`OBJ_TYPE_ID`,`PRO_ID`) USING BTREE,
  KEY `PRO_ID` (`PRO_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE IF NOT EXISTS `property` (
  `PRO_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `PRO_NAME` varchar(255) NOT NULL,
  `PRO_DESC` varchar(255) DEFAULT NULL,
  `RULE_ID` int(10) UNSIGNED NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`PRO_ID`),
  KEY `RULE_ID` (`RULE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rule`
--

CREATE TABLE IF NOT EXISTS `rule` (
  `RULE_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `RULE_NAME` varchar(255) NOT NULL,
  `RULE_REGEX` varchar(255) DEFAULT NULL,
  `RULE_DESC` varchar(255) DEFAULT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`RULE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `object`
--
ALTER TABLE `object`
  ADD CONSTRAINT `object_ibfk_1` FOREIGN KEY (`OBJ_TYPE_ID`) REFERENCES `object_type` (`OBJ_TYPE_ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `obj_pro`
--
ALTER TABLE `obj_pro`
  ADD CONSTRAINT `obj_pro_ibfk_2` FOREIGN KEY (`PRO_ID`) REFERENCES `property` (`PRO_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `obj_pro_ibfk_3` FOREIGN KEY (`PRO_ID`,`OBJ_TYPE_ID`) REFERENCES `obj_type_property` (`PRO_ID`, `OBJ_TYPE_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `obj_pro_ibfk_4` FOREIGN KEY (`OBJ_ID`) REFERENCES `object` (`OBJ_ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `obj_type_property`
--
ALTER TABLE `obj_type_property`
  ADD CONSTRAINT `obj_type_property_ibfk_1` FOREIGN KEY (`PRO_ID`) REFERENCES `property` (`PRO_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `obj_type_property_ibfk_2` FOREIGN KEY (`OBJ_TYPE_ID`) REFERENCES `object_type` (`OBJ_TYPE_ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `property_ibfk_1` FOREIGN KEY (`RULE_ID`) REFERENCES `rule` (`RULE_ID`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

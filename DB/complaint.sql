-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2024 at 06:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `complaint`
--

-- --------------------------------------------------------

--
-- Table structure for table `citizen`
--

CREATE TABLE `citizen` (
  `citizen_id` int(11) NOT NULL,
  `citizen_name` varchar(30) NOT NULL,
  `citizen_email` varchar(30) NOT NULL,
  `citizen_password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `citizen`
--

INSERT INTO `citizen` (`citizen_id`, `citizen_name`, `citizen_email`, `citizen_password`) VALUES
(1, 'raj', 'raj123@gmail.com', 'raj123'),
(2, 'rahul', 'rahul123@gmail.com', 'rahul123'),
(3, 'nikit', 'nikit123@gmail.com', 'nikit123'),
(4, 'shweta', 'Shweta123@gmail.com', 'shweta123'),
(6, 'drake', 'drake123@gmail.com', 'drake123'),
(7, 'ambani', 'ambani@gmail.com', 'ambani123');

-- --------------------------------------------------------

--
-- Table structure for table `citizen_make_complaint`
--

CREATE TABLE `citizen_make_complaint` (
  `citizen_id` int(11) NOT NULL,
  `complain_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `citizen_make_complaint`
--

INSERT INTO `citizen_make_complaint` (`citizen_id`, `complain_id`) VALUES
(1, 13),
(2, 11),
(2, 12);

-- --------------------------------------------------------

--
-- Table structure for table `complain`
--

CREATE TABLE `complain` (
  `complain_id` int(11) NOT NULL,
  `complain_location` varchar(40) NOT NULL,
  `complain_date_in` date NOT NULL,
  `complain_status` varchar(20) NOT NULL,
  `complain_desc` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complain`
--

INSERT INTO `complain` (`complain_id`, `complain_location`, `complain_date_in`, `complain_status`, `complain_desc`) VALUES
(2, 'maror', '2024-03-02', 'request ', 'i need 6000'),
(7, 'Engineering', '2024-03-04', 'request', 'i need russian give me 6000'),
(11, 'Finance', '2024-03-04', 'request', 'xyz complain'),
(12, 'Administration', '2024-03-04', 'finished', 'some more xyz problem'),
(13, 'Finance', '2024-03-05', 'finished', 'i need 6000');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(30) NOT NULL,
  `department_location` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`, `department_location`) VALUES
(1, 'Administration', 'pavoor'),
(2, 'Finance', 'kutnin'),
(3, 'Engineering', 'kuloor');

-- --------------------------------------------------------

--
-- Table structure for table `department_com_types`
--

CREATE TABLE `department_com_types` (
  `department_id` int(11) NOT NULL,
  `department_com_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department_com_types`
--

INSERT INTO `department_com_types` (`department_id`, `department_com_type`) VALUES
(1, 'Record Keeping'),
(1, 'Personal Management '),
(2, 'Revenue Collection'),
(2, 'Budget Allocation'),
(3, 'Planning'),
(3, 'Construction');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `employee_name` varchar(30) NOT NULL,
  `employee_email` varchar(30) NOT NULL,
  `employee_password` varchar(30) NOT NULL,
  `employee_work_on` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `employee_name`, `employee_email`, `employee_password`, `employee_work_on`) VALUES
(1, 'raju', 'raju123@gmail.com', 'raju123', 1),
(2, 'bheem', 'bheem123@gmail.com', 'bheem123', 2),
(3, 'naven', 'naven123@gmail.com', 'naven123', 3),
(4, 'akash', 'akash123@gmail.com', 'akash123', 1),
(5, 'ansu', 'ansu123@gmail.com', 'ansu123', 2);

-- --------------------------------------------------------

--
-- Table structure for table `employee_works_on_complaint`
--

CREATE TABLE `employee_works_on_complaint` (
  `employee_id` int(11) NOT NULL,
  `complain_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_works_on_complaint`
--

INSERT INTO `employee_works_on_complaint` (`employee_id`, `complain_id`) VALUES
(1, 12),
(2, 2),
(2, 13),
(3, 7),
(5, 11);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `citizen`
--
ALTER TABLE `citizen`
  ADD PRIMARY KEY (`citizen_id`);

--
-- Indexes for table `citizen_make_complaint`
--
ALTER TABLE `citizen_make_complaint`
  ADD PRIMARY KEY (`citizen_id`,`complain_id`),
  ADD KEY `complain_id` (`complain_id`);

--
-- Indexes for table `complain`
--
ALTER TABLE `complain`
  ADD PRIMARY KEY (`complain_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `department_com_types`
--
ALTER TABLE `department_com_types`
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `employee_work_on` (`employee_work_on`);

--
-- Indexes for table `employee_works_on_complaint`
--
ALTER TABLE `employee_works_on_complaint`
  ADD PRIMARY KEY (`employee_id`,`complain_id`),
  ADD KEY `complain_id` (`complain_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `citizen`
--
ALTER TABLE `citizen`
  MODIFY `citizen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `complain`
--
ALTER TABLE `complain`
  MODIFY `complain_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `citizen_make_complaint`
--
ALTER TABLE `citizen_make_complaint`
  ADD CONSTRAINT `citizen_make_complaint_ibfk_1` FOREIGN KEY (`citizen_id`) REFERENCES `citizen` (`citizen_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `citizen_make_complaint_ibfk_2` FOREIGN KEY (`complain_id`) REFERENCES `complain` (`complain_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `department_com_types`
--
ALTER TABLE `department_com_types`
  ADD CONSTRAINT `department_com_types_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`employee_work_on`) REFERENCES `department` (`department_id`);

--
-- Constraints for table `employee_works_on_complaint`
--
ALTER TABLE `employee_works_on_complaint`
  ADD CONSTRAINT `employee_works_on_complaint_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_works_on_complaint_ibfk_2` FOREIGN KEY (`complain_id`) REFERENCES `complain` (`complain_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

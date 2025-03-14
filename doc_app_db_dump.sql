-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: doc_appoint
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment_status`
--

DROP TABLE IF EXISTS `appointment_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_status` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_status`
--

LOCK TABLES `appointment_status` WRITE;
/*!40000 ALTER TABLE `appointment_status` DISABLE KEYS */;
INSERT INTO `appointment_status` VALUES (1,'In-Progress'),(2,'Completed'),(3,'Cancelled');
/*!40000 ALTER TABLE `appointment_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_status` int NOT NULL,
  `availability_status` int NOT NULL,
  `slot_id` int NOT NULL,
  `date_of_appointment` date NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_appointments_app_status_1_idx` (`app_status`),
  KEY `fk_appointments_slots_1_idx` (`slot_id`),
  KEY `fk_appointments_availability_status_1_idx` (`availability_status`),
  CONSTRAINT `fk_appointments_app_status_1` FOREIGN KEY (`app_status`) REFERENCES `appointment_status` (`id`),
  CONSTRAINT `fk_appointments_availability_status_1` FOREIGN KEY (`availability_status`) REFERENCES `availability_status` (`id`),
  CONSTRAINT `fk_appointments_slots_1` FOREIGN KEY (`slot_id`) REFERENCES `slots` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (36,1,1,4,'2025-03-17','2025-03-14 09:55:18','2025-03-14 09:55:18');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `availability_status`
--

DROP TABLE IF EXISTS `availability_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availability_status` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability_status`
--

LOCK TABLES `availability_status` WRITE;
/*!40000 ALTER TABLE `availability_status` DISABLE KEYS */;
INSERT INTO `availability_status` VALUES (1,'Booked'),(2,'Empty'),(3,'Unavailable'),(4,'Holiday');
/*!40000 ALTER TABLE `availability_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_info`
--

DROP TABLE IF EXISTS `doc_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `education` varchar(100) NOT NULL,
  `experience` int NOT NULL,
  `speciality` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_doc_info_users_1_idx` (`user_id`),
  KEY `fk_doc_info_speciality_1_idx` (`speciality`),
  CONSTRAINT `fk_doc_info_speciality_1` FOREIGN KEY (`speciality`) REFERENCES `speciality` (`id`),
  CONSTRAINT `fk_doc_info_users_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_info`
--

LOCK TABLES `doc_info` WRITE;
/*!40000 ALTER TABLE `doc_info` DISABLE KEYS */;
INSERT INTO `doc_info` VALUES (10,53,'MBBS',10,5);
/*!40000 ALTER TABLE `doc_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_pateint_appointment_mapping`
--

DROP TABLE IF EXISTS `doc_pateint_appointment_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_pateint_appointment_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doc_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `appointment_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_doc_pateint_appointment_docid_1_idx` (`doc_id`),
  KEY `fk_doc_pateint_appointment_patientid_1_idx` (`patient_id`),
  KEY `fk_doc_pateint_appointment_appointmenttable_1_idx` (`appointment_id`),
  CONSTRAINT `fk_doc_pateint_appointment_appointmenttable_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  CONSTRAINT `fk_doc_pateint_appointment_docid_1` FOREIGN KEY (`doc_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_doc_pateint_appointment_patientid_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_pateint_appointment_mapping`
--

LOCK TABLES `doc_pateint_appointment_mapping` WRITE;
/*!40000 ALTER TABLE `doc_pateint_appointment_mapping` DISABLE KEYS */;
INSERT INTO `doc_pateint_appointment_mapping` VALUES (35,53,54,36);
/*!40000 ALTER TABLE `doc_pateint_appointment_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slots`
--

DROP TABLE IF EXISTS `slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slots` (
  `id` int NOT NULL,
  `from` varchar(5) NOT NULL,
  `to` varchar(5) NOT NULL,
  `meridiem` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slots`
--

LOCK TABLES `slots` WRITE;
/*!40000 ALTER TABLE `slots` DISABLE KEYS */;
INSERT INTO `slots` VALUES (1,'10:00','10:30','AM'),(2,'10:30','11:00','AM'),(3,'11:00','11:30','AM'),(4,'11:30','12:00','AM'),(5,'12:00','12:30','PM'),(6,'12:30','1:00','PM'),(7,'2:00','2:30','PM'),(8,'2:30','3:00','PM'),(9,'3:00','3:30','PM'),(10,'3:30','4:00','PM'),(11,'4:00','4:30','PM'),(12,'4:30','5:00','PM');
/*!40000 ALTER TABLE `slots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `speciality`
--

DROP TABLE IF EXISTS `speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `speciality` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speciality`
--

LOCK TABLES `speciality` WRITE;
/*!40000 ALTER TABLE `speciality` DISABLE KEYS */;
INSERT INTO `speciality` VALUES (1,'Cardiologist'),(2,'Oncologist'),(3,'Gynecologist'),(4,'Nephrologist'),(5,'Dermatologist'),(6,'Psychiatrist'),(7,'Neurologist'),(8,'Surgeon'),(9,'Physician'),(10,'Radiologist'),(11,'Endocrinologist'),(12,'Gastroenterologist'),(13,'Urologist');
/*!40000 ALTER TABLE `speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_type` (
  `id` int NOT NULL,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'Admin'),(2,'Doctor'),(3,'Patient');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` bigint NOT NULL,
  `address` varchar(200) NOT NULL,
  `user_type` int NOT NULL,
  `password` varchar(100) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `city` varchar(45) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_users_usertype_1_idx` (`user_type`),
  CONSTRAINT `fk_users_usertype_1` FOREIGN KEY (`user_type`) REFERENCES `user_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (53,'Shaz Doc','shazd@gm.com',7777777777,'UT',2,'25d55ad283aa400af464c76d713c07ad',1,0,'Dehradun','2025-03-14 09:51:58','2025-03-14 09:51:58'),(54,'Shaz Patient','shazp@gm.com',7777777777,'UT',3,'25d55ad283aa400af464c76d713c07ad',1,0,'Dehradun','2025-03-14 09:53:14','2025-03-14 09:53:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-14 15:26:54

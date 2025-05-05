CREATE DATABASE  IF NOT EXISTS `foresight_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `foresight_db`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: foresight_db
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `status` enum('Active','Planning','Completed','On Hold') DEFAULT 'Planning',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `duration_days` int DEFAULT NULL,
  `team_size` int DEFAULT NULL,
  `budget_lkr` int DEFAULT NULL,
  `scope_description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (2,'Project Beta','Development of new mobile platform','Planning','2025-05-04 17:20:37','2025-05-04 17:20:37',NULL,NULL,NULL,'The Construction Risk Assessment Portal is designed to assist construction project managers, safety engineers, and compliance officers in identifying, categorizing, and mitigating risks across various project phases. The system will provide a centralized platform to log, track, and evaluate potential hazards related to safety, environmental concerns, budgetary constraints, and regulatory compliance. Key features will include risk probability and impact assessment tools, a customizable risk matrix, automated alerts for high-risk items, and audit trail logging for accountability. Integration with project scheduling tools will allow risks to be mapped to specific tasks or milestones, improving visibility and proactive management. The portal will also support collaborative features such as role-based comments, document uploads, and automated report generation for stakeholder communication. Future development will focus on AI-powered risk prediction models based on historical data and industry benchmarks, enhancing the proactive risk mitigation strategy for construction firms.'),(3,'Project Gamma','Data migration from legacy systems','On Hold','2025-05-04 17:20:37','2025-05-04 17:20:37',NULL,NULL,NULL,'ForeSight is an AI-Driven IT Project Risk Management Tool designed to enhance decision-making and minimize potential setbacks during the software development lifecycle. The system will offer project managers the capability to input and track risks categorized by probability, impact, and affected project areas. Leveraging machine learning, ForeSight will analyze historical project data to predict emerging risks and recommend mitigation strategies. Key components include an interactive risk matrix, real-time alerts, customizable reporting, and integration with common project management tools such as Jira and Asana. A special focus will be placed on identifying risks related to scope creep, resource availability, technology debt, and regulatory compliance. The platform will also feature advanced analytics dashboards that present KPIs related to project health, risk exposure, and team responsiveness. User experience will prioritize clarity and accessibility, ensuring that both technical teams and non-technical stakeholders can effectively use the tool. Future upgrades may incorporate natural language processing (NLP) for analyzing project documentation and identifying potential risk signals automatically.'),(4,'Project Delta','Cybersecurity enhancements for clients','Completed','2025-05-04 17:20:37','2025-05-04 17:20:37',NULL,NULL,NULL,'The Smart Building Energy Optimization System aims to minimize energy consumption while maintaining optimal comfort levels within commercial and residential buildings. Using IoT sensors, the system will monitor real-time data on temperature, humidity, occupancy, and lighting. AI algorithms will analyze the data to optimize HVAC operations, lighting schedules, and energy usage patterns. The platform will feature user-friendly dashboards displaying energy consumption trends, predicted savings, and environmental impact metrics. Tenants and building managers will receive real-time alerts when unusual energy patterns are detected or when equipment requires maintenance. The system will also incorporate integration with renewable energy sources and provide insights on maximizing the usage of solar or wind energy. Scalability is a key consideration, with the ability to manage multiple buildings or campuses through a centralized interface. Compliance with international energy standards such as ISO 50001 will be ensured. Long-term, the system may expand to include AI-driven occupant comfort optimization and predictive maintenance capabilities.'),(5,'Project Epsilon','Expansion into European markets','Planning','2025-05-04 17:20:37','2025-05-04 17:20:37',NULL,NULL,NULL,'The University Course Scheduling Optimization Platform is designed to streamline the complex process of assigning courses, instructors, and rooms while accommodating student demand and institutional constraints. The system will use constraint satisfaction algorithms and AI techniques to generate optimal timetables that minimize conflicts and maximize resource utilization. Key features include drag-and-drop schedule editing, automated conflict detection, faculty and student preference management, and dynamic adjustment capabilities to handle last-minute changes. The platform will integrate with existing student information systems (SIS) and support exporting schedules to web and mobile platforms for easy access by students and faculty. Advanced reporting tools will provide insights into room utilization, scheduling bottlenecks, and instructor workload. The user interface will be designed for ease of use by academic administrators, while maintaining flexibility for handling diverse course structures and program requirements. Future enhancements may include AI-driven enrollment forecasting and integration with virtual classroom platforms.'),(6,'E-Commerce Platform Revamp','Complete redesign of e-commerce frontend and backend','Active','2025-05-04 23:10:57','2025-05-04 23:10:57',180,10,5000000,'Upgrade tech stack, improve UX/UI, and scalability'),(7,'Healthcare Patient Portal','Develop a secure patient portal for hospital chain','Planning','2025-05-04 23:10:57','2025-05-04 23:10:57',240,15,12000000,'Patient data access, appointment scheduling, telemedicine'),(8,'AI-Based Recruitment Tool','Create an AI tool for candidate screening','Active','2025-05-04 23:10:57','2025-05-05 00:25:11',150,8,3500000,'Machine learning algorithm development, data integration'),(9,'Warehouse Automation','Implement robotics for warehouse order picking','Active','2025-05-04 23:10:57','2025-05-04 23:10:57',365,20,30000000,'Robotic hardware and software integration'),(10,'Online Banking App Update','Security and feature update for banking mobile app','Completed','2025-05-04 23:10:57','2025-05-04 23:10:57',90,6,2000000,'MFA, improved UI, compliance features'),(11,'Retail Chain ERP Migration','Migrate legacy ERP system to cloud-based ERP','Active','2025-05-04 23:10:57','2025-05-04 23:10:57',270,12,9000000,'Data migration, training, cloud infra setup'),(12,'University LMS Upgrade','Upgrade university learning management system','Planning','2025-05-04 23:10:57','2025-05-04 23:10:57',120,5,2500000,'New features, responsive design, user testing'),(13,'City Smart Traffic Control','Develop IoT-based traffic management system','Active','2025-05-04 23:10:57','2025-05-04 23:10:57',400,18,15000000,'IoT sensors, data analytics dashboard'),(14,'Blockchain Supply Chain Tracker','Blockchain-based solution for supply chain transparency','On Hold','2025-05-04 23:10:57','2025-05-04 23:10:57',200,7,8000000,'Blockchain development, logistics partner integration'),(15,'Renewable Energy Monitoring Platform','Create platform to monitor solar/wind energy farms','Planning','2025-05-04 23:10:57','2025-05-04 23:10:57',180,9,6000000,'IoT data ingestion, dashboarding, alerts'),(16,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-04 23:38:41','2025-05-04 23:38:41',120,8,2000000,'Test scope description'),(17,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-04 23:40:46','2025-05-04 23:40:46',120,8,2000000,'Test scope description'),(18,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-04 23:45:23','2025-05-04 23:45:23',120,8,2000000,'Test scope description'),(19,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-04 23:56:10','2025-05-04 23:56:10',120,8,2000000,'Test scope description'),(20,'AI Integration Project one','Integrating AI models into logistics','Active','2025-05-04 23:57:55','2025-05-04 23:57:55',120,8,1000000,'Test scope description'),(21,'AI Integration Project one','Integrating AI models into logistics','Active','2025-05-05 00:00:58','2025-05-05 00:00:58',120,8,1000000,'Test scope description'),(22,'AI Integration Project one','Integrating AI models into logistics','Active','2025-05-05 00:01:32','2025-05-05 00:01:32',120,8,1000000,'Test scope description'),(23,'AI Integration Project one','Integrating AI models into logistics','Active','2025-05-05 00:04:19','2025-05-05 00:04:19',120,8,1000000,'Test scope description'),(24,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-05 00:06:38','2025-05-05 00:06:38',120,8,2000000,'Test scope description'),(25,'Project Alpha','First major project involving AI integration','Active','2025-05-05 00:09:44','2025-05-05 00:24:00',160,10,2500000,'The AI-Driven Inventory Management System project aims to design and implement a smart inventory solution tailored for mid-sized retail businesses seeking efficiency and accuracy in stock control. The primary goal is to leverage AI algorithms to predict inventory requirements based on sales trends, seasonal variations, supplier lead times, and market fluctuations. The system will feature real-time stock level tracking, automated reordering, and predictive analytics to prevent stockouts and overstocking. Additionally, the platform will integrate seamlessly with popular ERP and e-commerce platforms to synchronize inventory data across multiple channels. Advanced data visualization dashboards will provide stakeholders with actionable insights, and a robust alert system will notify managers of critical stock levels or anomalies. User roles and permissions will be defined to ensure secure data access, while an intuitive UI/UX design will facilitate ease of use for both technical and non-technical staff. Future phases may include machine learning models for demand forecasting and AI-driven supplier recommendations, providing businesses with a competitive edge in inventory management.'),(26,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-05 00:11:21','2025-05-05 00:11:21',120,8,2000000,'Test scope description'),(27,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-05 00:12:15','2025-05-05 00:12:15',120,8,2000000,'Test scope description'),(28,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-05 00:12:49','2025-05-05 00:12:49',120,8,2000000,'Test scope description'),(29,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-05 00:13:14','2025-05-05 00:13:14',120,8,2000000,'Test scope description'),(39,'AI Integration Project','Integrating AI models into logistics','Active','2025-05-05 00:26:21','2025-05-05 00:26:21',120,8,2000000,'Test scope description'),(40,'Project Beta','Development of new mobile platform','Planning','2025-05-05 00:29:45','2025-05-05 00:29:45',90,21,5000000,'The Construction Risk Assessment Portal is designed to assist construction project managers, safety engineers, and compliance officers in identifying, categorizing, and mitigating risks across various project phases. The system will provide a centralized platform to log, track, and evaluate potential hazards related to safety, environmental concerns, budgetary constraints, and regulatory compliance. Key features will include risk probability and impact assessment tools, a customizable risk matrix, automated alerts for high-risk items, and audit trail logging for accountability. Integration with project scheduling tools will allow risks to be mapped to specific tasks or milestones, improving visibility and proactive management. The portal will also support collaborative features such as role-based comments, document uploads, and automated report generation for stakeholder communication. Future development will focus on AI-powered risk prediction models based on historical data and industry benchmarks, enhancing the proactive risk mitigation strategy for construction firms.'),(41,'Project Beta','Development of new mobile platform','Planning','2025-05-05 00:31:30','2025-05-05 00:31:30',90,21,5000000,'The Construction Risk Assessment Portal is designed to assist construction project managers, safety engineers, and compliance officers in identifying, categorizing, and mitigating risks across various project phases. The system will provide a centralized platform to log, track, and evaluate potential hazards related to safety, environmental concerns, budgetary constraints, and regulatory compliance. Key features will include risk probability and impact assessment tools, a customizable risk matrix, automated alerts for high-risk items, and audit trail logging for accountability. Integration with project scheduling tools will allow risks to be mapped to specific tasks or milestones, improving visibility and proactive management. The portal will also support collaborative features such as role-based comments, document uploads, and automated report generation for stakeholder communication. Future development will focus on AI-powered risk prediction models based on historical data and industry benchmarks, enhancing the proactive risk mitigation strategy for construction firms.'),(42,'Project Beta','Development of new mobile platform','Planning','2025-05-05 00:31:53','2025-05-05 00:31:53',90,21,5000000,'The Construction Risk Assessment Portal is designed to assist construction project managers, safety engineers, and compliance officers in identifying, categorizing, and mitigating risks across various project phases. The system will provide a centralized platform to log, track, and evaluate potential hazards related to safety, environmental concerns, budgetary constraints, and regulatory compliance. Key features will include risk probability and impact assessment tools, a customizable risk matrix, automated alerts for high-risk items, and audit trail logging for accountability. Integration with project scheduling tools will allow risks to be mapped to specific tasks or milestones, improving visibility and proactive management. The portal will also support collaborative features such as role-based comments, document uploads, and automated report generation for stakeholder communication. Future development will focus on AI-powered risk prediction models based on historical data and industry benchmarks, enhancing the proactive risk mitigation strategy for construction firms.'),(45,'Project Beta','Development of new mobile platform','Planning','2025-05-05 00:36:50','2025-05-05 00:36:50',90,21,5000000,'The Construction Risk Assessment Portal is designed to assist construction project managers, safety engineers, and compliance officers in identifying, categorizing, and mitigating risks across various project phases. The system will provide a centralized platform to log, track, and evaluate potential hazards related to safety, environmental concerns, budgetary constraints, and regulatory compliance. Key features will include risk probability and impact assessment tools, a customizable risk matrix, automated alerts for high-risk items, and audit trail logging for accountability. Integration with project scheduling tools will allow risks to be mapped to specific tasks or milestones, improving visibility and proactive management. The portal will also support collaborative features such as role-based comments, document uploads, and automated report generation for stakeholder communication. Future development will focus on AI-powered risk prediction models based on historical data and industry benchmarks, enhancing the proactive risk mitigation strategy for construction firms.'),(47,'Project Beta','Development of new mobile platform','Planning','2025-05-05 00:42:07','2025-05-05 00:42:07',90,21,5000000,'The Construction Risk Assessment Portal is designed to assist construction project managers, safety engineers, and compliance officers in identifying, categorizing, and mitigating risks across various project phases. The system will provide a centralized platform to log, track, and evaluate potential hazards related to safety, environmental concerns, budgetary constraints, and regulatory compliance. Key features will include risk probability and impact assessment tools, a customizable risk matrix, automated alerts for high-risk items, and audit trail logging for accountability. Integration with project scheduling tools will allow risks to be mapped to specific tasks or milestones, improving visibility and proactive management. The portal will also support collaborative features such as role-based comments, document uploads, and automated report generation for stakeholder communication. Future development will focus on AI-powered risk prediction models based on historical data and industry benchmarks, enhancing the proactive risk mitigation strategy for construction firms.');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `risks`
--

DROP TABLE IF EXISTS `risks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `risks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `status` enum('Open','Monitoring','Closed') DEFAULT 'Open',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `project_id` int DEFAULT NULL,
  `probability` int DEFAULT '3',
  `impact` int DEFAULT '3',
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `risks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `risks_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `risks_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `risks_ibfk_4` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `risks_ibfk_5` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `risks_ibfk_6` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `risks_ibfk_7` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `risks`
--

LOCK TABLES `risks` WRITE;
/*!40000 ALTER TABLE `risks` DISABLE KEYS */;
INSERT INTO `risks` VALUES (2,'Feature Delay','Technical','Closed','2025-05-04 17:20:49','2025-05-04 23:47:13',2,4,2),(3,'Budget Overrun','Financial','Open','2025-05-04 17:20:49','2025-05-04 12:28:43',3,3,3),(4,'Resource Shortage','Operational','Closed','2025-05-04 17:20:49','2025-05-04 17:20:49',4,3,3),(5,'Regulatory Change','Compliance','Monitoring','2025-05-04 17:20:49','2025-05-04 17:20:49',5,3,3),(6,'Vendor delay in supply chain','Logistics','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',NULL,4,3),(7,'Server Freezing','Technical','Monitoring','2025-05-04 23:11:03','2025-05-05 00:00:01',5,5,5),(8,'Team skill gaps','HR','Open','2025-05-04 23:11:03','2025-05-04 23:46:10',2,4,4),(9,'Budget overrun risk','Financial','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',4,4,4),(10,'Regulatory compliance delay','Legal','Monitoring','2025-05-04 23:11:03','2025-05-04 23:11:03',5,3,4),(11,'Data migration failure','Technical','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',6,5,5),(12,'Scope creep','Management','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',NULL,3,3),(13,'Cyber attack','Security','Monitoring','2025-05-04 23:11:03','2025-05-04 23:11:03',5,5,5),(14,'Key resource turnover','HR','Monitoring','2025-05-04 23:11:03','2025-05-04 23:11:03',2,2,3),(15,'IoT hardware malfunction','Technical','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',8,4,4),(16,'Underestimated development effort','Technical','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',3,3,3),(17,'Unexpected regulatory changes','Legal','Monitoring','2025-05-04 23:11:03','2025-05-04 23:11:03',9,2,5),(18,'User adoption resistance','Organizational','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',7,3,2),(19,'Hardware delivery delays','Logistics','Closed','2025-05-04 23:11:03','2025-05-04 23:11:03',4,3,3),(20,'Data privacy breach','Security','Monitoring','2025-05-04 23:11:03','2025-05-04 23:11:03',5,5,5),(21,'API rate limits exceeded','Technical','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',3,4,2),(22,'Third-party integration delays','Vendor','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',NULL,3,3),(23,'Regulatory audit findings','Legal','Closed','2025-05-04 23:11:03','2025-05-04 23:11:03',6,2,4),(24,'Insufficient test coverage','Quality Assurance','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',7,3,3),(25,'Cloud service outages','Infrastructure','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',8,4,4),(26,'High maintenance costs','Financial','Closed','2025-05-04 23:11:03','2025-05-04 23:11:03',10,2,3),(27,'AI model bias','Technical','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',3,3,4),(28,'Data inconsistency across systems','Technical','Monitoring','2025-05-04 23:11:03','2025-05-04 23:11:03',6,4,4),(29,'Low user engagement','UX/UI','Monitoring','2025-05-04 23:11:03','2025-05-04 23:11:03',7,3,2),(30,'Project team burnout','HR','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',4,2,3),(31,'Sensor data loss','Technical','Open','2025-05-04 23:11:03','2025-05-04 23:11:03',8,4,5),(35,'Server Downtime','Infrastructure','Open','2025-05-04 23:55:27','2025-05-04 23:55:27',3,4,5),(37,'Server Downtime','Infrastructure','Open','2025-05-05 00:00:01','2025-05-05 00:00:01',3,4,5),(38,'Server Downtime','Infrastructure','Open','2025-05-05 00:06:39','2025-05-05 00:06:39',3,4,5),(39,'Server Downtime','Infrastructure','Open','2025-05-05 00:11:22','2025-05-05 00:11:22',3,4,5),(40,'Server Downtime','Infrastructure','Open','2025-05-05 00:19:41','2025-05-05 00:19:41',3,4,5),(41,'Server Downtime','Infrastructure','Open','2025-05-05 00:20:22','2025-05-05 00:20:22',3,4,5),(42,'Server Downtime','Infrastructure','Open','2025-05-05 00:26:22','2025-05-05 00:26:22',3,4,5),(43,'Server Downtime','Infrastructure','Open','2025-05-05 00:35:43','2025-05-05 00:35:43',3,4,5),(44,'Server Downtime','Infrastructure','Open','2025-05-05 00:37:44','2025-05-05 00:37:44',3,4,5);
/*!40000 ALTER TABLE `risks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `role` enum('Admin','User') DEFAULT 'User',
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `username_6` (`username`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `username_7` (`username`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `username_8` (`username`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `username_9` (`username`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `username_10` (`username`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `username_11` (`username`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `username_12` (`username`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `username_13` (`username`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `username_14` (`username`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `username_15` (`username`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `username_16` (`username`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `username_17` (`username`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `username_18` (`username`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `username_19` (`username`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `username_20` (`username`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `username_21` (`username`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `username_22` (`username`),
  UNIQUE KEY `email_22` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@gmail.com','$2b$10$UaR/PD1Km8xctHlwuEf9reVioy9.cLjqrWrbYtgU/JkvbFr0DF.WS','Admin','Active','2025-05-04 11:46:19','2025-05-04 23:01:38'),(2,'Admin User','admin@example.com','$2b$10$Yw7Rt1hxppv4p9B9aaBa2uUe6b6mEVRfHn1tC8oMvcd2CDALlLFbe','Admin','Active','2025-05-04 17:21:00','2025-05-04 17:21:00'),(3,'ranush','ranushvimantha1@gmail.com','$2b$10$AZ0XljGYSF4NUtdB3kkfpuZtWbose8h5fjixmoqhGXQB1VMFr1yHi','User','Active','2025-05-04 12:06:34','2025-05-04 12:06:34'),(5,'john_doe','john@example.com','$2b$10$ueINbLG5aHhxRX33m/eszuhZvJVGWLqQxXPpuG7JKdSfos04TaJKu','User','Active','2025-05-05 00:06:40','2025-05-05 00:06:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'foresight_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-05  6:31:09

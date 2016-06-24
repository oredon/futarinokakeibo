-- MySQL dump 10.13  Distrib 5.6.26, for Linux (x86_64)
--
-- Host: localhost    Database: kakeibo
-- ------------------------------------------------------
-- Server version	5.6.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=ujis;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'食料品'),(2,'雑貨'),(3,'生活消耗品'),(4,'家具・家電'),(5,'医療'),(6,'家賃'),(7,'電気水道ガス通信'),(8,'遊興費'),(9,'その他');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `price` int(100) NOT NULL DEFAULT '0',
  `pay_danna` int(100) DEFAULT '0',
  `pay_yome` int(100) DEFAULT '0',
  `description` text,
  `date` date DEFAULT NULL,
  `created` date DEFAULT NULL,
  `modified` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=ujis;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
INSERT INTO `forms` VALUES (1,1,'スーパー',1200,1000,200,'いつものスーパーで買い物','2016-06-01','2016-07-15','2016-07-15'),(2,2,'街の雑貨屋さん',2000,1000,1000,'','2016-06-05','2016-07-15','2016-07-15'),(3,3,'トモズ',1000,1000,NULL,'','2016-06-10','2016-07-15','2016-07-15'),(4,4,'タンス',50000,25000,25000,'','2016-06-15','2016-07-15','2016-07-15'),(5,5,'予防接種',4000,4000,NULL,'','2016-06-15','2016-07-15','2016-07-15'),(6,8,'海ドライブ',10000,10000,NULL,'思い出たくさんつくろうね','2016-06-20','2016-07-15','2016-07-15'),(7,6,'家賃',120000,60000,60000,'','2016-06-25','2016-07-15','2016-07-15'),(8,7,'光熱費とか',15000,10000,5000,'','2016-06-30','2016-07-15','2016-07-15'),(9,1,'食料買い出し',4200,4000,200,'','2016-07-01','2016-07-15','2016-07-15'),(10,3,'ドラッグスーパー',3233,233,3000,'トイレットペーパーなど衛生品買い出し','2016-07-03','2016-07-15','2016-07-15'),(11,2,'デパート',3000,3000,NULL,'おはし購入','2016-07-04','2016-07-15','2016-07-15'),(12,1,'レストラン',3000,1000,2000,'たまには外食','2016-07-05','2016-07-15','2016-07-15'),(13,4,'加湿器',19800,15000,4800,'','2016-07-07','2016-07-15','2016-07-15'),(14,5,'風邪',2800,NULL,2800,'','2016-07-10','2016-07-15','2016-07-15'),(15,7,'電話代',12000,6000,6000,'','2016-07-15','2016-07-15','2016-07-15'),(16,8,'ゆうえんち',18000,10000,8000,'','2016-07-18','2016-07-15','2016-07-15'),(17,6,'家賃',120000,60000,60000,'','2016-07-25','2016-07-15','2016-07-15'),(18,1,'食料買い出し',4200,4000,200,'','2016-08-01','2016-07-15','2016-07-15'),(19,3,'ドラッグスーパー',3233,233,3000,'トイレットペーパーなど衛生品買い出し','2016-08-03','2016-07-15','2016-07-15'),(20,2,'デパート',3000,3000,NULL,'おはし購入','2016-08-04','2016-07-15','2016-07-15'),(21,1,'レストラン',3000,1000,2000,'たまには外食','2016-08-05','2016-07-15','2016-07-15'),(22,4,'加湿器',19800,15000,4800,'','2016-08-07','2016-07-15','2016-07-15'),(23,5,'風邪',2800,NULL,2800,'','2016-08-10','2016-07-15','2016-07-15'),(24,7,'電話代',12000,6000,6000,'','2016-08-15','2016-07-15','2016-07-15'),(25,8,'ゆうえんち',18000,10000,8000,'','2016-08-18','2016-07-15','2016-07-15'),(26,6,'家賃',120000,60000,60000,'','2016-08-25','2016-07-15','2016-07-15');
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=ujis;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','ec9957da2bec5b66621afba79460fd98fba8c06c','2016-06-15 18:26:21','2016-06-15 18:26:21');
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

-- Dump completed on 2016-06-15 19:51:42

-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: tiendapp
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BILLS`
--

DROP TABLE IF EXISTS `BILLS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BILLS` (
  `ID_BILL` int unsigned NOT NULL AUTO_INCREMENT,
  `CUSTOMER_ID` varchar(50) DEFAULT NULL,
  `CUSTOMER_NAME` varchar(100) DEFAULT NULL,
  `CUSTOMER_PHONE` varchar(15) DEFAULT NULL,
  `CUSTOMER_ADDRESS` varchar(200) DEFAULT NULL,
  `AMMOUNT` bigint unsigned DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT NULL,
  `ID_STATUS` int unsigned DEFAULT NULL,
  `CODE` varchar(70) DEFAULT NULL,
  `ID_STORE` int unsigned DEFAULT NULL,
  `REF_PAGO` varchar(200) DEFAULT NULL,
  `ID_SUPPLIER` int unsigned DEFAULT NULL,
  PRIMARY KEY (`ID_BILL`),
  KEY `ID_STATUS` (`ID_STATUS`),
  KEY `ID_STORE` (`ID_STORE`),
  KEY `ID_SUPPLIER` (`ID_SUPPLIER`),
  CONSTRAINT `BILLS_ibfk_1` FOREIGN KEY (`ID_STATUS`) REFERENCES `PAR_STATUS` (`ID_STATUS`),
  CONSTRAINT `BILLS_ibfk_2` FOREIGN KEY (`ID_STORE`) REFERENCES `STORES` (`ID_STORE`),
  CONSTRAINT `BILLS_ibfk_3` FOREIGN KEY (`ID_SUPPLIER`) REFERENCES `SUPPLIERS` (`ID_SUPPLIER`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BILLS`
--

LOCK TABLES `BILLS` WRITE;
/*!40000 ALTER TABLE `BILLS` DISABLE KEYS */;
INSERT INTO `BILLS` VALUES (121,'123123123','Ducardo','','',858499,'2022-06-04 16:52:46',9,'1654361566217123123123',2,NULL,NULL),(122,'10615123','RUBEN','311213123','',20050,'2022-06-05 20:19:02',4,'165446034269310615123',2,NULL,NULL),(123,'578178','','','',52000,'2022-06-05 22:50:42',4,'1654469442406578178',2,NULL,NULL),(124,'836665','','','',52000,'2022-06-05 22:54:09',4,'1654469649802836665',2,NULL,NULL),(125,'1061543081','Ducardo Robeiro','3117348662','Calle Luna, Calle Sol',87000,'2022-06-05 22:59:17',4,'16544699576491061543081',2,NULL,NULL),(126,'174787','Ducardo Robeiro','','',312000,'2022-06-08 01:37:10',4,'1654652230665174787',13,NULL,NULL),(127,'225449','','','',20000,'2022-06-08 01:40:52',4,'1654652452577225449',13,NULL,NULL),(128,'727395','','','',10000,'2022-06-08 01:42:41',4,'1654652561433727395',13,NULL,NULL),(129,'973108','','','',10000,'2022-06-08 01:43:19',4,'1654652599376973108',13,NULL,NULL),(130,'270853','Ducardo','','',10000,'2022-06-08 06:52:09',4,'1654671129841270853',13,NULL,NULL),(131,'973485','LFE-19','','',55000,'2022-06-08 06:52:57',4,'1654671177703973485',13,NULL,NULL),(132,NULL,NULL,NULL,NULL,0,'2022-07-20 20:32:36',14,'16583491560461061543',2,NULL,1),(133,NULL,NULL,NULL,NULL,0,'2022-07-22 22:09:21',14,'165852776133910752012',2,NULL,9),(134,NULL,NULL,NULL,NULL,0,'2022-07-22 22:48:52',14,'165853013225510752012',2,NULL,11),(135,'646959','Mesa 1','','',2500,'2022-08-02 23:29:58',9,'1659482998823646959',2,NULL,NULL);
/*!40000 ALTER TABLE `BILLS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BILLS_DETAIL`
--

DROP TABLE IF EXISTS `BILLS_DETAIL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BILLS_DETAIL` (
  `ID_BILL_DETAIL` int unsigned NOT NULL AUTO_INCREMENT,
  `ID_BILL` int unsigned DEFAULT NULL,
  `ID_PRODUCT` int unsigned DEFAULT NULL,
  `PRICE` int unsigned DEFAULT NULL,
  `FINAL_PRICE` int unsigned DEFAULT NULL,
  `COST` int unsigned DEFAULT NULL,
  `UNITS` int unsigned DEFAULT NULL,
  `OFF` float DEFAULT NULL,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID_BILL_DETAIL`),
  KEY `ID_BILL` (`ID_BILL`),
  KEY `ID_PRODUCT` (`ID_PRODUCT`),
  CONSTRAINT `BILLS_DETAIL_ibfk_1` FOREIGN KEY (`ID_BILL`) REFERENCES `BILLS` (`ID_BILL`),
  CONSTRAINT `BILLS_DETAIL_ibfk_2` FOREIGN KEY (`ID_PRODUCT`) REFERENCES `PRODUCTS` (`ID_PRODUCT`)
) ENGINE=InnoDB AUTO_INCREMENT=299 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BILLS_DETAIL`
--

LOCK TABLES `BILLS_DETAIL` WRITE;
/*!40000 ALTER TABLE `BILLS_DETAIL` DISABLE KEYS */;
INSERT INTO `BILLS_DETAIL` VALUES (270,121,2,855999,770399,0,1,10,NULL),(271,121,7,2500,2500,1850,1,0,NULL),(272,122,5,19500,17550,13000,1,10,NULL),(273,122,7,2500,2500,1850,1,0,NULL),(274,123,15,35000,35000,25000,1,0,NULL),(275,123,16,8500,8500,7800,2,0,NULL),(276,124,15,35000,35000,25000,1,0,NULL),(277,124,16,8500,8500,7800,2,0,NULL),(278,125,15,35000,35000,25000,2,0,NULL),(279,125,16,8500,8500,7800,2,0,NULL),(280,126,18,25000,25000,13000,1,0,NULL),(281,126,19,8000,8000,5000,1,0,NULL),(282,126,17,10000,9000,8000,31,10,NULL),(283,127,17,10000,10000,8000,2,0,NULL),(284,128,17,10000,10000,8000,1,0,NULL),(285,129,17,10000,10000,8000,1,0,NULL),(286,130,17,10000,10000,8000,1,0,NULL),(287,131,18,25000,22500,13000,2,10,NULL),(288,131,17,10000,10000,8000,1,0,NULL),(291,132,5,13000,13000,13000,1,NULL,NULL),(293,133,13,12000,12000,12000,1,NULL,NULL),(294,133,7,1850,55500,1850,30,NULL,NULL),(296,134,7,1850,18500,1850,10,NULL,NULL),(298,135,7,2500,2500,1850,1,0,NULL);
/*!40000 ALTER TABLE `BILLS_DETAIL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CATEGORIES`
--

DROP TABLE IF EXISTS `CATEGORIES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CATEGORIES` (
  `ID_CATEGORY` int unsigned NOT NULL AUTO_INCREMENT,
  `CATEGORY_NAME` varchar(200) DEFAULT NULL,
  `CATEGORY_DESCRIPTION` text,
  `ID_CATEGORY_PARENT` int unsigned DEFAULT NULL,
  `ID_STORE` int unsigned DEFAULT NULL,
  `MONGO_ID` varchar(24) DEFAULT NULL,
  `IMG_SRC` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID_CATEGORY`),
  KEY `ID_STORE` (`ID_STORE`),
  KEY `ID_CATEGORY_PARENT` (`ID_CATEGORY_PARENT`),
  CONSTRAINT `CATEGORIES_ibfk_1` FOREIGN KEY (`ID_STORE`) REFERENCES `STORES` (`ID_STORE`),
  CONSTRAINT `CATEGORIES_ibfk_2` FOREIGN KEY (`ID_CATEGORY_PARENT`) REFERENCES `CATEGORIES` (`ID_CATEGORY`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CATEGORIES`
--

LOCK TABLES `CATEGORIES` WRITE;
/*!40000 ALTER TABLE `CATEGORIES` DISABLE KEYS */;
INSERT INTO `CATEGORIES` VALUES (1,'Tecnología','Los mejores precios en dispositivos tecnologicos del mercado',NULL,2,NULL,NULL),(2,'Celulares','Todas tus marcas favoritas y al mejor precio',NULL,2,NULL,NULL),(3,'Televisores','Smart TV y mucho más',1,2,NULL,NULL),(4,'Computadores y accesorios','',1,2,NULL,NULL),(5,'Impresion','',1,2,NULL,NULL),(6,'Mundo Gamer','',1,2,NULL,NULL),(7,'Audio','',1,2,NULL,NULL),(8,'Camaras','',1,2,NULL,NULL),(9,'10 a 32 pulgadas','',3,2,NULL,NULL),(10,'40 a 43 pulgadas','',3,2,NULL,NULL),(11,'44 a 50 pulgadas','',3,2,NULL,NULL),(12,'51 a 60 pulgadas','',3,2,NULL,NULL),(13,'Soportes para TV','',3,2,NULL,NULL),(14,'Computadores portatiles','',4,2,NULL,NULL),(15,'Computadores de Escritorio','',4,2,NULL,NULL),(16,'Computadores 2 en 1','',4,2,NULL,NULL),(17,'Monitores','',4,2,NULL,NULL),(18,'Impresoras y multifuncionales','',5,2,NULL,NULL),(19,'Cartuchos y cintas','',5,2,NULL,NULL),(20,'Papel','',5,2,NULL,NULL),(21,'Consolas','',6,2,NULL,NULL),(22,'Videojuegos','',6,2,NULL,NULL),(23,'Computadores gamer','',6,2,NULL,NULL),(24,'Barras de sonito','',7,2,NULL,NULL),(25,'Parlantes','',7,2,NULL,NULL),(26,'Audifonos','',7,2,NULL,NULL),(27,'Camaras deportivas','',8,2,NULL,NULL),(28,'Camaras reflex','',8,2,NULL,NULL),(29,'Camaras profesionales','',8,2,NULL,NULL),(30,'Smartphones','',2,2,NULL,NULL),(31,'Smartwatch','',2,2,NULL,NULL),(32,'Accesorios','',2,2,NULL,NULL),(34,'Samsung','',30,2,NULL,NULL),(35,'Xiaomi','',30,2,NULL,NULL),(36,'iPhone','',30,2,NULL,NULL),(37,'Samsung','',31,2,NULL,NULL),(38,'Xiaomi','',31,2,NULL,NULL),(39,'Apple','',31,2,NULL,NULL),(40,'Audifonos','',32,2,NULL,NULL),(41,'Cargadores','',32,2,NULL,NULL),(42,'Protectores y estuches','',32,2,NULL,NULL),(43,'Vapeadores','Todas las marcas de vapeadores',44,2,'6125aec10506fa59a674f56a',NULL),(44,'Cigarrillos',NULL,NULL,2,'6125aec10506fa59a674f56a',NULL),(45,'Licores','Variedad de licores para tus eventos',NULL,2,'6125aec10506fa59a674f56a',NULL),(47,'Vinitos','Los mejores vinos de la ciudad de Bogotá',45,2,'6125aec10506fa59a674f56a',NULL),(48,'Xiaomi','Los mejores telefonos ever',2,NULL,NULL,NULL),(49,'Xiaomi','Here ',2,NULL,NULL,NULL),(50,'VInos','Los mejores vinos de la ciudad',45,2,'6125aec10506fa59a674f56a',NULL),(51,'Poco','La revolución que llegó para quedarse',30,2,NULL,NULL),(52,'Mana','Ninguna',3,2,NULL,NULL),(53,'Temblor','Te besare en el temblor',52,2,NULL,NULL),(54,'Software','Licencias de software para tu emprendimiento',1,2,NULL,NULL),(55,'Adas','Cuento de adas',NULL,2,NULL,NULL),(56,'La Union','Los mejores vinos Colombianos',45,2,NULL,NULL),(57,'Vinos','Los mejores vinos de la ciudad de Bogotá',45,2,'6125aec10506fa59a674f56a','Sourcing.svg'),(58,'Categoria Prueba 2','asd',1,2,NULL,'1650007971586_hamburguer.jpg'),(59,'Aceites',NULL,NULL,13,NULL,NULL),(60,'Arrastres','',NULL,13,NULL,NULL),(61,'Productos Prueba',NULL,NULL,2,NULL,NULL);
/*!40000 ALTER TABLE `CATEGORIES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COSTS`
--

DROP TABLE IF EXISTS `COSTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COSTS` (
  `ID_COST` int unsigned NOT NULL AUTO_INCREMENT,
  `ID_STORE` int unsigned DEFAULT NULL,
  `ID_COST_CATEGORY` int unsigned DEFAULT NULL,
  `REF_COBRO` varchar(200) DEFAULT NULL,
  `REF_PAGO` varchar(200) DEFAULT NULL,
  `ID_TIPO_PAGO` int unsigned DEFAULT NULL,
  `DESCRIPTION` varchar(500) DEFAULT NULL,
  `AMMOUNT` int DEFAULT NULL,
  `ID_STATUS` int unsigned DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED_AT` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID_COST`),
  KEY `ID_TIPO_PAGO` (`ID_TIPO_PAGO`),
  KEY `ID_STATUS` (`ID_STATUS`),
  KEY `ID_COST_CATEGORY` (`ID_COST_CATEGORY`),
  KEY `ID_STORE` (`ID_STORE`),
  CONSTRAINT `COSTS_ibfk_1` FOREIGN KEY (`ID_TIPO_PAGO`) REFERENCES `PAR_TIPO_PAGO` (`ID_TIPO_PAGO`),
  CONSTRAINT `COSTS_ibfk_2` FOREIGN KEY (`ID_STATUS`) REFERENCES `PAR_STATUS` (`ID_STATUS`),
  CONSTRAINT `COSTS_ibfk_3` FOREIGN KEY (`ID_COST_CATEGORY`) REFERENCES `COSTS_CATEGORIES` (`ID_COST_CATEGORY`),
  CONSTRAINT `COSTS_ibfk_4` FOREIGN KEY (`ID_STORE`) REFERENCES `STORES` (`ID_STORE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COSTS`
--

LOCK TABLES `COSTS` WRITE;
/*!40000 ALTER TABLE `COSTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `COSTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COSTS_CATEGORIES`
--

DROP TABLE IF EXISTS `COSTS_CATEGORIES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COSTS_CATEGORIES` (
  `ID_COST_CATEGORY` int unsigned NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  `CODIGO` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID_COST_CATEGORY`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COSTS_CATEGORIES`
--

LOCK TABLES `COSTS_CATEGORIES` WRITE;
/*!40000 ALTER TABLE `COSTS_CATEGORIES` DISABLE KEYS */;
INSERT INTO `COSTS_CATEGORIES` VALUES (1,'Servicios Públicos','CS1'),(2,'Asesorias','CS2'),(3,'Mantenimiento','CS3'),(4,'Arriendo','CS4'),(5,'Impuestos','CS5');
/*!40000 ALTER TABLE `COSTS_CATEGORIES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAR_ESTADO_PAGO`
--

DROP TABLE IF EXISTS `PAR_ESTADO_PAGO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAR_ESTADO_PAGO` (
  `ID_ESTADO_PAGO` int unsigned NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(100) DEFAULT NULL,
  `CODE` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID_ESTADO_PAGO`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAR_ESTADO_PAGO`
--

LOCK TABLES `PAR_ESTADO_PAGO` WRITE;
/*!40000 ALTER TABLE `PAR_ESTADO_PAGO` DISABLE KEYS */;
INSERT INTO `PAR_ESTADO_PAGO` VALUES (1,'PENDIENTE','PEN-1'),(2,'APROBADO','APPROVED'),(3,'RECHAZADO','REJECTED');
/*!40000 ALTER TABLE `PAR_ESTADO_PAGO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAR_STATUS`
--

DROP TABLE IF EXISTS `PAR_STATUS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAR_STATUS` (
  `ID_STATUS` int unsigned NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  `CODE` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID_STATUS`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAR_STATUS`
--

LOCK TABLES `PAR_STATUS` WRITE;
/*!40000 ALTER TABLE `PAR_STATUS` DISABLE KEYS */;
INSERT INTO `PAR_STATUS` VALUES (1,'PAGADO','P1'),(2,'PAGADO-PENDIENTE','P2'),(3,'PAGADO-DESPACHADO','P3'),(4,'PAGADO-ENTREGADO','P4'),(5,'CREDITO','C1'),(6,'CREDITO-PENDIENTE','C2'),(7,'CREDITO-DESPACHADO','C3'),(8,'CREDITO-ENTREGADO','C4'),(9,'ABIERTA','A1'),(10,'ANULADO','A2'),(11,'DEVOLUCION','D1'),(12,'DEVOLUCION-RECIBIDO','D2'),(13,'DEVOLUCION-PAGADO','D3'),(14,'PROVEEDOR-PENDIENTE','S1'),(15,'PROVEEDOR-PAGADO','S2'),(16,'PROVEEDOR-ANULADO','S3'),(17,'PROVEEDOR-ENTREGADO','S4'),(18,'PROVEEDOR-ABIERTO','S0'),(19,'GASTO-PAGADO','G1'),(20,'GASTO-PENDIENTE','G2'),(21,'GASTO-ANULADO','G3');
/*!40000 ALTER TABLE `PAR_STATUS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAR_TIPO_PAGO`
--

DROP TABLE IF EXISTS `PAR_TIPO_PAGO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAR_TIPO_PAGO` (
  `ID_TIPO_PAGO` int unsigned NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  `CODE` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`ID_TIPO_PAGO`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAR_TIPO_PAGO`
--

LOCK TABLES `PAR_TIPO_PAGO` WRITE;
/*!40000 ALTER TABLE `PAR_TIPO_PAGO` DISABLE KEYS */;
INSERT INTO `PAR_TIPO_PAGO` VALUES (1,'EFECTIVO','E1'),(2,'TRANSFERENCIA BANCARIA','T1'),(3,'TRANSFERENCIA NEQUI','T1'),(4,'TRANSFERENCIA DAVIPLATA','T3'),(5,'PSE','PSE-1'),(6,'TARJETA CREDITO','CRE-1'),(7,'TARJETA DEBITO','DEB-1'),(8,'MIXTO','MIX-1');
/*!40000 ALTER TABLE `PAR_TIPO_PAGO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAR_USER_TYPE`
--

DROP TABLE IF EXISTS `PAR_USER_TYPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAR_USER_TYPE` (
  `ID_PAR_USER_TYPE` int unsigned NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID_PAR_USER_TYPE`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAR_USER_TYPE`
--

LOCK TABLES `PAR_USER_TYPE` WRITE;
/*!40000 ALTER TABLE `PAR_USER_TYPE` DISABLE KEYS */;
INSERT INTO `PAR_USER_TYPE` VALUES (1,'STAFF'),(2,'CUSTOMER'),(3,'GUEST');
/*!40000 ALTER TABLE `PAR_USER_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PATHS`
--

DROP TABLE IF EXISTS `PATHS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PATHS` (
  `ID_PATH` int unsigned NOT NULL AUTO_INCREMENT,
  `PATH` varchar(300) DEFAULT NULL,
  `METHOD` varchar(10) DEFAULT NULL,
  `DESCRIPTION` text,
  `PUBLIC` smallint unsigned DEFAULT '0',
  PRIMARY KEY (`ID_PATH`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PATHS`
--

LOCK TABLES `PATHS` WRITE;
/*!40000 ALTER TABLE `PATHS` DISABLE KEYS */;
INSERT INTO `PATHS` VALUES (1,'/api/login','POST','Login into the platform from POST REQ',1),(2,'/api/post','POST','Insert a Post to the platform',0),(3,'/api/newsfeed','GET','Obtain information from Newsfeed',0),(4,'/api/v1/createStore','POST','Save a new Store',0),(5,'/api/v1/updateStore','POST','Save a new Store',0),(6,'/api/v1/store','GET','Save a new Store',0),(7,'/api/v1/store/create','POST','Save a new Store',0),(8,'/api/v1/store/update','POST','Save a new Store',0),(9,'/api/v1/store/delete','POST','Save a new Store',0),(10,'/api/v1/product','GET','Get information about a Product',0),(11,'/api/v1/products','GET','Get information about a set of products',0),(12,'/api/v1/product/create','POST','Create a new product',0),(13,'/api/v1/product/update','POST','Update a product',0),(14,'/api/v1/product/delete','POST','Delete a product',0),(15,'/api/v1/category','GET','Get information about a Category',0),(16,'/api/v1/categories','GET','Get information about a set of categories',0),(17,'/api/v1/category/create','POST','Create a new category',0),(18,'/api/v1/category/update','POST','Update a category',0),(19,'/api/v1/category/delete','POST','Delete a category',0),(20,'/api/v1/user/update','POST','Update user information',0),(21,'/api/v1/user/roles','POST','GET ROLES FOR A USER',0),(22,'/api/v1/user/roles','GET','GET ROLES FOR A USER',0),(23,'/api/v1/store/get/user','GET','Get stores associated to specific user',0),(24,'/api/v1/files/upload','POST','Upload any kind of files',0),(25,'/api/v1/files/download','GET','Download resources',0),(26,'/api/v1/bill/create','POST','Create a new bill',0),(27,'/api/v1/bill/product/add','POST','Add a product to a bill',0),(28,'/api/v1/bill/product/update','POST','Update a product to a bill',0),(29,'/api/v1/bill/product/delete','POST','Delete a product to a bill',0),(30,'/api/v1/bill/status/update','POST','Update status of a bill',0),(31,'/api/v1/bill/delete','POST','Delete a bill',0),(32,'/api/v1/bill/search','GET','Find bills by keyword',0),(33,'/api/v1/bill/get','GET','Get all information about a specific bill',0),(34,'/api/v1/bill/get/store','GET','Get all bill of a store',0),(35,'/api/v1/bill/detail/get','GET','Get all detail of a bill',0),(36,'/api/v1/bill/get/open','GET','Get open bills',0),(37,'/api/v1/product/get/store/stock','GET','Obtener productos con alerta de Stock',0),(38,'/api/v1/suppliers/create','POST','Api to add a supplier to a specific store',0),(39,'/api/v1/suppliers/delete','POST','Api to delete a supplier',0),(40,'/api/v1/suppliers/bill/create','POST','Create a bill supplier',0),(41,'/api/v1/suppliers/bill/product/add','POST','Add a product to a supplier bill',0),(42,'/api/v1/suppliers/bill/product/update','POST','Update a product to a supplier bill',0),(43,'/api/v1/suppliers/bill/product/delete','POST','Delete a product from a supplier bill',0),(44,'/api/v1/suppliers/update','POST','Update supplier info',0),(45,'/api/v1/suppliers/get/store','GET','Get all suppliers of a specific store',0),(46,'/api/v1/suppliers/get','GET','Get a specific supplier',0);
/*!40000 ALTER TABLE `PATHS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PATHS_ROLES`
--

DROP TABLE IF EXISTS `PATHS_ROLES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PATHS_ROLES` (
  `ID_PATH_ROLE` int unsigned NOT NULL AUTO_INCREMENT,
  `ID_PATH` int unsigned DEFAULT NULL,
  `ID_ROLE` int unsigned DEFAULT NULL,
  PRIMARY KEY (`ID_PATH_ROLE`),
  KEY `ID_PATH` (`ID_PATH`),
  KEY `ID_ROLE` (`ID_ROLE`),
  CONSTRAINT `PATHS_ROLES_ibfk_1` FOREIGN KEY (`ID_PATH`) REFERENCES `PATHS` (`ID_PATH`),
  CONSTRAINT `PATHS_ROLES_ibfk_2` FOREIGN KEY (`ID_ROLE`) REFERENCES `ROLES` (`ID_ROLE`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PATHS_ROLES`
--

LOCK TABLES `PATHS_ROLES` WRITE;
/*!40000 ALTER TABLE `PATHS_ROLES` DISABLE KEYS */;
INSERT INTO `PATHS_ROLES` VALUES (1,1,1),(2,2,1),(3,1,2),(4,3,1),(5,2,2),(7,6,1),(8,7,1),(9,8,1),(10,9,1),(11,19,1),(12,18,1),(13,17,1),(14,16,1),(15,15,1),(16,14,1),(17,13,1),(18,12,1),(19,11,1),(20,10,1),(21,10,2),(22,11,2),(23,12,2),(24,13,2),(25,14,2),(26,15,2),(27,16,2),(28,17,2),(29,18,2),(30,19,2),(33,20,1),(34,21,1),(35,21,2),(37,23,1),(38,23,2),(39,24,1),(40,24,2),(42,25,1),(43,25,2),(45,26,1),(46,27,1),(47,28,1),(48,29,1),(49,30,1),(50,31,1),(52,26,3),(53,27,3),(54,28,3),(55,29,3),(56,30,3),(57,32,1),(58,32,3),(59,33,1),(60,33,3),(61,34,1),(62,34,3),(63,35,1),(64,35,3),(65,36,1),(66,36,3),(67,37,1),(68,37,2),(69,38,1),(70,39,1),(71,40,1),(72,41,1),(73,42,1),(74,43,1),(75,38,2),(76,39,2),(77,40,2),(78,41,2),(79,42,2),(80,43,2),(81,44,1),(82,44,2),(83,45,1),(84,45,2),(85,46,1),(86,46,2);
/*!40000 ALTER TABLE `PATHS_ROLES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUCTS`
--

DROP TABLE IF EXISTS `PRODUCTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRODUCTS` (
  `ID_PRODUCT` int unsigned NOT NULL AUTO_INCREMENT,
  `PRODUCT_NAME` varchar(200) DEFAULT NULL,
  `PRODUCT_LINE` varchar(100) DEFAULT NULL,
  `PRODUCT_DESCRIPTION` text,
  `PRODUCT_BRAND` varchar(100) DEFAULT NULL,
  `PRODUCT_QUANTITY` float DEFAULT NULL,
  `PRODUCT_PRICE` float DEFAULT NULL,
  `PRODUCT_COST` float DEFAULT NULL,
  `PRODUCT_STOCK` int DEFAULT NULL,
  `STOCK_ALERT` int unsigned DEFAULT '0',
  `PRODUCT_OFF` float DEFAULT '0',
  `PRODUCT_CODE` varchar(20) DEFAULT NULL,
  `ID_STORE` int unsigned DEFAULT NULL,
  `ID_CATEGORY` int unsigned DEFAULT NULL,
  `MONGO_ID` varchar(24) DEFAULT NULL,
  `ACTIVE` smallint unsigned DEFAULT '1',
  `IMG_SRC` varchar(500) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_PRODUCT`),
  KEY `ID_STORE` (`ID_STORE`),
  KEY `ID_CATEGORY` (`ID_CATEGORY`),
  FULLTEXT KEY `PRODUCT_NAME` (`PRODUCT_NAME`),
  FULLTEXT KEY `PRODUCT_BRAND` (`PRODUCT_BRAND`),
  FULLTEXT KEY `PRODUCT_BRAND_2` (`PRODUCT_BRAND`),
  FULLTEXT KEY `PRODUCT_BRAND_3` (`PRODUCT_BRAND`),
  FULLTEXT KEY `PRODUCT_NAME_2` (`PRODUCT_NAME`,`PRODUCT_BRAND`),
  CONSTRAINT `PRODUCTS_ibfk_1` FOREIGN KEY (`ID_STORE`) REFERENCES `STORES` (`ID_STORE`),
  CONSTRAINT `PRODUCTS_ibfk_2` FOREIGN KEY (`ID_CATEGORY`) REFERENCES `CATEGORIES` (`ID_CATEGORY`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUCTS`
--

LOCK TABLES `PRODUCTS` WRITE;
/*!40000 ALTER TABLE `PRODUCTS` DISABLE KEYS */;
INSERT INTO `PRODUCTS` VALUES (1,'Televisor Samsung 32 pulgadas Led HD Smart tv 81 cms UN32T43000A',NULL,'Televisor excelente para videojuegos con un retardo minimizado, compacto para el centro de entretenimiento','SAMSUNG',1,999000,0,119,0,0,NULL,2,9,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(2,'Televisor HISENSE 32 Pulgadas Hd Smart Tv 32A3GV',NULL,'Disfruta de los mejores colores especiales para eventos deportivos. com un 100%SRGB y las mejores aplicaciones para el disfrute hogareño','HISENSE',1,855999,0,295,0,0,NULL,2,9,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(3,'Televisor HYUNDAI 32 Pulgadas Hd Smart Tv HYLED3249NiM','HYUNDAY SMART TVs','La linea HYUNDAI de televisores SMART como nunca lo viste antes, disfruta de la mejor calidad de imagén y aplicaciones, SISTEMA ANDROID TV 8.0, DISNEY+ Version','HYUNDAI',1,910000,0,992,0,25.4,NULL,2,9,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(4,'Computador Portátil HP Intel Core I5-10210U 14 Pulgadas 8 GB 256 GB SSD 14-Cf2524la','OFFICE LAPTOPS','Diseño compacto para, para llevar a todas partes y excelente capacidad para tus clases viruales','HP',1,855999,0,78,0,0,NULL,2,14,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(5,'Vuse Epor Classic Mint Pack 3%',NULL,'Pod para Vaper VUSE ePOD 3.0','VUSE',1,19500,13000,23,0,10,'1001-002',2,NULL,'6125aec10506fa59a674f56a',1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(6,'Vuse Epor Strawberry Pack 3%',NULL,'Pod para Vaper VUSE ePOD 3.0','VUSE',1,19500,13000,833,0,10,'1001-001',2,NULL,'6125aec10506fa59a674f56a',1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(7,'Coca Cola 250ml',NULL,'',NULL,1,2500,1850,1645,0,0,'120211',2,45,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(8,'Vuse Epor Classic Mint Pack 3.0%',NULL,'Pod para Vaper VUSE ePOD 3.5','VUSE',1,19500,13000,50,6,10,'12341223',2,44,'6125aec10506fa59a674f56a',1,'1649309634423_hamburguer.jpg','2022-08-07 01:28:25','2022-08-10 03:40:43'),(10,'TV prueba',NULL,'',NULL,1,2000,1580,0,0,0,'11123123',2,3,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(11,'ASDASDASD',NULL,'',NULL,1,0,0,100,0,0,'1312312',1,NULL,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(12,'Computador Asus 14\" 12GB RAM 512 SSD',NULL,'',NULL,1,2000000,1500000,972,0,0,'101123123',1,NULL,NULL,1,'1650426058081_asus.jpeg','2022-08-07 01:28:25','2022-08-10 03:40:43'),(13,'Marlboro x20',NULL,'','Vuse',2,18000,12000,40,NULL,0,'1001-01',2,NULL,'6125aec10506fa59a674f56a',0,'test-imf.svg','2022-08-07 01:28:25','2022-08-10 03:40:43'),(14,'Marlboro x20',NULL,'','Vuse',2,18000,12000,40,0,0,'1001-01',2,NULL,'6125aec10506fa59a674f56a',0,'test-imf.svg','2022-08-07 01:28:25','2022-08-10 03:40:43'),(15,'Tapete GamerTech Dragón',NULL,'',NULL,1,35000,25000,5,6,0,'7702045531350',2,6,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(16,'Marlboro x20',NULL,'',NULL,1,8500,7800,14,18,0,'7702005601154',2,44,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(17,'Aceite 2T MOBIL 1/4',NULL,'',NULL,1,10000,8000,4,4,0,'7703812004862',13,59,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(18,'Tren de arrastre AX - Narita',NULL,'Sirve para AX y RX',NULL,1,25000,13000,2,0,0,'00001',13,60,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(19,'Forro sillin AX',NULL,'',NULL,1,8000,5000,199,20,0,'7702004013842',13,NULL,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(20,'Producto prueba',NULL,'',NULL,1,1500,800,100,20,0,'',2,NULL,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(21,'Producto prueba 2',NULL,'',NULL,1,12000,8000,200,5,0,'',2,NULL,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(22,'Producto prueba #1',NULL,'',NULL,1,1000,200,100,10,0,'',2,NULL,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(23,'Producto Prueba #2',NULL,'',NULL,1,2000,200,20,0,0,'',2,NULL,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(24,'Producto Prueba #3',NULL,'',NULL,1,25000,2000,10,0,0,'',2,NULL,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(25,'Producto Prueba #4',NULL,'',NULL,1,30000,3000,22,0,0,'',2,NULL,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(26,'Impresora HYUNDAI Advance 2',NULL,'',NULL,1,450000,220000,10,3,0,'',2,45,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43'),(27,'Stella Artois 269ml lata',NULL,'',NULL,1,3500,0,0,0,0,'7702004010254',2,NULL,NULL,1,NULL,'2022-08-07 01:28:25','2022-08-10 03:40:43');
/*!40000 ALTER TABLE `PRODUCTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUCTS_CATEGORIES`
--

DROP TABLE IF EXISTS `PRODUCTS_CATEGORIES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRODUCTS_CATEGORIES` (
  `ID_PRODUCT_CATEGORY` int unsigned NOT NULL AUTO_INCREMENT,
  `ID_PRODUCT` int unsigned DEFAULT NULL,
  `ID_CATEGORY` int unsigned DEFAULT NULL,
  PRIMARY KEY (`ID_PRODUCT_CATEGORY`),
  KEY `ID_PRODUCT` (`ID_PRODUCT`),
  KEY `ID_CATEGORY` (`ID_CATEGORY`),
  CONSTRAINT `PRODUCTS_CATEGORIES_ibfk_1` FOREIGN KEY (`ID_PRODUCT`) REFERENCES `PRODUCTS` (`ID_PRODUCT`),
  CONSTRAINT `PRODUCTS_CATEGORIES_ibfk_2` FOREIGN KEY (`ID_CATEGORY`) REFERENCES `CATEGORIES` (`ID_CATEGORY`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUCTS_CATEGORIES`
--

LOCK TABLES `PRODUCTS_CATEGORIES` WRITE;
/*!40000 ALTER TABLE `PRODUCTS_CATEGORIES` DISABLE KEYS */;
INSERT INTO `PRODUCTS_CATEGORIES` VALUES (1,2,3);
/*!40000 ALTER TABLE `PRODUCTS_CATEGORIES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ROLES`
--

DROP TABLE IF EXISTS `ROLES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ROLES` (
  `ID_ROLE` int unsigned NOT NULL AUTO_INCREMENT,
  `ROLE_NAME` varchar(100) DEFAULT NULL,
  `DESCRIPTION` text,
  PRIMARY KEY (`ID_ROLE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROLES`
--

LOCK TABLES `ROLES` WRITE;
/*!40000 ALTER TABLE `ROLES` DISABLE KEYS */;
INSERT INTO `ROLES` VALUES (1,'site_owner','The owner of the Website has access for almost all modules'),(2,'inventory_chief','The owner of the Website has access for almost all modules'),(3,'point_of_sale','Access for POS module'),(4,'point_of_sale','Person who can add bills and modify open bills'),(5,'contability','Person who can view bills read-only for balance and taxes purposes');
/*!40000 ALTER TABLE `ROLES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STORES`
--

DROP TABLE IF EXISTS `STORES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STORES` (
  `ID_STORE` int unsigned NOT NULL AUTO_INCREMENT,
  `STORE_NAME` varchar(100) DEFAULT NULL,
  `NO_ID` varchar(50) DEFAULT NULL,
  `ADDRESS` varchar(100) DEFAULT NULL,
  `SOCIAL_NETWORKS` text,
  `PHONE` varchar(30) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT NULL,
  `URL` varchar(300) DEFAULT NULL,
  `MONGO_ID` varchar(24) DEFAULT NULL,
  `ID_USER` int unsigned DEFAULT NULL,
  `ACTIVO` int unsigned DEFAULT '0',
  PRIMARY KEY (`ID_STORE`),
  KEY `ID_USER` (`ID_USER`),
  CONSTRAINT `STORES_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `USERS` (`ID_USER`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STORES`
--

LOCK TABLES `STORES` WRITE;
/*!40000 ALTER TABLE `STORES` DISABLE KEYS */;
INSERT INTO `STORES` VALUES (1,'Gamer Stock',NULL,NULL,NULL,NULL,'2022-02-03 03:35:57','gamerstock.tiendapp.com',NULL,1,1),(2,'Super Market - Piendamó',NULL,NULL,NULL,NULL,'2022-02-03 03:36:26','supermarket.tiendapp.com',NULL,1,1),(3,'Licores la 7ma & Más Piendamó',NULL,NULL,NULL,NULL,'2022-03-07 02:59:32','https://regexr.com','6125aec10506fa59a674f56a',2,1),(6,'Allex Motos','1061543081',NULL,'{\'network\':\'facebook\'}','3117348662','2022-06-07 05:13:44','https://allex-motos.com','6125aec10506fa59a674f56a',1,1),(7,'Motolujos la 7ma','1061543081',NULL,'\n      {\n        \"facebook\" : http://facebook.com/ruben4181,\n        \"instagram\" : ruben4181\n      }\n    ','3117348662','2022-06-07 05:42:38',NULL,NULL,10,1),(8,'Allex Motos La 7ma','1061543081',NULL,'\n      {\n        \"facebook\" : ,\n        \"instagram\" : ruben4181\n      }\n    ','3117348662','2022-06-07 05:50:49',NULL,NULL,10,1),(9,'Mercatería','1231239',NULL,'\n      {\n        \"facebook\" : undefined,\n        \"instagram\" : ruben4181\n      }\n    ','3117348662','2022-06-07 05:58:21',NULL,NULL,10,1),(10,'Tienda de prueba','123456',NULL,'\n      {\n        \"facebook\" : undefined,\n        \"instagram\" : ruben4181\n      }\n    ','3117341212','2022-06-07 06:01:52',NULL,NULL,11,1),(11,'Tienda prueba 2','1061543081','B/El Rosario','\n      {\n        \"facebook\" : https://facebook.com/ruben4181,\n        \"instagram\" : ruben4181\n      }\n    ','3117348662','2022-06-07 06:14:27',NULL,NULL,11,1),(12,'Tienda prueba 3','1061543081','B/Sagrada Familia','\n      {\n        \"facebook\" : undefined,\n        \"instagram\" : undefined\n      }\n    ','3117348662','2022-06-07 06:24:59',NULL,NULL,11,1),(13,'Allex Motos & lujos la 7ma','1061543081','Calle 7#12-112','\n      {\n        \"facebook\" : undefined,\n        \"instagram\" : ruben4181\n      }\n    ','3117348662','2022-06-08 01:25:08',NULL,NULL,12,1);
/*!40000 ALTER TABLE `STORES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUPPLIERS`
--

DROP TABLE IF EXISTS `SUPPLIERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SUPPLIERS` (
  `ID_SUPPLIER` int unsigned NOT NULL AUTO_INCREMENT,
  `SUPPLIER_NAME` varchar(100) DEFAULT NULL,
  `SUPPLIER_ID` varchar(100) DEFAULT NULL,
  `SUPPLIER_ADDRESS` varchar(200) DEFAULT NULL,
  `SUPPLIER_PHONE` varchar(30) DEFAULT NULL,
  `SUPPLIER_EMAIL` varchar(100) DEFAULT NULL,
  `DESCRIPTION` varchar(500) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ID_STORE` int unsigned DEFAULT NULL,
  `ACTIVE` int DEFAULT '1',
  `UPDATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_SUPPLIER`),
  KEY `ID_STORE` (`ID_STORE`),
  CONSTRAINT `SUPPLIERS_ibfk_1` FOREIGN KEY (`ID_STORE`) REFERENCES `STORES` (`ID_STORE`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUPPLIERS`
--

LOCK TABLES `SUPPLIERS` WRITE;
/*!40000 ALTER TABLE `SUPPLIERS` DISABLE KEYS */;
INSERT INTO `SUPPLIERS` VALUES (1,'iShop3','1061543','iShop Address','3117348221','ishop.store@gmail.com',NULL,'2022-07-20 02:29:14',2,0,'2022-07-22 03:08:45'),(9,'LG','10752012','CL 7#12-112 SEGUNDO PISO COVATRANS','3117348662','test2@gmail.com',NULL,'2022-07-22 03:00:40',2,0,'2022-07-22 22:01:03'),(10,'HUAWEI STORE','1061543081','Calle luna - Calle sol','3117348662','test@gmail.com',NULL,'2022-07-22 03:01:28',2,1,'2022-07-22 03:08:45'),(11,'Exito','10752012','CL 7#12-112 al lado de quimpo','3117348662','test4@gmail.com',NULL,'2022-07-22 22:46:59',2,1,'2022-07-22 22:47:34'),(12,'Apple Inc',NULL,'Kra 122#12-131, Bogotá, Colombia','311832812','apple.inc@gmail.com',NULL,'2022-08-04 01:34:24',2,1,'2022-08-04 01:34:24'),(13,'Fabián Concha','123131123','Piendamó, Cauca','3008430123','fabian.concha@gmail.com',NULL,'2022-08-04 01:38:52',2,0,'2022-08-04 01:38:52'),(14,'Rubén Vargas','1061543081','Calle 7#12-112','','ruben4181@gmail.com',NULL,'2022-08-04 01:41:59',2,1,'2022-08-04 01:41:59'),(15,'Iván Botero Goméz','5500123',NULL,'3117348662','ibg.muebles@gmail.com',NULL,'2022-08-04 01:45:40',2,1,'2022-08-10 03:21:09'),(16,'Alkosto Ktronix','9876543','Calle luna, Calle sol','3008430423','alkosto.ktronix@gmail.com','Proveedor de electrodomesticos, computadores y demás','2022-08-04 01:59:43',2,1,'2022-08-10 03:10:38'),(17,'Ducardo Robeiro',NULL,'Piendamó, Cauca','3233041731','ducardo@gmail.com','Proveedor de arena para gatos, alimento y accesorios felinos','2022-08-04 23:25:08',2,1,'2022-08-04 23:25:08'),(18,'Santiago Guevara',NULL,NULL,'3008421231','santy.fresita@gmail.com','Peluquería, uñas, esmaltes, ropa y zapatos','2022-08-04 23:35:44',2,1,'2022-08-04 23:35:44'),(19,'Proveedor prueba','1231',NULL,NULL,NULL,NULL,'2022-08-10 03:30:44',2,0,'2022-08-10 03:30:44'),(20,'Proveedor prueba 3',NULL,NULL,NULL,NULL,NULL,'2022-08-10 03:31:22',2,0,'2022-08-10 03:31:22'),(21,'Prueba Crud','12312312',NULL,NULL,'prueba@gmail.com',NULL,'2022-08-11 01:38:31',2,1,'2022-08-11 01:39:01'),(22,'Joao Fenix',NULL,NULL,'3117348662',NULL,NULL,'2022-08-11 02:03:39',2,1,'2022-08-11 02:03:39'),(23,'Joao Mota',NULL,NULL,'3117348662','joao.email@gmail.com',NULL,'2022-08-11 02:05:57',2,1,'2022-08-11 02:15:41');
/*!40000 ALTER TABLE `SUPPLIERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS` (
  `ID_USER` int unsigned NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `PASSWORD` varchar(64) DEFAULT NULL,
  `CONF_EMAIL` tinyint(1) DEFAULT '0',
  `MONGO_ID` varchar(24) DEFAULT NULL,
  `IMG_SRC` varchar(500) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_USER`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (1,'ruben4181','ruben4181@gmail.com','49a60dc9b7bf67f40e34a899311fe3cd161753a9c3c6a80521e612e19db25eda',1,NULL,NULL,'2022-07-09 21:22:50'),(2,'r.vargas.test.4','r.vargas.test.4@gmail.com','11f80f6b1d5696654bf5ccf67a6192352a5e13f2c41194c2a0bff15d4dbfbbbb',1,NULL,NULL,'2022-07-09 21:22:50'),(4,'ducardorobeiro.cat.2','ducardorobeiro.cat.2.3@gmail.com','49a60dc9b7bf67f40e34a899311fe3cd161753a9c3c6a80521e612e19db25eda',0,'6125aec10506fa59a674f56a',NULL,'2022-07-09 21:22:50'),(5,'ruben4181.2','ruben4181.2@gmail.com','49a60dc9b7bf67f40e34a899311fe3cd161753a9c3c6a80521e612e19db25eda',0,'6125aec10506fa59a674f56a',NULL,'2022-07-09 21:22:50'),(6,'ruben4181.3','ruben4181.3@gmail.com','49a60dc9b7bf67f40e34a899311fe3cd161753a9c3c6a80521e612e19db25eda',0,'6125aec10506fa59a674f56a',NULL,'2022-07-09 21:22:50'),(7,'ruben4181.4','ruben4181.4@gmail.com','49a60dc9b7bf67f40e34a899311fe3cd161753a9c3c6a80521e612e19db25eda',0,'6125aec10506fa59a674f56a',NULL,'2022-07-09 21:22:50'),(8,'ruben','ruben@gmail.com','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',0,'6125aec10506fa59a674f56a',NULL,'2022-07-09 21:22:50'),(9,'ruben4181@','ruben4181.5@gmail.com','49a60dc9b7bf67f40e34a899311fe3cd161753a9c3c6a80521e612e19db25eda',0,'6125aec10506fa59a674f56a',NULL,'2022-07-09 21:22:50'),(10,'allex.motos','rafavar26@hotmail.com','b9fa09ffa08ca2bccafbfda9105d61f2e8417c0fb38b2696fece977b33299c2e',0,'6125aec10506fa59a674f56a',NULL,'2022-07-09 21:22:50'),(11,'test','test@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',0,'6125aec10506fa59a674f56a',NULL,'2022-07-09 21:22:50'),(12,'user_test','user_test@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',0,'6125aec10506fa59a674f56a',NULL,'2022-07-09 21:22:50');
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS_ROLES`
--

DROP TABLE IF EXISTS `USERS_ROLES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS_ROLES` (
  `ID_USER_ROLE` int unsigned NOT NULL AUTO_INCREMENT,
  `ID_USER` int unsigned DEFAULT NULL,
  `ID_ROLE` int unsigned DEFAULT NULL,
  `ID_STORE` int unsigned DEFAULT NULL,
  PRIMARY KEY (`ID_USER_ROLE`),
  KEY `ID_USER` (`ID_USER`),
  KEY `ID_ROLE` (`ID_ROLE`),
  KEY `ID_STORE` (`ID_STORE`),
  CONSTRAINT `USERS_ROLES_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `USERS` (`ID_USER`),
  CONSTRAINT `USERS_ROLES_ibfk_2` FOREIGN KEY (`ID_ROLE`) REFERENCES `ROLES` (`ID_ROLE`),
  CONSTRAINT `USERS_ROLES_ibfk_3` FOREIGN KEY (`ID_STORE`) REFERENCES `STORES` (`ID_STORE`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS_ROLES`
--

LOCK TABLES `USERS_ROLES` WRITE;
/*!40000 ALTER TABLE `USERS_ROLES` DISABLE KEYS */;
INSERT INTO `USERS_ROLES` VALUES (1,1,1,1),(2,2,2,1),(3,1,1,2),(4,2,2,3),(5,10,1,NULL),(6,10,1,1),(7,10,1,8),(8,10,1,9),(9,11,1,NULL),(10,11,1,10),(11,11,1,11),(12,11,1,12),(13,12,1,NULL),(14,12,1,13);
/*!40000 ALTER TABLE `USERS_ROLES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS_STORES`
--

DROP TABLE IF EXISTS `USERS_STORES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS_STORES` (
  `ID_USERS_STORES` int unsigned NOT NULL AUTO_INCREMENT,
  `ID_USER` int unsigned DEFAULT NULL,
  `ID_STORE` int unsigned DEFAULT NULL,
  `ID_PAR_USER_TYPE` int unsigned DEFAULT NULL,
  PRIMARY KEY (`ID_USERS_STORES`),
  KEY `ID_USER` (`ID_USER`),
  KEY `ID_STORE` (`ID_STORE`),
  KEY `ID_PAR_USER_TYPE` (`ID_PAR_USER_TYPE`),
  CONSTRAINT `USERS_STORES_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `USERS` (`ID_USER`),
  CONSTRAINT `USERS_STORES_ibfk_2` FOREIGN KEY (`ID_STORE`) REFERENCES `STORES` (`ID_STORE`),
  CONSTRAINT `USERS_STORES_ibfk_3` FOREIGN KEY (`ID_PAR_USER_TYPE`) REFERENCES `PAR_USER_TYPE` (`ID_PAR_USER_TYPE`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS_STORES`
--

LOCK TABLES `USERS_STORES` WRITE;
/*!40000 ALTER TABLE `USERS_STORES` DISABLE KEYS */;
INSERT INTO `USERS_STORES` VALUES (1,1,1,1),(2,1,2,1),(3,2,3,1),(4,10,8,1),(5,10,9,1),(6,11,10,1),(7,11,11,1),(8,11,12,1),(9,12,13,1);
/*!40000 ALTER TABLE `USERS_STORES` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-21 20:23:09

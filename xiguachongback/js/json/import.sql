-- MySQL dump 10.15  Distrib 10.0.20-MariaDB, for osx10.10 (x86_64)
--
-- Host: 120.26.120.14    Database: xiguachong
-- ------------------------------------------------------
-- Server version	5.6.21-log

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
-- Table structure for table `xgc_admin`
--

DROP TABLE IF EXISTS `xgc_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adm_name` varchar(255) NOT NULL,
  `adm_password` varchar(255) NOT NULL,
  `is_effect` tinyint(1) NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  `role_id` int(11) NOT NULL,
  `login_time` int(11) NOT NULL,
  `login_ip` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_adm_name` (`adm_name`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_admin`
--

LOCK TABLES `xgc_admin` WRITE;
/*!40000 ALTER TABLE `xgc_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_adv`
--

DROP TABLE IF EXISTS `xgc_adv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_adv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tmpl` varchar(255) NOT NULL,
  `adv_id` varchar(255) NOT NULL,
  `code` text NOT NULL,
  `is_effect` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rel_id` int(11) NOT NULL,
  `rel_table` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tmpl` (`tmpl`),
  KEY `adv_id` (`adv_id`),
  KEY `rel_id` (`rel_id`),
  KEY `rel_table` (`rel_table`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_adv`
--

LOCK TABLES `xgc_adv` WRITE;
/*!40000 ALTER TABLE `xgc_adv` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_adv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_deal`
--

DROP TABLE IF EXISTS `xgc_deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_deal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `name_match` text NOT NULL,
  `name_match_row` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `source_vedio` varchar(255) NOT NULL,
  `vedio` varchar(255) NOT NULL,
  `deal_days` int(11) NOT NULL,
  `begin_time` int(11) NOT NULL,
  `end_time` int(11) NOT NULL,
  `is_effect` tinyint(1) NOT NULL,
  `limit_price` double(20,4) NOT NULL COMMENT '启筹最低金额',
  `limit_count` int(11) NOT NULL COMMENT '启筹最低数量',
  `brief` text NOT NULL COMMENT '简介',
  `description` text NOT NULL COMMENT '描述',
  `comment_count` int(11) NOT NULL COMMENT '评论数量',
  `support_count` int(11) NOT NULL COMMENT '支持数量',
  `focus_count` int(11) NOT NULL COMMENT '关注喜欢数量',
  `view_count` int(11) NOT NULL COMMENT '浏览欢数量',
  `log_count` int(11) NOT NULL,
  `support_amount` double(20,4) NOT NULL,
  `pay_amount` double(20,4) NOT NULL,
  `delivery_fee_amount` double(20,4) NOT NULL,
  `create_time` int(11) NOT NULL,
  `seo_title` text NOT NULL,
  `seo_keyword` text NOT NULL,
  `seo_description` text NOT NULL,
  `tags` text NOT NULL,
  `tags_match` text NOT NULL,
  `tags_match_row` text NOT NULL,
  `success_time` int(11) NOT NULL,
  `is_success` tinyint(1) NOT NULL,
  `cate_id` int(11) NOT NULL,
  `province` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `is_recommend` tinyint(1) NOT NULL COMMENT '是否推荐',
  `is_classic` tinyint(1) NOT NULL COMMENT '是否经典',
  `is_delete` tinyint(1) NOT NULL COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `begin_time` (`begin_time`),
  KEY `end_time` (`end_time`),
  KEY `is_effect` (`is_effect`),
  KEY `limit_price` (`limit_price`),
  KEY `comment_count` (`comment_count`),
  KEY `support_count` (`support_count`),
  KEY `focus_count` (`focus_count`),
  KEY `view_count` (`view_count`),
  KEY `log_count` (`log_count`),
  KEY `support_amount` (`support_amount`),
  KEY `create_time` (`create_time`),
  KEY `is_success` (`is_success`),
  KEY `cate_id` (`cate_id`),
  KEY `sort` (`sort`),
  KEY `is_recommend` (`is_recommend`),
  KEY `is_classic` (`is_classic`),
  KEY `is_delete` (`is_delete`),
  FULLTEXT KEY `tags_match` (`tags_match`),
  FULLTEXT KEY `name_match` (`name_match`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_deal`
--

LOCK TABLES `xgc_deal` WRITE;
/*!40000 ALTER TABLE `xgc_deal` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_deal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_deal_cate`
--

DROP TABLE IF EXISTS `xgc_deal_cate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_deal_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_deal_cate`
--

LOCK TABLES `xgc_deal_cate` WRITE;
/*!40000 ALTER TABLE `xgc_deal_cate` DISABLE KEYS */;
INSERT INTO `xgc_deal_cate` VALUES (1,'演唱会',1),(2,'话剧',2),(4,'摄影',4),(6,'其他',6),(3,'杂技',3),(5,'脱口秀',5);
/*!40000 ALTER TABLE `xgc_deal_cate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_deal_comment`
--

DROP TABLE IF EXISTS `xgc_deal_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_deal_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `log_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `pid` int(11) NOT NULL,
  `deal_user_id` int(11) NOT NULL,
  `reply_user_id` int(11) NOT NULL,
  `deal_user_name` varchar(255) NOT NULL,
  `reply_user_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deal_id` (`deal_id`),
  KEY `user_id` (`user_id`),
  KEY `create_time` (`create_time`),
  KEY `log_id` (`log_id`),
  KEY `pid` (`pid`),
  KEY `deal_user_id` (`deal_user_id`),
  KEY `reply_user_id` (`reply_user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=176 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_deal_comment`
--

LOCK TABLES `xgc_deal_comment` WRITE;
/*!40000 ALTER TABLE `xgc_deal_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_deal_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_deal_focus_log`
--

DROP TABLE IF EXISTS `xgc_deal_focus_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_deal_focus_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deal_id` (`deal_id`),
  KEY `user_id` (`user_id`),
  KEY `create_time` (`create_time`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_deal_focus_log`
--

LOCK TABLES `xgc_deal_focus_log` WRITE;
/*!40000 ALTER TABLE `xgc_deal_focus_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_deal_focus_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_deal_item_image`
--

DROP TABLE IF EXISTS `xgc_deal_item_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_deal_item_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `deal_item_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deal_id` (`deal_id`),
  KEY `deal_item_id` (`deal_item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_deal_item_image`
--

LOCK TABLES `xgc_deal_item_image` WRITE;
/*!40000 ALTER TABLE `xgc_deal_item_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_deal_item_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_deal_order`
--

DROP TABLE IF EXISTS `xgc_deal_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_deal_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `deal_item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `pay_time` int(11) NOT NULL,
  `total_price` double(20,4) NOT NULL,
  `delivery_fee` double(20,4) NOT NULL,
  `deal_price` double(20,4) NOT NULL,
  `support_memo` text NOT NULL,
  `payment_id` int(11) NOT NULL,
  `bank_id` varchar(255) NOT NULL,
  `credit_pay` double(20,4) NOT NULL,
  `online_pay` double(20,4) NOT NULL,
  `deal_name` varchar(255) NOT NULL,
  `order_status` tinyint(1) NOT NULL,
  `create_time` int(11) NOT NULL,
  `consignee` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `is_success` tinyint(1) NOT NULL,
  `repay_time` int(11) NOT NULL,
  `repay_memo` text NOT NULL,
  `is_refund` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deal_id` (`deal_id`),
  KEY `deal_item_id` (`deal_item_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_deal_order`
--

LOCK TABLES `xgc_deal_order` WRITE;
/*!40000 ALTER TABLE `xgc_deal_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_deal_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_deal_pay_log`
--

DROP TABLE IF EXISTS `xgc_deal_pay_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_deal_pay_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `money` double(20,4) NOT NULL,
  `create_time` int(11) NOT NULL,
  `log_info` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deal_id` (`deal_id`),
  KEY `create_time` (`create_time`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_deal_pay_log`
--

LOCK TABLES `xgc_deal_pay_log` WRITE;
/*!40000 ALTER TABLE `xgc_deal_pay_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_deal_pay_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_deal_support_log`
--

DROP TABLE IF EXISTS `xgc_deal_support_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_deal_support_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `price` double(20,4) NOT NULL,
  `deal_item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deal_id` (`deal_id`),
  KEY `user_id` (`user_id`),
  KEY `create_time` (`create_time`),
  KEY `deal_item_id` (`deal_item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_deal_support_log`
--

LOCK TABLES `xgc_deal_support_log` WRITE;
/*!40000 ALTER TABLE `xgc_deal_support_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_deal_support_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_nav`
--

DROP TABLE IF EXISTS `xgc_nav`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `blank` tinyint(1) NOT NULL,
  `sort` int(11) NOT NULL,
  `is_effect` tinyint(1) NOT NULL,
  `u_module` varchar(255) NOT NULL,
  `u_action` varchar(255) NOT NULL,
  `u_id` int(11) NOT NULL,
  `u_param` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_nav`
--

LOCK TABLES `xgc_nav` WRITE;
/*!40000 ALTER TABLE `xgc_nav` DISABLE KEYS */;
INSERT INTO `xgc_nav` VALUES (1,'推荐','',0,1,1,'index','',0,''),(2,'排行','',0,3,1,'deals','index',0,'r=classic'),(3,'最近','',0,2,1,'deals','index',0,''),(4,'已完成','',0,4,1,'news','index',0,'');
/*!40000 ALTER TABLE `xgc_nav` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_payment`
--

DROP TABLE IF EXISTS `xgc_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) NOT NULL,
  `is_effect` tinyint(1) NOT NULL,
  `online_pay` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `total_amount` double(20,4) NOT NULL,
  `config` text NOT NULL,
  `logo` varchar(255) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_payment`
--

LOCK TABLES `xgc_payment` WRITE;
/*!40000 ALTER TABLE `xgc_payment` DISABLE KEYS */;
INSERT INTO `xgc_payment` VALUES (24,'AlipayBank',1,1,'支付宝银行直连支付','',0.0000,'a:4:{s:14:\"alipay_partner\";s:0:\"\";s:14:\"alipay_account\";s:0:\"\";s:10:\"alipay_key\";s:0:\"\";s:14:\"alipay_gateway\";a:17:{s:7:\"ICBCB2C\";s:1:\"1\";s:3:\"CMB\";s:1:\"1\";s:3:\"CCB\";s:1:\"1\";s:3:\"ABC\";s:1:\"1\";s:4:\"SPDB\";s:1:\"1\";s:3:\"SDB\";s:1:\"1\";s:3:\"CIB\";s:1:\"1\";s:6:\"BJBANK\";s:1:\"1\";s:7:\"CEBBANK\";s:1:\"1\";s:4:\"CMBC\";s:1:\"1\";s:5:\"CITIC\";s:1:\"1\";s:3:\"GDB\";s:1:\"1\";s:7:\"SPABANK\";s:1:\"1\";s:6:\"BOCB2C\";s:1:\"1\";s:4:\"COMM\";s:1:\"1\";s:7:\"ICBCBTB\";s:1:\"1\";s:10:\"PSBC-DEBIT\";s:1:\"1\";}}','',1);
/*!40000 ALTER TABLE `xgc_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_payment_notice`
--

DROP TABLE IF EXISTS `xgc_payment_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_payment_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notice_sn` varchar(255) NOT NULL,
  `create_time` int(11) NOT NULL,
  `pay_time` int(11) NOT NULL,
  `order_id` int(11) NOT NULL COMMENT 'order_id',
  `is_paid` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `bank_id` varchar(255) NOT NULL,
  `memo` text NOT NULL,
  `money` double(20,4) NOT NULL,
  `outer_notice_sn` varchar(255) NOT NULL,
  `deal_id` int(11) NOT NULL COMMENT '项目id',
  `deal_item_id` int(11) NOT NULL COMMENT '项目细项',
  `deal_name` varchar(255) NOT NULL COMMENT '项目名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `notice_sn_unk` (`notice_sn`),
  KEY `order_id` (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `payment_id` (`payment_id`),
  KEY `deal_id` (`deal_id`)
) ENGINE=MyISAM AUTO_INCREMENT=204 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_payment_notice`
--

LOCK TABLES `xgc_payment_notice` WRITE;
/*!40000 ALTER TABLE `xgc_payment_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_payment_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_region_conf`
--

DROP TABLE IF EXISTS `xgc_region_conf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_region_conf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL COMMENT '地区名称',
  `region_level` tinyint(4) NOT NULL COMMENT '1:国家 2:省 3:城市 4:县',
  `py` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3401 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_region_conf`
--

LOCK TABLES `xgc_region_conf` WRITE;
/*!40000 ALTER TABLE `xgc_region_conf` DISABLE KEYS */;
INSERT INTO `xgc_region_conf` VALUES (3,1,'安徽',2,'anhui'),(4,1,'福建',2,'fujian'),(5,1,'甘肃',2,'gansu'),(6,1,'广东',2,'guangdong'),(7,1,'广西',2,'guangxi'),(8,1,'贵州',2,'guizhou'),(9,1,'海南',2,'hainan'),(10,1,'河北',2,'hebei'),(11,1,'河南',2,'henan'),(12,1,'黑龙江',2,'heilongjiang'),(13,1,'湖北',2,'hubei'),(14,1,'湖南',2,'hunan'),(15,1,'吉林',2,'jilin'),(16,1,'江苏',2,'jiangsu'),(17,1,'江西',2,'jiangxi'),(18,1,'辽宁',2,'liaoning'),(19,1,'内蒙古',2,'neimenggu'),(20,1,'宁夏',2,'ningxia'),(21,1,'青海',2,'qinghai'),(22,1,'山东',2,'shandong'),(23,1,'山西',2,'shanxi'),(24,1,'陕西',2,'shanxi'),(26,1,'四川',2,'sichuan'),(28,1,'西藏',2,'xicang'),(29,1,'新疆',2,'xinjiang'),(30,1,'云南',2,'yunnan'),(31,1,'浙江',2,'zhejiang'),(36,3,'安庆',3,'anqing'),(37,3,'蚌埠',3,'bangbu'),(38,3,'巢湖',3,'chaohu'),(39,3,'池州',3,'chizhou'),(40,3,'滁州',3,'chuzhou'),(41,3,'阜阳',3,'fuyang'),(42,3,'淮北',3,'huaibei'),(43,3,'淮南',3,'huainan'),(44,3,'黄山',3,'huangshan'),(45,3,'六安',3,'liuan'),(46,3,'马鞍山',3,'maanshan'),(47,3,'宿州',3,'suzhou'),(48,3,'铜陵',3,'tongling'),(49,3,'芜湖',3,'wuhu'),(50,3,'宣城',3,'xuancheng'),(51,3,'亳州',3,'zhou'),(52,2,'北京',2,'beijing'),(53,4,'福州',3,'fuzhou'),(54,4,'龙岩',3,'longyan'),(55,4,'南平',3,'nanping'),(56,4,'宁德',3,'ningde'),(57,4,'莆田',3,'putian'),(58,4,'泉州',3,'quanzhou'),(59,4,'三明',3,'sanming'),(60,4,'厦门',3,'xiamen'),(61,4,'漳州',3,'zhangzhou'),(62,5,'兰州',3,'lanzhou'),(63,5,'白银',3,'baiyin'),(64,5,'定西',3,'dingxi'),(65,5,'甘南',3,'gannan'),(66,5,'嘉峪关',3,'jiayuguan'),(67,5,'金昌',3,'jinchang'),(68,5,'酒泉',3,'jiuquan'),(69,5,'临夏',3,'linxia'),(70,5,'陇南',3,'longnan'),(71,5,'平凉',3,'pingliang'),(72,5,'庆阳',3,'qingyang'),(73,5,'天水',3,'tianshui'),(74,5,'武威',3,'wuwei'),(75,5,'张掖',3,'zhangye'),(76,6,'广州',3,'guangzhou'),(77,6,'深圳',3,'shen'),(78,6,'潮州',3,'chaozhou'),(79,6,'东莞',3,'dong'),(80,6,'佛山',3,'foshan'),(81,6,'河源',3,'heyuan'),(82,6,'惠州',3,'huizhou'),(83,6,'江门',3,'jiangmen'),(84,6,'揭阳',3,'jieyang'),(85,6,'茂名',3,'maoming'),(86,6,'梅州',3,'meizhou'),(87,6,'清远',3,'qingyuan'),(88,6,'汕头',3,'shantou'),(89,6,'汕尾',3,'shanwei'),(90,6,'韶关',3,'shaoguan'),(91,6,'阳江',3,'yangjiang'),(92,6,'云浮',3,'yunfu'),(93,6,'湛江',3,'zhanjiang'),(94,6,'肇庆',3,'zhaoqing'),(95,6,'中山',3,'zhongshan'),(96,6,'珠海',3,'zhuhai'),(97,7,'南宁',3,'nanning'),(98,7,'桂林',3,'guilin'),(99,7,'百色',3,'baise'),(100,7,'北海',3,'beihai'),(101,7,'崇左',3,'chongzuo'),(102,7,'防城港',3,'fangchenggang'),(103,7,'贵港',3,'guigang'),(104,7,'河池',3,'hechi'),(105,7,'贺州',3,'hezhou'),(106,7,'来宾',3,'laibin'),(107,7,'柳州',3,'liuzhou'),(108,7,'钦州',3,'qinzhou'),(109,7,'梧州',3,'wuzhou'),(110,7,'玉林',3,'yulin'),(111,8,'贵阳',3,'guiyang'),(112,8,'安顺',3,'anshun'),(113,8,'毕节',3,'bijie'),(114,8,'六盘水',3,'liupanshui'),(115,8,'黔东南',3,'qiandongnan'),(116,8,'黔南',3,'qiannan'),(117,8,'黔西南',3,'qianxinan'),(118,8,'铜仁',3,'tongren'),(119,8,'遵义',3,'zunyi'),(120,9,'海口',3,'haikou'),(121,9,'三亚',3,'sanya'),(122,9,'白沙',3,'baisha'),(123,9,'保亭',3,'baoting'),(124,9,'昌江',3,'changjiang'),(125,9,'澄迈县',3,'chengmaixian'),(126,9,'定安县',3,'dinganxian'),(127,9,'东方',3,'dongfang'),(128,9,'乐东',3,'ledong'),(129,9,'临高县',3,'lingaoxian'),(130,9,'陵水',3,'lingshui'),(131,9,'琼海',3,'qionghai'),(132,9,'琼中',3,'qiongzhong'),(133,9,'屯昌县',3,'tunchangxian'),(134,9,'万宁',3,'wanning'),(135,9,'文昌',3,'wenchang'),(136,9,'五指山',3,'wuzhishan'),(137,9,'儋州',3,'zhou'),(138,10,'石家庄',3,'shijiazhuang'),(139,10,'保定',3,'baoding'),(140,10,'沧州',3,'cangzhou'),(141,10,'承德',3,'chengde'),(142,10,'邯郸',3,'handan'),(143,10,'衡水',3,'hengshui'),(144,10,'廊坊',3,'langfang'),(145,10,'秦皇岛',3,'qinhuangdao'),(146,10,'唐山',3,'tangshan'),(147,10,'邢台',3,'xingtai'),(148,10,'张家口',3,'zhangjiakou'),(149,11,'郑州',3,'zhengzhou'),(150,11,'洛阳',3,'luoyang'),(151,11,'开封',3,'kaifeng'),(152,11,'安阳',3,'anyang'),(153,11,'鹤壁',3,'hebi'),(154,11,'济源',3,'jiyuan'),(155,11,'焦作',3,'jiaozuo'),(156,11,'南阳',3,'nanyang'),(157,11,'平顶山',3,'pingdingshan'),(158,11,'三门峡',3,'sanmenxia'),(159,11,'商丘',3,'shangqiu'),(160,11,'新乡',3,'xinxiang'),(161,11,'信阳',3,'xinyang'),(162,11,'许昌',3,'xuchang'),(163,11,'周口',3,'zhoukou'),(164,11,'驻马店',3,'zhumadian'),(165,11,'漯河',3,'he'),(166,11,'濮阳',3,'yang'),(167,12,'哈尔滨',3,'haerbin'),(168,12,'大庆',3,'daqing'),(169,12,'大兴安岭',3,'daxinganling'),(170,12,'鹤岗',3,'hegang'),(171,12,'黑河',3,'heihe'),(172,12,'鸡西',3,'jixi'),(173,12,'佳木斯',3,'jiamusi'),(174,12,'牡丹江',3,'mudanjiang'),(175,12,'七台河',3,'qitaihe'),(176,12,'齐齐哈尔',3,'qiqihaer'),(177,12,'双鸭山',3,'shuangyashan'),(178,12,'绥化',3,'suihua'),(179,12,'伊春',3,'yichun'),(180,13,'武汉',3,'wuhan'),(181,13,'仙桃',3,'xiantao'),(182,13,'鄂州',3,'ezhou'),(183,13,'黄冈',3,'huanggang'),(184,13,'黄石',3,'huangshi'),(185,13,'荆门',3,'jingmen'),(186,13,'荆州',3,'jingzhou'),(187,13,'潜江',3,'qianjiang'),(188,13,'神农架林区',3,'shennongjialinqu'),(189,13,'十堰',3,'shiyan'),(190,13,'随州',3,'suizhou'),(191,13,'天门',3,'tianmen'),(192,13,'咸宁',3,'xianning'),(193,13,'襄樊',3,'xiangfan'),(194,13,'孝感',3,'xiaogan'),(195,13,'宜昌',3,'yichang'),(196,13,'恩施',3,'enshi'),(197,14,'长沙',3,'changsha'),(198,14,'张家界',3,'zhangjiajie'),(199,14,'常德',3,'changde'),(200,14,'郴州',3,'chenzhou'),(201,14,'衡阳',3,'hengyang'),(202,14,'怀化',3,'huaihua'),(203,14,'娄底',3,'loudi'),(204,14,'邵阳',3,'shaoyang'),(205,14,'湘潭',3,'xiangtan'),(206,14,'湘西',3,'xiangxi'),(207,14,'益阳',3,'yiyang'),(208,14,'永州',3,'yongzhou'),(209,14,'岳阳',3,'yueyang'),(210,14,'株洲',3,'zhuzhou'),(211,15,'长春',3,'changchun'),(212,15,'吉林',3,'jilin'),(213,15,'白城',3,'baicheng'),(214,15,'白山',3,'baishan'),(215,15,'辽源',3,'liaoyuan'),(216,15,'四平',3,'siping'),(217,15,'松原',3,'songyuan'),(218,15,'通化',3,'tonghua'),(219,15,'延边',3,'yanbian'),(220,16,'南京',3,'nanjing'),(221,16,'苏州',3,'suzhou'),(222,16,'无锡',3,'wuxi'),(223,16,'常州',3,'changzhou'),(224,16,'淮安',3,'huaian'),(225,16,'连云港',3,'lianyungang'),(226,16,'南通',3,'nantong'),(227,16,'宿迁',3,'suqian'),(228,16,'泰州',3,'taizhou'),(229,16,'徐州',3,'xuzhou'),(230,16,'盐城',3,'yancheng'),(231,16,'扬州',3,'yangzhou'),(232,16,'镇江',3,'zhenjiang'),(233,17,'南昌',3,'nanchang'),(234,17,'抚州',3,'fuzhou'),(235,17,'赣州',3,'ganzhou'),(236,17,'吉安',3,'jian'),(237,17,'景德镇',3,'jingdezhen'),(238,17,'九江',3,'jiujiang'),(239,17,'萍乡',3,'pingxiang'),(240,17,'上饶',3,'shangrao'),(241,17,'新余',3,'xinyu'),(242,17,'宜春',3,'yichun'),(243,17,'鹰潭',3,'yingtan'),(244,18,'沈阳',3,'shenyang'),(245,18,'大连',3,'dalian'),(246,18,'鞍山',3,'anshan'),(247,18,'本溪',3,'benxi'),(248,18,'朝阳',3,'chaoyang'),(249,18,'丹东',3,'dandong'),(250,18,'抚顺',3,'fushun'),(251,18,'阜新',3,'fuxin'),(252,18,'葫芦岛',3,'huludao'),(253,18,'锦州',3,'jinzhou'),(254,18,'辽阳',3,'liaoyang'),(255,18,'盘锦',3,'panjin'),(256,18,'铁岭',3,'tieling'),(257,18,'营口',3,'yingkou'),(258,19,'呼和浩特',3,'huhehaote'),(259,19,'阿拉善盟',3,'alashanmeng'),(260,19,'巴彦淖尔盟',3,'bayannaoermeng'),(261,19,'包头',3,'baotou'),(262,19,'赤峰',3,'chifeng'),(263,19,'鄂尔多斯',3,'eerduosi'),(264,19,'呼伦贝尔',3,'hulunbeier'),(265,19,'通辽',3,'tongliao'),(266,19,'乌海',3,'wuhai'),(267,19,'乌兰察布市',3,'wulanchabushi'),(268,19,'锡林郭勒盟',3,'xilinguolemeng'),(269,19,'兴安盟',3,'xinganmeng'),(270,20,'银川',3,'yinchuan'),(271,20,'固原',3,'guyuan'),(272,20,'石嘴山',3,'shizuishan'),(273,20,'吴忠',3,'wuzhong'),(274,20,'中卫',3,'zhongwei'),(275,21,'西宁',3,'xining'),(276,21,'果洛',3,'guoluo'),(277,21,'海北',3,'haibei'),(278,21,'海东',3,'haidong'),(279,21,'海南',3,'hainan'),(280,21,'海西',3,'haixi'),(281,21,'黄南',3,'huangnan'),(282,21,'玉树',3,'yushu'),(283,22,'济南',3,'jinan'),(284,22,'青岛',3,'qingdao'),(285,22,'滨州',3,'binzhou'),(286,22,'德州',3,'dezhou'),(287,22,'东营',3,'dongying'),(288,22,'菏泽',3,'heze'),(289,22,'济宁',3,'jining'),(290,22,'莱芜',3,'laiwu'),(291,22,'聊城',3,'liaocheng'),(292,22,'临沂',3,'linyi'),(293,22,'日照',3,'rizhao'),(294,22,'泰安',3,'taian'),(295,22,'威海',3,'weihai'),(296,22,'潍坊',3,'weifang'),(297,22,'烟台',3,'yantai'),(298,22,'枣庄',3,'zaozhuang'),(299,22,'淄博',3,'zibo'),(300,23,'太原',3,'taiyuan'),(301,23,'长治',3,'changzhi'),(302,23,'大同',3,'datong'),(303,23,'晋城',3,'jincheng'),(304,23,'晋中',3,'jinzhong'),(305,23,'临汾',3,'linfen'),(306,23,'吕梁',3,'lvliang'),(307,23,'朔州',3,'shuozhou'),(308,23,'忻州',3,'xinzhou'),(309,23,'阳泉',3,'yangquan'),(310,23,'运城',3,'yuncheng'),(311,24,'西安',3,'xian'),(312,24,'安康',3,'ankang'),(313,24,'宝鸡',3,'baoji'),(314,24,'汉中',3,'hanzhong'),(315,24,'商洛',3,'shangluo'),(316,24,'铜川',3,'tongchuan'),(317,24,'渭南',3,'weinan'),(318,24,'咸阳',3,'xianyang'),(319,24,'延安',3,'yanan'),(320,24,'榆林',3,'yulin'),(321,25,'上海',2,'shanghai'),(322,26,'成都',3,'chengdu'),(323,26,'绵阳',3,'mianyang'),(324,26,'阿坝',3,'aba'),(325,26,'巴中',3,'bazhong'),(326,26,'达州',3,'dazhou'),(327,26,'德阳',3,'deyang'),(328,26,'甘孜',3,'ganzi'),(329,26,'广安',3,'guangan'),(330,26,'广元',3,'guangyuan'),(331,26,'乐山',3,'leshan'),(332,26,'凉山',3,'liangshan'),(333,26,'眉山',3,'meishan'),(334,26,'南充',3,'nanchong'),(335,26,'内江',3,'neijiang'),(336,26,'攀枝花',3,'panzhihua'),(337,26,'遂宁',3,'suining'),(338,26,'雅安',3,'yaan'),(339,26,'宜宾',3,'yibin'),(340,26,'资阳',3,'ziyang'),(341,26,'自贡',3,'zigong'),(342,26,'泸州',3,'zhou'),(343,27,'天津',2,'tianjin'),(344,28,'拉萨',3,'lasa'),(345,28,'阿里',3,'ali'),(346,28,'昌都',3,'changdu'),(347,28,'林芝',3,'linzhi'),(348,28,'那曲',3,'naqu'),(349,28,'日喀则',3,'rikaze'),(350,28,'山南',3,'shannan'),(351,29,'乌鲁木齐',3,'wulumuqi'),(352,29,'阿克苏',3,'akesu'),(353,29,'阿拉尔',3,'alaer'),(354,29,'巴音郭楞',3,'bayinguoleng'),(355,29,'博尔塔拉',3,'boertala'),(356,29,'昌吉',3,'changji'),(357,29,'哈密',3,'hami'),(358,29,'和田',3,'hetian'),(359,29,'喀什',3,'kashi'),(360,29,'克拉玛依',3,'kelamayi'),(361,29,'克孜勒苏',3,'kezilesu'),(362,29,'石河子',3,'shihezi'),(363,29,'图木舒克',3,'tumushuke'),(364,29,'吐鲁番',3,'tulufan'),(365,29,'五家渠',3,'wujiaqu'),(366,29,'伊犁',3,'yili'),(367,30,'昆明',3,'kunming'),(368,30,'怒江',3,'nujiang'),(369,30,'普洱',3,'puer'),(370,30,'丽江',3,'lijiang'),(371,30,'保山',3,'baoshan'),(372,30,'楚雄',3,'chuxiong'),(373,30,'大理',3,'dali'),(374,30,'德宏',3,'dehong'),(375,30,'迪庆',3,'diqing'),(376,30,'红河',3,'honghe'),(377,30,'临沧',3,'lincang'),(378,30,'曲靖',3,'qujing'),(379,30,'文山',3,'wenshan'),(380,30,'西双版纳',3,'xishuangbanna'),(381,30,'玉溪',3,'yuxi'),(382,30,'昭通',3,'zhaotong'),(383,31,'杭州',3,'hangzhou'),(384,31,'湖州',3,'huzhou'),(385,31,'嘉兴',3,'jiaxing'),(386,31,'金华',3,'jinhua'),(387,31,'丽水',3,'lishui'),(388,31,'宁波',3,'ningbo'),(389,31,'绍兴',3,'shaoxing'),(390,31,'台州',3,'taizhou'),(391,31,'温州',3,'wenzhou'),(392,31,'舟山',3,'zhoushan'),(393,31,'衢州',3,'zhou'),(394,32,'重庆',2,'zhongqing'),(395,33,'香港',2,'xianggang'),(396,34,'澳门',2,'aomen'),(397,35,'台湾',2,'taiwan'),(500,52,'东城区',3,'dongchengqu'),(501,52,'西城区',3,'xichengqu'),(502,52,'海淀区',3,'haidianqu'),(503,52,'朝阳区',3,'chaoyangqu'),(504,52,'崇文区',3,'chongwenqu'),(505,52,'宣武区',3,'xuanwuqu'),(506,52,'丰台区',3,'fengtaiqu'),(507,52,'石景山区',3,'shijingshanqu'),(508,52,'房山区',3,'fangshanqu'),(509,52,'门头沟区',3,'mentougouqu'),(510,52,'通州区',3,'tongzhouqu'),(511,52,'顺义区',3,'shunyiqu'),(512,52,'昌平区',3,'changpingqu'),(513,52,'怀柔区',3,'huairouqu'),(514,52,'平谷区',3,'pingguqu'),(515,52,'大兴区',3,'daxingqu'),(516,52,'密云县',3,'miyunxian'),(517,52,'延庆县',3,'yanqingxian'),(2703,321,'长宁区',3,'changningqu'),(2704,321,'闸北区',3,'zhabeiqu'),(2705,321,'闵行区',3,'xingqu'),(2706,321,'徐汇区',3,'xuhuiqu'),(2707,321,'浦东新区',3,'pudongxinqu'),(2708,321,'杨浦区',3,'yangpuqu'),(2709,321,'普陀区',3,'putuoqu'),(2710,321,'静安区',3,'jinganqu'),(2711,321,'卢湾区',3,'luwanqu'),(2712,321,'虹口区',3,'hongkouqu'),(2713,321,'黄浦区',3,'huangpuqu'),(2714,321,'南汇区',3,'nanhuiqu'),(2715,321,'松江区',3,'songjiangqu'),(2716,321,'嘉定区',3,'jiadingqu'),(2717,321,'宝山区',3,'baoshanqu'),(2718,321,'青浦区',3,'qingpuqu'),(2719,321,'金山区',3,'jinshanqu'),(2720,321,'奉贤区',3,'fengxianqu'),(2721,321,'崇明县',3,'chongmingxian'),(2912,343,'和平区',3,'hepingqu'),(2913,343,'河西区',3,'hexiqu'),(2914,343,'南开区',3,'nankaiqu'),(2915,343,'河北区',3,'hebeiqu'),(2916,343,'河东区',3,'hedongqu'),(2917,343,'红桥区',3,'hongqiaoqu'),(2918,343,'东丽区',3,'dongliqu'),(2919,343,'津南区',3,'jinnanqu'),(2920,343,'西青区',3,'xiqingqu'),(2921,343,'北辰区',3,'beichenqu'),(2922,343,'塘沽区',3,'tangguqu'),(2923,343,'汉沽区',3,'hanguqu'),(2924,343,'大港区',3,'dagangqu'),(2925,343,'武清区',3,'wuqingqu'),(2926,343,'宝坻区',3,'baoqu'),(2927,343,'经济开发区',3,'jingjikaifaqu'),(2928,343,'宁河县',3,'ninghexian'),(2929,343,'静海县',3,'jinghaixian'),(2930,343,'蓟县',3,'jixian'),(3325,394,'合川区',3,'hechuanqu'),(3326,394,'江津区',3,'jiangjinqu'),(3327,394,'南川区',3,'nanchuanqu'),(3328,394,'永川区',3,'yongchuanqu'),(3329,394,'南岸区',3,'nananqu'),(3330,394,'渝北区',3,'yubeiqu'),(3331,394,'万盛区',3,'wanshengqu'),(3332,394,'大渡口区',3,'dadukouqu'),(3333,394,'万州区',3,'wanzhouqu'),(3334,394,'北碚区',3,'beiqu'),(3335,394,'沙坪坝区',3,'shapingbaqu'),(3336,394,'巴南区',3,'bananqu'),(3337,394,'涪陵区',3,'fulingqu'),(3338,394,'江北区',3,'jiangbeiqu'),(3339,394,'九龙坡区',3,'jiulongpoqu'),(3340,394,'渝中区',3,'yuzhongqu'),(3341,394,'黔江开发区',3,'qianjiangkaifaqu'),(3342,394,'长寿区',3,'changshouqu'),(3343,394,'双桥区',3,'shuangqiaoqu'),(3344,394,'綦江县',3,'jiangxian'),(3345,394,'潼南县',3,'nanxian'),(3346,394,'铜梁县',3,'tongliangxian'),(3347,394,'大足县',3,'dazuxian'),(3348,394,'荣昌县',3,'rongchangxian'),(3349,394,'璧山县',3,'shanxian'),(3350,394,'垫江县',3,'dianjiangxian'),(3351,394,'武隆县',3,'wulongxian'),(3352,394,'丰都县',3,'fengduxian'),(3353,394,'城口县',3,'chengkouxian'),(3354,394,'梁平县',3,'liangpingxian'),(3355,394,'开县',3,'kaixian'),(3356,394,'巫溪县',3,'wuxixian'),(3357,394,'巫山县',3,'wushanxian'),(3358,394,'奉节县',3,'fengjiexian'),(3359,394,'云阳县',3,'yunyangxian'),(3360,394,'忠县',3,'zhongxian'),(3361,394,'石柱',3,'shizhu'),(3362,394,'彭水',3,'pengshui'),(3363,394,'酉阳',3,'youyang'),(3364,394,'秀山',3,'xiushan'),(3365,395,'沙田区',3,'shatianqu'),(3366,395,'东区',3,'dongqu'),(3367,395,'观塘区',3,'guantangqu'),(3368,395,'黄大仙区',3,'huangdaxianqu'),(3369,395,'九龙城区',3,'jiulongchengqu'),(3370,395,'屯门区',3,'tunmenqu'),(3371,395,'葵青区',3,'kuiqingqu'),(3372,395,'元朗区',3,'yuanlangqu'),(3373,395,'深水埗区',3,'shenshui'),(3374,395,'西贡区',3,'xigongqu'),(3375,395,'大埔区',3,'dapuqu'),(3376,395,'湾仔区',3,'wanziqu'),(3377,395,'油尖旺区',3,'youjianwangqu'),(3378,395,'北区',3,'beiqu'),(3379,395,'南区',3,'nanqu'),(3380,395,'荃湾区',3,'wanqu'),(3381,395,'中西区',3,'zhongxiqu'),(3382,395,'离岛区',3,'lidaoqu'),(3383,396,'澳门',3,'aomen'),(3384,397,'台北',3,'taibei'),(3385,397,'高雄',3,'gaoxiong'),(3386,397,'基隆',3,'jilong'),(3387,397,'台中',3,'taizhong'),(3388,397,'台南',3,'tainan'),(3389,397,'新竹',3,'xinzhu'),(3390,397,'嘉义',3,'jiayi'),(3391,397,'宜兰县',3,'yilanxian'),(3392,397,'桃园县',3,'taoyuanxian'),(3393,397,'苗栗县',3,'miaolixian'),(3394,397,'彰化县',3,'zhanghuaxian'),(3395,397,'南投县',3,'nantouxian'),(3396,397,'云林县',3,'yunlinxian'),(3397,397,'屏东县',3,'pingdongxian'),(3398,397,'台东县',3,'taidongxian'),(3399,397,'花莲县',3,'hualianxian'),(3400,397,'澎湖县',3,'penghuxian');
/*!40000 ALTER TABLE `xgc_region_conf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_role`
--

DROP TABLE IF EXISTS `xgc_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_effect` tinyint(1) NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_role`
--

LOCK TABLES `xgc_role` WRITE;
/*!40000 ALTER TABLE `xgc_role` DISABLE KEYS */;
INSERT INTO `xgc_role` VALUES (4,'测试管理员',1,0);
/*!40000 ALTER TABLE `xgc_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_role_module`
--

DROP TABLE IF EXISTS `xgc_role_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_role_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_effect` tinyint(1) NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_role_module`
--

LOCK TABLES `xgc_role_module` WRITE;
/*!40000 ALTER TABLE `xgc_role_module` DISABLE KEYS */;
INSERT INTO `xgc_role_module` VALUES (5,'Role','权限组别',1,0),(6,'Admin','管理员',1,0),(12,'Conf','系统配置',1,0),(13,'Database','数据库',1,0),(15,'Log','系统日志',1,0),(19,'File','文件管理',1,0),(58,'Index','首页',1,0),(36,'Nav','导航菜单',1,0),(47,'MailServer','邮件服务器',1,0),(48,'Sms','短信接口',1,0),(53,'Adv','广告模块',1,0),(56,'DealMsgList','业务群发队列',1,0),(92,'Cache','缓存处理',1,0),(113,'User','会员管理',1,0),(114,'MsgTemplate','消息模板管理',1,0),(115,'Integrate','会员整合',1,0),(116,'ApiLogin','同步登录',1,0),(117,'DealCate','项目分类',1,0),(118,'Deal','项目管理',1,0),(119,'Payment','支付接口',1,0),(120,'IndexImage','轮播广告图',1,0),(121,'Help','站点帮助',1,0),(122,'Faq','常见问题',1,0),(123,'DealOrder','项目支持',1,0),(124,'DealComment','项目点评',1,0),(125,'PaymentNotice','付款记录',1,0),(126,'UserRefund','用户提现',1,0);
/*!40000 ALTER TABLE `xgc_role_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_user`
--

DROP TABLE IF EXISTS `xgc_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_pwd` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  `is_effect` tinyint(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `money` double(20,4) NOT NULL,
  `login_time` int(11) NOT NULL,
  `login_ip` varchar(50) NOT NULL,
  `province` varchar(10) NOT NULL,
  `city` varchar(10) NOT NULL,
  `password_verify` varchar(255) NOT NULL,
  `sex` tinyint(1) NOT NULL,
  `build_count` int(11) NOT NULL,
  `support_count` int(11) NOT NULL,
  `focus_count` int(11) NOT NULL,
  `integrate_id` int(11) NOT NULL,
  `intro` text NOT NULL,
  `ex_real_name` varchar(255) NOT NULL,
  `ex_account_info` text NOT NULL,
  `ex_contact` text NOT NULL,
  `code` varchar(255) NOT NULL,
  `sina_id` varchar(255) NOT NULL,
  `sina_token` varchar(255) NOT NULL,
  `sina_secret` varchar(255) NOT NULL,
  `sina_url` varchar(255) NOT NULL,
  `wx_appid` varchar(255) NOT NULL,
  `wx_token` varchar(255) NOT NULL,
  `wx_secret` varchar(255) NOT NULL,
  `wx_url` varchar(255) NOT NULL,
  `tencent_id` varchar(255) NOT NULL,
  `tencent_token` varchar(255) NOT NULL,
  `tencent_secret` varchar(255) NOT NULL,
  `tencent_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  KEY `is_effect` (`is_effect`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_user`
--

LOCK TABLES `xgc_user` WRITE;
/*!40000 ALTER TABLE `xgc_user` DISABLE KEYS */;
INSERT INTO `xgc_user` VALUES (18,'xgc','6714ccb93be0fda4e51f206b91b46358','',1352229180,1352229180,1,'lee@jszhaomi.com',980.0000,1352246617,'127.0.0.1','北京','东城区','',1,0,3,1,0,'爱旅行的猫，生活在路上','','','','','','','','','','','','','','','','');
/*!40000 ALTER TABLE `xgc_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_user_consignee`
--

DROP TABLE IF EXISTS `xgc_user_consignee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_user_consignee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `province` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `consignee` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_user_consignee`
--

LOCK TABLES `xgc_user_consignee` WRITE;
/*!40000 ALTER TABLE `xgc_user_consignee` DISABLE KEYS */;
INSERT INTO `xgc_user_consignee` VALUES (18,18,'江苏','南京','江苏南京雨花台区大数据产业园','13333333333','35000','西瓜虫');
/*!40000 ALTER TABLE `xgc_user_consignee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_user_message`
--

DROP TABLE IF EXISTS `xgc_user_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_user_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` int(11) NOT NULL,
  `message` text NOT NULL,
  `user_id` int(11) NOT NULL COMMENT '???????????ID',
  `dest_user_id` int(11) NOT NULL COMMENT '????????ID??????user_id??????????ID????????????????ID??',
  `send_user_id` int(11) NOT NULL COMMENT '??????ID',
  `receive_user_id` int(11) NOT NULL COMMENT '?????ID',
  `user_name` varchar(255) NOT NULL,
  `dest_user_name` varchar(255) NOT NULL,
  `send_user_name` varchar(255) NOT NULL,
  `receive_user_name` varchar(255) NOT NULL,
  `message_type` enum('inbox','outbox') NOT NULL COMMENT '?????inbox(???) outbox(????)',
  `is_read` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_user_message`
--

LOCK TABLES `xgc_user_message` WRITE;
/*!40000 ALTER TABLE `xgc_user_message` DISABLE KEYS */;
INSERT INTO `xgc_user_message` VALUES (47,1352230383,'感谢支持',18,19,18,19,'fzmatthew','test','fzmatthew','test','outbox',1);
/*!40000 ALTER TABLE `xgc_user_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xgc_user_refund`
--

DROP TABLE IF EXISTS `xgc_user_refund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xgc_user_refund` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `money` double(20,4) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `reply` text NOT NULL,
  `is_pay` tinyint(1) NOT NULL,
  `pay_time` int(11) NOT NULL,
  `memo` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xgc_user_refund`
--

LOCK TABLES `xgc_user_refund` WRITE;
/*!40000 ALTER TABLE `xgc_user_refund` DISABLE KEYS */;
/*!40000 ALTER TABLE `xgc_user_refund` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-13  8:59:07

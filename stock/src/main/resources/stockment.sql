/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : localhost:3306
 Source Schema         : stockment

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 19/07/2021 23:30:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details` (
  `order_no` varchar(20) NOT NULL,
  `details_no` varchar(20) NOT NULL,
  `descr` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `amounts` int(10) DEFAULT NULL,
  `location_id` varchar(20) DEFAULT NULL,
  `details_name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `stock_amount` int(10) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  PRIMARY KEY (`details_no`,`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of order_details
-- ----------------------------
BEGIN;
INSERT INTO `order_details` VALUES ('RK200108008', '36', '测试毛胚', 30, 'XLH006374', '毛胚', 30, '2021-07-08 22:05:55');
INSERT INTO `order_details` VALUES ('RK200108008', '37', '测试毛胚', 10, 'XLH006374', '毛胚', 0, '2021-07-08 22:05:59');
INSERT INTO `order_details` VALUES ('RK200108009', '38', '测试毛胚', 20, 'XLH006374', '毛胚', 0, '2021-07-08 22:06:03');
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_no` varchar(20) NOT NULL,
  `add_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
INSERT INTO `orders` VALUES ('RK200108008', '2021-07-07 21:51:39');
INSERT INTO `orders` VALUES ('RK200108009', '2021-07-08 21:52:17');
COMMIT;

-- ----------------------------
-- Table structure for overlayer
-- ----------------------------
DROP TABLE IF EXISTS `overlayer`;
CREATE TABLE `overlayer` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(1) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of overlayer
-- ----------------------------
BEGIN;
INSERT INTO `overlayer` VALUES (180, 1, '', '31.380076267814996', '121.590015442508', 'p0');
INSERT INTO `overlayer` VALUES (181, 1, '', '31.17267594523995', '121.83722911885394', 'p0');
INSERT INTO `overlayer` VALUES (182, 1, '', '31.075731702674194', '121.90391931991469', 'p0');
INSERT INTO `overlayer` VALUES (183, 1, '', '30.895427381730208', '121.9855573246615', 'p0');
INSERT INTO `overlayer` VALUES (184, 1, '', '30.851785713531918', '121.89587050254529', 'p0');
INSERT INTO `overlayer` VALUES (185, 1, '', '30.851785713531918', '121.78203722832089', 'p0');
INSERT INTO `overlayer` VALUES (186, 1, '', '30.84087216083269', '121.63025952935502', 'p0');
INSERT INTO `overlayer` VALUES (187, 1, '', '30.81209405826989', '121.52447507250001', 'p0');
INSERT INTO `overlayer` VALUES (188, 1, '', '30.743587015632244', '121.39109467037848', 'p0');
INSERT INTO `overlayer` VALUES (189, 1, '', '30.697888292772493', '121.33475294879267', 'p0');
INSERT INTO `overlayer` VALUES (190, 1, '', '30.699875648606493', '121.28646004457624', 'p0');
INSERT INTO `overlayer` VALUES (191, 1, '', '30.961843166437657', '121.18527491193234', 'p0');
INSERT INTO `overlayer` VALUES (192, 1, '', '31.223086924690275', '121.19562339140728', 'p0');
INSERT INTO `overlayer` VALUES (193, 1, '', '31.363303859181215', '121.23701730930706', 'p0');
INSERT INTO `overlayer` VALUES (194, 1, '', '31.32382744602453', '120.72074316661254', 'p1');
INSERT INTO `overlayer` VALUES (195, 1, '', '31.26952007384822', '120.92771275611146', 'p1');
INSERT INTO `overlayer` VALUES (196, 1, '', '31.217157629288508', '121.18412508087957', 'p1');
INSERT INTO `overlayer` VALUES (197, 1, '', '30.97670598743739', '121.17952575666848', 'p1');
INSERT INTO `overlayer` VALUES (198, 1, '', '30.803161151877575', '121.24276646457092', 'p1');
INSERT INTO `overlayer` VALUES (199, 1, '', '30.694907181515376', '121.28990953773457', 'p1');
INSERT INTO `overlayer` VALUES (200, 1, '', '30.599462544083174', '121.11858471087157', 'p1');
INSERT INTO `overlayer` VALUES (201, 1, '', '30.576581476946913', '121.03464704401924', 'p1');
INSERT INTO `overlayer` VALUES (202, 1, '', '30.63625976644065', '120.77018590188172', 'p1');
INSERT INTO `overlayer` VALUES (203, 1, '', '30.97472441299339', '120.54021969132737', 'p1');
INSERT INTO `overlayer` VALUES (204, 1, '', '31.223086924690275', '120.63335600660189', 'p1');
INSERT INTO `overlayer` VALUES (205, 1, '', '31.530891772956146', '121.14848031824364', 'p2');
INSERT INTO `overlayer` VALUES (206, 1, '', '31.557480801115855', '121.23816714035983', 'p2');
INSERT INTO `overlayer` VALUES (207, 1, '', '31.542710063128215', '121.25541460615142', 'p2');
INSERT INTO `overlayer` VALUES (208, 1, '', '31.5456643996065', '121.28301055141793', 'p2');
INSERT INTO `overlayer` VALUES (209, 1, '', '31.507250661174407', '121.30025801720952', 'p2');
INSERT INTO `overlayer` VALUES (210, 1, '', '31.488530497420324', '121.28186072036516', 'p2');
INSERT INTO `overlayer` VALUES (211, 1, '', '31.451078818658964', '121.29220919984012', 'p2');
INSERT INTO `overlayer` VALUES (212, 1, '', '31.43826292907961', '121.23011832299044', 'p2');
INSERT INTO `overlayer` VALUES (213, 1, '', '31.41657046856305', '121.1990728845656', 'p2');
INSERT INTO `overlayer` VALUES (214, 1, '', '31.45502181314652', '121.1703271082463', 'p2');
INSERT INTO `overlayer` VALUES (215, 1, '', '31.478676259622535', '121.16802744614075', 'p2');
INSERT INTO `overlayer` VALUES (216, 1, '', '31.512176390956018', '121.14503082508533', 'p2');
INSERT INTO `overlayer` VALUES (217, 1, '', '31.529906847251524', '121.141581331927', 'p2');
INSERT INTO `overlayer` VALUES (218, 2, '主城区<br>211号', '31.09651388819154', '121.53597338302772', 'circle');
INSERT INTO `overlayer` VALUES (219, 2, '协同区<br>111号', '30.887494026065852', '120.90701579716156', 'circle');
INSERT INTO `overlayer` VALUES (220, 2, '功能区<br>002号', '31.50232466924642', '121.21862001246272', 'circle');
INSERT INTO `overlayer` VALUES (221, 2, '111<br>22', '31.158832893108684', '120.85067407557575', 'circle');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

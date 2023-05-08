create database db_movie;

use db_movie;

CREATE TABLE `phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `sap_chieu` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `heThongRap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tai_khoan` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `so_dt` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `loai_nguoi_dung` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`loai_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cumRap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `ma_he_thong_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `cumRap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `heThongRap` (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rapPhim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) DEFAULT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  CONSTRAINT `rapPhim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `cumRap` (`ma_cum_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `banner_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





CREATE TABLE `ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(255) DEFAULT NULL,
  `loai_ghe` varchar(255) DEFAULT NULL,
  `ma_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `rapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `lichChieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int NOT NULL,
  `ma_phim` int NOT NULL,
  `ngay_gio_chieu` datetime DEFAULT NULL,
  `gia_ve` int DEFAULT NULL,
  `ma_ghe` int NOT NULL,
  PRIMARY KEY (`ma_lich_chieu`,`ma_rap`,`ma_phim`,`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  KEY `ma_phim` (`ma_phim`),
  KEY `ma_ghe` (`ma_ghe`),
  CONSTRAINT `lichChieu_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `rapPhim` (`ma_rap`),
  CONSTRAINT `lichChieu_ibfk_2` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`),
  CONSTRAINT `lichChieu_ibfk_3` FOREIGN KEY (`ma_ghe`) REFERENCES `ghe` (`ma_ghe`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `datVe` (
  `id` int NOT NULL,
  `ma_lich_chieu` int NOT NULL,
  `ma_ghe` int DEFAULT NULL,
  PRIMARY KEY (`id`,`ma_lich_chieu`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  CONSTRAINT `datVe_ibfk_1` FOREIGN KEY (`id`) REFERENCES `nguoiDung` (`id`),
  CONSTRAINT `datVe_ibfk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `lichChieu` (`ma_lich_chieu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `loaiNguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loai_nguoi_dung` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`loai_nguoi_dung`),
  CONSTRAINT `loaiNguoiDung_ibfk_1` FOREIGN KEY (`id`, `loai_nguoi_dung`) REFERENCES `nguoiDung` (`id`, `loai_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(1, 'wednesday123231231323', 'https://youtu.be/Q73UhUTs6y0', 'https://movienew.cybersoft.edu.vn/hinhanh/wednesday_gp01.jpg', 'phim truyền hình nhiều tập Netflix', '2023-01-04', 9, 1, 1, 1);
INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(2, 'nonoo', 'https://youtu.re://movienew.cybersoft.e', 'du.vn/hinharnh/wednesday_gp01.jpg', 'phim truyền hình 23 tập 323r2', '2023-11-07', 3, 1, 1, 1);
INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(3, 'captain', 'https://youtu.be/Q73rưeUhUTs6y0', 'https://movienew.cybersoft.edu.vn/hinhanh/wednesday_gp01.jpg', '32 truyền hình nhiều tập Netflix', '2023-09-04', 4, 1, 1, 1);
INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(4, 'mua tuyet', 'https://youtu.be/Q73UhUTs6y0', 'https://movienew.cybersoft.edu.vn/hinhanh/wednesday_gp01.jpg', 'hay', '2004-01-22', 7, 1, 1, 1),
(5, 'monnalissa', 'https://youtu.be/Q73UhUTs6y0', 'https://movienew.cybersoft.edu.vn/hinhanh/wednesday_gp01.jpg', 'hay', '2004-01-22', 7, 1, 1, 1),
(6, 'ame', 'https://youtu.be/Q73ưeUhUTs6y0', 'https://movrersoft.edu.vn/hinhanh/wednesday_gp01.jpg', 'phim truyền hình nhiều tập Netflix', '2023-01-04', 9, 1, 1, 1),
(7, 'mono02', 'https://youtu.be/Q73UhUTs6y0', 'https://movienew.cybersoft.edu.vn/hinhanh/wednesday_gp01.jpg', 'hay', '2013-01-22', 9, 1, 1, 1),
(8, 'khoi123', 'https://youtu.be/Q73UhUTs6y0', 'https://movienew.cybersoft.edu.vn/hinhanh/wednesday_gp01.jpg', 'hay', '2012-01-22', 9, 1, 1, 1);

INSERT INTO `heThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'CGV', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyIx2BvelZS3_czAYAp-CrQM9S_OLveXBaQ&usqp=CAU');
INSERT INTO `heThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(2, 'VINCOM', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fbaodautu.vnro-khach');
INSERT INTO `heThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(3, 'BIG C', 'https://www.google.com/imgres/bigc');
INSERT INTO `heThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(4, 'LOTTE', 'https://www.google.com/imgres/lotte'),
(5, 'GALAXY', 'https://www.google.com/imgres/galaxy');

INSERT INTO `nguoiDung` (`id`, `tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(1, 'quan1', 'quan123', 'quan1@gmail.com', '1234', 'abc', 'khachHang');
INSERT INTO `nguoiDung` (`id`, `tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(2, 'quan2', 'quan234', 'quan2@gmail.com', '1234', 'ee', 'quanTri');
INSERT INTO `nguoiDung` (`id`, `tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(3, 'quan3', 'quan456', 'quannguyen@gmail.com', '1234', 'e2', 'khachHang');
INSERT INTO `nguoiDung` (`id`, `tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(4, 'quan4', 'quanW', 'quan4@gmail.com', '1234', 'fff', 'quanTri');

INSERT INTO `banner` (`ma_banner`, `hinh_anh`, `ma_phim`) VALUES
(1, 'Ghế https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png', 5);
INSERT INTO `banner` (`ma_banner`, `hinh_anh`, `ma_phim`) VALUES
(2, 'https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h.png', 4);
INSERT INTO `banner` (`ma_banner`, `hinh_anh`, `ma_phim`) VALUES
(3, 'https://movienew.cybersoft.edu.vn/hinhanh/cuoc-chien-sinh-tu.png', 3);
INSERT INTO `banner` (`ma_banner`, `hinh_anh`, `ma_phim`) VALUES
(4, 'https://movienew.cybersoft.edu.vn/hinhanh/cuoc-minh-tu.png', 2),
(5, 'https://movienew.cybersoft.edu.vn/hinhanh/nnana.png', 1);

INSERT INTO `cumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'rạp 01', '11 Lê lợi gò vấp', 5);
INSERT INTO `cumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(2, 'rạp 02', '12 lý thường kiệt gò vấp', 4);
INSERT INTO `cumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(3, 'rạp 03', '13 bạch đằng tân bình', 3);
INSERT INTO `cumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(4, 'rạp 04', '50 lê lai phú nhuận', 2),
(5, 'rạp 05', '120 dương quảng hàm bình thạnh', 1);



INSERT INTO `rapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'rạp 01', 5);
INSERT INTO `rapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(2, 'rạp 02', 4);
INSERT INTO `rapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(3, 'rạp 03', 3);
INSERT INTO `rapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(4, 'rạp 04', 2),
(5, 'rạp 05', 1);

INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(1, 'Ghế C', 'Ghé Vip', 5);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(2, 'Ghế A', 'Ghé Thường', 4);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(3, 'Ghế A', 'Ghé Đôi', 3);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(4, 'Ghế B', 'Ghé Đơn', 2),
(5, 'Ghế B', 'Ghé Vip', 1),
(11, 'Ghế C', 'Ghé Vip', 5),
(12, 'Ghế A', 'Ghé Thường', 4),
(13, 'Ghế A', 'Ghé Đôi', 3),
(14, 'Ghế B', 'Ghé Đơn', 2),
(15, 'Ghế B', 'Ghé Vip', 1);

INSERT INTO `lichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`, `ma_ghe`) VALUES
(1, 1, 1, '2023-01-01 00:00:00', 55000, 1);
INSERT INTO `lichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`, `ma_ghe`) VALUES
(2, 2, 1, '2022-07-04 18:51:53', 50000, 12);
INSERT INTO `lichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`, `ma_ghe`) VALUES
(3, 4, 4, '2012-05-04 18:51:53', 85000, 14);
INSERT INTO `lichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`, `ma_ghe`) VALUES
(4, 2, 5, '2021-02-04 18:22:53', 30000, 11),
(5, 1, 1, '2018-06-04 18:44:53', 75000, 13),
(6, 5, 2, '2022-01-04 18:11:53', 50000, 15),
(7, 4, 2, '2023-02-22 00:00:00', 541262, 1),
(8, 4, 2, '2023-02-22 00:00:00', 541262, 1),
(9, 4, 2, '2023-02-22 00:00:00', 541262, 1),
(10, 4, 2, '2023-02-22 00:00:00', 541262, 1);

INSERT INTO `datVe` (`id`, `ma_lich_chieu`, `ma_ghe`) VALUES
(1, 4, 4);
INSERT INTO `datVe` (`id`, `ma_lich_chieu`, `ma_ghe`) VALUES
(2, 3, 1);
INSERT INTO `datVe` (`id`, `ma_lich_chieu`, `ma_ghe`) VALUES
(3, 2, 5);
INSERT INTO `datVe` (`id`, `ma_lich_chieu`, `ma_ghe`) VALUES
(4, 7, 1);




INSERT INTO `loaiNguoiDung` (`id`, `loai_nguoi_dung`) VALUES
(1, 'khachHang');
INSERT INTO `loaiNguoiDung` (`id`, `loai_nguoi_dung`) VALUES
(2, 'quanTri');










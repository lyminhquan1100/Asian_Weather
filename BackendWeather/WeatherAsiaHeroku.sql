DROP DATABASE IF EXISTS heroku_02daea0b415b4cd;
CREATE DATABASE IF NOT EXISTS heroku_02daea0b415b4cd;
USE heroku_02daea0b415b4cd;

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User`
(
	FacebookID 		VARCHAR(100) NOT NULL PRIMARY KEY,
    `Name`			NVARCHAR(100),
    `Email`			VARCHAR(100) ,
    `Address` 		NVARCHAR(255),
    createDate 		DATETIME DEFAULT NOW()
);

DROP TABLE IF EXISTS `Admin`;
CREATE TABLE IF NOT EXISTS `Admin`
(
	ID              INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	Email 			VARCHAR(100) NOT NULL UNIQUE KEY,
    `Password`		VARCHAR(255)
);

DROP TABLE IF EXISTS Role;
CREATE TABLE IF NOT EXISTS Role
(
	ID              INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`Name`          VARCHAR(255)
);

DROP Table IF EXISTS Role_User;
CREATE TABLE IF NOT EXISTS Role_User
(
	ID              INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	role_id 		INT,
    user_id         INT,
    FOREIGN KEY (role_id) REFERENCES Role(ID),
	FOREIGN KEY (user_id) REFERENCES `Admin`(ID)
);


DROP TABLE IF EXISTS `Country`;
CREATE TABLE IF NOT EXISTS `Country`
(
	ID				INT AUTO_INCREMENT PRIMARY KEY,
    CountryName		NVARCHAR(255) NOT NULL,
    CapitalName		NVARCHAR(255) NOT NULL,
    FlagImage		VARCHAR(800),
    `Description`	VARCHAR(100),
    LabelName		VARCHAR(255) NOT NULL
    
);

DROP TABLE IF EXISTS `City`;
CREATE TABLE IF NOT EXISTS	`City`
(
	ID				INT AUTO_INCREMENT PRIMARY KEY,
    CityName		NVARCHAR(255) NOT NULL,
    CountryID		INT NOT NULL,
    `Description`	VARCHAR(100),
    LabelName		VARCHAR(255) NOT NULL,
	FOREIGN KEY (CountryID)  REFERENCES Country(ID)
);

DROP TABLE IF EXISTS `FavouriteCity`;
CREATE TABLE IF NOT EXISTS `FavouriteCity`
(
	FacebookID	VARCHAR(100) NOT NULL,
    CityID		INT NOT NULL,
    PRIMARY KEY(FacebookID,CityID),
    FOREIGN KEY (FacebookID) REFERENCES `User`(FacebookID) ,
	FOREIGN KEY (CityID) REFERENCES `City`(ID)
);

DROP TABLE IF EXISTS IPPublic;
CREATE TABLE IPPublic(
	IpPublic	varchar(20) primary key
);

DROP TABLE IF EXISTS CountTotalViews;
CREATE TABLE IF NOT EXISTS CountTotalViews(
	Id  		TINYINT PRIMARY KEY,
	ViewsTotal  INT 
);


/* ============================================INSERT DATA===============================================*/
INSERT INTO `Admin`
VALUES 	(1,"nchinh407@gmail.com",			"$2y$12$p.P6ZRf3fvZegl0SBqT83OrHhr3TqK.dhzwYdNJet2WJ3ZvfgU2te"),
		(2,"khanhdinh141@gmail.com",		"$2y$12$p.P6ZRf3fvZegl0SBqT83OrHhr3TqK.dhzwYdNJet2WJ3ZvfgU2te"),
        (3,"khuatbatien2000@gmail.com",		"$2y$12$p.P6ZRf3fvZegl0SBqT83OrHhr3TqK.dhzwYdNJet2WJ3ZvfgU2te");
        
INSERT INTO Role
VALUES (1,"ROLE_USER"),
		(2,"ROLE_ADMIN");
        
INSERT INTO Role_User
VALUES (1,  2, 1),
		(2, 2, 2),
        (3, 2, 3);
        
        /*
INSERT `Admin`
VALUES ("admin",sha2("@dmin123456",256));

SELECT * FROM `Admin` WHERE `Password` = sha2("@dmin123456",256);
SELECT * FROM `Admin`;
*/

INSERT INTO 
		`Country`( CountryName,		CapitalName,		FlagImage,			LabelName)
VALUES 	
		("Vi???t Nam","H?? N???i","https://product.hstatic.net/200000122283/product/c-e1-bb-9d-vi-e1-bb-87t-nam_2c0683597d2d419fac401f51ccbae779_grande.jpg","Viet Nam"),	
        ("Brunei","Bandar Seri Begawan","https://ar.thpanorama.com/img/images_2/bandera-de-bruni-historia-y-significado.png","Brunei"),
        ("Campuchia","Phnom Penh","https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/235px-Flag_of_Cambodia.svg.png","Campuchia"),
		("Laos","Vientiane","https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/225px-Flag_of_Laos.svg.png","Laos"),
		("Indonesia","Jakarta","https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/225px-Flag_of_Indonesia.svg.png","Indonesia"),
		("Malaysia","Kuala Lumpur","https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/1200px-Flag_of_Malaysia.svg.png","Malaysia"),
		("Myanmar","Yangon","https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/225px-Flag_of_Myanmar.svg.png","Myanmar"),
		("Philipines","Manila","https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/300px-Flag_of_the_Philippines.svg.png","Philipines"),
		("Th??i Lan","BangKok","https://sites.google.com/site/inmaycotoquoc/_/rsrc/1510655830040/tin-tuc/y-nghia-hinh-anh-tren-co-to-quoc-cua-cac-nuoc-dhong-nam-a/th%C3%A1i%20lan.png?height=266&width=400","Thailand"),
		("Singapore","Singapore","http://congtyxuatkhaulaodongsingapore.com/wp-content/uploads/2018/08/co-singapore-e1533113108841.jpg","Singapore"),
		("????ng Timor","Dili","https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Flag_of_East_Timor.svg/300px-Flag_of_East_Timor.svg.png","Dong Timor");

    
INSERT INTO 
	`City`	(ID, CityName, CountryID, LabelName)
VALUES		
			(1,"H?? N???i", 4, "Ha Noi"),
			(2,"H???i Ph??ng", 4, "Hai Phong"),
			(3,"H??? Ch?? Minh", 4, "Ho Chi Minh City"),
            (4,"H???i An", 4, "Hoi An"),
            (5,"???? N???ng", 4, "Da Nang"),
            (6,"B???c Giang", 4, "Bac Giang"),
            (7,"H??a B??nh", 4, "Hoa Binh"),
            (8,"S??n La", 4, "Son La"),
            (9,"??i???n Bi??n", 4, "Dien Bien"),
            (10,"Lai Ch??u", 4, "Lai Chau"),
            (11,"L??o Cai", 4, "Lao Cai"),
            (12,"Y??n B??i", 4, "Yen Bai"),
            (13,"Ph?? Th???", 4, "Phu Tho"),
            (14,"H?? Giang", 4, "Ha Giang"),
            (15,"Tuy??n Quang", 4, "Tuyen Quang"),
            (16,"Cao B???ng", 4, "Cao Bang"),
            (17,"B???c K???n", 4, "Bac Kan"),
            (18,"Th??i Nguy??n", 4, "Thai Nguyen"),
            (19,"L???ng S??n", 4, "Lang Son"),
            (20,"Qu???ng Ninh", 4, "Quang Ninh"),
            (21,"B???c Ninh",4, "Bac Ninh"),
            (22,"H?? Nam", 4, "Ha Nam"),
            (23,"H???i D????ng", 4, "Hai Duong"),
            (24,"H??ng Y??n", 4, "Hung Yen"),
            (25,"Nam ?????nh", 4, "Nam Dinh"),
            (26,"Th??i B??nh", 4, "Thai Binh"),
            (27,"V??nh Ph??c", 4, "Vinh Phuc"),
            (28,"Ninh B??nh", 4, "Ninh Binh"),
            (29,"Thanh H??a", 4, "Thanh Hoa"),
            (30,"Ngh??? An", 4, "Nghe An"),
            (31,"H?? T??nh", 4, "Ha Tinh"),
            (32,"Qu???ng B??nh", 4, "Ap Binh Quang"),
            (33,"Qu???ng Tr???", 4, "Quang Tri"),
            (34,"Qu???ng Nam", 4, "Quang Nam"),
            (35,"Qu???ng Ng??i", 4, "Quang Ngai"),
            (36,"B??nh ?????nh", 4, "Binh Dinh"),
            (37,"Ph?? Y??n", 4, "Phu Yen"),
            (38,"Kh??nh H??a", 4, "Khanh Hoa"),
            (39,"Ninh Thu???n", 4, "Ninh Thuan"),
            (40,"B??nh Thu???n", 4, "Ap Binh Thuan"),
            (41,"Kon Tum", 4, "Kon Tum"),
            (42,"Gia Lai", 4, "Gia Lai"),
            -- (43,"?????k L???k", 4, "Lak, Vietnam"),
            (44,"?????k N??ng", 4, "Buon Bubo Dak Nong"),
            (45,"L??m ?????ng", 4, "Dong Lam"),
			(46,"B?? R???a V??ng T??u", 4, "Ba Ria"),
            (47,"B??nh D????ng", 4, "Binh Duong"),
            (48,"B??nh Ph?????c", 4, "Binh Phuoc"),
            (49,"?????ng Nai", 4, "Dong Nai"),
            (50,"T??y Ninh", 4, "Tay Ninh"),
            (51,"An Giang", 4, "An Giang"),
            (52,"B???c Li??u", 4, "Bac Lieu"),
            (53,"B???n Tre", 4, "Ben Tre"),
            (54,"C?? Mau", 4, "Ca Mau"),
            (55,"C???n Th??", 4, "Can Tho"),
            (56,"?????ng Th??p", 4, "Dong Thap"),
           --  (57,"H???u Giang", 4, "Hau Giang"),ha giang
            (58,"Nam Giang", 4, "Nam Giang"),
            (59,"Long An", 4, "Long An"),
            (60,"S??c Tr??ng", 4, "Soc Trang"),
            -- (61,"Ti???n Giang", 4, "Tien Tien"),
            (62,"Tr?? Vinh", 4, "Tra Vinh"),
            (63,"V??nh Long", 4, "Vinh Long"),
            (64,"Bandar Seri Begawan", 14, "Bandar Seri Begawan"),
           --  (65,"Seria",14,"Seria"),
            (66,"Temburong",14,"Temburong"),
            -- (67,"Panaga",14,"Panaga"),
            (68,"Tutong",14,"Tutong"),
            (69,"Kuala Belait",14,"Kuala Belait"),
            (70,"Phnum Penh",24,"Phnom Penh"),
            (71,"Siem Reap",24,"Siem Reap"),
            (72,"Battambang",24,"Battambang"),
            (73,"Sihanoukville",24,"Sihanoukville"),
            (74,"Kampot",24,"Kampot"),
            (75,"Vientiane",34,"Vientiane"),
            (76,"Pakxe",34,"Pakxe"),
            (77,"Xam Nua",34,"Xam Nua"),
            (78,"Phonsavan",34,"Ban Phonsavan"),
            (79,"Thakhek",34,"Thakhek"),
            (80,"Jakarta",44,"Jakarta"),
            (81,"Surabaya",44,"Surabaya"),
            (82,"Bandung",44,"Bandung"),
            (83,"Manado",44,"Manado"),
            (84,"Padang",44,"Padang"),
            (85,"Medan",44,"Medan"),
            (86,"Kuala Lumpur",54,"Kuala Lumpur"),
            (87,"Kajang",54,"Kajang"),
            (88,"Klang",54,"Klang"),
			(89,"Kampung Subang",54,"Kampung Subang"),
            (90,"Petaling Jaya",54,"Petaling Jaya"),
            (91,"Kuantan",54,"Kuantan"),
            -- (92,"NayPyiTaw",64,"NayPyiTaw"),
            (93,"Yangon",64,"Yangon"),
            (94,"Mandalay",64,"Mandalay"),
           --  (95,"Bagan",64,"Bagan"),
            (96,"Mrauk-Oo",64,"Mrauk-Oo"),
            (97,"Pathein",64,"Pathein"),
            (98,"Manila",74,"Manila"),
            (99,"Quezon",74,"Quezon"),
            (100,"Caloocan",74,"Caloocan"),
            (101,"Davao",74,"Davao"),
            (102,"Cebu",74,"Cebu"),
            (103,"Zamboanga",74,"Zamboanga"),
            (104,"BangKok",84,"Bangkok"),
            (105,"Nonthaburi",84,"Nonthaburi"),
            (106,"Chiang Mai",84,"Chiang Mai"),
            (107,"Udon Thani",84,"Udon Thani"),
            (108,"Khon Kaen",84,"Khon Kaen"),
            (109,"Phitsanulok",84,"Phitsanulok"),
            (110,"Singapore",94,"Singapore"),
            (111,"Jurong Town",94,"Jurong Town"),
            (112,"Choa Chu Kang",94,"Choa Chu Kang"),
            (113,"Yishun",94,"Yishun"),
           --  (114,"Pungol",94,"Pungol"),
            (115,"Tampines",94,"Tampines");

INSERT INTO CountTotalViews 
Values (1,0);        



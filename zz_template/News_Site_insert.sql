USE `News_Site` ;

-- thứ tự insert
-- category
-- subcategory
-- user_permission
-- users
-- post
-- comment
-- post_image
-- subscriber
-- writer

-- ==================== insert ====================

-- category


-- subcategory


-- user_permission
INSERT INTO `news_site`.`user_permission` (`id`, `key`, `id_delete`) VALUES ('1', 'admin', '0');
INSERT INTO `news_site`.`user_permission` (`id`, `key`, `id_delete`) VALUES ('2', 'editor', '0');
INSERT INTO `news_site`.`user_permission` (`id`, `key`, `id_delete`) VALUES ('3', 'writer', '0');
INSERT INTO `news_site`.`user_permission` (`id`, `key`, `id_delete`) VALUES ('4', 'subscriber', '0');

-- users: password: 1
INSERT INTO `users` VALUES (1,'admin','$2b$12$KILzFYOdatGmDd8cb42LJeJSlWwXEGHVdVTimsrie/MIat2T2HwES','Admin',1,'2019-06-02 19:27:34','admin@a.c','1996-01-01',0);
INSERT INTO `users` VALUES (2,'editor','$2b$12$SbmsQObQRwrSkbrOpYEvMeFf1v8tT/CzDm3KJBN6QHyMDJg2lv7ne','Editor',2,'2019-06-02 20:26:17','editor@e.c','1996-01-01',0);
INSERT INTO `users` VALUES (3,'writer','$2b$12$78EMWzBwhDCks83CiAxEVu.IJTHvxLqYcKNIDMauebU4kIJ9RpI4q','Writer',3,'2019-06-02 20:29:41','writer@w.c','1996-01-01',0);
INSERT INTO `users` VALUES (4,'subscriber','$2b$12$oKFourMHnF8n5WkA1pakoe04avRlHkYS0H.CgNW7yVavqvA76pt4i','Subscriber',4,'2019-06-02 20:33:57','subscriber@s.c','1996-01-01',0);

-- post


-- comment


-- post_image


-- subscriber
INSERT INTO `subscriber` VALUES (1,'2019-06-09 21:40:36',4);

-- writer



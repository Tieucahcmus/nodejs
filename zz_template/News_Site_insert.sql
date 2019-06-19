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
-- tag 
-- post_tag
-- ==================== insert ====================

-- category
INSERT INTO `news_site`.`category` ( `name`, `slug_name`) VALUES ('Esports', 'esports');
INSERT INTO `news_site`.`category` ( `name`, `slug_name`) VALUES ('Game Online','game-online');
INSERT INTO `news_site`.`category` ( `name`, `slug_name`) VALUES ('Manga/Film','manga-film');
INSERT INTO `news_site`.`category` ( `name`, `slug_name`) VALUES ('PC/Conslole','pc-conslole');
-- INSERT INTO `news_site`.`category` ( `name`, `slug_name`) VALUES ('Khám Phá','Khám Phá');
-- INSERT INTO `news_site`.`category` ( `name`, `slug_name`) VALUES ('Mobile','mobile');


-- subcategory
INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('Liên Minh Huyền Thoại', 'lien-minh-huyen-thoai', '1');
INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('DOTA 2', 'dota-2', '1');

INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('FIFA Online 4', 'fifa-online-4', '2');
INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('PUBG', 'pubg', '2');

INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('Naruto', 'naruto', '3');
INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('One Piece', 'one-piece', '3');
INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('Marvel', 'marvel', '3');
INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('Dragon Ball', 'dragon-ball', '3');

INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('Gaming Gear', 'gaming-gear', '4');
INSERT INTO `news_site`.`subcategory` (`name`, `slug_name`, `id_category`) VALUES ('Đồ Chơi Số', 'do-choi-so', '4');

-- user_permission
INSERT INTO `news_site`.`user_permission` (`id`, `key`, `id_delete`) VALUES ('1', 'admin', '0');
INSERT INTO `news_site`.`user_permission` (`id`, `key`, `id_delete`) VALUES ('2', 'editor', '0');
INSERT INTO `news_site`.`user_permission` (`id`, `key`, `id_delete`) VALUES ('3', 'writer', '0');
INSERT INTO `news_site`.`user_permission` (`id`, `key`, `id_delete`) VALUES ('4', 'subscriber', '0');

-- users: password: 1
INSERT INTO `news_site`.`users` VALUES (1,'admin','$2b$12$KILzFYOdatGmDd8cb42LJeJSlWwXEGHVdVTimsrie/MIat2T2HwES','Admin',1,'2019-06-02 19:27:34','admin@a.c','1996-01-01',0);
INSERT INTO `news_site`.`users` VALUES (2,'editor','$2b$12$SbmsQObQRwrSkbrOpYEvMeFf1v8tT/CzDm3KJBN6QHyMDJg2lv7ne','Editor',2,'2019-06-02 20:26:17','editor@e.c','1996-01-01',0);
INSERT INTO `news_site`.`users` VALUES (3,'writer','$2b$12$78EMWzBwhDCks83CiAxEVu.IJTHvxLqYcKNIDMauebU4kIJ9RpI4q','Writer',3,'2019-06-02 20:29:41','writer@w.c','1996-01-01',0);
INSERT INTO `news_site`.`users` VALUES (4,'subscriber','$2b$12$oKFourMHnF8n5WkA1pakoe04avRlHkYS0H.CgNW7yVavqvA76pt4i','Subscriber',4,'2019-06-02 20:33:57','subscriber@s.c','1996-01-01',0);

-- post
INSERT INTO `news_site`.`post` (`title`, `slug_title`, `post_date`, `last_update`, `id_user`, `pseudonym` , `views`, `id_category`, `id_subcategory`, `content`, `summary`) 
VALUES ('Liên Minh Huyền Thoại', 'LMHT', '2019-06-02 20:29:41', '2019-06-02 20:29:41', '3', 'Shizuka', '1', '1', '1', 
'<p><a class="seo-suggest-link" title="LCK mùa Hè 2019 " href="http://gamek.vn/lck-mua-he-2019.htm" target="_blank" rel="noopener">LCK mùa hè 2019</a> đã chính thức khởi tranh, và như thường lệ, vấn đề được quan tâm nhất trong giai đoạn đầu mùa giải chính là những phân tích, đánh giá về năng lực
của các đội tuyển năm nay cũng như dự đoán cái tên xứng đáng nhất cho ngôi vị Vô địch. Dưới đây chính là bảng điểm đánh giá của các chuyên gia <a class="seo-suggest-link" title="lmht" href="http://gamek.vn/lmht.htm" target="_blank" rel="noopener">LMHT</a> khu vực LCK về thứ hạng của các đội tuyển tại giải đấu mùa hè năm nay:</p>\r\n<div class="VCSortableInPreviewMode noCaption">\r\n<div><a class="detail-img-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/6/photo-1-1559840024229327923686.jpg" target="_blank" rel="noopener" data-fancybox-group="img-lightbox"><img id="img_a6bfbf90-887b-11e9-8e66-4df86a4f35dd" class="lightbox-content gif-content" title="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã giữa SKT T1 và Griffin
- Ảnh 1." src="https://genknews.genkcdn.vn/2019/6/6/photo-1-1559840024229327923686.jpg" alt="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã
giữa SKT T1 và Griffin - Ảnh 1." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/6/photo-1-1559840024229327923686.jpg" /></a></div>\r\n<div class="PhotoCMS_Caption"> </div>\r\n</div>\r\n<p><strong>Không còn cơ hội: Jin Air</strong></p>\r\n<div class="VCSortableInPreviewMode no
Caption">\r\n<div><a class="detail-img-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/6/photo-2-15598400242311584162601.jpg" target="_blank" rel="noopener" data-fancybox-group="img-lightbox"><img id="img_a6d4a720-887b-11e9-b076-535e36957ee8" class="lightbox-content gif-content" title="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã giữa SKT T1 và Griffin - Ảnh 2." src="https://genknews.genkcdn.vn/2019/6/6/photo-2-15598400242311584162601.jpg" alt="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã giữa SKT T1 và Griffin - Ảnh 2." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/6/photo-2-15598400242311584162601.jpg" /></a></div>\r\n<div class="PhotoCMS_Caption"> </div>\r\n</div>\r\n<p>Nếu bạn là một người hâm mộ Jin Air, bạn có thể muốn bỏ qua mùa giải này. Mặc dù là một tổ chức có lịch sử lâu đời trong làng esports Hàn Quốc,
năm 2019 lại là một năm đáng quên với Jin Air khi họ chìm trong áp lực khổng lồ với một đội hình quá thiếu tài năng.</p>\r\n<p>Họ đã đê
̉ mất ngôi sao ADC Teddy – linh hồn của cả đội cho SKT trong giai đoạn off-season và không tìm được bất kỳ cái tên nào tương xứng để thay thế
anh. Trong suốt giải Mùa xuân, Jin Air đã thử hơn một chục biến thể đội hình với đội hình 10 người của họ, nhưng họ đã không tìm thấy thành công với
 bất kỳ ai. Họ chỉ thắng được một trận và có một trong những kỷ lục tồi tệ nhất trong giới chuyên nghiệp.</p>\r\n<p>Không có nhiều để nói về h
i vọng cho Jin Air trong giải Mùa hè 2019. Đối với họ ngay lúc này, trụ hạng đã là một thành công ngoài sức mong đợi.</p>\r\n<p><str
ong>Duy trì phong độ: Afreeca Freecs, Hanwha Life, Gen.G</strong></p>\r\n<div class="VCSortableInPreviewMode noCaption">\r\n<div><a class="detail-im
g-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/6/photo-3-15598400242381880442848.jpg" target="_blank" rel="noopener" data-fancybox-group="img-lightbox"><img id="img_a6e34d20-887b-11e9-b336-a326c7fa2433" class="lightbox-content gif-content" title="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã giữa SKT T1 và Griffin - Ảnh 3." src="https://genknews.genkcdn.vn/thumb_w/690/2019/6/6/photo-3-15598400242381880442848.jpg" alt="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã giữa SKT T1 và Griffin - Ảnh 3." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/6/photo-3-15598400242381880442848.jpg" /></a></div>\r\n<div class="PhotoCMS_Caption"> </div>\r\n</div>\r\n<p>Hanwha Life, từng là ROX Tigers, có vẻ đầy hứa hẹn trong nửa đầu mùa xuân trước khi bị loại ra khỏi cuộc đua vào vòng play-off trong tuần cuối cùng. Với Tempt trong đội hình, Hanwha
Life đã thi đấu tương đối sòng phẳng với các đội top trên. Lava không có khả năng tương tự để carry đường giữa, và nếu họ tiếp tục với Tempt, họ sẽ có một cơ hội tốt để tránh xuống hạng.</p>\r\n<p>Khác với Hanwha Life, Gen.G đã có một khởi đầu tồi tệ trong giải Mùa xuân. Ruler liên tục thể hiện
 những màn solo-carry, nhưng phần còn lại của đội lại thể hiện một bộ mặt hết sức nhạt nhòa và là tác nhân dẫn đến hầu hết các thất bại của họ. Ge
n.G đã xoay sở để điều chỉnh mọi thứ vào cuối mùa giải, thậm chí có được chiến thắng trước Griffin. Sau khi mang về 4 bản hợp đồng mới cho mùa hè, bao gồm cả người đi rừng của ROX cũ là SeongHwan, Gen.G sẽ linh hoạt hơn một chút để hy vọng Ruler có thể dẫn dắt đội nhiều hơn tại LCK năm 2020.</p>\
r\n<div id="admzone508553" class="wp100 mt-10"> </div>\r\n<p>Afreeca đã ra quân với 11 tuyển thủ khác nhau trong suốt giải mùa xuân, với ngôi sao đườ
ng trên Kiin là cái tên duy nhất góp mặt trong tất cả 43 ván đấu của họ. Đội hình của họ liên tục xáo trộn, bao gồm cả việc người đi rừng Spirit chuy
ển xuống vị trí Hỗ Trợ trong một vài trận đấu, đồng nghĩa với việc Afreeca đang cực kỳ thiếu ổn định. Tại giải Mùa hè, họ cần ấn định đô
̣i hình chính và chơi xoay quanh nó. Nếu không, một suất đánh vòng thăng hạng là nguy cơ hoàn toàn có thể xảy ra.</p>\r\n<p><strong>Các ứng cử vi
ên cho suất play-off: Kingzone, Damwon, Sandbox, KT Rolster</strong></p>\r\n<div class="VCSortableInPreviewMode noCaption">\r\n<div><a class="detail-img-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/6/photo-4-1559840024265940521107.jpg" target="_blank" rel="noopener" data-fancybox-group="img-lightbox"><img id="img_a6e4fad0-887b-11e9-9676-cd1f0fe1d842" class="lightbox-content gif-content" title="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã giữa SKT T1 và Griffin - Ảnh 4." src="https://genknews.genkcdn.vn/thumb_w/690/2019/6/6/photo-4-1559840024265940521107.jpg" alt="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã giữa SKT T1 và Griffin - Ảnh 4." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/6/photo-4-1559840024265940521107.jpg" /></a></div>\r\n<div class="PhotoCMS_Caption"> </div>\r\n</div>\r\n<p>Giai đoạn Mùa xuân của KT Rolster
chỉ có thể hình dung bằng hai chữ "tồi tệ": Kết thúc ở vị trí thứ 9 và lần đầu tiên trong lịch sử phải chiến đấu để tránh xuốn
g hạng. Tuy nhiên với sự gia nhập của ADC kì cựu PraY, họ có cơ hội chuộc lỗi và trở lại là chính mình, với một đội hình tràn đầ
y kinh nghiệm lẫn tài năng.</p>\r\n<p>Damwon đã vật lộn trong đầu Mùa xuân và sự thiếu kinh nghiệm của họ được thể hiện bằng những
pha giao tranh liều lĩnh và cả những giai đoạn Cấm/Chọn không tối ưu. Nhưng kỳ chuyển nhượng giữa mùa đã đem về cho họ Flame và có vẻ
 như điểm yếu về kinh nghiệm đã được khắc phục phần nào.</p>\r\n<p>Ngược với hai đội trên, Sandbox lại có một khởi đầu tuyệt vời vơ
́i kết quả 5-0 khi họ đánh bại cả SKT, Damwon lẫn Kingzone. Nhưng mọi thứ dường như sụp đổ vào cuối mùa khi họ phải vật lộn để làm
 quen với áp lực thay đổi meta, đặc biệt là ở vị trí Đi rừng. Mặc dù vậy, cả Damwon và Sandbox đều đã học được từ những sai lầm của họ v
à sẽ trở lại trưởng thành hơn.</p>\r\n<p>Kingzone bắt đầu giải đấu mùa xuân với nhiều hi vọng và dù màn thể hiện của họ không quá
thành công, họ vẫn kết thúc mùa giải với vị trí top 3. Deft là người chơi xuất sắc nhất đội và là trụ cột cho cả đội hình Kingz
one. Nếu họ có thể giữ được phong độ cuối mùa, rất có thể họ sẽ trở thành "kẻ thứ 3" chen chân vào cuộc đua giữa 2 Ứng cử viên vô địch nặng k
ý nhất: SKT T1 và Griffin.</p>\r\n<p><strong>Cuộc đua song mã: Griffin và SKT T1</strong></p>\r\n<div class="VCSortableInPreviewMode noCaption">\r\
n<div><a class="detail-img-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/6/photo-5-1559840024269196208572.jpg" target="_blank" rel="noopener" data-fancybox-group="img-lightbox"><img id="img_a6e03fe0-887b-11e9-b3ee-d9422bf87fe7" class="lightbox-content gif-content" title="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã giữa SKT T1 và Griffin - Ảnh 5." src="https://genknews.genkcdn.vn/thumb_w/690/2019/6/6/photo-5-1559840024269196208572.jpg" alt="LMHT - Đánh giá LCK mùa hè 2019: Vẫn là cuộc đua song mã giữa SKT T1 và Griffin - Ảnh 5." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/6/photo-5-1559840024269196208572.jpg" /></a></div>\r\n<div class="PhotoCMS_Caption"> </div>\r\n</div>\r\n<p>Tương tự nh
ư LCK Mùa xuân 2019, giải mùa hè cũng được đánh giá là một cuộc đua song mã giữa những người chơi kì cựu SKT với những tài năng tr
ẻ <a class="seo-suggest-link" title="Griffin " href="http://gamek.vn/griffin.htm" target="_blank" rel="noopener">Griffin</a>. Mặc dù SKT đã có kê
́t quả tốt hơn tại giai đoạn mùa xuân với chiếc cup vô địch, song lối chơi độc đáo của Griffin vẫn có thể gây ra những bất ngờ vào phút
cuối.</p>\r\n<p><a class="seo-suggest-link" title="skt t1" href="http://gamek.vn/skt-t1.htm" target="_blank" rel="noopener">SKT T1</a> đã có cơ hộ
i thích nghi với phong cách chơi mới tại MSI 2019, nơi mà sự năng nổ, hiếu chiến ngay từ giai đoạn Cấm/Chọn lẫn giai đoạn đầu game la
̀ yếu tố quyết định dẫn đến chiến thắng.</p>\r\n<p>Griffin cũng gặp vấn đề tương tự như SKT. Giai đoạn Cấm/Chọn không thành công là
một trong những tác động lớn nhất dẫn đến sự thất bại của họ. Nhưng không thể phủ nhận Griffin và SKT vẫn là hai đội tuyển tài n
ăng nhất LCK và chỉ riêng điều đó cũng đủ để điền tên họ vào danh sách ưu tiên trong cuộc đua tranh ngôi vị đầu bảng.</p>', '');


-- comment


-- post_image


-- subscriber
INSERT INTO `subscriber` VALUES (1,'2019-06-09 21:40:36',4);

-- writer
INSERT INTO `news_site`.`writer` (`pseudonym`, `id_user`) VALUES ('Sakura', '3');

-- tag 
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Esports',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Game Online',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Manga/Film',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('PC/Conslole',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Liên Minh Huyền Thoại',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Gaming Gear',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Chính Trị',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Xã Hội',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Thế Giới',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Vũ Trụ',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Công Nghệ',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Điện Ảnh',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Pháp Luật',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('Giáo Dục',0);
INSERT INTO `news_site`.`tag` (`name`,`is_delete`) VALUES ('LCK',0);



-- post_tag


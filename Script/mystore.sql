DROP DATABASE IF EXISTS mystore;
CREATE DATABASE IF NOT EXISTS mystore;
USE mystore;

CREATE TABLE brands
(
    brand_id INT NOT NULL AUTO_INCREMENT,
    brand_name VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    descriptions MEDIUMTEXT NOT NULL,
    is_active BOOL NOT NULL DEFAULT 1,
    PRIMARY KEY (brand_id)
);

CREATE TABLE categories
(
    category_id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL,
    descriptions MEDIUMTEXT NOT NULL,
    parent_category INT NULL,
    is_active BOOL NOT NULL DEFAULT 1,
    PRIMARY KEY (category_id)
);

CREATE TABLE products
(
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    price INT NULL DEFAULT NULL,
    model_year YEAR NULL DEFAULT NULL,
    descriptions MEDIUMTEXT NULL DEFAULT NULL,
    quantity INT NULL DEFAULT NULL,
    brand_id INT NULL DEFAULT NULL,
    category_id INT NULL DEFAULT NULL,
    is_active BOOL NOT NULL default TRUE,
    number_of_views INT NOT NULL DEFAULT 0,
    number_of_sales INT NOT NULL DEFAULT 0,
    average_rating FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY (product_id)
);

CREATE TABLE users 
(
    user_id INT NOT NULL AUTO_INCREMENT,
    password CHAR(60) NOT NULL,
    firstname VARCHAR(40) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    phone CHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    is_verified BOOL NOT NULL DEFAULT FALSE,
    token TEXT NULL DEFAULT NULL,
    expired_at DATETIME,
    is_blocked BOOL NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE reviews
(
    review_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    content text,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (review_id)
);

CREATE TABLE comments 
(
    comment_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(50) NOT NULL,
    product_id INT NOT NULL,
    content MEDIUMTEXT NULL DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (comment_id)
);

CREATE TABLE unauthusers
(
	unauth_id CHAR(36) NOT NULL,
    cart_id INT,
    PRIMARY KEY (unauth_id)
);

CREATE TABLE carts 
(
	cart_id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cart_id)
);

CREATE TABLE detailcarts 
(
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY (cart_id, product_id)
);

CREATE TABLE vouchers
(
	voucher_id CHAR(10) NOT NULL,
    discount INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    primary key (voucher_id)
);

CREATE TABLE orders 
(
    order_id INT NOT NULL AUTO_INCREMENT,
    total_price INT NULL DEFAULT 0,
    user_id INT NULL DEFAULT NULL,
    order_status ENUM("Đang chờ xử lý", "Đang giao", "Đã giao", "Đã hủy") DEFAULT "Đang chờ xử lý", 
    payment_status ENUM("Chưa thanh toán", "Đã thanh toán") NOT NULL DEFAULT "Chưa thanh toán",
    receive_address VARCHAR(50) NOT NULL,
    receive_phone CHAR(10) NOT NULL,
    voucher CHAR(10) NULL DEFAULT NULL,
    create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    send_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    receive_date DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (order_id)
);

CREATE TABLE detailorders 
(
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT  NOT NULL DEFAULT 0,
    subtotal INT NOT NULL DEFAULT 0,
    review_id INT NULL DEFAULT NULL,
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE images 
(
    product_id INT NOT NULL,
    image_stt INT NOT NULL,
    image_link TEXT NULL DEFAULT NULL,
    PRIMARY KEY (image_stt, product_id)
);

CREATE TABLE roles 
(
    role_id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(50) NULL DEFAULT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE userroles 
(
    role_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (role_id, user_id)
);

ALTER TABLE categories 
    ADD CONSTRAINT fk_categories_parent_category FOREIGN KEY (parent_category) REFERENCES categories(category_id);

ALTER TABLE products
    ADD CONSTRAINT fk_products_brand_id FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
    ADD CONSTRAINT fk_products_category_id FOREIGN KEY (category_id) REFERENCES categories(category_id);

ALTER TABLE reviews
    ADD CONSTRAINT fk_reviews_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    ADD CONSTRAINT fk_reviews_product_id FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE comments
    ADD CONSTRAINT fk_comments_product_id FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE unauthusers
	ADD CONSTRAINT fk_unauthusers_cart_id FOREIGN KEY (cart_id) REFERENCES carts(cart_id);
    
ALTER TABLE carts
	ADD CONSTRAINT fk_carts_user_id FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE detailcarts
    ADD CONSTRAINT fk_detailcarts_cart_id FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
    ADD CONSTRAINT fk_detailcarts_product_id FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE orders
    ADD CONSTRAINT fk_orders_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    ADD CONSTRAINT fk_orders_voucher FOREIGN KEY (voucher) REFERENCES vouchers(voucher_id);

ALTER TABLE detailorders 
    ADD CONSTRAINT fk_detailorders_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id),
    ADD CONSTRAINT fk_detailorders_product_id FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE images
    ADD CONSTRAINT fk_images_product_id FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE userroles
    ADD CONSTRAINT fk_userroles_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    ADD CONSTRAINT fk_userroles_role_id FOREIGN KEY (role_id) REFERENCES roles(role_id);


alter table brands AUTO_INCREMENT = 1;
insert into brands (brand_name, address, descriptions) value ("JBL","Mỹ","Được dịch từ tiếng Anh-JBL là một công ty của Mỹ chuyên sản xuất , thiết bị âm thanh, bao gồm cả loa và tai nghe. JBL Consumer phục vụ thị trường tiêu dùng gia đình. JBL Professional phục vụ phòng thu, âm thanh lắp đặt, âm thanh tour du lịch, âm thanh di động, ô tô, sản xuất, chơi xóc Kĩa, thị trường rạp chiếu phim, v.v.");
insert into brands (brand_name, address, descriptions) value ("SONY","Nhật Bản","Công ty công nghiệp Sony, gọi tắt là SONY, là một tập đoàn đa quốc gia của Nhật Bản, với trụ sở chính nằm tại Minato, Tokyo, Nhật Bản, và là tập đoàn điện tử đứng thứ 5 thế giới.");
insert into brands (brand_name, address, descriptions) value ("Seinnheiner","Đức", "Sennheiser electronic GmbH & Co. KG là một công ty tư nhân của Đức sản xuất microphone, tai nghe, phụ điện điện thoại, và tai nghe cho điện tử kỹ thuật hàng không, âm thanh chuyên nghiệp và các ứng dụng Đinh doanh.");

alter table categories AUTO_INCREMENT = 1;
insert into categories (category_name, descriptions, parent_category) value ("Tai nghe","Tai nghe là thiết bị gồm một cặp loa phát âm thanh Được , thiết kế nhỏ gọn, mang tính di động và vị trí của chúng là thường Được đặt áp sát hoặc bên trong tai",null);
insert into categories (category_name, descriptions, parent_category) value ("Loa","Loa là thiết bị điện, có khả năng biến Kổi nguồn năng lượng điện thành âm thanh. ",null);
insert into categories (category_name, descriptions, parent_category) value ("Headphone", "Dòng sản phẩm này sẽ ôm trọn lấy tai của chúng ta với , thiết kế đệm chụp dày. Nhờ thu hẹp âm trường và chú trọng vào việc tái tạo từng chi tiết nhỏ của audio, Over-ear Headphone sẽ giúp bạn cảm nhận Được chiều sâu âm nhạc vượt trội so với các kiểu , thiết kế Headphone khác.",1);
insert into categories (category_name, descriptions, parent_category) value ("Truly wireless", "Hiện nay, tai nghe True Wireless (tay nghe không dây) Được sử dụng khá phổ biến, mang lại sự tiện lợi cho người dùng điện thoại, laptop cũng như các , thiết bị điện tử khác. ",1);
insert into categories (category_name, descriptions, parent_category) value ("In-ear", "In-ear là loại tai nghe nhét trong có , thiết kế phần củ loa (driver) với ống dẫn âm nhỏ gọn, thuôn dài, dễ dàng tiến sâu vào trong tai để truyền âm nhanh và cách âm tốt hơn, AirPods Pro là một loại Tai nghe.",1);
insert into categories (category_name, descriptions, parent_category) value ("Loa di động Bluetooth","Loa Bluetooth chính hãng, giá rẻ, nhỏ gọn dễ mang theo khi Ki chơi xa, các buổi tiệc ngoài trời mang đến âm thanh sống động cho buổi tiệc của bạn.", 2);

-- -------------INSERT -----
alter table products AUTO_INCREMENT = 1;
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Loa JBL AK275",5999000,"2022","Loa JBL AK275, điểm ấn tượng nhất ở sản phẩm này đến từ thiết kế gọn gàng; kiểu dáng sang trọng với hình bầu dục bo cong và bên ngoài được bọc một lớp đệm tai silicon mang lại cảm giác êm ái để bạn có thể sử dụng thoải mái trong cả một ngày liên tục mà không bị đau tai.", 100, 1, 6);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Loa Sennheiser MR468",2999000,"2021","Loa Sennheiser MR468 là một chiếc tai nghe phù hợp với những người làm việc chuyên nghiệp với âm nhạc như những bạn làm DJ, với dải âm tần từ 18Hz đến 18KHz. Với nam châm cao cấp Neodymium, chiếc tai nghe này có khả năng xử lý âm thanh nhiễu, cho âm bass vang mạnh mẽ, phù hợp nếu bạn muốn tách mình ra khỏi môi trường xung quanh và tập trung nghe những thể loại nhạc như Dance, Jazz với âm lượng lớn.",100, 3, 6);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Loa Sony JKD768",4999000,"2019","Loa Sony JKD768 có thể kéo dài 7,5 giờ giữa các lần sạc và hộp sạc nhỏ của chúng – một trong những lần nhỏ nhất chúng tôi từng thấy – có thể giữ cho các giai điệu diễn ra trong tổng cộng 28 giờ. Với xếp hạng IP55 về bảo vệ chống bụi và nước, nó có thể vượt quangay cả những bài tập khó nhất, miễn là bạn không nhảy vào bể bơi. Sự chắc chắn đó được hỗ trợ bởi bảo hành hai năm, điều không bình thường trong một ngành thường chỉ cung cấp một năm bảo hiểm.",100, 2, 6);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Loa Sony AK394",2999000,"2019","Loa Sony AK394, điểm ấn tượng nhất ở sản phẩm này đến từ thiết kế gọn gàng; kiểu dáng sang trọng với hình bầu dục bo cong và bên ngoài được bọc một lớp đệm tai silicon mang lại cảm giác êm ái để bạn có thể sử dụng thoải mái trong cả một ngày liên tục mà không bị đau tai.", 100, 2, 6);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Loa Sony AK113",2999000,"2022","Loa Sony AK113, điểm ấn tượng nhất ở sản phẩm này đến từ thiết kế gọn gàng; kiểu dáng sang trọng với hình bầu dục bo cong và bên ngoài được bọc một lớp đệm tai silicon mang lại cảm giác êm ái để bạn có thể sử dụng thoải mái trong cả một ngày liên tục mà không bị đau tai.", 100, 2, 6);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Loa Sony MR568",1999000,"2020","Loa Sony MR568 là một chiếc tai nghe phù hợp với những người làm việc chuyên nghiệp với âm nhạc như những bạn làm DJ, với dải âm tần từ 18Hz đến 18KHz. Với nam châm cao cấp Neodymium, chiếc tai nghe này có khả năng xử lý âm thanh nhiễu, cho âm bass vang mạnh mẽ, phù hợp nếu bạn muốn tách mình ra khỏi môi trường xung quanh và tập trung nghe những thể loại nhạc như Dance, Jazz với âm lượng lớn.",100, 2, 6);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Loa Sony JKD781",2999000,"2021","Loa Sony JKD781 có thể kéo dài 7,5 giờ giữa các lần sạc và hộp sạc nhỏ của chúng – một trong những lần nhỏ nhất chúng tôi từng thấy – có thể giữ cho các giai điệu diễn ra trong tổng cộng 28 giờ. Với xếp hạng IP55 về bảo vệ chống bụi và nước, nó có thể vượt quangay cả những bài tập khó nhất, miễn là bạn không nhảy vào bể bơi. Sự chắc chắn đó được hỗ trợ bởi bảo hành hai năm, điều không bình thường trong một ngành thường chỉ cung cấp một năm bảo hiểm.", 100, 2,6);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Loa Sony SLS309",5999000,"2019","Loa Sony SLS309, thiết kế với kiểu dáng đẹp mắt, công nghệ Bluetooth 5.0 kết nối mượt mà trong khoảng cách 10 m.Công suất 15 W cho âm thanh phát ra lớn và sống động, trang bị chức năng TWS kết nối 2 loa với nhau (chỉ tương thích loa Mozard E8), dung lượng pin 3000 mAh cho thời gian sử dụng khoảng 5 giờ (âm lượng 50%), thời gian sạc cho loa khoảng 4 giờ.", 100, 2,6);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe JBL MKL69",1999000,"2019","Tai nghe JBL MKL69, thiết kế với kiểu dáng đẹp mắt, công nghệ Bluetooth 5.0 kết nối mượt mà trong khoảng cách 10 m.Công suất 15 W cho âm thanh phát ra lớn và sống động, trang bị chức năng TWS kết nối 2 loa với nhau (chỉ tương thích loa Mozard E8), dung lượng pin 3000 mAh cho thời gian sử dụng khoảng 5 giờ (âm lượng 50%), thời gian sạc cho loa khoảng 4 giờ.", 100, 1, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe JBL MR220",1999000,"2020","Tai nghe JBL MR220 là một chiếc tai nghe phù hợp với những người làm việc chuyên nghiệp với âm nhạc như những bạn làm DJ, với dải âm tần từ 18Hz đến 18KHz. Với nam châm cao cấp Neodymium, chiếc tai nghe này có khả năng xử lý âm thanh nhiễu, cho âm bass vang mạnh mẽ, phù hợp nếu bạn muốn tách mình ra khỏi môi trường xung quanh và tập trung nghe những thể loại nhạc như Dance, Jazz với âm lượng lớn.",100, 1, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai Nghe JBL JKD816",2999000,"2018","Tai Nghe JBL JKD816 có thể kéo dài 7,5 giờ giữa các lần sạc và hộp sạc nhỏ của chúng – một trong những lần nhỏ nhất chúng tôi từng thấy – có thể giữ cho các giai điệu diễn ra trong tổng cộng 28 giờ. Với xếp hạng IP55 về bảo vệ chống bụi và nước, nó có thể vượt quangay cả những bài tập khó nhất, miễn là bạn không nhảy vào bể bơi. Sự chắc chắn đó được hỗ trợ bởi bảo hành hai năm, điều không bình thường trong một ngành thường chỉ cung cấp một năm bảo hiểm.",100, 1, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY AK622",2999000,"2018","Tai nghe SONY AK622, điểm ấn tượng nhất ở sản phẩm này đến từ thiết kế gọn gàng; kiểu dáng sang trọng với hình bầu dục bo cong và bên ngoài được bọc một lớp đệm tai silicon mang lại cảm giác êm ái để bạn có thể sử dụng thoải mái trong cả một ngày liên tục mà không bị đau tai.", 100, 2, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY MR310",1999000,"2018","Tai nghe SONY MR310 là một chiếc tai nghe phù hợp với những người làm việc chuyên nghiệp với âm nhạc như những bạn làm DJ, với dải âm tần từ 18Hz đến 18KHz. Với nam châm cao cấp Neodymium, chiếc tai nghe này có khả năng xử lý âm thanh nhiễu, cho âm bass vang mạnh mẽ, phù hợp nếu bạn muốn tách mình ra khỏi môi trường xung quanh và tập trung nghe những thể loại nhạc như Dance, Jazz với âm lượng lớn.",100, 2, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY JKD197",4999000,"2018","Tai nghe SONY JKD197 có thể kéo dài 7,5 giờ giữa các lần sạc và hộp sạc nhỏ của chúng – một trong những lần nhỏ nhất chúng tôi từng thấy – có thể giữ cho các giai điệu diễn ra trong tổng cộng 28 giờ. Với xếp hạng IP55 về bảo vệ chống bụi và nước, nó có thể vượt quangay cả những bài tập khó nhất, miễn là bạn không nhảy vào bể bơi. Sự chắc chắn đó được hỗ trợ bởi bảo hành hai năm, điều không bình thường trong một ngành thường chỉ cung cấp một năm bảo hiểm.",100, 2, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY AK413",3999000,"2020","Tai nghe SONY AK413, điểm ấn tượng nhất ở sản phẩm này đến từ thiết kế gọn gàng; kiểu dáng sang trọng với hình bầu dục bo cong và bên ngoài được bọc một lớp đệm tai silicon mang lại cảm giác êm ái để bạn có thể sử dụng thoải mái trong cả một ngày liên tục mà không bị đau tai.", 100, 2, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY MR677",5999000,"2022","Tai nghe SONY MR677 là một chiếc tai nghe phù hợp với những người làm việc chuyên nghiệp với âm nhạc như những bạn làm DJ, với dải âm tần từ 18Hz đến 18KHz. Với nam châm cao cấp Neodymium, chiếc tai nghe này có khả năng xử lý âm thanh nhiễu, cho âm bass vang mạnh mẽ, phù hợp nếu bạn muốn tách mình ra khỏi môi trường xung quanh và tập trung nghe những thể loại nhạc như Dance, Jazz với âm lượng lớn.",100, 2, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY JKD378",4999000,"2018","Tai nghe SONY JKD378 có thể kéo dài 7,5 giờ giữa các lần sạc và hộp sạc nhỏ của chúng – một trong những lần nhỏ nhất chúng tôi từng thấy – có thể giữ cho các giai điệu diễn ra trong tổng cộng 28 giờ. Với xếp hạng IP55 về bảo vệ chống bụi và nước, nó có thể vượt quangay cả những bài tập khó nhất, miễn là bạn không nhảy vào bể bơi. Sự chắc chắn đó được hỗ trợ bởi bảo hành hai năm, điều không bình thường trong một ngành thường chỉ cung cấp một năm bảo hiểm.",100, 2, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY AK508",4999000,"2022","Tai nghe SONY AK508, điểm ấn tượng nhất ở sản phẩm này đến từ thiết kế gọn gàng; kiểu dáng sang trọng với hình bầu dục bo cong và bên ngoài được bọc một lớp đệm tai silicon mang lại cảm giác êm ái để bạn có thể sử dụng thoải mái trong cả một ngày liên tục mà không bị đau tai.", 100,2, 3);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY MR782",5999000,"2019","Tai nghe SONY MR782 là một chiếc tai nghe phù hợp với những người làm việc chuyên nghiệp với âm nhạc như những bạn làm DJ, với dải âm tần từ 18Hz đến 18KHz. Với nam châm cao cấp Neodymium, chiếc tai nghe này có khả năng xử lý âm thanh nhiễu, cho âm bass vang mạnh mẽ, phù hợp nếu bạn muốn tách mình ra khỏi môi trường xung quanh và tập trung nghe những thể loại nhạc như Dance, Jazz với âm lượng lớn.",100, 2, 5);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY JKD445",2999000,"2018","Tai nghe SONY JKD445 có thể kéo dài 7,5 giờ giữa các lần sạc và hộp sạc nhỏ của chúng – một trong những lần nhỏ nhất chúng tôi từng thấy – có thể giữ cho các giai điệu diễn ra trong tổng cộng 28 giờ. Với xếp hạng IP55 về bảo vệ chống bụi và nước, nó có thể vượt quangay cả những bài tập khó nhất, miễn là bạn không nhảy vào bể bơi. Sự chắc chắn đó được hỗ trợ bởi bảo hành hai năm, điều không bình thường trong một ngành thường chỉ cung cấp một năm bảo hiểm.",100, 2, 5);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser AK821",3999000,"2019","Tai nghe Sennheiser AK821, điểm ấn tượng nhất ở sản phẩm này đến từ thiết kế gọn gàng; kiểu dáng sang trọng với hình bầu dục bo cong và bên ngoài được bọc một lớp đệm tai silicon mang lại cảm giác êm ái để bạn có thể sử dụng thoải mái trong cả một ngày liên tục mà không bị đau tai.", 100, 3, 5);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser MR291",4999000,"2021","Tai nghe Sennheiser MR291 là một chiếc tai nghe phù hợp với những người làm việc chuyên nghiệp với âm nhạc như những bạn làm DJ, với dải âm tần từ 18Hz đến 18KHz. Với nam châm cao cấp Neodymium, chiếc tai nghe này có khả năng xử lý âm thanh nhiễu, cho âm bass vang mạnh mẽ, phù hợp nếu bạn muốn tách mình ra khỏi môi trường xung quanh và tập trung nghe những thể loại nhạc như Dance, Jazz với âm lượng lớn.",100, 3, 5);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser JKD412",5999000,"2019","Tai nghe Sennheiser JKD412 có thể kéo dài 7,5 giờ giữa các lần sạc và hộp sạc nhỏ của chúng – một trong những lần nhỏ nhất chúng tôi từng thấy – có thể giữ cho các giai điệu diễn ra trong tổng cộng 28 giờ. Với xếp hạng IP55 về bảo vệ chống bụi và nước, nó có thể vượt quangay cả những bài tập khó nhất, miễn là bạn không nhảy vào bể bơi. Sự chắc chắn đó được hỗ trợ bởi bảo hành hai năm, điều không bình thường trong một ngành thường chỉ cung cấp một năm bảo hiểm.",100, 3, 5);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser AK787",1999000,"2019","Tai nghe Sennheiser AK787, điểm ấn tượng nhất ở sản phẩm này đến từ thiết kế gọn gàng; kiểu dáng sang trọng với hình bầu dục bo cong và bên ngoài được bọc một lớp đệm tai silicon mang lại cảm giác êm ái để bạn có thể sử dụng thoải mái trong cả một ngày liên tục mà không bị đau tai.",100, 3, 5);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser MR364",1999000,"2020","Tai nghe Sennheiser MR364 là một chiếc tai nghe phù hợp với những người làm việc chuyên nghiệp với âm nhạc như những bạn làm DJ, với dải âm tần từ 18Hz đến 18KHz. Với nam châm cao cấp Neodymium, chiếc tai nghe này có khả năng xử lý âm thanh nhiễu, cho âm bass vang mạnh mẽ, phù hợp nếu bạn muốn tách mình ra khỏi môi trường xung quanh và tập trung nghe những thể loại nhạc như Dance, Jazz với âm lượng lớn.",100, 3, 5);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser JKD146",1999000,"2020","Tai nghe Sennheiser JKD146 có thể kéo dài 7,5 giờ giữa các lần sạc và hộp sạc nhỏ của chúng – một trong những lần nhỏ nhất chúng tôi từng thấy – có thể giữ cho các giai điệu diễn ra trong tổng cộng 28 giờ. Với xếp hạng IP55 về bảo vệ chống bụi và nước, nó có thể vượt quangay cả những bài tập khó nhất, miễn là bạn không nhảy vào bể bơi. Sự chắc chắn đó được hỗ trợ bởi bảo hành hai năm, điều không bình thường trong một ngành thường chỉ cung cấp một năm bảo hiểm.",100, 3, 5);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser AK973",4999000,"2021","Tai nghe Sennheiser AK973, điểm ấn tượng nhất ở sản phẩm này đến từ thiết kế gọn gàng; kiểu dáng sang trọng với hình bầu dục bo cong và bên ngoài được bọc một lớp đệm tai silicon mang lại cảm giác êm ái để bạn có thể sử dụng thoải mái trong cả một ngày liên tục mà không bị đau tai.", 100, 3, 5);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser MR942",4999000,"2020","Tai nghe Sennheiser MR942 là một chiếc tai nghe phù hợp với những người làm việc chuyên nghiệp với âm nhạc như những bạn làm DJ, với dải âm tần từ 18Hz đến 18KHz. Với nam châm cao cấp Neodymium, chiếc tai nghe này có khả năng xử lý âm thanh nhiễu, cho âm bass vang mạnh mẽ, phù hợp nếu bạn muốn tách mình ra khỏi môi trường xung quanh và tập trung nghe những thể loại nhạc như Dance, Jazz với âm lượng lớn.",100, 3, 4);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser JKD103",3999000,"2019","Tai nghe Sennheiser JKD103 có thể kéo dài 7,5 giờ giữa các lần sạc và hộp sạc nhỏ của chúng – một trong những lần nhỏ nhất chúng tôi từng thấy – có thể giữ cho các giai điệu diễn ra trong tổng cộng 28 giờ. Với xếp hạng IP55 về bảo vệ chống bụi và nước, nó có thể vượt quangay cả những bài tập khó nhất, miễn là bạn không nhảy vào bể bơi. Sự chắc chắn đó được hỗ trợ bởi bảo hành hai năm, điều không bình thường trong một ngành thường chỉ cung cấp một năm bảo hiểm.",100, 3, 4);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe JBL OSK526",5999000,"2020","Tai nghe JBL OSK526, thiết kế với kiểu dáng đẹp mắt, công nghệ Bluetooth 5.0 kết nối mượt mà trong khoảng cách 10 m.Công suất 15 W cho âm thanh phát ra lớn và sống động, trang bị chức năng TWS kết nối 2 loa với nhau (chỉ tương thích loa Mozard E8), dung lượng pin 3000 mAh cho thời gian sử dụng khoảng 5 giờ (âm lượng 50%), thời gian sạc cho loa khoảng 4 giờ.", 100, 1, 4);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY SLS228",1999000,"2022","Tai nghe SONY SLS228, thiết kế với kiểu dáng đẹp mắt, công nghệ Bluetooth 5.0 kết nối mượt mà trong khoảng cách 10 m.Công suất 15 W cho âm thanh phát ra lớn và sống động, trang bị chức năng TWS kết nối 2 loa với nhau (chỉ tương thích loa Mozard E8), dung lượng pin 3000 mAh cho thời gian sử dụng khoảng 5 giờ (âm lượng 50%), thời gian sạc cho loa khoảng 4 giờ.", 100, 2, 4);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe SONY MKL341",4999000,"2022","Tai nghe SONY MKL341, thiết kế với kiểu dáng đẹp mắt, công nghệ Bluetooth 5.0 kết nối mượt mà trong khoảng cách 10 m.Công suất 15 W cho âm thanh phát ra lớn và sống động, trang bị chức năng TWS kết nối 2 loa với nhau (chỉ tương thích loa Mozard E8), dung lượng pin 3000 mAh cho thời gian sử dụng khoảng 5 giờ (âm lượng 50%), thời gian sạc cho loa khoảng 4 giờ.", 100, 2, 4);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai Nghe SONY OSK592",5999000,"2020","Tai Nghe SONY OSK592, thiết kế với kiểu dáng đẹp mắt, công nghệ Bluetooth 5.0 kết nối mượt mà trong khoảng cách 10 m.Công suất 15 W cho âm thanh phát ra lớn và sống động, trang bị chức năng TWS kết nối 2 loa với nhau (chỉ tương thích loa Mozard E8), dung lượng pin 3000 mAh cho thời gian sử dụng khoảng 5 giờ (âm lượng 50%), thời gian sạc cho loa khoảng 4 giờ.", 100, 2, 4);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser SLS389",3999000,"2022","Tai nghe Sennheiser SLS389, thiết kế với kiểu dáng đẹp mắt, công nghệ Bluetooth 5.0 kết nối mượt mà trong khoảng cách 10 m.Công suất 15 W cho âm thanh phát ra lớn và sống động, trang bị chức năng TWS kết nối 2 loa với nhau (chỉ tương thích loa Mozard E8), dung lượng pin 3000 mAh cho thời gian sử dụng khoảng 5 giờ (âm lượng 50%), thời gian sạc cho loa khoảng 4 giờ.", 100, 3, 4);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser MKL563",1999000,"2021","Tai nghe Sennheiser MKL563, thiết kế với kiểu dáng đẹp mắt, công nghệ Bluetooth 5.0 kết nối mượt mà trong khoảng cách 10 m.Công suất 15 W cho âm thanh phát ra lớn và sống động, trang bị chức năng TWS kết nối 2 loa với nhau (chỉ tương thích loa Mozard E8), dung lượng pin 3000 mAh cho thời gian sử dụng khoảng 5 giờ (âm lượng 50%), thời gian sạc cho loa khoảng 4 giờ.", 100, 3, 4);
insert into products (product_name, price, model_year, descriptions, quantity, brand_id, category_id) value ("Tai nghe Sennheiser OSK736",5999000,"2021","Tai nghe Sennheiser OSK736, thiết kế với kiểu dáng đẹp mắt, công nghệ Bluetooth 5.0 kết nối mượt mà trong khoảng cách 10 m.Công suất 15 W cho âm thanh phát ra lớn và sống động, trang bị chức năng TWS kết nối 2 loa với nhau (chỉ tương thích loa Mozard E8), dung lượng pin 3000 mAh cho thời gian sử dụng khoảng 5 giờ (âm lượng 50%), thời gian sạc cho loa khoảng 4 giờ.", 100, 3, 4);



insert into images (product_id, image_stt, image_link) value (1,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749492/products/product_01_01_y1dmco.jpg");
insert into images (product_id, image_stt, image_link) value (1,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749492/products/product_01_02_szdzb6.jpg");
insert into images (product_id, image_stt, image_link) value (1,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749492/products/product_01_03_rrfgev.jpg");
insert into images (product_id, image_stt, image_link) value (1,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749492/products/product_01_04_ravr2t.jpg");
insert into images (product_id, image_stt, image_link) value (2,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749492/products/product_02_01_xzshim.jpg");
insert into images (product_id, image_stt, image_link) value (2,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749493/products/product_02_02_urq90d.jpg");
insert into images (product_id, image_stt, image_link) value (2,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749493/products/product_02_03_i8sayw.jpg");
insert into images (product_id, image_stt, image_link) value (2,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749493/products/product_02_04_csdl13.jpg");
insert into images (product_id, image_stt, image_link) value (3,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749493/products/product_03_01_c1pmmf.jpg");
insert into images (product_id, image_stt, image_link) value (3,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749493/products/product_03_02_u8ulhm.jpg");
insert into images (product_id, image_stt, image_link) value (3,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749493/products/product_03_03_mmnhlt.jpg");
insert into images (product_id, image_stt, image_link) value (3,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749493/products/product_03_04_xfikw7.jpg");
insert into images (product_id, image_stt, image_link) value (4,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749493/products/product_04_01_uxz1rc.jpg");
insert into images (product_id, image_stt, image_link) value (4,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749494/products/product_04_02_azeyxh.jpg");
insert into images (product_id, image_stt, image_link) value (4,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749494/products/product_04_03_t41lqd.jpg");
insert into images (product_id, image_stt, image_link) value (4,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749494/products/product_04_04_flzh3u.jpg");
insert into images (product_id, image_stt, image_link) value (5,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749494/products/product_05_01_gpejec.jpg");
insert into images (product_id, image_stt, image_link) value (5,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749494/products/product_05_02_v8mn1k.jpg");
insert into images (product_id, image_stt, image_link) value (5,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749494/products/product_05_03_ubluww.jpg");
insert into images (product_id, image_stt, image_link) value (5,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749495/products/product_05_04_uxhpi9.jpg");
insert into images (product_id, image_stt, image_link) value (6,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749495/products/product_06_01_gpxhm1.jpg");
insert into images (product_id, image_stt, image_link) value (6,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749495/products/product_06_02_frkczm.jpg");
insert into images (product_id, image_stt, image_link) value (6,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749495/products/product_06_03_amg1xh.jpg");
insert into images (product_id, image_stt, image_link) value (6,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749495/products/product_06_04_xykqzf.jpg");
insert into images (product_id, image_stt, image_link) value (7,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749496/products/product_07_01_nsg5ga.jpg");
insert into images (product_id, image_stt, image_link) value (7,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749496/products/product_07_02_wqgzhl.jpg");
insert into images (product_id, image_stt, image_link) value (7,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749496/products/product_07_03_vilns1.jpg");
insert into images (product_id, image_stt, image_link) value (7,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749497/products/product_07_04_bxoxcb.jpg");
insert into images (product_id, image_stt, image_link) value (8,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749498/products/product_08_01_kxgja5.jpg");
insert into images (product_id, image_stt, image_link) value (8,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749498/products/product_08_02_n6fedj.jpg");
insert into images (product_id, image_stt, image_link) value (8,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749498/products/product_08_03_rozwku.jpg");
insert into images (product_id, image_stt, image_link) value (8,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749498/products/product_08_04_uecf74.jpg");
insert into images (product_id, image_stt, image_link) value (9,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749498/products/product_09_01_goayzz.jpg");
insert into images (product_id, image_stt, image_link) value (9,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749498/products/product_09_02_oimx9u.jpg");
insert into images (product_id, image_stt, image_link) value (9,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749498/products/product_09_03_wgrjjs.jpg");
insert into images (product_id, image_stt, image_link) value (9,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749499/products/product_09_04_nqapo0.jpg");
insert into images (product_id, image_stt, image_link) value (10,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749499/products/product_10_01_k0romw.jpg");
insert into images (product_id, image_stt, image_link) value (10,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749499/products/product_10_02_h0atrh.jpg");
insert into images (product_id, image_stt, image_link) value (10,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749499/products/product_10_03_rt9heg.jpg");
insert into images (product_id, image_stt, image_link) value (10,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749499/products/product_10_04_fckx0s.jpg");
insert into images (product_id, image_stt, image_link) value (11,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749499/products/product_11_01_uulywa.jpg");
insert into images (product_id, image_stt, image_link) value (11,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749500/products/product_11_02_bkgzxb.jpg");
insert into images (product_id, image_stt, image_link) value (11,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749500/products/product_11_03_dwycch.jpg");
insert into images (product_id, image_stt, image_link) value (11,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749500/products/product_11_04_ffxlme.jpg");
insert into images (product_id, image_stt, image_link) value (12,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749500/products/product_12_01_yktl4i.jpg");
insert into images (product_id, image_stt, image_link) value (12,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749501/products/product_12_02_qzx72c.jpg");
insert into images (product_id, image_stt, image_link) value (12,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749501/products/product_12_03_excfpv.jpg");
insert into images (product_id, image_stt, image_link) value (12,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749501/products/product_12_04_x6p42p.jpg");
insert into images (product_id, image_stt, image_link) value (13,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_13_01_sbwgfp.jpg");
insert into images (product_id, image_stt, image_link) value (13,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_13_02_jlzz0g.jpg");
insert into images (product_id, image_stt, image_link) value (13,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_13_03_tklkmo.jpg");
insert into images (product_id, image_stt, image_link) value (13,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_13_04_x3istn.jpg");
insert into images (product_id, image_stt, image_link) value (14,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_14_01_ixhszg.jpg");
insert into images (product_id, image_stt, image_link) value (14,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_14_02_dmcbmq.jpg");
insert into images (product_id, image_stt, image_link) value (14,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_14_03_jylmbg.jpg");
insert into images (product_id, image_stt, image_link) value (14,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_14_04_urwmgo.jpg");
insert into images (product_id, image_stt, image_link) value (15,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_15_01_lllnpl.jpg");
insert into images (product_id, image_stt, image_link) value (15,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_15_02_bww1ru.jpg");
insert into images (product_id, image_stt, image_link) value (15,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749502/products/product_15_03_ivw1zg.jpg");
insert into images (product_id, image_stt, image_link) value (15,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749503/products/product_15_04_j8pddo.jpg");
insert into images (product_id, image_stt, image_link) value (16,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749503/products/product_16_01_mb9kts.jpg");
insert into images (product_id, image_stt, image_link) value (16,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749503/products/product_16_02_h2yu2e.jpg");
insert into images (product_id, image_stt, image_link) value (16,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749503/products/product_16_03_gn1nwm.jpg");
insert into images (product_id, image_stt, image_link) value (16,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749503/products/product_16_04_gnge43.jpg");
insert into images (product_id, image_stt, image_link) value (17,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749504/products/product_17_01_xwu4f0.jpg");
insert into images (product_id, image_stt, image_link) value (17,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749504/products/product_17_02_ejjkmd.jpg");
insert into images (product_id, image_stt, image_link) value (17,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749504/products/product_17_03_a0gkbv.jpg");
insert into images (product_id, image_stt, image_link) value (17,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749504/products/product_17_04_w51mfn.jpg");
insert into images (product_id, image_stt, image_link) value (18,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749504/products/product_18_01_jftzky.jpg");
insert into images (product_id, image_stt, image_link) value (18,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749505/products/product_18_02_xluic3.jpg");
insert into images (product_id, image_stt, image_link) value (18,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749505/products/product_18_03_iiwxt6.jpg");
insert into images (product_id, image_stt, image_link) value (18,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749505/products/product_18_04_yauqc3.jpg");
insert into images (product_id, image_stt, image_link) value (19,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749505/products/product_19_01_qwabuw.jpg");
insert into images (product_id, image_stt, image_link) value (19,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749506/products/product_19_02_xucedp.jpg");
insert into images (product_id, image_stt, image_link) value (19,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749506/products/product_19_03_nwudl7.jpg");
insert into images (product_id, image_stt, image_link) value (19,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749506/products/product_19_04_uxtqh9.jpg");
insert into images (product_id, image_stt, image_link) value (20,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749506/products/product_20_01_pxxoug.jpg");
insert into images (product_id, image_stt, image_link) value (20,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749506/products/product_20_02_lfiblu.jpg");
insert into images (product_id, image_stt, image_link) value (20,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749506/products/product_20_03_gskh95.jpg");
insert into images (product_id, image_stt, image_link) value (20,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749506/products/product_20_04_kpfjq2.jpg");
insert into images (product_id, image_stt, image_link) value (21,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749507/products/product_21_01_lvzett.jpg");
insert into images (product_id, image_stt, image_link) value (21,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749507/products/product_21_02_fnrtfe.jpg");
insert into images (product_id, image_stt, image_link) value (21,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749507/products/product_21_03_tvdfy1.jpg");
insert into images (product_id, image_stt, image_link) value (21,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749507/products/product_21_04_vypkgm.jpg");
insert into images (product_id, image_stt, image_link) value (22,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749507/products/product_22_01_dgrnyz.jpg");
insert into images (product_id, image_stt, image_link) value (22,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749507/products/product_22_02_wb14wx.jpg");
insert into images (product_id, image_stt, image_link) value (22,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749507/products/product_22_03_lbttkz.jpg");
insert into images (product_id, image_stt, image_link) value (22,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749508/products/product_22_04_brnbmt.jpg");
insert into images (product_id, image_stt, image_link) value (23,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749508/products/product_23_01_lirvtq.jpg");
insert into images (product_id, image_stt, image_link) value (23,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749508/products/product_23_02_ahn0pj.jpg");
insert into images (product_id, image_stt, image_link) value (23,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749508/products/product_23_03_orvmlv.jpg");
insert into images (product_id, image_stt, image_link) value (23,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749508/products/product_23_04_utcheg.jpg");
insert into images (product_id, image_stt, image_link) value (24,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749509/products/product_24_01_y2vmgz.jpg");
insert into images (product_id, image_stt, image_link) value (24,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749509/products/product_24_02_unrzww.jpg");
insert into images (product_id, image_stt, image_link) value (24,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749509/products/product_24_03_apn50y.jpg");
insert into images (product_id, image_stt, image_link) value (24,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749510/products/product_24_04_butfpn.jpg");
insert into images (product_id, image_stt, image_link) value (25,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749509/products/product_25_01_a8r8mp.jpg");
insert into images (product_id, image_stt, image_link) value (25,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749510/products/product_25_02_fxvh8g.jpg");
insert into images (product_id, image_stt, image_link) value (25,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749510/products/product_25_03_kmcgpi.jpg");
insert into images (product_id, image_stt, image_link) value (25,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749510/products/product_25_04_udrmcw.jpg");
insert into images (product_id, image_stt, image_link) value (26,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749510/products/product_26_01_qikaxz.jpg");
insert into images (product_id, image_stt, image_link) value (26,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749510/products/product_26_02_cte4nj.jpg");
insert into images (product_id, image_stt, image_link) value (26,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749510/products/product_26_03_u16g9j.jpg");
insert into images (product_id, image_stt, image_link) value (26,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749512/products/product_26_04_fjxmmc.jpg");
insert into images (product_id, image_stt, image_link) value (27,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749511/products/product_27_01_jghd7c.jpg");
insert into images (product_id, image_stt, image_link) value (27,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749512/products/product_27_02_x9w5lg.jpg");
insert into images (product_id, image_stt, image_link) value (27,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749513/products/product_27_03_ofk4it.jpg");
insert into images (product_id, image_stt, image_link) value (27,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749514/products/product_27_04_p0cra0.jpg");
insert into images (product_id, image_stt, image_link) value (28,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749514/products/product_28_01_vulaz3.jpg");
insert into images (product_id, image_stt, image_link) value (28,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749514/products/product_28_02_dmefpx.jpg");
insert into images (product_id, image_stt, image_link) value (28,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749514/products/product_28_03_pdtcur.jpg");
insert into images (product_id, image_stt, image_link) value (28,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749514/products/product_28_04_r683kp.jpg");
insert into images (product_id, image_stt, image_link) value (29,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749514/products/product_29_01_tg126x.jpg");
insert into images (product_id, image_stt, image_link) value (29,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749514/products/product_29_02_ipzjgm.jpg");
insert into images (product_id, image_stt, image_link) value (29,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749514/products/product_29_03_hf2rma.jpg");
insert into images (product_id, image_stt, image_link) value (29,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749516/products/product_29_04_nagpev.jpg");
insert into images (product_id, image_stt, image_link) value (30,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1640672270/products/product_30_01_tgytwx.jpg");
insert into images (product_id, image_stt, image_link) value (30,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749515/products/product_30_02_ejplg5.jpg");
insert into images (product_id, image_stt, image_link) value (30,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749515/products/product_30_03_slokab.jpg");
insert into images (product_id, image_stt, image_link) value (30,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749515/products/product_30_04_slqfgm.jpg");
insert into images (product_id, image_stt, image_link) value (31,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749515/products/product_31_01_nnh8cr.jpg");
insert into images (product_id, image_stt, image_link) value (31,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749516/products/product_31_02_mn55ds.jpg");
insert into images (product_id, image_stt, image_link) value (31,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749516/products/product_31_03_hxlby9.jpg");
insert into images (product_id, image_stt, image_link) value (31,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749516/products/product_31_04_nyo6ab.jpg");
insert into images (product_id, image_stt, image_link) value (32,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749516/products/product_32_01_glrnda.jpg");
insert into images (product_id, image_stt, image_link) value (32,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749516/products/product_32_02_plkvyb.jpg");
insert into images (product_id, image_stt, image_link) value (32,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749516/products/product_32_03_s2d1ga.jpg");
insert into images (product_id, image_stt, image_link) value (32,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749516/products/product_32_04_sbg5kj.jpg");
insert into images (product_id, image_stt, image_link) value (33,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749516/products/product_33_01_ewuz6b.jpg");
insert into images (product_id, image_stt, image_link) value (33,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749517/products/product_33_02_dysz14.jpg");
insert into images (product_id, image_stt, image_link) value (33,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749517/products/product_33_03_bnkvpm.jpg");
insert into images (product_id, image_stt, image_link) value (33,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749517/products/product_33_04_l5gjda.jpg");
insert into images (product_id, image_stt, image_link) value (34,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749517/products/product_34_01_wopjxi.jpg");
insert into images (product_id, image_stt, image_link) value (34,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749517/products/product_34_02_u67mwc.jpg");
insert into images (product_id, image_stt, image_link) value (34,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749517/products/product_34_03_wovr5d.jpg");
insert into images (product_id, image_stt, image_link) value (34,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749518/products/product_34_04_yhfeyy.jpg");
insert into images (product_id, image_stt, image_link) value (35,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749518/products/product_35_01_dvgzt2.jpg");
insert into images (product_id, image_stt, image_link) value (35,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749518/products/product_35_02_b91y3u.jpg");
insert into images (product_id, image_stt, image_link) value (35,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749518/products/product_35_03_v6mgae.jpg");
insert into images (product_id, image_stt, image_link) value (35,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749519/products/product_35_04_ldaf4l.jpg");
insert into images (product_id, image_stt, image_link) value (36,1,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749519/products/product_36_01_uaw3zw.jpg");
insert into images (product_id, image_stt, image_link) value (36,2,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749519/products/product_36_02_uth7vw.jpg");
insert into images (product_id, image_stt, image_link) value (36,3,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749519/products/product_36_03_igsgcz.jpg");
insert into images (product_id, image_stt, image_link) value (36,4,"https://res.cloudinary.com/dmgslibjj/image/upload/v1637749519/products/product_36_04_lq5b2i.jpg");

ALTER TABLE roles AUTO_INCREMENT = 1;
insert into roles (role_name) value ("Super Admin");
insert into roles (role_name) value ("Admin");
insert into roles (role_name) value ("Customer");

ALTER TABLE users AUTO_INCREMENT = 1;
insert into users (password, firstname, lastname, address, phone, email, is_verified) value ("$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2","Đinh Trần Xuân", "Thi", "KTX Khu B, ĐHQG TPHCM","0879229037","thidinhxm@gmail.com", true);
insert into users (password, firstname, lastname, address, phone, email, is_verified) value ("$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2","Nguyễn Văn", "Trịnh", "KTX Khu B, ĐHQG TPHCM","0985965267","trinhngaytho69@gmail.com", true);
insert into users (password, firstname, lastname, address, phone, email, is_verified) value ("$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2","Trương Văn", "Hoàng", "KTX Khu B, ĐHQG TPHCM","0985965267","truongvanhoang@gmail.com", true);
insert into users (password, firstname, lastname, address, phone, email, is_verified) value ("$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2","Trần Trường", "Phú","780, Bà Lê Chân, Quận 9, Tp.Hồ Chí Minh","0853469739","HDP773@gmail.com", true);
insert into users (password, firstname, lastname, address, phone, email, is_verified) value ("$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2","Trần Duy", "Thắng","528, Bùi Viện, Tân Phú, Tp.Hồ Chí Minh","0852412711","TDT831@gmail.com", true);
insert into users (password, firstname, lastname, address, phone, email, is_verified) value ("$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2","Trần Hải", "Dương","940, Võ nguyên Giáp, Quận 8, Tp.Hồ Chí Minh","0805060228","NHT417@gmail.com", true);
insert into users (password, firstname, lastname, address, phone, email, is_verified) value ("$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2","Nguyễn Hải", "Phúc","602, Nguyễn Du, Quận 7, Tp.Hồ Chí Minh","0819806225","NVT561@gmail.com", true);
insert into users (password, firstname, lastname, address, phone, email, is_verified) value ("$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2","Hồ Duy", "Toàn","855, Tôn Thất Thuyết, Bình Chánh, Tp.Hồ Chí Minh","0324903110","TVT398@gmail.com", true);


insert into userroles (user_id, role_id) value (1,1);
insert into userroles (user_id, role_id) value (2,2);
insert into userroles (user_id, role_id) value (3,2);
insert into userroles (user_id, role_id) value (4,3);
insert into userroles (user_id, role_id) value (5,3);
insert into userroles (user_id, role_id) value (6,3);
insert into userroles (user_id, role_id) value (7,3);
insert into userroles (user_id, role_id) value (8,3);


ALTER TABLE carts AUTO_INCREMENT = 1;
insert into carts(user_id) value (4);
insert into carts(user_id) value (5);
insert into carts(user_id) value (6);
insert into carts(user_id) value (7);
insert into carts(user_id) value (8);


-- detail cart --
insert into detailcarts (cart_id, product_id, quantity) value (1,10,4);
insert into detailcarts (cart_id, product_id, quantity) value (1,32,4);
insert into detailcarts (cart_id, product_id, quantity) value (2,23,4);
insert into detailcarts (cart_id, product_id, quantity) value (2,30,4);
insert into detailcarts (cart_id, product_id, quantity) value (2,15,5);
insert into detailcarts (cart_id, product_id, quantity) value (3,21,2);
insert into detailcarts (cart_id, product_id, quantity) value (4,28,2);
insert into detailcarts (cart_id, product_id, quantity) value (4,12,3);
insert into detailcarts (cart_id, product_id, quantity) value (5,25,2);
insert into detailcarts (cart_id, product_id, quantity) value (5,15,3);
insert into detailcarts (cart_id, product_id, quantity) value (5,31,4);
insert into detailcarts (cart_id, product_id, quantity) value (5,6,4);
insert into detailcarts (cart_id, product_id, quantity) value (5,28,5);


-- voucher --
insert into vouchers (voucher_id, discount, start_date, end_date) value ("DISCOUNT10", 10, '2021-08-01', '2022-02-01');
insert into vouchers (voucher_id, discount, start_date, end_date) value ("DISCOUNT15", 15, '2021-08-01', '2022-02-01');
insert into vouchers (voucher_id, discount, start_date, end_date) value ("DISCOUNT20", 20, '2021-08-01', '2022-02-01');
insert into vouchers (voucher_id, discount, start_date, end_date) value ("DISCOUNT25", 25, '2021-08-01', '2022-02-01');
insert into vouchers (voucher_id, discount, start_date, end_date) value ("DISCOUNT30", 30, '2021-08-01', '2021-12-31');

-- order -- 
insert into orders (send_date, receive_date, create_date, total_price, user_id, order_status, receive_address, receive_phone, payment_status, voucher) value ("2021/12/2", "2021/12/15", "2021/12/1", 0,4,"Đã giao","528, Bùi Viện, Tân Phú, Tp.Hồ Chí Minh","0879229037", "Đã thanh toán", "DISCOUNT10");
insert into orders (send_date, receive_date, create_date, total_price, user_id, order_status, receive_address, receive_phone) value ("2022/01/19", "2022/02/01","2022/01/16",0,5,"Đang chờ xử lý","528, Bùi Viện, Tân Phú, Tp.Hồ Chí Minh","0879229037");
insert into orders (send_date, receive_date, create_date, total_price, user_id, order_status, receive_address, receive_phone) value ("2022/01/13", "2022/01/20", "2022/01/07", 0,6,"Đang giao","528, Bùi Viện, Tân Phú, Tp.Hồ Chí Minh","0879229037");
insert into orders (send_date, receive_date, create_date, total_price, user_id, order_status, receive_address, receive_phone) value ("2022/01/14", "2022/01/20", "2022/01/06",0,7,"Đang giao","528, Bùi Viện, Tân Phú, Tp.Hồ Chí Minh","0879229037");
insert into orders (send_date, receive_date, create_date, total_price, user_id, order_status, receive_address, receive_phone, payment_status) value ("2021/12/09", "2021/12/20", "2021/12/08", 0,8,"Đã giao","528, Bùi Viện, Tân Phú, Tp.Hồ Chí Minh","0879229037", "Đã thanh toán");





-- Order detail -- 
insert into detailorders (order_id, product_id, quantity) value (1,23,3);
insert into detailorders (order_id, product_id, quantity) value (1,34,2);
insert into detailorders (order_id, product_id, quantity) value (2,20,2);
insert into detailorders (order_id, product_id, quantity) value (2,18,3);
insert into detailorders (order_id, product_id, quantity) value (2,27,2);
insert into detailorders (order_id, product_id, quantity) value (2,32,2);
insert into detailorders (order_id, product_id, quantity) value (3,10,3);
insert into detailorders (order_id, product_id, quantity) value (3,3,2);
insert into detailorders (order_id, product_id, quantity) value (3,31,2);
insert into detailorders (order_id, product_id, quantity) value (3,34,2);
insert into detailorders (order_id, product_id, quantity) value (4,30,3);
insert into detailorders (order_id, product_id, quantity) value (5,21,3);
insert into detailorders (order_id, product_id, quantity) value (5,16,1);
insert into detailorders (order_id, product_id, quantity) value (5,4,2);


-- comments --
ALTER TABLE comments AUTO_INCREMENT = 1;
insert into comments (name, email, product_id, content) value ("Nguyễn Văn A", "nva@gmail.com", 26,"Món này có màu hồng không shop");
insert into comments (name, email, product_id, content) value ("Nguyễn Văn B", "nvb@gmail.com", 27,"Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into comments (name, email, product_id, content) value ("Nguyễn Văn C", "nvc@gmail.com", 27,"Hàng ok, phù hợp với giá tiền. Âm thanh nghe chuẩn. Giao hàng nhanh, gói hàng cẩn thận");
insert into comments (name, email, product_id, content) value ("Nguyễn Văn D", "nvd@gmail.com", 27,"Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into comments (name, email, product_id, content) value ("Nguyễn Văn E", "nve@gmail.com", 27,"tai nghe đẹp shop nhé.lâu lắm rồi mình mua hàng mà được khui seal như thế này.hàng đẹp long lanh nữa .âm pass hay và thời gian sử dụng hơn 4h.nói chung là ưng ý.bạn mình mượn dùng thử đã bảo đặt hộ cho 1 bộ rồi.chúc shop bán được nhiều hàng.");
insert into comments (name, email, product_id, content) value ("Nguyễn Văn F", "nvf@gmail.com", 26,"Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into comments (name, email, product_id, content) value ("Nguyễn Văn G", "nvg@gmail.com", 26,"Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into comments (name, email, product_id, content) value ("Nguyễn Văn H", "nvh@gmail.com", 26,"Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into comments (name, email, product_id, content) value ("Nguyễn Văn I", "nvi@gmail.com", 26,"Khá ưng sản phẩm giá rẻ hợp lí mà rất xịn xò lun hộp đựng nguyên seal , tặng kèm rất nh thứ từ ốp tới móc tới dán , tặng kèm cao su bọc tai nghe nữa , nói chung là vs giá như vậy thì rất ưng chỉ hi vọng bền thui dùng lâu mới bít đc mong là dùng lâu đc sẽ mua thêm cho gia đình, shop bọc hàng cẩn thận");

-- reviews --
ALTER TABLE reviews AUTO_INCREMENT = 1;
insert into reviews (user_id, product_id, rating, content) value (8,16,3," Đã nhận được hàng. Shop đóng gói cẩn thận chu đáo. Nguyên seal. Chưa dùng nên k biết tnao nhưng chắc ổn");
insert into reviews (user_id, product_id, rating, content) value (8,10,3," Đã nhận được hàng. Shop đóng gói cẩn thận chu đáo. Nguyên seal. Chưa dùng nên k biết tnao nhưng chắc ổn");
insert into reviews (user_id, product_id, rating, content) value (8,5,5," Đã nhận được hàng. Shop đóng gói cẩn thận chu đáo. Nguyên seal. Chưa dùng nên k biết tnao nhưng chắc ổn");
insert into reviews (user_id, product_id, rating, content) value (7,9,3," Mới đặt ngày được 1 ngày mà hàng đã về. Giao hàng siêu nhanh, tai nghe âm pass chắc , nghe được 4h . Đáng đồng tiền bát gạo. Bác giao hàng lại nhiệt tình vui tính. 5* cho shop.");
insert into reviews (user_id, product_id, rating, content) value (7,5,5," Mới đặt ngày được 1 ngày mà hàng đã về. Giao hàng siêu nhanh, tai nghe âm pass chắc , nghe được 4h . Đáng đồng tiền bát gạo. Bác giao hàng lại nhiệt tình vui tính. 5* cho shop.");
insert into reviews (user_id, product_id, rating, content) value (6,14,4," Khá ưng sản phẩm giá rẻ hợp lí mà rất xịn xò lun hộp đựng nguyên seal , tặng kèm rất nh thứ từ ốp tới móc tới dán , tặng kèm cao su bọc tai nghe nữa , nói chung là vs giá như vậy thì rất ưng chỉ hi vọng bền thui dùng lâu mới bít đc mong là dùng lâu đc sẽ mua thêm cho gia đình, shop bọc hàng cẩn thận");
insert into reviews (user_id, product_id, rating, content) value (6,28,4," Đã nhận được hàng. Shop đóng gói cẩn thận chu đáo. Nguyên seal. Chưa dùng nên k biết tnao nhưng chắc ổn");
insert into reviews (user_id, product_id, rating, content) value (6,4,4," Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into reviews (user_id, product_id, rating, content) value (6,17,3," Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into reviews (user_id, product_id, rating, content) value (6,31,3," tai nghe đẹp shop nhé.lâu lắm rồi mình mua hàng mà được khui seal như thế này.hàng đẹp long lanh nữa .âm pass hay và thời gian sử dụng hơn 4h.nói chung là ưng ý.bạn mình mượn dùng thử đã bảo đặt hộ cho 1 bộ rồi.chúc shop bán được nhiều hàng. ");
insert into reviews (user_id, product_id, rating, content) value (6,30,3," Đã nhận được hàng. Shop đóng gói cẩn thận chu đáo. Nguyên seal. Chưa dùng nên k biết tnao nhưng chắc ổn");
insert into reviews (user_id, product_id, rating, content) value (5,13,5," Đã nhận được hàng. Shop đóng gói cẩn thận chu đáo. Nguyên seal. Chưa dùng nên k biết tnao nhưng chắc ổn");
insert into reviews (user_id, product_id, rating, content) value (5,3,3," tai nghe đẹp shop nhé.lâu lắm rồi mình mua hàng mà được khui seal như thế này.hàng đẹp long lanh nữa .âm pass hay và thời gian sử dụng hơn 4h.nói chung là ưng ý.bạn mình mượn dùng thử đã bảo đặt hộ cho 1 bộ rồi.chúc shop bán được nhiều hàng. ");
insert into reviews (user_id, product_id, rating, content) value (4,12,5," tai nghe đẹp shop nhé.lâu lắm rồi mình mua hàng mà được khui seal như thế này.hàng đẹp long lanh nữa .âm pass hay và thời gian sử dụng hơn 4h.nói chung là ưng ý.bạn mình mượn dùng thử đã bảo đặt hộ cho 1 bộ rồi.chúc shop bán được nhiều hàng. ");
insert into reviews (user_id, product_id, rating, content) value (4,1,3," Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into reviews (user_id, product_id, rating, content) value (4,19,3," Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into reviews (user_id, product_id, rating, content) value (4,7,4," Khá ưng sản phẩm giá rẻ hợp lí mà rất xịn xò lun hộp đựng nguyên seal , tặng kèm rất nh thứ từ ốp tới móc tới dán , tặng kèm cao su bọc tai nghe nữa , nói chung là vs giá như vậy thì rất ưng chỉ hi vọng bền thui dùng lâu mới bít đc mong là dùng lâu đc sẽ mua thêm cho gia đình, shop bọc hàng cẩn thận");
insert into reviews (user_id, product_id, rating, content) value (4,16,4," Đã nhận được hàng. Shop đóng gói cẩn thận chu đáo. Nguyên seal. Chưa dùng nên k biết tnao nhưng chắc ổn");
insert into reviews (user_id, product_id, rating, content) value (4,30,5," tai nghe đẹp shop nhé.lâu lắm rồi mình mua hàng mà được khui seal như thế này.hàng đẹp long lanh nữa .âm pass hay và thời gian sử dụng hơn 4h.nói chung là ưng ý.bạn mình mượn dùng thử đã bảo đặt hộ cho 1 bộ rồi.chúc shop bán được nhiều hàng. ");
insert into reviews (user_id, product_id, rating, content) value (5,23,5," tai nghe đẹp shop nhé.lâu lắm rồi mình mua hàng mà được khui seal như thế này.hàng đẹp long lanh nữa .âm pass hay và thời gian sử dụng hơn 4h.nói chung là ưng ý.bạn mình mượn dùng thử đã bảo đặt hộ cho 1 bộ rồi.chúc shop bán được nhiều hàng. ");
insert into reviews (user_id, product_id, rating, content) value (5,31,4," Hàng ok, phù hợp với giá tiền. Âm thanh nghe chuẩn. Giao hàng nhanh, gói hàng cẩn thận");
insert into reviews (user_id, product_id, rating, content) value (5,3,5," Mới đặt ngày được 1 ngày mà hàng đã về. Giao hàng siêu nhanh, tai nghe âm pass chắc , nghe được 4h . Đáng đồng tiền bát gạo. Bác giao hàng lại nhiệt tình vui tính. 5* cho shop.");
insert into reviews (user_id, product_id, rating, content) value (6,23,3," Khá ưng sản phẩm giá rẻ hợp lí mà rất xịn xò lun hộp đựng nguyên seal , tặng kèm rất nh thứ từ ốp tới móc tới dán , tặng kèm cao su bọc tai nghe nữa , nói chung là vs giá như vậy thì rất ưng chỉ hi vọng bền thui dùng lâu mới bít đc mong là dùng lâu đc sẽ mua thêm cho gia đình, shop bọc hàng cẩn thận");
insert into reviews (user_id, product_id, rating, content) value (6,12,4," Khá ưng sản phẩm giá rẻ hợp lí mà rất xịn xò lun hộp đựng nguyên seal , tặng kèm rất nh thứ từ ốp tới móc tới dán , tặng kèm cao su bọc tai nghe nữa , nói chung là vs giá như vậy thì rất ưng chỉ hi vọng bền thui dùng lâu mới bít đc mong là dùng lâu đc sẽ mua thêm cho gia đình, shop bọc hàng cẩn thận");
insert into reviews (user_id, product_id, rating, content) value (6,25,4," Shop gói hàng cẩn thận.giao hàng nhanh.tai nghe rõ to dùng rất ok lun nha.mình đã mua của shop 3 lần rồi và lần nào cũng ổn.");
insert into reviews (user_id, product_id, rating, content) value (7,3,3," Hàng ok, phù hợp với giá tiền. Âm thanh nghe chuẩn. Giao hàng nhanh, gói hàng cẩn thận");
insert into reviews (user_id, product_id, rating, content) value (7,18,4," Mới đặt ngày được 1 ngày mà hàng đã về. Giao hàng siêu nhanh, tai nghe âm pass chắc , nghe được 4h . Đáng đồng tiền bát gạo. Bác giao hàng lại nhiệt tình vui tính. 5* cho shop.");
insert into reviews (user_id, product_id, rating, content) value (7,15,3," Mới đặt ngày được 1 ngày mà hàng đã về. Giao hàng siêu nhanh, tai nghe âm pass chắc , nghe được 4h . Đáng đồng tiền bát gạo. Bác giao hàng lại nhiệt tình vui tính. 5* cho shop.");


SET SQL_SAFE_UPDATES = 0;
-- update detail order --
UPDATE detailorders 
SET subtotal = (quantity * (SELECT price FROM products WHERE product_id = detailorders.product_id));

-- update Orders -- 
UPDATE orders as o
SET o.total_price = (SELECT SUM(subtotal) FROM detailorders WHERE order_id = o.order_id) * (1 - (SELECT IFNULL(discount,0) FROM vouchers WHERE voucher_id = o.voucher)/ 100)	
WHERE o.order_id IN (SELECT order_id FROM detailorders GROUP BY order_id);


UPDATE products 
    SET quantity = quantity - (SELECT SUM(quantity) FROM detailorders WHERE product_id = products.product_id),
    number_of_sales = number_of_sales + (SELECT SUM(quantity) FROM detailorders WHERE product_id = products.product_id)
    WHERE product_id IN (SELECT product_id FROM detailorders GROUP BY product_id);

UPDATE products
    SET average_rating = (SELECT AVG(rating) FROM reviews WHERE product_id = products.product_id)
    WHERE product_id IN (SELECT product_id FROM reviews GROUP BY product_id);




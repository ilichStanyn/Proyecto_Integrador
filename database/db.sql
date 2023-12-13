CREATE DATABASE FUNKO;

USE funko
GO

CREATE TABLE category (
  category_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  category_name varchar(100) NOT NULL,
  category_description varchar(255) DEFAULT NULL
);

/*
--
-- Volcado de datos para la tabla `category`
--
*/
INSERT INTO category (category_name, category_description) VALUES
( 'Funkos', 'Figuras coleccionables Funko Pop'),
( 'Remeras', 'Remeras de anime, series, peliculas y más'),
( 'LLaveros', 'Llaveros coleccionables');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licence`
--

CREATE TABLE licence (
  licence_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  licence_name varchar(45) NOT NULL,
  licence_description varchar(255) NOT NULL,
  licence_image varchar(255) DEFAULT NULL
);

--
-- Volcado de datos para la tabla `licence`
--

INSERT INTO licence (licence_name, licence_description, licence_image) VALUES
('Pokemon', 'Atrapa todos los que puedas y disfruta de una colección llena de amigos.', '/img/pokemon/pk-cover.jpg'),
('Star Wars', 'Disfruta de una saga que sigue agregando personajes a su colección.', '/img/star-wars/st-cover.jpg'),
('Harry Potter', 'Revive los recuerdos de una saga llena de magia y encanto.', '/img/harry-potter/hp-cover.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE product (
  product_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  product_name varchar(60) NOT NULL,
  product_description varchar(255) DEFAULT NULL,
  price decimal(10,2) NOT NULL,
  stock int(11) NOT NULL,
  discount int(11) DEFAULT NULL,
  sku varchar(30) NOT NULL,
  dues int(11) DEFAULT NULL,
  image_front varchar(200) DEFAULT NULL,
  image_back varchar(200) DEFAULT NULL,
  create_time timestamp NULL DEFAULT current_timestamp(),
  licence_id int(11) NOT NULL,
  category_id int(11) NOT NULL,
  CONSTRAINT FK_CATEGORY FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID),
  CONSTRAINT FK_LICENCE FOREIGN KEY (LICENCE_ID) REFERENCES LICENCE(LICENCE_ID)
);

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO product (product_name, product_description, price, stock, discount, sku, dues, image_front, image_back, licence_id, category_id) VALUES
( 'Baby Yoda Blueball', 'Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.', '1799.99', 8, 10, 'STW001001', 3, '/star-wars/baby-yoda-1.webp', '/star-wars/baby-yoda-box.webp',  2, 1),
( 'Luke Skylwalker & Grogu', 'Figura coleccionable de Luke Skylwalker & Grogu - The Mandalorian Saga.', '2399.99', 8, 10, 'STW001003', 3, '/star-wars/luke-1.webp', '/star-wars/luke-box.webp',  2, 1),
( 'Stormtrooper Lightsaber', 'Figura coleccionable de Stormtrooper Lightsaber - Star Wars Saga.', '1799.99', 8, 10, 'STW001004', 3, '/star-wars/trooper-1.webp', '/star-wars/trooper-box.webp',  2, 1),
( 'Charmander Smiley', 'Figura coleccionable de Charmander - Pokemon Saga.', '1799.99', 8, 10, 'PKM001001', 3, '/pokemon/charmander-1.webp', '/pokemon/charmander-box.webp',  1, 1),
( 'Dragonite Hi!', 'Figura coleccionable de Dragonite - Pokemon Saga.', '1799.99', 8, 10, 'PKM001002', 3, '/pokemon/dragonite-1.webp', '/pokemon/dragonite-box.webp',  1, 1),
( 'Pidgeotto Flying', 'Figura coleccionable de Pidgeotto - Pokemon Saga.', '1799.99', 8, 10, 'PKM00103', 3, '/pokemon/pidgeotto-1.webp', '/pokemon/pidgeotto-box.webp',  1, 1),
( 'Pikachu Smiley', 'Figura coleccionable de Pikachu - Pokemon Saga.', '1799.99', 8, 10, 'PKM001004', 3, '/pokemon/pikachu-1.webp', '/pokemon/pikachu-box.webp',  1, 1),
('Vulpix Fancy', 'Figura coleccionable de Vulpix - Pokemon Saga.', '99.99', 8, 10, 'PKM001005', 3, '/pokemon/vulpix-1.webp', '/pokemon/vulpix-box.webp',  1, 1),
( 'Harry Potter & Hegwid', 'Figura coleccionable de Harry Potter & Hegwid - Harry Potter Saga.', '1799.99', 11, 10, 'HPT0', 9, '/harry-potter/harry-1.webp', '/harry-potter/harry-box.webp',  3, 1),
( 'Herminione Ball Dress', 'Figura coleccionable de Herminione - Harry Potter Saga.', '1799.99', 8, 10, 'HPT001002', 3, '/harry-potter/hermione-1.webp', '/harry-potter/hermione-box.webp',  3, 1),
( 'Luna Lovegood Lion Mask', 'Figura coleccionable de Luna Lovegood - Harry Potter Saga.', '1799.99', 8, 10, 'HPT001003', 3, '/harry-potter/luna-1.webp', '/harry-potter/luna-box.webp',  3, 1),
( 'Snape Patronus', 'Figura coleccionable de Snape Patronus - Harry Potter Saga.', '1799.99', 13, 10, 'HPT001004', 3, '/harry-potter/snape-patronus-1.webp', '/harry-potter/snape-patronus-box.webp',  3, 1);

-- --------------------------------------------------------

-- LA TABLA DE ROL LA REMPLAZO X ES ADMIN CON UN VALOR BIT SI TIENE ESE VALOR PUEDE EDITAR
-- Estructura de tabla para la tabla `role`
--
/*
CREATE TABLE role (
  role_id int(11) NOT NULL,
  role_name varchar(60) NOT NULL
) 
GO
*/
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE USER (
  user_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username varchar(150) NOT NULL,
  password varchar(255) NOT NULL,
  firstname varchar(120) NOT NULL,
  lastname varchar(120) NOT NULL,
  is_Admin BIT(1) DEFAULT 0,
  create_time timestamp NULL DEFAULT current_timestamp
);

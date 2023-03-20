USE `booking_hotel`;

-- -----------------------------------------------------
-- Table `categories`
-- -----------------------------------------------------
INSERT INTO `categories` (id, title, description, image_url) VALUES (
    1, 'Hoteles',
    'Los hoteles proveen a los huéspedes de servicios adicionales como restaurantes, piscinas y guarderías. Algunos hoteles tienen servicios de conferencias y animan a la gente a organizar convenciones y reuniones en su establecimiento.',
    'https://forever.travel-assets.com/flex/flexmanager/images/2022/01/26/hob_aa_hotel.jpg'
);
INSERT INTO `categories` (id, title, description, image_url) VALUES (
    2, 'Departamentos',
    'Es una unidad de vivienda que comprende una o más habitaciones diseñadas para proporcionar instalaciones completas para un individuo o una pequeña familia.',
    'https://forever.travel-assets.com/flex/flexmanager/images/2022/01/19/hob_aa_apartment.jpg'
);
INSERT INTO `categories` (id, title, image_url) VALUES (
    3, 'Hostels',
    'https://forever.travel-assets.com/flex/flexmanager/images/2022/02/15/hob_aa_villa.jpg'
);
INSERT INTO `categories` (id, title, image_url) VALUES (
    4, 'Bed and Breakfast',
    'https://forever.travel-assets.com/flex/flexmanager/images/2022/02/15/hob_aa_b_and_b.jpg'
);

-- -----------------------------------------------------
-- Table `countries`
-- -----------------------------------------------------
INSERT INTO `countries` (id, name, code) VALUES(1, 'Argentina', 'AR');
INSERT INTO `countries` (id, name, code) VALUES(2, 'Uruguay', 'UY');

-- -----------------------------------------------------
-- Table `cities`
-- -----------------------------------------------------
INSERT INTO `cities` (id, name, country_id) VALUES(1, 'Buenos Aires', 1);
INSERT INTO `cities` (id, name, country_id) VALUES(2, 'La Plata', 1);
INSERT INTO `cities` (id, name, country_id) VALUES(3, 'Mar del Plata', 1);
INSERT INTO `cities` (id, name, country_id) VALUES(4, 'Mendoza', 1);
INSERT INTO `cities` (id, name, country_id) VALUES(5, 'Rosario', 1);
INSERT INTO `cities` (id, name, country_id) VALUES(6, 'Santa Fe', 1);
INSERT INTO `cities` (id, name, country_id) VALUES(7, 'Salta', 1);
INSERT INTO `cities` (id, name, country_id) VALUES(8, 'Córdoba', 1);
INSERT INTO `cities` (id, name, country_id) VALUES(9, 'Corrientes', 1);
INSERT INTO `cities` (id, name, country_id) VALUES(10, 'Montevideo', 2);
INSERT INTO `cities` (id, name, country_id) VALUES(11, 'Punta del Este', 2);
INSERT INTO `cities` (id, name, country_id) VALUES(12, 'Colonia', 2);

-- -----------------------------------------------------
-- Table `addresses`
-- -----------------------------------------------------
INSERT INTO `addresses` (id, street, number, city_id) VALUES(1, 'Av Macacha Guemes', 351, 1);
INSERT INTO `addresses` (id, street, number, city_id) VALUES(2, 'Las Araucarias', 1876, 2);
INSERT INTO `addresses` (id, street, number, city_id) VALUES(3, 'Av. Cordoba', 405, 1);
INSERT INTO `addresses` (id, street, number, city_id) VALUES(4, '9 de Julio', 3027, 3);

-- -----------------------------------------------------
-- Table `features`
-- -----------------------------------------------------
INSERT INTO `features` (id, title) VALUES (1, 'Desayuno');
INSERT INTO `features` (id, title) VALUES (2, 'Wifi');
INSERT INTO `features` (id, title) VALUES (3, 'Estacionamiento');
INSERT INTO `features` (id, title) VALUES (4, 'Aire acondicionado');
INSERT INTO `features` (id, title) VALUES (5, 'Piscina');
INSERT INTO `features` (id, title) VALUES (6, 'Gimnasio');
INSERT INTO `features` (id, title) VALUES (7, 'Sala de Reuniones');
INSERT INTO `features` (id, title) VALUES (8, 'Mascotas');

-- -----------------------------------------------------
-- Table `products`
-- -----------------------------------------------------
INSERT INTO `products` (id, title, description, category_id, address_id, availability) VALUES(
	1, 'Hilton Buenos Aires',
    'Hotel de lujo con acceso al centro de convenciones y 1 piscinas al aire libre cerca de Puente de la Mujer.',
    1, 1, true
);
INSERT INTO `products` (id, title, description, category_id, address_id, availability) VALUES(
	2, 'Casa Campus Pilar',
    'Departamento de 3 estrellas con piscina al aire libre, cerca de Universidad Austral y a una hora del aeropuerto de Buenos Aires.',
    2, 2, true
);
INSERT INTO `products` (id, title, description, category_id, address_id, availability) VALUES(
	3, 'NH Collection Buenos Aires',
    'Con una ubicación ideal en el corazón de la zona de negocios y cerca de las principales atracciones turísticas, el hotel NH Collection Buenos Aires Lancaster ofrece un toque distintivo de diseño inglés.',
    1, 3, true
);
INSERT INTO `products` (id, title, description, category_id, address_id, availability) VALUES(
	4, 'Hotel TreintaSeis',
    'El Hotel Treinta-Seis se encuentra en Mar del Plata, a 600 metros de la playa de La Perla, y ofrece alojamiento de 4 estrellas, jardín, terraza y bar. Este hotel de 4 estrellas cuenta con centro de fitness y habitaciones con aire acondicionado, WiFi gratuita y baño privado. El hotel cuenta con bañera de hidromasaje y servicio de habitaciones.
    
    Todos los alojamientos incluyen hervidor de agua. Algunas habitaciones del Hotel Treinta-Seis tienen balcón y todas incluyen TV de pantalla plana.
    
    El establecimiento sirve un desayuno buffet. El personal de la recepción del Hotel Treinta-Seis está disponible las 24 horas.
    
    Cerca del hotel hay varios lugares de interés, como la playa de Bristol, el casino central de Mar del Plata y la catedral de Mar del Plata. El aeropuerto más cercano es el aeropuerto internacional Astor Piazzolla, ubicado a 7 km del Hotel Treinta-Seis.',
    1, 4, true
);

-- -----------------------------------------------------
-- Table `images`
-- -----------------------------------------------------
INSERT INTO `images` (id, url, product_id) VALUES(
	1, 'https://images.trvl-media.com/lodging/1000000/550000/547000/546934/bedf1e5a.jpg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	2, 'https://images.trvl-media.com/lodging/1000000/550000/547000/546934/e2ab3a82.jpg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	3, 'https://images.trvl-media.com/lodging/1000000/550000/547000/546934/cb7f9724.jpg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	4, 'https://images.trvl-media.com/lodging/1000000/550000/547000/546934/315fa4e7.jpg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	5, 'https://images.trvl-media.com/lodging/1000000/550000/547000/546934/de486181.jpg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	6, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/15bec18c.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	7, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/e16d817d.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	8, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/8d4c1b77.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	9, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/67ac2a6f.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	10, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/889471f2.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	11, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/83377114.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	12, 'https://images.trvl-media.com/lodging/1000000/530000/523400/523305/69ace544.jpg', 3);
INSERT INTO `images` (id, url, product_id) VALUES(
	13, 'https://images.trvl-media.com/lodging/1000000/530000/523400/523305/3be89e0e.jpg', 3);
INSERT INTO `images` (id, url, product_id) VALUES(
	14,'https://images.trvl-media.com/lodging/1000000/530000/523400/523305/2824fb9a.jpg', 3);
INSERT INTO `images` (id, url, product_id) VALUES(
	15, 'https://images.trvl-media.com/lodging/90000000/89680000/89673100/89673045/3f91e0f4.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	16, 'https://images.trvl-media.com/lodging/90000000/89680000/89673100/89673045/01b9d05d.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	17, 'https://images.trvl-media.com/lodging/90000000/89680000/89673100/89673045/58efde70.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	18, 'https://images.trvl-media.com/lodging/90000000/89680000/89673100/89673045/3e1d8cff.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	19, 'https://images.trvl-media.com/lodging/90000000/89680000/89673100/89673045/cbeab648.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	20, 'https://images.trvl-media.com/lodging/90000000/89680000/89673100/89673045/5d7cdae5.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	21, 'https://images.trvl-media.com/lodging/90000000/89680000/89673100/89673045/d708fe7a.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	22, 'https://images.trvl-media.com/lodging/90000000/89680000/89673100/89673045/c5c7fa98.jpg', 4);

-- -----------------------------------------------------
-- Table `producto_has_caracteristica`
-- -----------------------------------------------------
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(1,1);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(1,2);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(1,3);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(1,4);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(1,5);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(2,2);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(2,3);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(2,4);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(2,5);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(2,8);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(3,1);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(3,2);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(3,3);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(3,4);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(3,5);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(3,6);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(4,1);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(4,2);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(4,3);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(4,4);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(4,6);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(4,7);

-- -----------------------------------------------------
-- Table `roles`
-- -----------------------------------------------------
INSERT INTO `roles` (id, title) VALUES(1, 'ADMIN');
INSERT INTO `roles` (id, title) VALUES(2, 'USER');
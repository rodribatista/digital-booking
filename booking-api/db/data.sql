USE `digitalbooking_db`;

-- -----------------------------------------------------
-- Table `categories`
-- -----------------------------------------------------
INSERT INTO `categories` (id, title, image_url) VALUES (
    1, 'Departamentos',
    'https://a0.muscache.com/im/pictures/miso/Hosting-691942884809132389/original/af311a3b-1124-46b8-a890-f206f722db20.jpeg'
);
INSERT INTO `categories` (id, title, image_url) VALUES (
    2, 'Casas',
    'https://a0.muscache.com/im/pictures/5925219/0c5e36e6_original.jpg'
);
INSERT INTO `categories` (id, title, image_url) VALUES (
    3, 'Habitaciones',
    'https://a0.muscache.com/im/pictures/ea6575e4-252c-4647-a860-9b9dbc736aa9.jpg'
);
INSERT INTO `categories` (id, title, image_url) VALUES (
    4, 'Cabañas',
    'https://a0.muscache.com/im/pictures/8230c37c-982e-425b-87f2-31fe2f64e355.jpg'
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
INSERT INTO `addresses` (id, street, number, city_id) VALUES(1, 'Av. Regimiento de Patricios', 1052, 1);
INSERT INTO `addresses` (id, street, number, city_id) VALUES(2, 'Av. Alicia Moreau de Justo', 1848, 1);
INSERT INTO `addresses` (id, street, number, city_id) VALUES(3, 'Moreno', 512, 1);
INSERT INTO `addresses` (id, street, number, city_id) VALUES(4, 'Aimé Painé', 1083, 1);
INSERT INTO `addresses` (id, street, number, city_id) VALUES(5, 'México', 840, 1);
INSERT INTO `addresses` (id, street, number, city_id) VALUES(6, 'Las Araucarias', 1876, 2);

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
	1, 'Moderno Loft con Amenites',
    'Amplio loft perfecto para aquellos que buscan una experiencia única en una de las zonas más turisticas de la ciudad. Situado en La Boca, a pocas cuadras de caminito, nuestro loft ofrece un ambiente moderno y sofisticado.',
    1, 1, true
);
INSERT INTO `products` (id, title, description, category_id, address_id, availability) VALUES(
	2, 'Studio estilo NY en Puerto Madero',
    'Tomate un descanso y relajate en este hermoso departamento estilo NY ubicado en puerto Madero.
    
    Totalmente equipado: heladera bajo mesada con congelador , cafetera, cocina con horno , vajilla completa , TV con chrome cast, ropa de cama, aire acondicionado y una espectacular cama king!
    
    El edificio cuenta con seguridad 24 hs, pileta climatizada, sauna, sector con camilla para masajes y gym.',
    1, 2, true
);
INSERT INTO `products` (id, title, description, category_id, address_id, availability) VALUES(
	3, 'La cisterna',
    'Apartamento tranquilo en el centro historico de Buenos Aires. El edificio cuenta con seguridad 24 horas .El departamento cuenta con cocina completamente equipada, cama de dos plazas, SmartTV y wifi de alta velocidad.
    
    Tienen acceso a la piscina que se encuentra en la terraza y una inmejorable vista desde el rooftop donde también esta el sum de cowork, para aquellas personas que necesitan atender su trabajo con modalidad HomeOffice ya que cuentan con Wifi. También en planta baja se encuentra un Museo que surgió debido a la construcción del edificio ya que en las excavaciones se encontró una cisterna de agua (la mas grande de Latinoamérica) con cientos de reliquias arqueológicas usadas por el año 1800. Según la historia dice que aquí funciono la casa de Gobierno de la Provincia de Buenos Aires y también vivió Juan Manuel de Rosas por el año 1850.',
    1, 3, true
);
INSERT INTO `products` (id, title, description, category_id, address_id, availability) VALUES(
	4, 'Molinos Faena Puerto Madero',
    'Espectacular departamento al frente de 80 m2 dividido en dos muy importantes ambientes, gran living comedor con muy buena vista y master suite con baño en mármol de carrara y vestidor.
    
    Cocina completa y toilette. Cuenta con cochera fija cubierta.
    
    Amenitis: Gimnasio, piscina, sauna y laundry.',
    1, 4, true
);
INSERT INTO `products` (id, title, description, category_id, address_id, availability) VALUES(
	5, 'Suite Boutique con Balcón en San Telmo',
    'Permítanos consentirlo en nuestro lujoso apartamento que cuenta con una cama doble, TV LED, Internet WiFi gratuito ilimitado e instalaciones para su estancia.
    
    En Boutique Apartments creemos que es nuestro deber hacer que su estadía en Buenos Aires sea memorable. Por esta razón, te ofrecemos un departamento con todos los servicios que buscas durante tu visita.
    
    Danos la oportunidad de acomodarte y nuestra promesa es que no te arrepentirás.
    
    Algunas de las características son:
    
    -Cama doble con ropa de cama
    -Toallas de baño, toallas de mano
    -Lavado corporal, champú y acondicionador.
    -Mesa funcional
    -Microondas y hervidor eléctrico en zona de cocina americana.
    -Acceso gratuito a Internet WiFi ilimitado
    -Balcón privado
    - Televisión
    - Baño
    - Estacionamiento de pago en el edificio.
    -Recepción las 24 horas
    -Piscina en la azotea durante la temporada de verano',
    3, 5, true
);
INSERT INTO `products` (id, title, description, category_id, address_id, availability) VALUES(
	6, 'Casa Campus Pilar',
    'Departamento de 3 estrellas con piscina al aire libre, cerca de Universidad Austral y a una hora del aeropuerto de Buenos Aires.',
    2, 6, true
);


-- -----------------------------------------------------
-- Table `images`
-- -----------------------------------------------------
INSERT INTO `images` (id, url, product_id) VALUES(
	1, 'https://a0.muscache.com/im/pictures/miso/Hosting-857567455105891648/original/77012f2e-1342-43ac-b264-34d3e36e6379.jpeg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	2, 'https://a0.muscache.com/im/pictures/miso/Hosting-857567455105891648/original/38ae53ba-05e1-4832-9769-9e1680a10e69.jpeg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	3, 'https://a0.muscache.com/im/pictures/miso/Hosting-857567455105891648/original/e7340bbb-b780-43c6-aa34-01b5b4e9185e.jpeg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	4, 'https://a0.muscache.com/im/pictures/miso/Hosting-857567455105891648/original/b99895e1-4637-4bc5-9546-17f4a8ec9f0e.jpeg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	5, 'https://a0.muscache.com/im/pictures/miso/Hosting-857567455105891648/original/44b47e88-f5da-4c3a-9694-334c17008fc8.jpeg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	6, 'https://a0.muscache.com/im/pictures/miso/Hosting-857567455105891648/original/cc3648c6-6b91-4c18-9c0c-e15fe2bef503.jpeg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	7, 'https://a0.muscache.com/im/pictures/miso/Hosting-857567455105891648/original/3fc4040c-d91e-44c7-85be-72061a113fa1.jpeg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	8, 'https://a0.muscache.com/im/pictures/miso/Hosting-857567455105891648/original/b39f3672-fbc1-4d62-910f-376027496e1b.jpeg', 1);
INSERT INTO `images` (id, url, product_id) VALUES(
	9, 'https://a0.muscache.com/im/pictures/b8f3cf97-39dc-444a-ac45-194969a0fe16.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	10, 'https://a0.muscache.com/im/pictures/04d92e05-121b-4064-934e-5e18d3167a07.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	11, 'https://a0.muscache.com/im/pictures/f452dff4-52f6-44c1-842d-2a3ce6541ecf.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	12, 'https://a0.muscache.com/im/pictures/4f546a55-c286-4b4b-b506-640c7df5ebd8.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	13, 'https://a0.muscache.com/im/pictures/f0c8033e-b6a9-4f38-9a29-921c616b40ce.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	14,'https://a0.muscache.com/im/pictures/f5a29955-8485-4d33-b7ed-b7955f97239c.jpg', 2);
INSERT INTO `images` (id, url, product_id) VALUES(
	15, 'https://a0.muscache.com/im/pictures/miso/Hosting-675345251089979317/original/23064d14-084c-4e17-b319-ebbc1f5df458.jpeg', 3);
INSERT INTO `images` (id, url, product_id) VALUES(
	16, 'https://a0.muscache.com/im/pictures/miso/Hosting-675345251089979317/original/71bba8a1-bcaa-4487-a58f-1ed7e9ad1a24.jpeg', 3);
INSERT INTO `images` (id, url, product_id) VALUES(
	17, 'https://a0.muscache.com/im/pictures/miso/Hosting-675345251089979317/original/7b4b6423-1dc3-4e0f-990e-5164c94914b8.jpeg', 3);
INSERT INTO `images` (id, url, product_id) VALUES(
	18, 'https://a0.muscache.com/im/pictures/miso/Hosting-675345251089979317/original/e46c7a19-c7e2-4a83-893e-5c9e41412957.jpeg', 3);
INSERT INTO `images` (id, url, product_id) VALUES(
	19, 'https://a0.muscache.com/im/pictures/miso/Hosting-675345251089979317/original/e1774b03-de52-45bc-b17a-8fdc90d9c566.jpeg', 3);
INSERT INTO `images` (id, url, product_id) VALUES(
	20, 'https://a0.muscache.com/im/pictures/miso/Hosting-32814057/original/360660da-90b4-451f-a146-0c3d8c1143cd.jpeg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	21, 'https://a0.muscache.com/im/pictures/b6312de6-65dd-4462-962a-fae9f0b4403c.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	22, 'https://a0.muscache.com/im/pictures/miso/Hosting-32814057/original/3cd77729-1159-4281-bba7-90a448128515.jpeg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	23, 'https://a0.muscache.com/im/pictures/0764fd08-c3ab-41d4-a37d-430f020f9bc2.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	24, 'https://a0.muscache.com/im/pictures/miso/Hosting-32814057/original/ecb37072-309d-48a6-b868-201492cb20e9.jpeg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	25, 'https://a0.muscache.com/im/pictures/54126762-92c9-465e-b3f3-c6c0d912d07d.jpg', 4);
INSERT INTO `images` (id, url, product_id) VALUES(
	26, 'https://a0.muscache.com/im/pictures/miso/Hosting-48287927/original/dc3a1a91-e731-4056-aa25-653f51ed9ded.jpeg', 5);
INSERT INTO `images` (id, url, product_id) VALUES(
	27, 'https://a0.muscache.com/im/pictures/b240efc8-17ad-441f-bd4e-ffdbe9161579.jpg', 5);
INSERT INTO `images` (id, url, product_id) VALUES(
	28, 'https://a0.muscache.com/im/pictures/miso/Hosting-48287927/original/1e175abf-79ac-43b0-a8f4-d2d55ed67a33.jpeg', 5);
INSERT INTO `images` (id, url, product_id) VALUES(
	29, 'https://a0.muscache.com/im/pictures/miso/Hosting-48287927/original/56319547-4eae-4dbd-8e83-273e185a94ab.jpeg', 5);
INSERT INTO `images` (id, url, product_id) VALUES(
	30, 'https://a0.muscache.com/im/pictures/miso/Hosting-48287927/original/f8b12bfe-dc75-4972-9df5-dcf1d3378207.jpeg', 5);
INSERT INTO `images` (id, url, product_id) VALUES(
	31, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/15bec18c.jpg', 6);
INSERT INTO `images` (id, url, product_id) VALUES(
	32, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/e16d817d.jpg', 6);
INSERT INTO `images` (id, url, product_id) VALUES(
	33, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/8d4c1b77.jpg', 6);
INSERT INTO `images` (id, url, product_id) VALUES(
	34, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/67ac2a6f.jpg', 6);
INSERT INTO `images` (id, url, product_id) VALUES(
	35, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/889471f2.jpg', 6);
INSERT INTO `images` (id, url, product_id) VALUES(
	36, 'https://images.trvl-media.com/lodging/10000000/9750000/9745700/9745625/83377114.jpg', 6);

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
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(5,2);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(5,3);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(5,4);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(5,5);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(6,2);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(6,3);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(6,4);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(6,5);
INSERT INTO `product_has_features` (product_id, feature_id) VALUES(6,8);

-- -----------------------------------------------------
-- Table `roles`
-- -----------------------------------------------------
INSERT INTO `roles` (id, title) VALUES(1, 'SUPERADMIN');
INSERT INTO `roles` (id, title) VALUES(2, 'ADMIN');
INSERT INTO `roles` (id, title) VALUES(3, 'USER');

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
INSERT INTO `users` (id, first_name, last_name, email, password, role_id) VALUES(
	1, 'Admin', 'Booking', 'admin@booking.com', 
    '$2a$10$k9lFPXAjYmJNphizjycH0.aqspLOF9SYyrkWXkWUF2KV2qwXb2d9.', 1);

INSERT INTO `users` (id, first_name, last_name, email, password, role_id) VALUES(
	2, 'Jane', 'Doe', 'jane.doe@mail.com', 
    '$2a$10$hWeJ32Zyvvz1T5F9s0vc/ehnY.ixlO/fIS6e5humeF4ghMstfqq3O', 2);
    
INSERT INTO `users` (id, first_name, last_name, email, password, role_id) VALUES(
	3, 'John', 'Doe', 'john@mail.com', 
    '$2a$10$hWeJ32Zyvvz1T5F9s0vc/ehnY.ixlO/fIS6e5humeF4ghMstfqq3O', 3);

-- -----------------------------------------------------
-- Table `bookings`
-- -----------------------------------------------------
INSERT INTO `bookings` (id, date_checkin, date_checkout, arrived_time, product_id, user_id)
VALUES(1, '2023-04-20', '2023-04-23', '14:00:00', 4, 3);

INSERT INTO `bookings` (id, date_checkin, date_checkout, arrived_time, product_id, user_id)
VALUES(2, '2023-04-21', '2023-04-23', '10:00:00', 1, 3);
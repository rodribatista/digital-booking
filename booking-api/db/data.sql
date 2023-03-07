INSERT INTO `categories` (id, title, description, image_url) VALUES (
    1,
    'Hoteles',
    'Los hoteles proveen a los huéspedes de servicios adicionales como restaurantes, piscinas y guarderías. Algunos hoteles tienen servicios de conferencias y animan a la gente a organizar convenciones y reuniones en su establecimiento.',
    'https://forever.travel-assets.com/flex/flexmanager/images/2022/01/26/hob_aa_hotel.jpg'
);

INSERT INTO `categories` (id, title, description, image_url) VALUES (
    2,
    'Departamentos',
    'Es una unidad de vivienda que comprende una o más habitaciones diseñadas para proporcionar instalaciones completas para un individuo o una pequeña familia.',
    'https://forever.travel-assets.com/flex/flexmanager/images/2022/01/19/hob_aa_apartment.jpg'
);

INSERT INTO `categories` (id, title, description, image_url) VALUES (
    3,
    'Hostels',
    '',
    'https://forever.travel-assets.com/flex/flexmanager/images/2022/02/15/hob_aa_villa.jpg'
);

INSERT INTO `categories` (id, title, description, image_url) VALUES (
    4,
    'Bed and Breakfast',
    '',
    'https://forever.travel-assets.com/flex/flexmanager/images/2022/02/15/hob_aa_b_and_b.jpg'
);

INSERT INTO `features` (id, title) VALUES (
    1,
    'Desayuno'
);

INSERT INTO `features` (id, title) VALUES (
    2,
    'Wifi'
);

INSERT INTO `features` (id, title) VALUES (
    3,
    'Estacionamiento'
);

INSERT INTO `features` (id, title) VALUES (
    4,
    'Aire acondicionado'
);

INSERT INTO `features` (id, title) VALUES (
    5,
    'Piscina'
);

INSERT INTO `features` (id, title) VALUES (
    6,
    'Gimnasio'
);

INSERT INTO `features` (id, title) VALUES(
    7,
    'Mascotas'
);

INSERT INTO `countries` (id, name, code) VALUES(
    1,
    'Argentina',
    'AR'
);

INSERT INTO `cities` (id, name, country_id) VALUES(
    1,
    'Buenos Aires',
    1
);

INSERT INTO `cities` (id, name, country_id) VALUES(
    2,
    'Mar del Plata',
    1
);

INSERT INTO `cities` (id, name, country_id) VALUES(
    3,
    'Mendoza',
    1
);

INSERT INTO `cities` (id, name, country_id) VALUES(
    4,
    'Rosario',
    1
);

INSERT INTO `cities` (id, name, country_id) VALUES(
    5,
    'Salta',
    1
);

INSERT INTO `cities` (id, name, country_id) VALUES(
    6,
    'Córdoba',
    1
);
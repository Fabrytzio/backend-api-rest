-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-11-2022 a las 00:13:33
-- Versión del servidor: 10.9.3-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blogdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` binary(16) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `google_auth` tinyint(1) DEFAULT 0,
  `deleted` tinyint(1) DEFAULT 0,
  `id_Rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `google_auth`, `deleted`, `id_Rol`) VALUES
(0x4c5aeb8656eb11ed8e19d518f482addb, 'Raiden Shogun', 'shogunraiden', 'shogunraiden@genshin.in', 'mikodaisuki', 0, 1, 1),
(0xb0e7baab57cb11ed8e6ad61c06ccec3b, 'Mona Megistus', 'moname', 'megistrus@genshin.in', '$2a$10$cdLyhSMJ5hbEzjT8gb4/5Ot/VVqPwoJnpAcSHqnIryrRlBPAZoBYq', 0, 0, 2),
(0xb511a7b95a0a11ed8e2dd519f894fd35, 'Kamisato Ayaka', 'Kamisato', 'kamisato@genshin.in', '$2a$10$2p1lVQqa03ScHUbVGjCzkeAZsR/SDmsdGBpS6vbt1PirkIN9EahvO', 0, 0, 2),
(0xf547c0a557c911ed8e6ad61c06ccec3b, 'Yae Miko', 'yaemiko', 'yaemiko@genshin.in', '$2a$10$g6TrvYVTEo62N.mx7BdsK.3/yYKAR9EO2sEQwBTS7e1QpkJpvtDz2', 0, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_role` (`id_Rol`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`id_Rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-11-2022 a las 00:15:11
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
-- Estructura de tabla para la tabla `anime_entries`
--

CREATE TABLE `anime_entries` (
  `id` int(11) NOT NULL,
  `title` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_url` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` smallint(6) NOT NULL,
  `synopsis` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `green` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `yellow` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `red` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `author` char(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `anime_entries`
--

INSERT INTO `anime_entries` (`id`, `title`, `cover_url`, `rating`, `synopsis`, `green`, `yellow`, `red`, `deleted`, `author`) VALUES
(1, 'Jujutsu Kaisen', 'https://somoskudasai.com/wp-content/uploads/2020/09/Eh1k1CtVkAA80nA-1-edit.jpeg', 10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1, '4c5aeb86-56eb-11ed-8e19-d518f482addb');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anime_entries`
--
ALTER TABLE `anime_entries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `title` (`title`),
  ADD KEY `fk_author` (`author`),
  ADD KEY `dsadsadas` (`author`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anime_entries`
--
ALTER TABLE `anime_entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `anime_entries`
--
ALTER TABLE `anime_entries`
  ADD CONSTRAINT `fk_author` FOREIGN KEY (`author`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

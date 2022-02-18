<?php   
include_once "cors.php";
$mensaje = json_decode(file_get_contents("php://input"));
include_once "funciones.php";


// CREATE TABLE IF NOT EXISTS videojuegos(
//     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     nombre VARCHAR(255) NOT NULL,
//     precio  DECIMAL(9,2) NOT NULL,
//     calificacion  TINYINT NOT NULL
// );

$resultado = enviarMensaje($mensaje);
echo json_encode($resultado);

<?php
include_once "cors.php";
$mensaje = json_decode(file_get_contents("php://input"));
include_once "funciones.php";
$resultado = enviarUsuario($mensaje);
echo json_encode($resultado);

<?php
include_once "cors.php";
include_once "funciones.php";
$mensajes = obtenerChat();
echo json_encode($mensajes);

<?php
include_once "cors.php";
include_once "funciones.php";
$mensajes = eliminarChat();
echo json_encode($mensajes);

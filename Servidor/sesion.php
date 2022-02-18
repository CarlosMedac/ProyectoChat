<?php   
include_once "cors.php";
$mensaje = json_decode(file_get_contents("php://input"));
$nombre = $mensaje->nombre;
$pass = $mensaje->pass;
include_once "funciones.php";
$resultado = obtenerUsuario();
while($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
    if($nombre==$row["user"]&&$pass==$row["pass"]){
    echo json_encode($row["pass"]);
    }
  }


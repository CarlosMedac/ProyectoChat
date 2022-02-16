<?php
function enviarMensaje($mensaje)
{
    $hoy = date("H:i"); 
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("INSERT INTO chat(fecha, mensaje, user) VALUES (?, ?, ?)");
    return $sentencia->execute([$hoy, $mensaje->mensaje, $mensaje->nombre]);
}

function obtenerChat()
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT id, fecha, mensaje, user FROM chat order by id asc");
    return $sentencia->fetchAll();
}

function obtenerUsuario()
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT * FROM usuarios");
    return $sentencia;
}
function enviarUsuario($mensaje)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("INSERT INTO usuarios(user, pass) VALUES (?, ?)");
    return $sentencia->execute([$mensaje->nombre, $mensaje->pass]);
}
function obtenerVariableDelEntorno($key)
{
    if (defined("_ENV_CACHE")) {
        $vars = _ENV_CACHE;
    } else {
        $file = "env.php";
        if (!file_exists($file)) {
            throw new Exception("El archivo de las variables de entorno ($file) no existe. Favor de crearlo");
        }
        $vars = parse_ini_file($file);
        define("_ENV_CACHE", $vars);
    }
    if (isset($vars[$key])) {
        return $vars[$key];
    } else {
        throw new Exception("La clave especificada (" . $key . ") no existe en el archivo de las variables de entorno");
    }
}
function obtenerConexion()
{
    $password = obtenerVariableDelEntorno("MYSQL_PASSWORD");
    $user = obtenerVariableDelEntorno("MYSQL_USER");
    $dbName = obtenerVariableDelEntorno("MYSQL_DATABASE_NAME");
    $database = new PDO('mysql:host=localhost;dbname=' . $dbName, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}
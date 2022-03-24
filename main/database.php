<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "SERVER IP";
$database = "DATABASE NAME";
$username = "DB USERNAME";
$password = "DB PASSWORD";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  console.log("Connection failed: " . $conn->connect_error);
}

?>

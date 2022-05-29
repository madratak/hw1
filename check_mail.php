<?php
$conn = mysqli_connect("localhost","root","","blog") or die(mysqli_error($conn));
$mail = mysqli_real_escape_string($conn, $_GET['q']);
$query = "SELECT Mail FROM User where Mail='".$mail."'";
$res = mysqli_query($conn,$query);
echo json_encode(array('exists' => mysqli_num_rows($res)> 0 ? true : false));
mysqli_close($conn);
?>
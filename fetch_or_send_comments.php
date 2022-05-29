<?php
    session_start();
    if(isset($_GET["playlist"])&isset($_GET["creator"])){
        $conn = mysqli_connect("localhost","root","","blog") or die(mysqli_connect_error());
        $user = mysqli_real_escape_string($conn,$_SESSION["username"]);
        $playlist = mysqli_real_escape_string($conn,$_GET["playlist"]);
        $creator = mysqli_real_escape_string($conn,$_GET["creator"]);
        
        if(isset($_GET["comment"])){
            if(!empty($_GET["comment"])){
                $comment = mysqli_real_escape_string($conn,$_GET["comment"]);
                $query = "INSERT INTO Comments(User, Playlist_creator, Playlist_name, Comment) VALUES('$user', '$creator', '$playlist', '.$comment.')";
                mysqli_query($conn, $query) or die (mysqli_error($conn));   
            }
        }
        
        $query = "SELECT U.Username AS username, C.Comment AS comment, C.Data AS time
                  FROM Comments C JOIN User U on C.User like U.Username WHERE C.Playlist_creator='$creator' AND C.Playlist_name='$playlist'
                  ORDER BY time DESC";

        $res = mysqli_query($conn,$query) or die(mysqli_error($conn));
        $allComments = array();
        while($row = mysqli_fetch_assoc($res)) {
            $allComments[] = array('username' => $row['username'], 'comment' => $row['comment'], 'time' => getTime($row['time']));
        }
        $allInfo[] = array('creator' => $creator, 'playlist' => $playlist, 'allComments' => $allComments);
        echo json_encode($allInfo);
        mysqli_close($conn);
        exit;        
    }

    function getTime($timestamp) {       
        $old = strtotime($timestamp); 
        $diff = time() - $old;           
        $old = date('d/m/y', $old);

        if ($diff /60 <1) {
            return intval($diff%60)." sec";
        } else if ($diff / 60 < 60) {
            return intval($diff/60)." min";
        } else if ($diff / 3600 <24) {
            return intval($diff/3600) . " h";
        } else if ($diff/86400 < 30) {
            return intval($diff/86400) . " g";
        } else {
            return $old; 
        }
    }
?>
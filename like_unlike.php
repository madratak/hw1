<?php
    session_start();
    if(isset($_GET["likeTF"])&isset($_GET["playlist"])&isset($_GET["creator"])){
        $conn = mysqli_connect("localhost","root","","blog") or die(mysqli_connect_error());
        $user = mysqli_real_escape_string($conn,$_SESSION["username"]);
        $likeTF = mysqli_real_escape_string($conn,$_GET["likeTF"]);
        $playlist = mysqli_real_escape_string($conn,$_GET["playlist"]);
        $creator = mysqli_real_escape_string($conn,$_GET["creator"]);

        if($likeTF == 'true')
            $query = "INSERT INTO Likes(User, Playlist_creator, Playlist_name) VALUES ('$user','$creator','$playlist')";
        if($likeTF == 'false')
            $query = "DELETE FROM Likes WHERE User='$user' AND Playlist_creator='$creator' AND Playlist_name='$playlist'";
    
        $res = mysqli_query($conn,$query) or die(mysqli_error($conn));
        // echo $res;

        $query = "SELECT Num_likes FROM Playlist WHERE Creator='$creator' AND Name='$playlist'";
        $res = mysqli_query($conn,$query) or die(mysqli_error($conn));
        $row = mysqli_fetch_assoc($res);
        echo $row['Num_likes'];
        mysqli_close($conn);        
    }
?>
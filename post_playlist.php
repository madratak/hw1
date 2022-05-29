<?php
    session_start();
    if (!isset($_SESSION["username"]))
        exit;

    if(!empty($_GET["title"])&&!empty(json_decode($_GET["urlSongsPost"]))){
        $conn = mysqli_connect("localhost","root","","blog") or die(mysqli_connect_error());
        $user = mysqli_real_escape_string($conn,$_SESSION["username"]);
        $title = mysqli_real_escape_string($conn,$_GET["title"]);
        $caption = mysqli_real_escape_string($conn,$_GET["caption"]);
        $urlSongsPost = json_decode($_GET["urlSongsPost"]);

        $query = "SELECT * FROM Playlist WHERE Creator='$user' AND Name='$title'";
        $res = mysqli_query($conn,$query);
        if(mysqli_num_rows($res)> 0) {
            echo "Presente";
            exit;
        }
        $query = "INSERT INTO Playlist (Creator, Name, Comment) VALUES ('$user', '$title', '$caption')";
            print_r( mysqli_query($conn, $query) or die(mysqli_error($conn)) );
            
        foreach($urlSongsPost as $urlSong){
            $query = "INSERT INTO Contents (Playlist_creator,Playlist_name, Song) VALUES ('$user', '$title', '$urlSong')";
            echo mysqli_query($conn, $query) or die(mysqli_error($conn));
        }
        mysqli_close($conn);
        exit;
    }
    echo "Dati mancanti";
?>
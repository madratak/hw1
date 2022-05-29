<?php
    session_start();
    if (!isset($_SESSION["username"])) 
        exit;
    $conn = mysqli_connect("localhost","root","","blog") or die(mysqli_connect_error());
    $user = mysqli_real_escape_string($conn,$_SESSION["username"]);

    $query = "SELECT U.Username AS username, U.Profile_picture AS picture,
    P.Name AS title, P.Comment AS content, P.Num_likes AS num_likes, P.Data AS data,
    EXISTS(SELECT user FROM likes WHERE Playlist_name = title AND user = '$user') AS liked
    from User U join Playlist P on U.Username like P.Creator where U.Username IN
    (select U1.Username from User U1 join Following F on U1.username like F.Followed
    where F.Follower like '$user') OR P.Creator like '$user' ORDER BY P.data DESC;";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    $postsArray = array();
    while($row = mysqli_fetch_assoc($res)) {
        $picture = $row['picture'] == null ? "images/default-avatar.png" : $row['picture'];
        $time = getTime($row['data']);
        $title = $row["title"];
        $username = $row["username"];
        $query1 = "SELECT C.Song AS song FROM Contents C WHERE C.Playlist_creator LIKE '$username' and C.Playlist_name LIKE '$title';";


        $res1 = mysqli_query($conn, $query1) or die(mysqli_error($conn));
        $songs = array();
        while($row1 = mysqli_fetch_assoc($res1)) {
            array_push($songs, $row1['song']);
        }
        /*print_r($songs);*/

        $postsArray[] = array('username' => $username, 'picture' => $picture, 'title' => $title,
        'num_likes' => $row['num_likes'], 'content' => $row['content'],'time' => "$time", 'liked' => $row['liked'], 'songs' => $songs);
    }
    /*print_r($postsArray);*/
    echo json_encode($postsArray);
    
    exit;

    function getTime($timestamp) {           
        $old = strtotime($timestamp); 
        $diff = time() - $old;           
        $old = date('d/m/y', $old);

        if ($diff /60 <1) {
            return intval($diff%60)." secondi fa";
        } else if (intval($diff/60) == 1)  {
            return "Un minuto fa";  
        } else if ($diff / 60 < 60) {
            return intval($diff/60)." minuti fa";
        } else if (intval($diff / 3600) == 1) {
            return "Un'ora fa";
        } else if ($diff / 3600 <24) {
            return intval($diff/3600) . " ore fa";
        } else if (intval($diff/86400) == 1) {
            return "Ieri";
        } else if ($diff/86400 < 30) {
            return intval($diff/86400) . " giorni fa";
        } else {
            return $old; 
        }
    }
?>

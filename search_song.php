<?php
    $client_id = 'ed34d83b4b5e420d8b0543289968aab1';
    $client_secret = '3cca77fa9a81439e996c069d3492d4f1';
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://accounts.spotify.com/api/token");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
    $headers = array("Authorization: Basic ".base64_encode($client_id.":".$client_secret));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    $token=json_decode(curl_exec($curl))->access_token;
    curl_close($curl);
    $type=$_GET['type'];
    if($type=="playlist"){
        $url = 'https://api.spotify.com/v1/playlists/44SmkW2zYTkTxVXBTZU7In/tracks';
    } elseif($type=="track"){
        $query = urlencode($_GET["q"]);
        $url = 'https://api.spotify.com/v1/search?type=track&limit=20&q='.$query ;
    }
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$token)); 
    $res=curl_exec($curl);
    curl_close($curl);
    // print_r($res);
    $output=[];
    // echo $res;
    if($type=="playlist"){
        $temp=json_decode($res)->items;
        for($i=0; $i<50; $i++){
            $output[] = $temp[$i]->track->id;
        }
    } elseif($type=="track"){
        $temp=json_decode($res)->tracks->items;    
        for($i=0; $i<20; $i++){
            $output[] = $temp[$i]->id;
        }
    }
    echo json_encode($output);
?>
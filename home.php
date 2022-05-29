<?php
    session_start();
    if(!isset($_SESSION["username"]))
    {
        if(!isset($_COOKIE["username"])){

            header("Location: login.php");
            exit;
        }
        else{
            $_SESSION["username"]= $_COOKIE["username"];
        }
    }
?>

<html>
    <head>
        <link rel='stylesheet' href='./style/home.css'>
        <script src='./scripts/home.js' defer></script>
        <link href="http://fonts.cdnfonts.com/css/gotham" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="images/favicon.png">

        <title>Blog</title>
    </head>
        
    <body>
        <div id="sidebar">
            <div id="side_up">    
                <img id="img_blog" src="./images/blog.png">
                <article class="option" id="new_post">
                <svg class="icon_list" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                    New Post
                </article>
                <a class="option">
                    <svg class="icon_list" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"/></svg>
                    Home
                </a>
                <a class="option">
                    <svg class="icon_list" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
                    Cerca
                <a>
                <a class="option">
                    <?xml version="1.0" encoding="utf-8"?><svg class="icon_list" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 121.42" style="enable-background:new 0 0 122.88 121.42" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M0,121.42l0-19.63c10.5-4.67,42.65-13.56,44.16-26.41c0.34-2.9-6.5-13.96-8.07-19.26 c-3.36-5.35-4.56-13.85-0.89-19.5c1.46-2.25,0.84-10.44,0.84-13.53c0-30.77,53.92-30.78,53.92,0c0,3.89-0.9,11.04,1.22,14.1 c3.54,5.12,1.71,14.19-1.27,18.93c-1.91,5.57-9.18,16.11-8.56,19.26c2.31,11.74,32.13,19.63,41.52,23.8l0,22.23L0,121.42L0,121.42z"/></g></svg>
                    Profilo
                </a>            
            </div>
            <div id="side_down">
                <a class="option" href="logout.php">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon_list icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>
                    Logout
                </a>
            </div>
        </div>
        <div id="contents"></div>









        <div id="comments">
            <div id="up_comments">
                <div id="start_view">
                    Seleziona   <img src="./assets/comment.svg"> di una playlist per visualizzarne i commenti.
                </div>
                
            </div>         
            <div class="comment_form">
                <form id="inputComment" autocomplete="off">
                    <input type="text" name="comment" maxlength="254" placeholder="Scrivi un commento..." required="required">
                    <input type="submit">
                    <input type="hidden" name="postid">
                </form>
            </div>
        </div>

        

        <div id="modal" class="hidden">
            
            <div id="modal_content">
                <section id="upper_modal">
                    <div id="close_modal">        
                        <button>
                            <?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.879px" height="122.879px" viewBox="0 0 122.879 122.879" enable-background="new 0 0 122.879 122.879" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#FF4141" d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z"/></g></svg>
                        </button>
                        <text>New post</text>
                    </div>
                    <div id="back_button" class="hidden">
                        🔙
                    </div>
                    <div id="continue_button">
                        Avanti
                    </div>   
                </section>
                
                <form id="search_song">
                    <svg class="profile_img" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="spotify" class="svg-inline--fa fa-spotify fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="#7e838d" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path></svg>
                    <input type="text" name="search" id="searchbox" placeholder="Cerca la canzone...">
                    <input type="submit" value="Cerca">
                    <textarea id="insertName" placeholder="Inserisci il nome della playlist" class="hidden"></textarea>
                    <textarea id="insertCaption" placeholder="Inserisci una didascalia" class="hidden"></textarea>
                </form>
                <div id="propSongs"></div>
                <div id="searchedSongs"></div>
                <div class="success-animation hidden">
                    <svg class="checkmark " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </div>
            </div>
        </div>
    </body>
</html>
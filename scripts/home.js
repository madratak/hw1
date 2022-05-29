// Modal
function closeModal(event){

    modal.classList.add("hidden");
    offContentSwitch();
    randomLoad();
    document.querySelector("#propSongs").classList.remove("hidden");
    document.querySelector("#searchedSongs").classList.add("hidden");
    document.getElementById("propSongs").classList.remove("hidden");
    document.getElementById("search_song").classList.remove("hidden");
    document.querySelector(".success-animation").classList.add("hidden");
    document.getElementById("searchbox").value="";
}

function openModal(){
    modal.classList.remove("hidden");
}

const modal = document.querySelector("#modal");
const newPostButton = document.querySelector("#new_post");
newPostButton.addEventListener('click', openModal);
const closeModalButton = document.querySelector("#close_modal svg");
closeModalButton.addEventListener('click',closeModal);

function switchLayoutModal(){
    document.querySelector("#propSongs").classList.remove("hidden");
    document.querySelector("#searchedSongs").classList.add("hidden");
}

document.querySelector("#search_song svg").addEventListener('click', switchLayoutModal);

// CARICAMENTO CANZONI IN MODALE CON RICERCA E DEFAULT
function jsonSearch(json){
    const searchedSongsContainer = document.getElementById("searchedSongs");
    const searchedSongs = searchedSongsContainer.querySelectorAll(".proposal");
    for(const searchedSong of searchedSongs)
        searchedSong.classList.add("hidden");
    searchedSongsContainer.innerHTML="";
    const propsContainer = document.querySelector("#propSongs");
    searchedSongsContainer.classList.add("hidden");
    propsContainer.classList.add('hidden');
    const container = propsContainer.parentElement;
    const loading = document.createElement('img');
    loading.src = "./assets/loading.svg";
    loading.className = "loading";
    container.appendChild(loading);
    const chosenSongs = document.querySelectorAll(".chosenSong");
   for(let trackID of json){
        const iframe = document.createElement('iframe');
        iframe.src = "https://open.spotify.com/embed/track/"+trackID;
        iframe.frameBorder = 0;
        iframe.setAttribute('allowtransparency', 'true');
        iframe.allow = "encrypted-media";
        iframe.classList = "track_iframe";

        const prop= document.createElement('div');
        prop.classList.add('prop');

        prop.appendChild(iframe);

        const proposal=document.createElement('div');
        proposal.classList.add('proposal');
        const checkbox=document.createElement("input");
        checkbox.type="checkbox";
        for(const chosenSong of chosenSongs){
            if(chosenSong.childNodes[0].src==="https://open.spotify.com/embed/track/"+trackID){
                checkbox.checked=true;
                break;
            }
        }
        proposal.appendChild(checkbox);
        proposal.appendChild(prop);
        searchedSongsContainer.appendChild(proposal);
    }
    setTimeout(function(){loading.remove();searchedSongsContainer.classList.remove("hidden");}, 1000);
    
    const checkButtons = document.querySelectorAll('.proposal input[type=checkbox]');
    // console.log(checkButton.length);
    for(let i=0; i<checkButtons.length; i++){
        if(checkButtons[i].checked)
            checkButtons[i].addEventListener('click',forgetIDFrame);
        else
            checkButtons[i].addEventListener('click',rememberIDFrame);
    }
}

function search(event){
    const textInput = event.currentTarget.querySelector('input[type=text]').value;
    event.preventDefault();
    document.getElementById('searchbox').blur();
    fetch("search_song.php?&type=track&q=" + encodeURIComponent(textInput)).then(response=>response.json()).then(jsonSearch);
}

function jsonDefaultSearch(json){
    const propsContainer = document.querySelector("#propSongs");
    const searchedSongsContainer = document.querySelector("#searchedSongs");
    propsContainer.innerHTML="";
    searchedSongsContainer.classList.add("hidden");
    propsContainer.classList.add('hidden');
    const container = propsContainer.parentElement;
    const loading = document.createElement('img');
    loading.src = "./assets/loading.svg";
    loading.className = "loading";
    container.appendChild(loading);
    const chosenSongs = document.querySelectorAll(".chosenSong");
   for(let trackID of json){
        const iframe = document.createElement('iframe');
        iframe.src = "https://open.spotify.com/embed/track/"+trackID;
        iframe.frameBorder = 0;
        iframe.setAttribute('allowtransparency', 'true');
        iframe.allow = "encrypted-media";
        iframe.classList = "track_iframe";

        const prop= document.createElement('div');
        prop.classList.add('prop');

        prop.appendChild(iframe);

        const proposal=document.createElement('div');
        proposal.classList.add('proposal');

        const checkbox=document.createElement("input");
        checkbox.type="checkbox";
        // console.log("https://open.spotify.com/embed/track/"+trackID);
        for(const chosenSong of chosenSongs){
            if(chosenSong.childNodes[0].src==="https://open.spotify.com/embed/track/"+trackID){
                checkbox.checked=true;
                break;
            }
        }
        proposal.appendChild(checkbox);
        proposal.appendChild(prop);
        propsContainer.appendChild(proposal);
    }
    setTimeout(function(){loading.remove();propsContainer.classList.remove('hidden');}, 1000);
    
    const checkButtons = document.querySelectorAll('.proposal input[type=checkbox]');
    // console.log(checkButton.length);
    for(let i=0; i<checkButtons.length; i++){
        if(checkButtons[i].checked)
            checkButtons[i].addEventListener('click',forgetIDFrame);
        else
            checkButtons[i].addEventListener('click',rememberIDFrame);
    }
}

function randomLoad(){
    fetch("search_song.php?&type=playlist").then(response=>response.json()).then(jsonDefaultSearch);
}

randomLoad();
const searchButton= document.querySelector("#search_song");
searchButton.addEventListener('submit', search);

//CREAZIONE POST
function forgetIDFrame(event){
    const containerFrame = event.currentTarget.parentNode.querySelector('.prop');
    /*const checkbox = containerFrame.parentNode.parentNode.querySelector('input[type=checkbox]');*/
    const containerSongs = document.querySelector('#propSongs');
    const chosenSongs = containerSongs.querySelectorAll(".chosenSong");
    /*console.log(chosenSongs.length);*/
    for(let i=0; i<chosenSongs.length; i++){
        /*console.log(chosenSongs[i]);
        console.log("Sto per leggere il src del frame");
        console.log(chosenSongs[i].childNodes[0].src);
        console.log(containerFrame.childNodes[0].src);*/
        if(chosenSongs[i].childNodes[0].src === containerFrame.childNodes[0].src){
            chosenSongs[i].innerHTML='';
            chosenSongs[i].parentNode.removeChild(chosenSongs[i]);
            // console.log('rimosso');
            break;
        }
    }

    const checkButtons = document.querySelectorAll('.proposal input[type=checkbox]');
    for(const checkButton of checkButtons){
        if(checkButton.parentNode.querySelector("iframe").src===containerFrame.childNodes[0].src){
            checkButton.checked=false;
            checkButton.removeEventListener('click',forgetIDFrame);
            checkButton.addEventListener('click', rememberIDFrame);
        }
    }  
}

function rememberIDFrame(event){
    const containerFrame = event.currentTarget.parentNode.querySelector('.prop');
    // console.log("selezionato");
    // console.log(containerFrame.childNodes[0].src);
    const chosenFrame = document.createElement('iframe');
    chosenFrame.src = containerFrame.childNodes[0].src;
    chosenFrame.frameBorder = 0;
    chosenFrame.setAttribute('allowtransparency', 'true');
    chosenFrame.allow = "encrypted-media";
    chosenFrame.classList = "track_iframe";
    const deleteSong = document.createElement("img");
    deleteSong.src="./assets/delete_song.svg";
    const chosenSong = document.createElement('div');
    chosenSong.appendChild(chosenFrame);
    chosenSong.appendChild(deleteSong);
    chosenSong.classList.add("chosenSong");
    chosenSong.classList.add('hidden');
    const containerSongs = document.querySelector('#propSongs');
    containerSongs.appendChild(chosenSong);

    const checkButtons = document.querySelectorAll('.proposal input[type=checkbox]');
    for(const checkButton of checkButtons){
        if(checkButton.parentNode.querySelector("iframe").src===chosenFrame.src){
            checkButton.checked=true;
            checkButton.removeEventListener('click',rememberIDFrame);
            checkButton.addEventListener('click',forgetIDFrame );
        }
    }
}

function deleteSongChosen(event){
    const deleteButton = event.currentTarget;
    const songToDelete = deleteButton.parentNode;
    const chosenSongs = document.querySelectorAll(".chosenSong");
    const checkboxes = document.querySelectorAll(".proposal input[type=checkbox]");
    console.log(checkboxes.length);
    for(let i=0; i<chosenSongs.length; i++){
        console.log(chosenSongs[i].childNodes[0].src);
        console.log(songToDelete.childNodes[0].src);
        if(chosenSongs[i].childNodes[0].src === songToDelete.childNodes[0].src){
            for(let j=0; j<checkboxes.length; j++){
                // console.log(checkboxes[j].parentNode.childNodes[1].querySelector('iframe').src);
                // console.log(songToDelete.querySelector('iframe').src);
                if(checkboxes[j].parentNode.childNodes[1].querySelector('iframe').src === songToDelete.childNodes[0].src){
                    checkboxes[j].checked=false;
                    checkboxes[j].removeEventListener('click',forgetIDFrame);
                    checkboxes[j].addEventListener('click', rememberIDFrame);
                    // console.log('Ho tolto la spunta');
                }
            }
            chosenSongs[i].innerHTML='';
            chosenSongs[i].parentNode.removeChild(chosenSongs[i]);
            // console.log('rimosso');
            break;
        }
    }
}

function onContentSwitch(event){
    document.getElementById("back_button").classList.remove("hidden");
    const contentPropSongs = document.getElementById("propSongs");
    const searchedSongsContainer = document.getElementById("searchedSongs");
    const propSongs = contentPropSongs.querySelectorAll(".proposal");
    searchedSongsContainer.classList.add("hidden");
    contentPropSongs.classList.remove("hidden");
    const searchedSongs = searchedSongsContainer.querySelectorAll(".proposal");
    const chosenSongs = contentPropSongs.querySelectorAll(".chosenSong");
    for(const searchedSong of searchedSongs)
        searchedSong.classList.add("hidden");
    for(const propSong of propSongs)
        propSong.classList.add("hidden");
    for(const chosenSong of chosenSongs)
        chosenSong.classList.remove("hidden");

    event.currentTarget.textContent="Pubblica";
    event.currentTarget.removeEventListener("click", onContentSwitch);
    event.currentTarget.addEventListener("click", postPlaylist);

    const deleteSongButtons = document.querySelectorAll(".chosenSong img");
    for(const deleteSongButton of deleteSongButtons){
        deleteSongButton.addEventListener('click', deleteSongChosen);
    }

    document.querySelector("#search_song svg").classList.add("hidden");
    document.querySelector("#search_song input[type=text]").classList.add("hidden");
    const textAreas = document.querySelectorAll("#search_song textarea");
    const areaInput = document.getElementById("search_song")
    areaInput.style.flexDirection = "column";
    areaInput.style.height = "50%";
    for(const textarea of textAreas)
        textarea.classList.remove("hidden");
}

function offContentSwitch(event){
    document.getElementById("back_button").classList.add("hidden");
    document.getElementById("continue_button").removeEventListener("click", postPlaylist);
    document.getElementById("continue_button").addEventListener("click", onContentSwitch);
    document.getElementById("continue_button").textContent="Avanti";
    const contentPropSongs = document.getElementById("propSongs");
    
    const propSongs = contentPropSongs.querySelectorAll(".proposal");
    const chosenSongs = contentPropSongs.querySelectorAll(".chosenSong");
    for(const propSong of propSongs)
        propSong.classList.remove("hidden");
    for(const chosenSong of chosenSongs)
        chosenSong.classList.add("hidden"); 

    document.querySelector("#search_song svg").classList.remove("hidden");
    document.querySelector("#search_song input[type=text]").classList.remove("hidden");
    const textAreas = document.querySelectorAll("#search_song textarea");

    const areaInput = document.getElementById("search_song")
    areaInput.style.removeProperty("flex-direction");
    areaInput.style.height = "8%";

    for(const textarea of textAreas)
        textarea.classList.add("hidden");
    
}

const buttonPreLoad = document.getElementById("continue_button");
buttonPreLoad.addEventListener('click', onContentSwitch);
document.getElementById("back_button").addEventListener('click', offContentSwitch);


function textPlaylistPost(text){
    console.log(text);
    
    if(text==="Dati mancanti"){
        setTimeout(function(){window.alert("Non hai compilato tutti i campi");}, 200);
        return;
    }
    if(text==="Presente"){
        document.getElementById("insertName").style.borderColor="Red";
        setTimeout(function(){window.alert("Hai già una playlist con questo nome!");}, 200);
        return;
    }
    document.getElementById("search_song").classList.add("hidden");
    const postedSongs = document.querySelectorAll(".chosenSong");
    for(const postedSong of postedSongs)
        postedSong.parentNode.removeChild(postedSong);
    

    document.getElementById("propSongs").innerHTML="";
    document.getElementById("propSongs").classList.add("hidden");
    document.querySelector(".success-animation").classList.remove("hidden");
    document.getElementById("insertName").style.borderColor="rgba(128, 128, 128, 0.664)";
    document.getElementById("insertName").value="";
    document.getElementById("insertCaption").value="";
    document.getElementById("searchbox").value="";
    setTimeout(function(){closeModal();contents.scrollTo(0,0);}, 2200);
    loadPostsFromDatabase();
}


function postPlaylist(event){
    console.log("Pubblicato");
    const title = document.getElementById("insertName").value;
    const caption = document.getElementById("insertCaption").value;
    console.log(title+" "+caption);
    const songsPost = document.querySelectorAll(".chosenSong iframe");
    const urlSongsPost = new Array();
    for(const songPost of songsPost){
        // console.log(songPost.src);  
        urlSongsPost.push(songPost.src);
    }
    event.preventDefault();

    fetch("post_playlist.php?"+
    "&title="+encodeURIComponent(title)+
    "&caption="+encodeURIComponent(caption)+
    "&urlSongsPost="+JSON.stringify(urlSongsPost)).then(response=>response.text()).then(textPlaylistPost);
}

//CARICAMENTO POST IN HOME


function jsonFetchPost(json){
    console.log("Sto caricando...");
    console.log(json);
    const contents = document.getElementById("contents");

    for(let i in json){
        const post = document.createElement("div");
        post.classList.add("post");

        const info_post = document.createElement("div");
        info_post.classList.add("info_post");

        const author_date = document.createElement("a");
        author_date.classList.add("author_date");

        const profile_img = document.createElement("img");
        profile_img.classList.add("profile_img")
        profile_img.src = json[i].picture;

        const author = document.createElement("strong");
        author.classList.add("author");
        author.textContent = json[i].username;

        author_date.appendChild(profile_img);
        author_date.appendChild(author);

        const spentTime = document.createElement("text");
        spentTime.classList.add("date");
        spentTime.textContent = json[i].time;

        info_post.appendChild(author_date);
        info_post.appendChild(spentTime);

        const title_caption = document.createElement("div");
        title_caption.classList.add("text");
        
        const title = document.createElement("strong");
        title.textContent = json[i].title;
        const caption = document.createElement("p");
        caption.textContent = json[i].content
        title_caption.appendChild(title)
        title_caption.appendChild(caption);

        const songs = document.createElement("div");
        songs.classList.add("songs");

        for(let j in json[i].songs){
            const iframe = document.createElement('iframe');
            iframe.src = json[i].songs[j];
            iframe.frameBorder = 0;
            iframe.setAttribute('allowtransparency', 'true');
            iframe.allow = "encrypted-media";
            iframe.classList = "track_iframe";
            const song = document.createElement('div');
            song.classList.add('song');
            song.appendChild(iframe);
            songs.appendChild(song);
        }
        
        const feed = document.createElement("div");
        feed.classList.add("feed");

        const likeButton = document.createElement("div");
        likeButton.classList.add("like_svg");
        const svgLikeTR = document.createElement("img");
        if(json[i].liked==0){
            svgLikeTR.src="./assets/like.svg";
            svgLikeTR.addEventListener('click', like);
        } else{
            svgLikeTR.src="./assets/like_d.svg";
            svgLikeTR.addEventListener('click', unlike);
        }
        likeButton.appendChild(svgLikeTR);

        const commentButton = document.createElement("div");
        commentButton.classList.add("comment_svg");
        const svgComment = document.createElement("img");
        svgComment.src = "./assets/comment.svg";
        svgComment.addEventListener('click', viewComments);
        commentButton.appendChild(svgComment);
        const numLikes = document.createElement("div");
        numLikes.classList.add("num_likes");
        numLikes.style.marginTop = "3px";
        numLikes.style.display = "inline";
        numLikes.textContent = json[i].num_likes;
        const stringMiPiace = document.createElement("div");
        stringMiPiace.classList.add("string_miPiace");
        stringMiPiace.style.marginTop = "3px";
        stringMiPiace.style.display = "inline";
        stringMiPiace.textContent = " mi piace";
        if(json[i].num_likes==0){
            numLikes.classList.add("hidden");
            stringMiPiace.classList.add("hidden");
        }
        feed.appendChild(likeButton);
        feed.appendChild(commentButton);
        
        post.appendChild(info_post);
        post.appendChild(title_caption);
        post.appendChild(songs);
        post.appendChild(feed);
        post.appendChild(numLikes);
        post.appendChild(stringMiPiace);

        contents.appendChild(post);
    }

}
function loadPostsFromDatabase(){
    document.getElementById("contents").innerHTML="";
    fetch("fetch_post.php?").then(response=>response.json()).then(jsonFetchPost);
}

loadPostsFromDatabase();

// GESTIONE LIKE

function textModifyNumLikes(text){
    console.log(text);
}

function unlike(event){
    const containerButton= event.currentTarget.parentNode;
    containerButton.innerHTML='';
    const likedWhite = document.createElement("img");
    likedWhite.src="./assets/like.svg";
    containerButton.appendChild(likedWhite);

    const post = containerButton.parentNode.parentNode;
    const creator = post.querySelector(".author").textContent;
    const titlePlaylist = post.querySelector(".text strong").textContent;
    fetch("like_unlike.php?"+
    "&creator="+encodeURI(creator)+
    "&playlist="+encodeURI(titlePlaylist)+
    "&likeTF="+encodeURI("false")).then(response=>response.text()).then(textModifyNumLikes);
    
    const infoLikes = post.querySelector(".num_likes");
    const stringMiPiace = post.querySelector(".string_miPiace");
    infoLikes.textContent = parseInt(infoLikes.textContent)-1;
    if(parseInt(infoLikes.textContent)>0){
        infoLikes.classList.remove("hidden");
        stringMiPiace.classList.remove("hidden");
    }else{
        infoLikes.classList.add("hidden");
        stringMiPiace.classList.add("hidden");
    }
    const button=containerButton.childNodes[0];
    button.removeEventListener('click',unlike);
    button.addEventListener('click',like);
}

function like(event){
    const containerButton= event.currentTarget.parentNode;
    containerButton.innerHTML='';
    const likeRed = document.createElement("img");
    likeRed.src="./assets/like_d.svg";
    containerButton.appendChild(likeRed);

    const post = containerButton.parentNode.parentNode;
    const creator = post.querySelector(".author").textContent;
    const titlePlaylist = post.querySelector(".text strong").textContent;
    fetch("like_unlike.php?"+
    "&creator="+encodeURI(creator)+
    "&playlist="+encodeURI(titlePlaylist)+
    "&likeTF="+encodeURI("true")).then(response=>response.text()).then(textModifyNumLikes);

    const infoLikes = post.querySelector(".num_likes");
    const stringMiPiace = post.querySelector(".string_miPiace");
    infoLikes.textContent = parseInt(infoLikes.textContent)+1;
    infoLikes.classList.remove("hidden");
    stringMiPiace.classList.remove("hidden");


    const button=containerButton.childNodes[0];
    button.removeEventListener('click',like);
    button.addEventListener('click',unlike);
}


//GESTIONE COMMENTI
function jsonViewComments(json){
    console.log(json);
    const upComments = document.getElementById("up_comments");
    const noneView = document.getElementById("start_view");
    console.log(json[0].allComments.length);

    if(json[0].allComments.length==0){
        const commentsPlaylist = document.querySelectorAll(".single_comment");
        for(const commentPlaylist of commentsPlaylist)
            upComments.removeChild(commentPlaylist);
        const infoPlaylist = upComments.querySelectorAll("p .infoPost");
        for(const pInfo of infoPlaylist)
            upComments.removeChild(pInfo);
        upComments.style.justifyContent = "center";
        noneView.classList.remove("hidden");
        noneView.textContent = "La playlist selezionata non presenta commenti.";
    } else{
        upComments.style.justifyContent = "initial";
        noneView.innerHTML="";
        noneView.classList.add("hidden");
        const creator = document.createElement("p");
        const titlePlaylist = document.createElement("p");
        creator.classList.add("infoPostCreator");
        titlePlaylist.classList.add("infoPostTitlePlaylist");
        creator.textContent = json[0].creator;
        titlePlaylist.textContent = json[0].playlist;
        noneView.appendChild(titlePlaylist);
        noneView.appendChild(creator);
        const commentsPlaylist = document.querySelectorAll(".single_comment");
        for(const commentPlaylist of commentsPlaylist)
            upComments.removeChild(commentPlaylist);

        for(let i in json[0].allComments){
            console.log(json[0].allComments[i]);
            const single_Comment = document.createElement("div");
            single_Comment.classList.add("single_comment");
            const author_date = document.createElement("div");
            author_date.classList.add("author_date");
            const author = document.createElement("strong");
            author.classList.add("author");
            const date = document.createElement("text");
            date.classList.add("date");
            author.textContent = json[0].allComments[i].username;
            date.textContent = json[0].allComments[i].time;

            author_date.appendChild(author);
            author_date.appendChild(date);

            const text_comment = document.createElement("p");
            text_comment.classList.add("text_comment");
            text_comment.textContent = json[0].allComments[i].comment;

            single_Comment.appendChild(author_date);
            single_Comment.appendChild(text_comment);

            upComments.appendChild(single_Comment);
        }
        const inputcomment = document.querySelector("input");

        const insertCommentButton = document.querySelector("#inputComment");
        insertCommentButton.addEventListener('submit', insertComment);  
    }
}

function viewComments(event){
    const insertCommentButton = document.querySelector("#inputComment input[type=text]");
    insertCommentButton.value = "";
    const post = event.currentTarget.parentNode.parentNode.parentNode;
    const creator = post.querySelector(".author").textContent;
    const titlePlaylist = post.querySelector(".text strong").textContent;
    fetch("fetch_or_send_comments.php?"+
    "&creator="+encodeURI(creator)+
    "&playlist="+encodeURI(titlePlaylist)).then(response=>response.json()).then(jsonViewComments);
}

function insertComment(event){
    event.preventDefault();
    const insertCommentButton = document.querySelector("#inputComment input[type=text]");
    
    const info = document.getElementById("start_view");
    const creator = info.querySelector(".infoPostCreator").textContent;
    const titlePlaylist = info.querySelector(".infoPostTitlePlaylist").textContent;
    const commentInput = insertCommentButton.value;
    insertCommentButton.value = "";
    insertCommentButton.blur();
    fetch("fetch_or_send_comments.php?"+
    "&creator="+encodeURI(creator)+
    "&playlist="+encodeURI(titlePlaylist)+
    "&comment"+encodeURIComponent(commentInput)).then(response=>response.json()).then(jsonViewComments);
}


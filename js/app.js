const inputValue = document.getElementById("inputValue");
const searchValue = document.getElementById("searchBtn")

//search song
function getSongList() {
fetch(`https://api.lyrics.ovh/suggest/${inputValue.value}`)
    .then(response => response.json())
    .then(data => songArrayList(data.data))
    
}

const songArrayList = data =>{
    const songsDiv = document.getElementById("songDiv")
    songsDiv.innerHTML = '';
    data.forEach(song => {
        // console.log(song)
        const musicItem = document.createElement("div");
        // musicItem.innerHTML = '';
        musicItem.className = "single-result row align-items-center my-3 p-3";
        songsDiv.appendChild(musicItem);
        musicItem.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">${song.album.title}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                <button onclick="songLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
    });
}
// https://api.lyrics.ovh/v1/:artist/:title
const songLyrics = (artist, title)=>{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => showLyrics(data))
        .catch(erro => displayError("something went wrong"))

}

const showLyrics = (data)=>{
    const lyricsbtn = document.getElementById("songLyrics");
    lyricsbtn.innerText = data.lyrics; 
}



// const displayError = error => {
//     const errorTag = document.getElementById('error-message');
//     errorTag.innerText = error;
// }

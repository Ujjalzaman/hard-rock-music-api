const searchBtn = document.getElementById("searchBtn");
const inputValue = document.getElementById("inputValue");

searchBtn.addEventListener('click', function() {
    fetch(`https://api.lyrics.ovh/suggest/${inputValue.value}`)
        .then(res => res.json())
        .then(data => musicList(data.data))
        .catch(erro => errorMessage("Something Went Wrong! Please Try Again Leter"))
})
const musicList = data =>{
    const songDiv = document.getElementById("songDiv");
    songDiv.innerHTML = "";
    data.forEach(music =>{
        console.log(music)
        const musicDiv = document.createElement("div");
        musicDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.appendChild(musicDiv);
        musicDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${music.title}</h3>
                <p class="author lead">Album by <sp0an>${music.album.title}</sp0an></p>
                <audio controls>
                    <source src="${music.preview}" type="audio/ogg">
                  
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${music.artist.name}','${music.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
    })
}  

const getLyrics = async(artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        const songLyrics = document.getElementById("songLyrics");
        songLyrics.innerText = data.lyrics; 
    }
    catch(error){
        errorMessage("Something Went Wrong! Please Try Again Leter")
    }
}

const errorMessage = (error) =>{
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = error;
}
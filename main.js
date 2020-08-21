document.getElementById("search-button").addEventListener('click', function(){
    const inputSongName = document.getElementById("input-area").value;
    let titleContainer = document.getElementById("title-container");
    titleContainer.innerHTML = ' ';
    fetch(`https://api.lyrics.ovh/suggest/${inputSongName}`)
    .then(res => res.json())
    .then(data =>{
        const dataInfo = data.data;
        const list = dataInfo.slice(0, 10);
        console.log(list);
       

        for (let i = 0; i < list.length; i++) {
            const user = list[i];
            const captureSong = user.title;
            const songBy = user.artist.name;
            console.log(songBy);
            const paragraph = document.createElement("p");
            titleContainer.innerHTML += `
            <div id="ttt" class="search-result col-md-8 mx-auto py-4">
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${captureSong}</h3>
                        <p class="author lead">Album by <span>${songBy}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" onclick = "getLyricsDetails('${songBy}', '${captureSong}')" > Get Lyrics </button>
                    </div>
                </div>
            </div>
            `
        }
    })
})
function getLyricsDetails(artist, title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        const lyricsDetails = document.getElementById("lyric-container");
            lyricsDetails.innerHTML = `
            <h2 class="text-success mb-4">${title}</h2>
                <pre class="lyric text-white"> ${data.lyrics}</pre>
            </div>
            `
    })
}
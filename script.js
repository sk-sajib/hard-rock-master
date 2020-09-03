// 1. first result query ke dorte hobe
// 2. search btn event hadeler die result display korte hobe
// 3. get lyrics click korle lhyrics display korte hobe

document.getElementById('search-btn').addEventListener('click', function(){
    const searchLyric = document.getElementById('search-lyrics')
    searchLyrics(searchLyric.value)
   
})

function searchLyrics(lyrics){
    fetch(`https://api.lyrics.ovh/suggest/${lyrics}`)
    .then( res => res.json())
    .then( data => {
        // console.log(data)
        const totalLyrics = data.data.slice(0,10)
        const getLyrics = document.getElementById('search-result')
        
        totalLyrics.map( lyric =>{
           
            const div = document.createElement('div')
            div.classList = 'single-result row align-items-center my-3 p-3'
            div.innerHTML = `
                <div class="col-md-9">
                <h3 class="lyrics-name">${lyric.title}</h3>
                <p class="author lead">Album by <span>${lyric.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onClick="getFullLyrics('${lyric.artist.name}','${lyric.title}')" class="btn btn-success">Get Lyrics</button>
                </div> `
                
                getLyrics.appendChild(div)
                
        })
    })
}



function getFullLyrics(artist,title){

    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then( res => res.json())
    .then( data => {
        console.log(data)
        const contentArea = document.querySelector('.content-area');
        displaylyrics(data,contentArea, title)
        
    })
}

function displaylyrics(data,contentArea, title){
    const div = document.createElement('div')
    div.classList = 'single-lyrics text-center'
    div.innerHTML = 
    `
    <button class="btn go-back">&lsaquo;</button>
    <h2 class="text-success mb-4">${title}</h2>
    `
    const pre = document.createElement('pre')
    pre.classList = 'lyric text-white'

    if(data.error ){
        pre.innerHTML = 'lyrics not found'
    } else{
        pre.innerHTML = data.lyrics
    }

    div.appendChild(pre);
    contentArea.append(div);
}



